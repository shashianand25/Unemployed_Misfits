import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  label?: string;
  showPercentage?: boolean;
}

export default function ProgressBar({ value, max = 100, color = '#7c3aed', label, showPercentage = false }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      {(label || showPercentage) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.8rem', color: '#8888aa' }}>
          {label && <span>{label}</span>}
          {showPercentage && <span>{pct}%</span>}
        </div>
      )}
      <div style={{ background: '#1a1a2e', borderRadius: 999, overflow: 'hidden', height: 8 }}>
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: color,
            borderRadius: 999,
            transition: 'width 0.6s ease',
          }}
        />
      </div>
    </div>
  );
}

