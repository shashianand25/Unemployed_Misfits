import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/useAppStore';
import { DEMO_USER, DEMO_ANALYSIS } from '../data/demoData';

const C = {
  bg: '#0a0a0f', surface: '#12121a', surface2: '#1a1a2e', border: '#2a2a3e',
  text: '#f0f0ff', textSec: '#8888aa', violet: '#7c3aed', blue: '#3b82f6', green: '#10b981',
};

const CAREER_GOALS = [
  { label: 'Software Developer', icon: '💻' },
  { label: 'AI/ML Engineer', icon: '🤖' },
  { label: 'Business Analyst', icon: '📊' },
  { label: 'Product Manager', icon: '🧭' },
  { label: 'Marketing Associate', icon: '📣' },
  { label: 'Data Analyst', icon: '📈' },
];

const AVAILABLE_SKILLS = [
  'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js',
  'PostgreSQL', 'MySQL', 'REST APIs', 'Git', 'Docker',
  'Redis', 'AWS', 'Machine Learning', 'SQL', 'HTML/CSS',
];

const EDU_LEVELS = ["High School", "Associate's Degree", "Bachelor's Degree", "Master's Degree", "PhD", "Bootcamp / Self-taught", "Other"];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [careerGoal, setCareerGoal] = useState('');
  const [existingSkills, setExistingSkills] = useState<string[]>([]);
  const [preferredRole, setPreferredRole] = useState('');

  const loadDemo = () => {
    dispatch({ type: 'SET_USER', payload: DEMO_USER });
    dispatch({ type: 'SET_DEMO_MODE', payload: true });
    dispatch({ type: 'SET_JOB_ANALYSIS', payload: DEMO_ANALYSIS });
    navigate('/dashboard');
  };

  const toggleSkill = (s: string) =>
    setExistingSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const handleFinish = () => {
    dispatch({ type: 'SET_USER', payload: { name: name || 'User', educationLevel, fieldOfStudy, careerGoal, existingSkills, preferredRole } });
    dispatch({ type: 'SET_DEMO_MODE', payload: false });
    navigate('/dashboard');
  };

  const steps = ['Personal Info', 'Career Goal', 'Your Skills', 'Preferred Role'];

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px' }}>
      {/* Skip banner */}
      <div style={{ width: '100%', maxWidth: 640, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <span style={{ color: C.violet }}>⚡</span> Unemployed Misfits
        </div>
        <button onClick={loadDemo} style={{ background: 'none', border: `1px solid ${C.border}`, color: C.textSec, padding: '8px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
          Skip — Use Demo Profile
        </button>
      </div>

      {/* Step indicators */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 48, width: '100%', maxWidth: 640 }}>
        {steps.map((s, i) => {
          const idx = i + 1;
          const done = step > idx;
          const active = step === idx;
          return (
            <React.Fragment key={s}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, background: done ? C.green : active ? C.violet : C.surface2, border: `2px solid ${done ? C.green : active ? C.violet : C.border}`, color: done || active ? 'white' : C.textSec }}>
                  {done ? '✓' : idx}
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: active ? C.text : C.textSec, whiteSpace: 'nowrap' }}>{s}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: step > idx ? C.violet : C.border, borderRadius: 1 }} />}
            </React.Fragment>
          );
        })}
      </div>

      {/* Card */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 40, width: '100%', maxWidth: 640 }}>
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Tell us about yourself</h2>
            <p style={{ color: C.textSec, marginBottom: 32 }}>This helps us personalise your career roadmap.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.textSec, marginBottom: 8 }}>Your Name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Alex Morgan"
                  style={{ width: '100%', background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 16px', color: C.text, fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.textSec, marginBottom: 8 }}>Education Level</label>
                <select value={educationLevel} onChange={e => setEducationLevel(e.target.value)}
                  style={{ width: '100%', background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 16px', color: C.text, fontSize: 15, outline: 'none', boxSizing: 'border-box' }}>
                  <option value="">Select level...</option>
                  {EDU_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.textSec, marginBottom: 8 }}>Field of Study</label>
                <input value={fieldOfStudy} onChange={e => setFieldOfStudy(e.target.value)} placeholder="e.g. Computer Science"
                  style={{ width: '100%', background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 16px', color: C.text, fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>What's your career goal?</h2>
            <p style={{ color: C.textSec, marginBottom: 32 }}>Select the role you're aiming for.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {CAREER_GOALS.map(goal => (
                <div key={goal.label} onClick={() => setCareerGoal(goal.label)}
                  style={{ background: careerGoal === goal.label ? 'rgba(124,58,237,0.2)' : C.surface2, border: `2px solid ${careerGoal === goal.label ? C.violet : C.border}`, borderRadius: 14, padding: 20, cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{goal.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{goal.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>What skills do you already have?</h2>
            <p style={{ color: C.textSec, marginBottom: 32 }}>Select all that apply — be honest!</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {AVAILABLE_SKILLS.map(skill => {
                const sel = existingSkills.includes(skill);
                return (
                  <div key={skill} onClick={() => toggleSkill(skill)}
                    style={{ background: sel ? 'rgba(124,58,237,0.2)' : C.surface2, border: `1px solid ${sel ? C.violet : C.border}`, borderRadius: 24, padding: '8px 18px', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: sel ? '#a855f7' : C.textSec, transition: 'all 0.2s' }}>
                    {sel && '✓ '}{skill}
                  </div>
                );
              })}
            </div>
            <p style={{ marginTop: 20, color: C.textSec, fontSize: 13 }}>{existingSkills.length} skill{existingSkills.length !== 1 ? 's' : ''} selected</p>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>What role do you want?</h2>
            <p style={{ color: C.textSec, marginBottom: 32 }}>Be specific — this is used to find the best job descriptions for you.</p>
            <input value={preferredRole} onChange={e => setPreferredRole(e.target.value)} placeholder="e.g. Backend Engineering Intern"
              style={{ width: '100%', background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px', color: C.text, fontSize: 16, outline: 'none', boxSizing: 'border-box', marginBottom: 12 }} />
            <p style={{ color: C.textSec, fontSize: 13 }}>Examples: "Backend Engineering Intern", "Junior Data Analyst", "Product Manager Intern"</p>
            <div style={{ marginTop: 32, background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: '#a855f7' }}>📋 Your Profile Summary</div>
              <div style={{ fontSize: 13, color: C.textSec, lineHeight: 2 }}>
                <span style={{ color: C.text }}>{name || '(no name)'}</span> · {educationLevel || '(no education)'} in {fieldOfStudy || '(no field)'}<br />
                Goal: <span style={{ color: C.text }}>{careerGoal || '(none selected)'}</span><br />
                Skills: <span style={{ color: C.text }}>{existingSkills.join(', ') || '(none selected)'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 36 }}>
          <button onClick={() => setStep(s => s - 1)} disabled={step === 1}
            style={{ background: 'none', border: `1px solid ${C.border}`, color: step === 1 ? C.textSec : C.text, padding: '12px 24px', borderRadius: 10, fontSize: 15, cursor: step === 1 ? 'not-allowed' : 'pointer', opacity: step === 1 ? 0.4 : 1 }}>
            ← Back
          </button>
          {step < 4 ? (
            <button onClick={() => setStep(s => s + 1)} style={{ background: `linear-gradient(135deg, ${C.violet}, #6d28d9)`, border: 'none', color: 'white', padding: '12px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
              Continue →
            </button>
          ) : (
            <button onClick={handleFinish} style={{ background: `linear-gradient(135deg, ${C.violet}, #6d28d9)`, border: 'none', color: 'white', padding: '12px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
              Create My Career Dashboard →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
