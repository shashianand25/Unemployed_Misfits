import React from 'react';

type Variant = 'matched' | 'missing' | 'recommended' | 'neutral' | 'violet' | 'blue';

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  style?: React.CSSProperties;
}

const VARIANT_STYLES: Record<Variant, React.CSSProperties> = {
  matched:     { background: '#10b98122', color: '#10b981', border: '1px solid #10b98144' },
  missing:     { background: '#f59e0b22', color: '#f59e0b', border: '1px solid #f59e0b44' },
  recommended: { background: '#3b82f622', color: '#3b82f6', border: '1px solid #3b82f644' },
  neutral:     { background: '#1a1a2e', color: '#8888aa', border: '1px solid #2a2a3e' },
  violet:      { background: '#7c3aed22', color: '#7c3aed', border: '1px solid #7c3aed44' },
  blue:        { background: '#3b82f622', color: '#3b82f6', border: '1px solid #3b82f644' },
};

export default function Badge({ children, variant = 'neutral', style }: BadgeProps) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: 999,
        fontSize: '0.75rem',
        fontWeight: 500,
        ...VARIANT_STYLES[variant],
        ...style,
      }}
    >
      {children}
    </span>
  );
}

