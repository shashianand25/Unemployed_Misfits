import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const STYLES: Record<string, React.CSSProperties> = {
  primary: { background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', color: '#fff', border: 'none' },
  secondary: { background: '#12121a', color: '#f0f0ff', border: '1px solid #2a2a3e' },
  ghost: { background: 'transparent', color: '#8888aa', border: '1px solid transparent' },
  danger: { background: '#dc2626', color: '#fff', border: 'none' },
};

const SIZE_STYLES: Record<string, React.CSSProperties> = {
  sm: { padding: '0.3rem 0.75rem', fontSize: '0.8rem' },
  md: { padding: '0.55rem 1.25rem', fontSize: '0.875rem' },
  lg: { padding: '0.75rem 1.75rem', fontSize: '1rem' },
};

export default function Button({ variant = 'primary', size = 'md', children, onClick, disabled, className, type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        ...STYLES[variant],
        ...SIZE_STYLES[size],
        borderRadius: 8,
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.15s',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        lineHeight: 1,
      }}
    >
      {children}
    </button>
  );
}

