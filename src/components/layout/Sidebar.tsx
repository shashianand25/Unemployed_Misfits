import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  Target,
  Map,
  FolderOpen,
  Award,
  Briefcase,
  MessageSquare,
  Settings,
  X,
} from 'lucide-react';
import { useAppStore, useAppDispatch } from '../../store/useAppStore';

const navItems = [
  { label: 'Overview', path: '/dashboard', icon: LayoutDashboard, end: true },
  { label: 'Analyse Job', path: '/dashboard/analyse', icon: Search },
  { label: 'My Skill Gaps', path: '/dashboard/skill-gap', icon: Target },
  { label: 'Project Roadmap', path: '/dashboard/roadmap', icon: Map },
  { label: 'My Projects', path: '/dashboard/workspace', icon: FolderOpen },
  { label: 'Portfolio', path: '/dashboard/portfolio', icon: Award },
  { label: 'Applications', path: '/dashboard/applications', icon: Briefcase },
  { label: 'Interview Prep', path: '/dashboard/interview', icon: MessageSquare },
  { label: 'Settings', path: '/dashboard/settings', icon: Settings },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const { user } = useAppStore();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleReset() {
    dispatch({ type: 'RESET_DEMO' });
    navigate('/');
  }

  return (
    <aside
      style={{
        width: 240,
        background: '#12121a',
        borderRight: '1px solid #2a2a3e',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: mobileOpen === false ? '-240px' : 0,
        zIndex: 40,
        transition: 'left 0.25s ease',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '20px 16px 16px',
          borderBottom: '1px solid #2a2a3e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontWeight: 800,
            fontSize: '16px',
            color: '#f0f0ff',
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ color: '#7c3aed' }}>⚡</span> Misfits
        </span>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#8888aa',
              cursor: 'pointer',
              padding: '4px',
              display: 'none',
            }}
            className="sidebar-close-btn"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* User section */}
      <div
        style={{
          padding: '16px',
          borderBottom: '1px solid #2a2a3e',
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '15px',
            color: '#fff',
            marginBottom: '10px',
            boxShadow: '0 0 12px rgba(124,58,237,0.4)',
          }}
        >
          {user ? getInitials(user.name) : '?'}
        </div>
        <div style={{ color: '#f0f0ff', fontWeight: 700, fontSize: '14px', marginBottom: '2px' }}>
          Welcome back, {user?.name?.split(' ')[0] ?? 'Misfit'}!
        </div>
        <div style={{ color: '#8888aa', fontSize: '12px', lineHeight: 1.4 }}>
          Let's turn skills into opportunities
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
        {navItems.map(({ label, path, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            onClick={onClose}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 12px',
              borderRadius: '8px',
              marginBottom: '2px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? '#fff' : '#8888aa',
              background: isActive ? '#7c3aed' : 'transparent',
              transition: 'all 0.15s',
            })}
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer - Reset Demo */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid #2a2a3e',
        }}
      >
        <button
          onClick={handleReset}
          style={{
            width: '100%',
            padding: '8px 12px',
            background: 'rgba(239, 68, 68, 0.12)',
            color: '#f87171',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.22)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.12)';
          }}
        >
          🔄 Reset Demo
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
