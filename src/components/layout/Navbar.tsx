import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAppDispatch } from '../../store/useAppStore';
import { DEMO_USER, DEMO_ANALYSIS } from '../../data/demoData';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleExploreDemo() {
    dispatch({ type: 'SET_USER', payload: DEMO_USER });
    dispatch({ type: 'SET_JOB_ANALYSIS', payload: DEMO_ANALYSIS });
    dispatch({ type: 'SET_DEMO_MODE', payload: true });
    navigate('/dashboard');
  }

  function handleSignIn() {
    navigate('/onboarding');
  }

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
  ];

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .um-nav-link {
          color: #8888aa;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
          padding: 4px 2px;
        }
        .um-nav-link:hover { color: #f0f0ff; }
      `}</style>

      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled
            ? 'rgba(10, 10, 15, 0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(42, 42, 62, 0.6)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <span style={{ fontSize: '20px', color: '#7c3aed' }}>⚡</span>
          <span
            style={{
              fontWeight: 800,
              fontSize: '17px',
              color: '#f0f0ff',
              letterSpacing: '-0.02em',
            }}
          >
            Unemployed Misfits
          </span>
        </a>

        {/* Desktop nav */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
          }}
          className="um-desktop-nav"
        >
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="um-nav-link">
              {l.label}
            </a>
          ))}

          <button
            onClick={handleSignIn}
            style={{
              background: 'transparent',
              color: '#f0f0ff',
              border: '1px solid rgba(42,42,62,0.8)',
              padding: '7px 18px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.borderColor = '#7c3aed')}
            onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.borderColor = 'rgba(42,42,62,0.8)')}
          >
            Sign In
          </button>

          <button
            onClick={handleExploreDemo}
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              color: '#fff',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(124,58,237,0.4)',
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 28px rgba(124,58,237,0.6)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(124,58,237,0.4)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            Get Started
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          style={{
            display: 'none',
            background: 'none',
            border: '1px solid #2a2a3e',
            borderRadius: '8px',
            padding: '6px 8px',
            color: '#f0f0ff',
            cursor: 'pointer',
          }}
          className="um-hamburger"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            background: 'rgba(10, 10, 15, 0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid #2a2a3e',
            padding: '16px 24px',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            animation: 'slideDown 0.2s ease',
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="um-nav-link"
              onClick={() => setMobileOpen(false)}
              style={{ fontSize: '16px', display: 'block', padding: '6px 0' }}
            >
              {l.label}
            </a>
          ))}
          <div style={{ height: '1px', background: '#2a2a3e', margin: '4px 0' }} />
          <button
            onClick={() => { setMobileOpen(false); handleSignIn(); }}
            style={{
              background: 'transparent',
              color: '#f0f0ff',
              border: '1px solid #2a2a3e',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMobileOpen(false); handleExploreDemo(); }}
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              color: '#fff',
              border: 'none',
              padding: '11px 20px',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Get Started
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .um-desktop-nav { display: none !important; }
          .um-hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}

export default Navbar;
