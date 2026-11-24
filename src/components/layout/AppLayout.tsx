import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useAppStore } from '../../store/useAppStore';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/analyse': 'Analyse Job',
  '/dashboard/skill-gap': 'My Skill Gaps',
  '/dashboard/roadmap': 'Project Roadmap',
  '/dashboard/workspace': 'My Projects',
  '/dashboard/portfolio': 'Portfolio',
  '/dashboard/applications': 'Applications',
  '/dashboard/interview': 'Interview Prep',
  '/dashboard/settings': 'Settings',
};

export function AppLayout() {
  const location = useLocation();
  const { isDemoMode } = useAppStore();
  const title = PAGE_TITLES[location.pathname] ?? 'Dashboard';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0f' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 39,
          }}
        />
      )}

      {/* Sidebar — always rendered; hidden via CSS on mobile unless open */}
      <div className={sidebarOpen ? 'sidebar-mobile-open' : ''}>
        <Sidebar
          mobileOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main content */}
      <main
        style={{
          marginLeft: 240,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
        className="um-main-content"
      >
        {/* Top bar */}
        <header
          style={{
            background: '#12121a',
            borderBottom: '1px solid #2a2a3e',
            padding: '0 24px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Mobile hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                display: 'none',
                background: 'none',
                border: '1px solid #2a2a3e',
                borderRadius: '8px',
                padding: '6px 8px',
                color: '#f0f0ff',
                cursor: 'pointer',
              }}
              className="um-mobile-hamburger"
            >
              <Menu size={18} />
            </button>

            <h1
              style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: 700,
                color: '#f0f0ff',
              }}
            >
              {title}
            </h1>
          </div>

          {isDemoMode && (
            <span
              style={{
                fontSize: '12px',
                background: 'rgba(124, 58, 237, 0.15)',
                color: '#a78bfa',
                padding: '4px 12px',
                borderRadius: '999px',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                fontWeight: 600,
              }}
            >
              🎯 Demo Mode
            </span>
          )}
        </header>

        {/* Page content */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          <Outlet />
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .um-main-content { margin-left: 0 !important; }
          .um-mobile-hamburger { display: flex !important; }
          .sidebar-mobile-open aside { left: 0 !important; }
        }
      `}</style>
    </div>
  );
}

export default AppLayout;
