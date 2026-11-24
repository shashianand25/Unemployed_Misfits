import React from 'react';

interface LoadingSpinnerProps {
  label?: string;
  size?: number;
}

export default function LoadingSpinner({ label, size = 24 }: LoadingSpinnerProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{ animation: 'spin 0.8s linear infinite' }}
      >
        <circle cx="12" cy="12" r="10" stroke="#2a2a3e" strokeWidth="3" fill="none" />
        <path d="M12 2 A10 10 0 0 1 22 12" stroke="#7c3aed" strokeWidth="3" fill="none" strokeLinecap="round" />
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </svg>
      {label && <span style={{ color: '#8888aa', fontSize: '0.875rem' }}>{label}</span>}
    </div>
  );
}

