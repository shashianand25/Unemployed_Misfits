import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  style?: React.CSSProperties;
}

export default function Card({ children, className, glow, style }: CardProps) {
  return (
    <div
      className={className}
      style={{
        background: '#12121a',
        border: '1px solid #2a2a3e',
        borderRadius: 12,
        padding: 24,
        boxShadow: glow ? '0 0 24px #7c3aed33' : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

