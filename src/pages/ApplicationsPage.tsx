import React from 'react';
import { useAppStore, useAppDispatch } from '../store/useAppStore';
import { DEMO_APPLICATIONS } from '../data/demoData';
import type { ApplicationStatus } from '../types';

const C = {
  bg: '#0a0a0f', surface: '#12121a', surface2: '#1a1a2e', border: '#2a2a3e',
  text: '#f0f0ff', textSec: '#8888aa', violet: '#7c3aed', blue: '#3b82f6',
  green: '#10b981', orange: '#f59e0b',
};

const STATUS_OPTIONS: ApplicationStatus[] = ['interested', 'preparing', 'applied', 'interview', 'completed'];
const STATUS_COLORS: Record<ApplicationStatus, { bg: string; color: string; label: string }> = {
  interested: { bg: 'rgba(139,92,246,0.15)', color: '#a78bfa', label: 'Interested' },
  preparing: { bg: 'rgba(59,130,246,0.15)', color: C.blue, label: 'Preparing' },
  applied: { bg: 'rgba(245,158,11,0.15)', color: C.orange, label: 'Applied' },
  interview: { bg: 'rgba(16,185,129,0.15)', color: C.green, label: 'Interview' },
  completed: { bg: 'rgba(107,114,128,0.15)', color: '#9ca3af', label: 'Completed' },
};

export default function ApplicationsPage() {
  const dispatch = useAppDispatch();
  const { applicationStatuses } = useAppStore();
  const applications = DEMO_APPLICATIONS;

  const getStatus = (id: string): ApplicationStatus => applicationStatuses[id] || 'interested';

  const setStatus = (id: string, status: ApplicationStatus) =>
    dispatch({ type: 'SET_APPLICATION_STATUS', payload: { id, status } });

  const totalApps = applications.length;
  const statusCounts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = applications.filter(a => getStatus(a.id) === s).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: C.text, marginBottom: 8 }}>My Applications</h1>
        <p style={{ color: C.textSec, fontSize: 16 }}>Track your job applications and monitor your progress.</p>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{totalApps}</div>
          <div style={{ fontSize: 12, color: C.textSec }}>Total</div>
        </div>
        {STATUS_OPTIONS.map(s => (
          <div key={s} style={{ background: STATUS_COLORS[s].bg, border: `1px solid ${STATUS_COLORS[s].color}30`, borderRadius: 10, padding: '12px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: STATUS_COLORS[s].color }}>{statusCounts[s]}</div>
            <div style={{ fontSize: 12, color: C.textSec }}>{STATUS_COLORS[s].label}</div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 10, padding: 14, marginBottom: 24, fontSize: 13, color: C.orange }}>
        ⚠️ Sample opportunities for demonstration — not live job vacancies.
      </div>

      {/* Application cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {applications.map(app => {
          const status = getStatus(app.id);
          const sc = STATUS_COLORS[status];

          return (
            <div key={app.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{app.company}</div>
                  <div style={{ fontSize: 15, color: C.textSec, marginBottom: 10 }}>{app.jobTitle}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {app.requiredSkills.slice(0, 5).map(skill => (
                      <span key={skill} style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 20, padding: '3px 10px', fontSize: 12, color: C.textSec }}>{skill}</span>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: app.matchScore >= 60 ? C.green : app.matchScore >= 50 ? C.orange : '#ef4444', marginBottom: 4 }}>
                    {app.matchScore}%
                  </div>
                  <div style={{ fontSize: 12, color: C.textSec }}>match score</div>
                </div>
              </div>

              {/* Match bar */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ background: C.border, borderRadius: 4, height: 6, overflow: 'hidden' }}>
                  <div style={{ width: `${app.matchScore}%`, height: '100%', background: `linear-gradient(90deg, ${C.violet}, ${C.blue})`, borderRadius: 4 }} />
                </div>
              </div>

              {/* Status selector */}
              <div>
                <div style={{ fontSize: 12, color: C.textSec, fontWeight: 600, marginBottom: 10 }}>Application Status</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {STATUS_OPTIONS.map(s => {
                    const col = STATUS_COLORS[s];
                    const active = status === s;
                    return (
                      <button key={s} onClick={() => setStatus(app.id, s)}
                        style={{ background: active ? col.bg : 'transparent', border: `1px solid ${active ? col.color : C.border}`, color: active ? col.color : C.textSec, padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: active ? 600 : 400, cursor: 'pointer', transition: 'all 0.2s' }}>
                        {col.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
