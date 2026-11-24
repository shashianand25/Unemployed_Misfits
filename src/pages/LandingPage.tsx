import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/useAppStore';
import { DEMO_USER, DEMO_ANALYSIS } from '../data/demoData';

const C = {
  bg: '#0a0a0f',
  surface: '#12121a',
  surface2: '#1a1a2e',
  border: '#2a2a3e',
  text: '#f0f0ff',
  textSec: '#8888aa',
  violet: '#7c3aed',
  violetLight: '#a855f7',
  blue: '#3b82f6',
  green: '#10b981',
  orange: '#f59e0b',
};

const globalStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(-2deg); }
    50% { transform: translateY(-16px) rotate(2deg); }
  }
  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 40px rgba(124,58,237,0.25), 0 0 80px rgba(59,130,246,0.1); }
    50% { box-shadow: 0 0 60px rgba(124,58,237,0.45), 0 0 100px rgba(59,130,246,0.2); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(32px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .hero-card { animation: float 5s ease-in-out infinite, glow-pulse 4s ease-in-out infinite; }
  .fade-in-up { animation: fadeInUp 0.6s ease forwards; }
  .pill-hover { transition: all 0.2s ease; cursor: default; }
  .pill-hover:hover { background: #7c3aed !important; color: white !important; transform: translateY(-2px); }
  .nav-link:hover { color: #a855f7 !important; }
  .cta-btn:hover { opacity: 0.9; transform: translateY(-1px); }
`;

const PROBLEMS = [
  { icon: '📄', title: 'Generic job boards', desc: 'Endless listings with no guidance on what you\'re actually missing to land the role.' },
  { icon: '📚', title: 'Courses without context', desc: 'You finish a course but have no real project to prove you learned anything.' },
  { icon: '🎯', title: 'No proof of readiness', desc: 'Employers can\'t see your skills. You can\'t demonstrate what you\'ve built.' },
];

const WORKFLOW = ['Discover', 'Analyse', 'Learn', 'Build', 'Prove', 'Apply', 'Prepare'];

const COMPARISON = [
  { label: 'Personalised skill gap analysis', traditional: false, us: true },
  { label: 'Job-tailored project roadmaps', traditional: false, us: true },
  { label: 'Real evidence of your work', traditional: false, us: true },
  { label: 'Interview prep linked to your project', traditional: false, us: true },
  { label: 'Generic listings & courses', traditional: true, us: false },
  { label: 'Resume black holes', traditional: true, us: false },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleExploreDemo = () => {
    dispatch({ type: 'SET_USER', payload: DEMO_USER });
    dispatch({ type: 'SET_DEMO_MODE', payload: true });
    dispatch({ type: 'SET_JOB_ANALYSIS', payload: DEMO_ANALYSIS });
    navigate('/dashboard');
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{globalStyles}</style>

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(10,10,15,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? `1px solid ${C.border}` : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 20, fontWeight: 700 }}>
            <span style={{ color: C.violet }}>⚡</span>
            <span>Unemployed Misfits</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {[['how-it-works', 'How It Works'], ['problems', 'Why Us'], ['comparison', 'Compare']].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="nav-link"
                style={{ background: 'none', border: 'none', color: C.textSec, fontSize: 14, cursor: 'pointer', fontWeight: 500, transition: 'color 0.2s' }}>
                {label}
              </button>
            ))}
            <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: `1px solid ${C.border}`, color: C.text, padding: '7px 16px', borderRadius: 8, fontSize: 14, cursor: 'pointer' }}>
              Sign In
            </button>
            <button onClick={() => navigate('/onboarding')} style={{ background: `linear-gradient(135deg, ${C.violet}, #6d28d9)`, border: 'none', color: 'white', padding: '8px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Get Started
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: C.text, cursor: 'pointer', fontSize: 22, display: 'none' }}>
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, margin: '0 24px 16px', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[['how-it-works', 'How It Works'], ['problems', 'Why Us'], ['comparison', 'Compare']].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{ background: 'none', border: 'none', color: C.text, fontSize: 15, cursor: 'pointer', textAlign: 'left', padding: '6px 0' }}>
                {label}
              </button>
            ))}
            <button onClick={() => navigate('/onboarding')} style={{ background: `linear-gradient(135deg, ${C.violet}, #6d28d9)`, border: 'none', color: 'white', padding: 10, borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '100px 24px 60px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', width: '100%' }}>
          <div className="fade-in-up">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 20, padding: '6px 14px', marginBottom: 24, fontSize: 13, color: '#a855f7' }}>
              🚀 AI-powered career readiness platform
            </div>
            <h1 style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1, marginBottom: 24, letterSpacing: '-1px' }}>
              Stop Applying.{' '}
              <span style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Start Proving.
              </span>
            </h1>
            <p style={{ fontSize: 18, color: C.textSec, lineHeight: 1.7, marginBottom: 36, maxWidth: 520 }}>
              Turn any job description into a personalised skill roadmap, real-world projects, and proof of what you can actually do.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button className="cta-btn" onClick={() => navigate('/onboarding')} style={{ background: `linear-gradient(135deg, ${C.violet}, #6d28d9)`, border: 'none', color: 'white', padding: '14px 28px', borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 24px rgba(124,58,237,0.4)', transition: 'all 0.2s' }}>
                Build My Career Path →
              </button>
              <button className="cta-btn" onClick={handleExploreDemo} style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.border}`, color: C.text, padding: '14px 28px', borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
                Explore Demo
              </button>
            </div>
            <p style={{ marginTop: 16, color: C.textSec, fontSize: 13 }}>No sign-up required for demo · 100% free to try</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="hero-card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 28, maxWidth: 360, width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 11, color: C.textSec, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Analysing</div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Backend Engineering Intern</div>
                  <div style={{ fontSize: 13, color: C.textSec }}>Nexora Labs · San Francisco</div>
                </div>
                <div style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 50, width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexShrink: 0 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#a855f7' }}>60%</div>
                  <div style={{ fontSize: 10, color: C.textSec }}>match</div>
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: C.textSec, marginBottom: 8 }}>Skill match progress</div>
                <div style={{ background: C.border, borderRadius: 4, height: 6, overflow: 'hidden' }}>
                  <div style={{ width: '60%', height: '100%', background: `linear-gradient(90deg, ${C.violet}, ${C.blue})`, borderRadius: 4 }} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: C.textSec, marginBottom: 8 }}>Missing skills</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['Redis', 'Docker'].map(s => (
                    <span key={s} style={{ background: 'rgba(245,158,11,0.15)', color: C.orange, border: '1px solid rgba(245,158,11,0.3)', borderRadius: 6, padding: '3px 10px', fontSize: 12 }}>{s}</span>
                  ))}
                </div>
              </div>
              <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 11, color: C.blue, fontWeight: 600, marginBottom: 4 }}>💡 Suggested Project</div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Distributed Job Queue System</div>
                <div style={{ fontSize: 12, color: C.textSec }}>Python · Redis · Docker · FastAPI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section id="problems" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ color: C.textSec, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>The Problem</div>
            <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 16 }}>Why job seekers stay stuck</h2>
            <p style={{ color: C.textSec, fontSize: 17, maxWidth: 500, margin: '0 auto' }}>The traditional approach is broken. Here's what's really holding you back.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {PROBLEMS.map((p, i) => (
              <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32 }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{p.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{p.title}</h3>
                <p style={{ color: C.textSec, lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: '80px 24px', background: 'rgba(124,58,237,0.03)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ color: C.textSec, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>The Solution</div>
          <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 16 }}>Your 7-step career proof engine</h2>
          <p style={{ color: C.textSec, fontSize: 17, marginBottom: 48 }}>From job description to hired — every step powered by real evidence.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {WORKFLOW.map((step, i) => (
              <React.Fragment key={step}>
                <div className="pill-hover" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 24, padding: '12px 24px', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, borderRadius: '50%', width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'white', fontWeight: 700 }}>{i + 1}</span>
                  {step}
                </div>
                {i < WORKFLOW.length - 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', color: C.textSec, fontSize: 18 }}>→</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section id="comparison" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 16 }}>How we compare</h2>
            <p style={{ color: C.textSec, fontSize: 17 }}>See the difference between the old way and the proof-first approach.</p>
          </div>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: C.surface2, padding: '16px 24px', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ color: C.textSec, fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Feature</div>
              <div style={{ textAlign: 'center', color: C.textSec, fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Traditional Platforms</div>
              <div style={{ textAlign: 'center', color: '#a855f7', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>⚡ Unemployed Misfits</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '14px 24px', borderBottom: i < COMPARISON.length - 1 ? `1px solid ${C.border}` : 'none', alignItems: 'center' }}>
                <div style={{ fontSize: 14 }}>{row.label}</div>
                <div style={{ textAlign: 'center', fontSize: 18, color: row.traditional ? C.green : '#ef4444' }}>{row.traditional ? '✓' : '✗'}</div>
                <div style={{ textAlign: 'center', fontSize: 18, color: row.us ? C.green : '#ef4444' }}>{row.us ? '✓' : '✗'}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.15, marginBottom: 20 }}>
            Your next opportunity starts with what you can{' '}
            <span style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>prove.</span>
          </h2>
          <p style={{ color: C.textSec, fontSize: 17, marginBottom: 36 }}>Join thousands building real skills and landing real jobs.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="cta-btn" onClick={() => navigate('/onboarding')} style={{ background: `linear-gradient(135deg, ${C.violet}, #6d28d9)`, border: 'none', color: 'white', padding: '16px 32px', borderRadius: 12, fontSize: 17, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 32px rgba(124,58,237,0.4)', transition: 'all 0.2s' }}>
              Build My Career Path →
            </button>
            <button className="cta-btn" onClick={handleExploreDemo} style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.border}`, color: C.text, padding: '16px 32px', borderRadius: 12, fontSize: 17, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
              Try the Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12, fontSize: 16, fontWeight: 700 }}>
          <span style={{ color: C.violet }}>⚡</span> Unemployed Misfits
        </div>
        <p style={{ color: C.textSec, fontSize: 13 }}>© 2025 Unemployed Misfits · Turn skills into proof.</p>
      </footer>
    </div>
  );
}
