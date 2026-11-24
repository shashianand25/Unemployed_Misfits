import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore, useAppDispatch } from '../store/useAppStore';
import { DEMO_ANALYSIS } from '../data/demoData';

const C = {
  bg: '#0a0a0f', surface: '#12121a', surface2: '#1a1a2e', border: '#2a2a3e',
  text: '#f0f0ff', textSec: '#8888aa', violet: '#7c3aed', blue: '#3b82f6',
  green: '#10b981', orange: '#f59e0b',
};

const STAT_CARDS = [
  { label: 'Career Readiness', value: '72%', icon: '🎯', color: C.violet, desc: 'Overall readiness score' },
  { label: 'Skills Matched', value: '3/5', icon: '✅', color: C.green, desc: 'From job requirements' },
  { label: 'Skills to Develop', value: '2', icon: '📚', color: C.orange, desc: 'Missing from target role' },
  { label: 'Projects Completed', value: '0/1', icon: '🏗️', color: C.blue, desc: 'Roadmap progress' },
];

const RECENT_ACTIVITY = [
  { icon: '🔍', text: 'Analysed Backend Engineering Intern job description', time: '2h ago' },
  { icon: '📊', text: 'Skill gap analysis completed — 60% match', time: '2h ago' },
  { icon: '🗺️', text: 'Project roadmap generated: Distributed Job Queue', time: '2h ago' },
  { icon: '👤', text: 'Profile created', time: 'Today' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, jobAnalysis, completedMilestones, isDemoMode } = useAppStore();
  const analysis = jobAnalysis || DEMO_ANALYSIS;
  const project = analysis.recommendedProject;
  const milestones = project.milestones;
  const completedCount = milestones.filter(m => completedMilestones.includes(m.id)).length;

  const displayName = user?.name || 'there';

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 10, padding: '12px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#a855f7' }}>
          <span style={{ fontSize: 18 }}>🎯</span>
          <span><strong>Demo Mode</strong> — Sample data loaded for <strong>Alex Morgan</strong>. All data is illustrative.</span>
          <button onClick={() => { dispatch({ type: 'RESET_DEMO' }); navigate('/'); }} style={{ marginLeft: 'auto', background: 'none', border: '1px solid rgba(124,58,237,0.4)', color: '#a855f7', padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>Exit Demo</button>
        </div>
      )}
      {/* Welcome header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: C.text, marginBottom: 8 }}>Welcome back, {displayName}! 👋</h1>
        <p style={{ color: C.textSec, fontSize: 16 }}>Let's turn your skills into opportunities.</p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
        {STAT_CARDS.map((card, i) => (
          <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>{card.icon}</span>
              <div style={{ background: `${card.color}20`, borderRadius: 8, padding: '4px 8px', fontSize: 11, fontWeight: 700, color: card.color, textTransform: 'uppercase', letterSpacing: 1 }}>Live</div>
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: card.color, marginBottom: 4 }}>{card.value}</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{card.label}</div>
            <div style={{ fontSize: 12, color: C.textSec }}>{card.desc}</div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Recommended career path */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24 }}>
          <div style={{ fontSize: 12, color: C.textSec, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Recommended Career Path</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ background: `${C.violet}20`, borderRadius: 12, width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🎯</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Backend Engineering Intern</div>
              <div style={{ fontSize: 13, color: C.textSec }}>Entry-level · Remote/Hybrid available</div>
            </div>
          </div>
          {/* Skill match arc visual */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: C.textSec }}>Skill match</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.violet }}>60%</span>
            </div>
            <div style={{ background: C.border, borderRadius: 4, height: 8, overflow: 'hidden' }}>
              <div style={{ width: '60%', height: '100%', background: `linear-gradient(90deg, ${C.violet}, ${C.blue})`, borderRadius: 4 }} />
            </div>
          </div>
          <button onClick={() => navigate('/dashboard/analyse')} style={{ background: `linear-gradient(135deg, ${C.violet}, #6d28d9)`, border: 'none', color: 'white', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', width: '100%' }}>
            Analyse a Job Description →
          </button>
        </div>

        {/* Skills breakdown */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24 }}>
          <div style={{ fontSize: 12, color: C.textSec, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Your Skills vs Required</div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.green, marginBottom: 10 }}>Skills You Have</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {analysis.matchedSkills.map(s => (
                <span key={s} style={{ background: `${C.green}15`, color: C.green, border: `1px solid ${C.green}30`, borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 500 }}>{s}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.orange, marginBottom: 10 }}>Skills to Develop</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {analysis.missingSkills.map(s => (
                <span key={s} style={{ background: `${C.orange}15`, color: C.orange, border: `1px solid ${C.orange}30`, borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 500 }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Next action card */}
      <div style={{ background: `linear-gradient(135deg, rgba(124,58,237,0.15), rgba(59,130,246,0.1))`, border: '1px solid rgba(124,58,237,0.3)', borderRadius: 14, padding: 28, marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontSize: 12, color: '#a855f7', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>⚡ Recommended Next Action</div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Build your first job-ready project</div>
          <div style={{ color: C.textSec, fontSize: 14 }}>📦 {project.title} · {completedCount}/{milestones.length} milestones complete</div>
        </div>
        <button onClick={() => navigate('/dashboard/roadmap')} style={{ background: `linear-gradient(135deg, ${C.violet}, #6d28d9)`, border: 'none', color: 'white', padding: '12px 24px', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          View Project Roadmap →
        </button>
      </div>

      {/* Bottom grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Recent activity */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24 }}>
          <div style={{ fontSize: 12, color: C.textSec, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 }}>Recent Activity</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {RECENT_ACTIVITY.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{a.icon}</span>
                <div>
                  <div style={{ fontSize: 13, lineHeight: 1.5 }}>{a.text}</div>
                  <div style={{ fontSize: 11, color: C.textSec, marginTop: 2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming milestones */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24 }}>
          <div style={{ fontSize: 12, color: C.textSec, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 }}>Upcoming Milestones</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {milestones.slice(0, 4).map((m, i) => {
              const done = completedMilestones.includes(m.id);
              return (
                <div key={m.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, background: done ? C.green : m.status === 'active' ? C.violet : C.surface2, color: done || m.status === 'active' ? 'white' : C.textSec, flexShrink: 0 }}>
                    {done ? '✓' : i + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{m.title}</div>
                    <div style={{ fontSize: 11, color: done ? C.green : m.status === 'active' ? C.violet : C.textSec }}>
                      {done ? 'Completed' : m.status === 'active' ? 'In Progress' : 'Locked'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={() => navigate('/dashboard/roadmap')} style={{ background: 'none', border: `1px solid ${C.border}`, color: C.text, padding: '10px', borderRadius: 8, fontSize: 13, cursor: 'pointer', width: '100%', marginTop: 16 }}>
            View Full Roadmap →
          </button>
        </div>
      </div>
    </div>
  );
}
