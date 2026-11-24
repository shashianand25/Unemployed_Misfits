import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore, useAppDispatch } from '../store/useAppStore';
import { DEMO_ANALYSIS } from '../data/demoData';

const C = {
  bg: '#0a0a0f', surface: '#12121a', surface2: '#1a1a2e', border: '#2a2a3e',
  text: '#f0f0ff', textSec: '#8888aa', violet: '#7c3aed', blue: '#3b82f6',
  green: '#10b981', orange: '#f59e0b',
};

const RESOURCES = [
  { name: 'Redis Documentation', url: 'https://redis.io/docs/', icon: '📖' },
  { name: 'FastAPI Docs', url: 'https://fastapi.tiangolo.com/', icon: '⚡' },
  { name: 'Celery Guide', url: 'https://docs.celeryq.dev/en/stable/', icon: '🌿' },
  { name: 'Docker Get Started', url: 'https://docs.docker.com/get-started/', icon: '🐳' },
  { name: 'SQLAlchemy Docs', url: 'https://docs.sqlalchemy.org/', icon: '🗄️' },
];

const AI_RESPONSES: Record<string, string> = {
  'Explain Redis': 'Redis is an in-memory data structure store that works as a database, cache, and message broker. In your project, it acts as the message broker for Celery — when you POST a job via the API, the job is serialised and pushed to a Redis list (queue). Celery workers subscribe to that list, pop jobs off, and process them asynchronously. Redis is incredibly fast (sub-millisecond reads/writes) because it stores everything in RAM. You\'ll use Redis lists for FIFO queues and sorted sets for priority queues.',
  'Why background workers?': 'Background workers let you decouple request handling from time-consuming work. Imagine if processing a job took 30 seconds — your HTTP client would time out waiting. Instead, you POST the job, get back a job ID immediately (202 Accepted), and poll GET /jobs/:id to check status. The heavy work happens in a Celery worker running in a separate process (even a separate container). This pattern is used everywhere in production: email sending, image processing, report generation, ML inference.',
  'Retry mechanism?': 'Celery has built-in retry support. When a task fails, you can configure autoretry_for to specify which exceptions trigger a retry, max_retries (e.g. 3), and countdown for exponential back-off (e.g. 2 ** self.request.retries seconds). After max retries, the job is routed to the dead-letter queue — a special Redis key where failed jobs accumulate for investigation. In your FastAPI app, you expose these failed jobs via GET /jobs?status=failed so operators can inspect and manually retry them.',
  'Project architecture?': 'The system has four main layers:\n\n1. API Layer (FastAPI): HTTP endpoints for job creation, status polling, and queue stats. Runs in its own Docker container.\n\n2. Queue Layer (Redis): Stores job messages as serialised JSON in Redis lists. Priority queues use Redis sorted sets (ZADD/ZPOPMIN).\n\n3. Worker Layer (Celery): One or more worker containers that subscribe to Redis, process jobs, and update job status in PostgreSQL.\n\n4. Persistence Layer (PostgreSQL): Stores full job records — payload, status, timestamps, error messages, retry count. Redis stores references; PostgreSQL stores truth.\n\nDocker Compose ties all four together with a shared network.',
};

const FALLBACK = 'That\'s a great question! For this demo, I have predefined answers for the four quick questions above. In a real workspace, the AI assistant would analyse your code, project context, and learning history to give you a personalised answer. Try one of the quick questions to see how it works!';

interface ChatMessage { role: 'user' | 'ai'; text: string; }

const QUICK_QUESTIONS = ['Explain Redis', 'Why background workers?', 'Retry mechanism?', 'Project architecture?'];

const OBJECTIVES = [
  'Build a REST API that accepts job payloads and returns a job ID',
  'Use Redis as the message broker for async task distribution',
  'Implement Celery workers that process jobs with retry logic',
  'Store job state in PostgreSQL with proper status transitions',
  'Containerise the full stack with Docker Compose',
  'Add monitoring with Flower and Prometheus metrics',
];

export default function ProjectWorkspacePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { jobAnalysis, projectGithubUrls, completedMilestones } = useAppStore();
  const analysis = jobAnalysis || DEMO_ANALYSIS;
  const project = analysis.recommendedProject;
  const milestones = project.milestones;
  const completedCount = milestones.filter(m => completedMilestones.includes(m.id)).length;
  const progress = Math.round((completedCount / milestones.length) * 100);

  const githubUrl = projectGithubUrls[project.id] || '';
  const [githubInput, setGithubInput] = useState(githubUrl);
  const [notes, setNotes] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', text: 'Hi! I\'m your demo assistant for the Distributed Job Queue project. Ask me anything about Redis, Celery, Docker, or the project architecture. Use the quick questions below to get started!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const saveGithub = () => {
    dispatch({ type: 'SET_GITHUB_URL', payload: { projectId: project.id, url: githubInput } });
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { role: 'user', text };
    const aiText = AI_RESPONSES[text] || FALLBACK;
    const aiMsg: ChatMessage = { role: 'ai', text: aiText };
    setMessages(prev => [...prev, userMsg, aiMsg]);
    setChatInput('');
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.text, marginBottom: 8 }}>Project Workspace</h1>
        <p style={{ color: C.textSec, fontSize: 15 }}>Build, track, and get help with your project all in one place.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, alignItems: 'start' }}>
        {/* LEFT PANEL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Project overview */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 12, color: C.textSec, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Project</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{project.title}</h2>
            <p style={{ color: C.textSec, fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{project.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {project.technologies.map(t => (
                <span key={t} style={{ background: 'rgba(124,58,237,0.15)', color: '#a855f7', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 500 }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Objectives */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 12, color: C.textSec, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Project Objectives</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {OBJECTIVES.map((obj, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: C.violet, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ fontSize: 14, color: C.text, lineHeight: 1.5 }}>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestone progress */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: C.textSec, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Milestone Progress</div>
              <span style={{ color: C.violet, fontWeight: 700, fontSize: 14 }}>{completedCount}/{milestones.length}</span>
            </div>
            <div style={{ background: C.border, borderRadius: 4, height: 8, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ width: `${progress}%`, height: '100%', background: `linear-gradient(90deg, ${C.violet}, ${C.blue})`, borderRadius: 4, transition: 'width 0.5s' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {milestones.map((m, i) => {
                const done = completedMilestones.includes(m.id);
                return (
                  <div key={m.id} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: done ? C.green : m.status === 'active' ? C.violet : C.surface2, color: done || m.status === 'active' ? 'white' : C.textSec, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                      {done ? '✓' : i + 1}
                    </div>
                    <span style={{ fontSize: 13, color: done ? C.textSec : C.text }}>{m.title}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 11, color: done ? C.green : m.status === 'active' ? '#a855f7' : C.textSec }}>
                      {done ? 'Done' : m.status === 'active' ? 'Active' : 'Locked'}
                    </span>
                  </div>
                );
              })}
            </div>
            <button onClick={() => navigate('/dashboard/roadmap')} style={{ background: 'none', border: `1px solid ${C.border}`, color: C.text, padding: '8px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', marginTop: 16, width: '100%' }}>
              Open Full Roadmap →
            </button>
          </div>

          {/* Learning resources */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 12, color: C.textSec, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Learning Resources</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {RESOURCES.map((r, i) => (
                <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, textDecoration: 'none', fontSize: 14, transition: 'border-color 0.2s' }}>
                  <span>{r.icon}</span>
                  <span>{r.name}</span>
                  <span style={{ marginLeft: 'auto', color: C.textSec, fontSize: 12 }}>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 12, color: C.textSec, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Project Notes</div>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Write your notes, decisions, and observations here..."
              style={{ width: '100%', minHeight: 120, background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, color: C.text, fontSize: 14, lineHeight: 1.6, outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>

          {/* GitHub URL */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 12, color: C.textSec, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>GitHub Repository</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <input value={githubInput} onChange={e => setGithubInput(e.target.value)} placeholder="https://github.com/username/project"
                style={{ flex: 1, background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', color: C.text, fontSize: 14, outline: 'none' }} />
              <button onClick={saveGithub} style={{ background: `linear-gradient(135deg, ${C.violet}, #6d28d9)`, border: 'none', color: 'white', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Save
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: AI Chat */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, display: 'flex', flexDirection: 'column', height: 700, position: 'sticky', top: 20 }}>
          {/* Chat header */}
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🤖</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>AI Assistant</div>
                <div style={{ fontSize: 11, color: C.orange, fontWeight: 600 }}>⚠️ Demo — responses are predefined</div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: 8, alignItems: 'flex-start' }}>
                {msg.role === 'ai' && (
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>🤖</div>
                )}
                <div style={{ background: msg.role === 'user' ? `linear-gradient(135deg, ${C.violet}, #6d28d9)` : C.surface2, color: C.text, borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '4px 14px 14px 14px', padding: '10px 14px', maxWidth: '82%', fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick questions */}
          <div style={{ padding: '12px 16px', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 11, color: C.textSec, fontWeight: 600, marginBottom: 8 }}>QUICK QUESTIONS</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {QUICK_QUESTIONS.map(q => (
                <button key={q} onClick={() => sendMessage(q)}
                  style={{ background: C.surface2, border: `1px solid ${C.border}`, color: C.text, padding: '5px 10px', borderRadius: 20, fontSize: 12, cursor: 'pointer', transition: 'border-color 0.2s' }}>
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div style={{ padding: 12, display: 'flex', gap: 8 }}>
            <input value={chatInput} onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(chatInput)}
              placeholder="Ask a question..."
              style={{ flex: 1, background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', color: C.text, fontSize: 13, outline: 'none' }} />
            <button onClick={() => sendMessage(chatInput)} style={{ background: `linear-gradient(135deg, ${C.violet}, #6d28d9)`, border: 'none', color: 'white', padding: '10px 16px', borderRadius: 8, fontSize: 16, cursor: 'pointer' }}>
              ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
