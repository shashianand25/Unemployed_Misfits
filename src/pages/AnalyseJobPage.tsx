import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/useAppStore';
import { BACKEND_JOB_DESCRIPTION, DEMO_ANALYSIS } from '../data/demoData';

const C = {
  bg: '#0a0a0f', surface: '#12121a', surface2: '#1a1a2e', border: '#2a2a3e',
  text: '#f0f0ff', textSec: '#8888aa', violet: '#7c3aed', blue: '#3b82f6', green: '#10b981',
};

const ANALYSIS_STEPS = [
  'Reading job requirements...',
  'Extracting technical skills...',
  'Comparing your profile...',
  'Identifying skill gaps...',
  'Generating your roadmap...',
];

export default function AnalyseJobPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [jobDesc, setJobDesc] = useState('');
  const [analysing, setAnalysing] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);

  const fillExample = () => setJobDesc(BACKEND_JOB_DESCRIPTION);

  const handleAnalyse = () => {
    if (!jobDesc.trim()) return;
    setAnalysing(true);
    setCompletedSteps([]);
    setCurrentStep(0);
    dispatch({ type: 'SET_ANALYSING', payload: true });
  };

  useEffect(() => {
    if (!analysing) return;
    if (currentStep < 0) return;

    if (currentStep < ANALYSIS_STEPS.length) {
      const timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, currentStep]);
        setCurrentStep(prev => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      // All steps done
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_JOB_ANALYSIS', payload: DEMO_ANALYSIS });
        dispatch({ type: 'SET_ANALYSING', payload: false });
        navigate('/dashboard/skill-gap');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, analysing]);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: C.text, marginBottom: 8 }}>Analyse Your Dream Job</h1>
        <p style={{ color: C.textSec, fontSize: 16 }}>Paste any job description and we'll identify exactly what you need to land it.</p>
      </div>

      {!analysing ? (
        <div style={{ maxWidth: 800 }}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: C.textSec }}>Job Description</label>
              <button onClick={fillExample} style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#a855f7', padding: '6px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>
                Use Backend Engineering Intern Example
              </button>
            </div>
            <textarea value={jobDesc} onChange={e => setJobDesc(e.target.value)}
              placeholder={`Paste the full job description here...\n\nExample:\nSoftware Engineer Intern\n\nWe are looking for a passionate software engineer intern...\nRequired skills: Python, SQL, REST APIs, Docker...`}
              style={{ width: '100%', minHeight: 280, background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px', color: C.text, fontSize: 15, lineHeight: 1.6, outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>

          <button onClick={handleAnalyse} disabled={!jobDesc.trim()}
            style={{ background: jobDesc.trim() ? `linear-gradient(135deg, ${C.violet}, #6d28d9)` : C.surface2, border: 'none', color: jobDesc.trim() ? 'white' : C.textSec, padding: '16px 32px', borderRadius: 12, fontSize: 17, fontWeight: 700, cursor: jobDesc.trim() ? 'pointer' : 'not-allowed', width: '100%', boxShadow: jobDesc.trim() ? '0 4px 24px rgba(124,58,237,0.4)' : 'none', transition: 'all 0.2s' }}>
            🔍 Analyse Job Description
          </button>

          <div style={{ marginTop: 24, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.textSec, marginBottom: 12 }}>💡 What happens next</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
              {['Extract required skills', 'Compare your profile', 'Identify skill gaps', 'Generate project roadmap'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.textSec }}>
                  <span style={{ color: C.violet, fontWeight: 700 }}>{i + 1}.</span> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 600, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 48, textAlign: 'center' }}>
          {/* Spinner */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ width: 72, height: 72, border: `3px solid ${C.border}`, borderTop: `3px solid ${C.violet}`, borderRadius: '50%', margin: '0 auto 24px', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Analysing your job description...</h2>
            <p style={{ color: C.textSec, fontSize: 14 }}>This takes just a few seconds</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' }}>
            {ANALYSIS_STEPS.map((step, i) => {
              const done = completedSteps.includes(i);
              const active = currentStep === i;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 10, background: done ? 'rgba(16,185,129,0.08)' : active ? 'rgba(124,58,237,0.08)' : 'transparent', border: `1px solid ${done ? 'rgba(16,185,129,0.2)' : active ? 'rgba(124,58,237,0.2)' : C.border}`, transition: 'all 0.3s' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, background: done ? C.green : active ? C.violet : C.surface2, color: done || active ? 'white' : C.textSec, flexShrink: 0 }}>
                    {done ? '✓' : active ? '⟳' : i + 1}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 500, color: done ? C.green : active ? C.text : C.textSec }}>{step}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
