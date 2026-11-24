import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore, useAppDispatch } from '../store/useAppStore';
import { DEMO_ANALYSIS } from '../data/demoData';
import type { Milestone } from '../types';

const C = {
  bg: '#0a0a0f', surface: '#12121a', surface2: '#1a1a2e', border: '#2a2a3e',
  text: '#f0f0ff', textSec: '#8888aa', violet: '#7c3aed', blue: '#3b82f6',
  green: '#10b981', orange: '#f59e0b',
};

function MilestoneCard({ milestone, index, completed, onToggle }: { milestone: Milestone; index: number; completed: boolean; onToggle: () => void }) {
  const [expanded, setExpanded] = useState(index === 0);
  const isLocked = milestone.status === 'locked' && !completed;
  const isActive = milestone.status === 'active' || completed;

  const borderColor = completed ? C.green : isActive ? C.violet : C.border;
  const numBg = completed ? C.green : isActive ? C.violet : C.surface2;
  const numColor = completed || isActive ? 'white' : C.textSec;

  return (
    <div style={{ background: C.surface, border: `2px solid ${borderColor}`, borderRadius: 16, overflow: 'hidden', transition: 'all 0.3s', opacity: isLocked ? 0.6 : 1 }}>
      {/* Header */}
      <div onClick={() => setExpanded(!expanded)} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 20, cursor: 'pointer' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: numBg, color: numColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, flexShrink: 0 }}>
          {completed ? '✓' : index + 1}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{milestone.title}</div>
          <div style={{ fontSize: 13, color: C.textSec, lineHeight: 1.4 }}>{milestone.description}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ background: completed ? `${C.green}20` : isActive && !isLocked ? `${C.violet}20` : C.surface2, color: completed ? C.green : isActive && !isLocked ? '#a855f7' : C.textSec, border: `1px solid ${completed ? `${C.green}40` : isActive && !isLocked ? 'rgba(124,58,237,0.3)' : C.border}`, borderRadius: 20, padding: '3px 12px', fontSize: 11, fontWeight: 600 }}>
            {completed ? 'Completed' : isLocked ? 'Locked' : 'Active'}
          </span>
          <span style={{ color: C.textSec, fontSize: 18 }}>{expanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div style={{ padding: '0 20px 20px', borderTop: `1px solid ${C.border}` }}>
          <div style={{ marginTop: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.textSec, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Tasks</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {milestone.tasks.map((task, ti) => (
                <div key={ti} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, border: `1px solid ${completed ? C.green : C.border}`, background: completed ? `${C.green}20` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2, fontSize: 12, color: C.green }}>
                    {completed ? '✓' : ''}
                  </div>
                  <span style={{ fontSize: 14, color: completed ? C.textSec : C.text, lineHeight: 1.5 }}>{task}</span>
                </div>
              ))}
            </div>
          </div>
          {!isLocked && (
            <button onClick={(e) => { e.stopPropagation(); onToggle(); }}
              style={{ background: completed ? `${C.green}20` : `linear-gradient(135deg, ${C.violet}, #6d28d9)`, border: completed ? `1px solid ${C.green}40` : 'none', color: completed ? C.green : 'white', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              {completed ? 'Completed ✓' : 'Mark as Complete'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProjectRoadmapPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { jobAnalysis, completedMilestones } = useAppStore();
  const analysis = jobAnalysis || DEMO_ANALYSIS;
  const project = analysis.recommendedProject;
  const milestones = project.milestones;
  const completedCount = milestones.filter(m => completedMilestones.includes(m.id)).length;
  const progress = Math.round((completedCount / milestones.length) * 100);

  const toggleMilestone = (id: string) => dispatch({ type: 'TOGGLE_MILESTONE', payload: id });

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: C.text, marginBottom: 8 }}>Your Skills-to-Project Roadmap</h1>
        <p style={{ color: C.textSec, fontSize: 16 }}>Complete these milestones to build your portfolio project and prove your skills.</p>
      </div>

      {/* Project header card */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: C.textSec, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Portfolio Project</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>{project.title}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {project.technologies.map(t => (
                <span key={t} style={{ background: 'rgba(124,58,237,0.15)', color: '#a855f7', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 20, padding: '4px 12px', fontSize: 13, fontWeight: 500 }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: C.violet }}>{progress}%</div>
            <div style={{ color: C.textSec, fontSize: 13 }}>{completedCount}/{milestones.length} milestones</div>
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: C.textSec }}>
            <span>Overall progress</span>
            <span style={{ color: C.violet, fontWeight: 600 }}>{progress}%</span>
          </div>
          <div style={{ background: C.border, borderRadius: 4, height: 8, overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: `linear-gradient(90deg, ${C.violet}, ${C.blue})`, borderRadius: 4, transition: 'width 0.5s ease' }} />
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div style={{ position: 'relative', marginBottom: 32 }}>
        {/* Connector line */}
        <div style={{ position: 'absolute', left: 37, top: 36, bottom: 36, width: 2, background: C.border, zIndex: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative', zIndex: 1 }}>
          {milestones.map((milestone, i) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              index={i}
              completed={completedMilestones.includes(milestone.id)}
              onToggle={() => toggleMilestone(milestone.id)}
            />
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 10, padding: 16, marginBottom: 24, fontSize: 13, color: C.orange }}>
        ⚠️ Completing this roadmap does not automatically verify your skills. Real skill verification requires project review.
      </div>

      <button onClick={() => navigate('/dashboard/workspace')} style={{ background: `linear-gradient(135deg, ${C.violet}, #6d28d9)`, border: 'none', color: 'white', padding: '16px 32px', borderRadius: 12, fontSize: 17, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 24px rgba(124,58,237,0.4)' }}>
        Open Project Workspace →
      </button>
    </div>
  );
}
