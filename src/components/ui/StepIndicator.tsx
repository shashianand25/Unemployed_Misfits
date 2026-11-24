import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: '2rem' }}>
      {steps.map((label, i) => {
        const done = i < currentStep;
        const active = i === currentStep;
        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  background: done ? '#10b981' : active ? '#7c3aed' : '#1a1a2e',
                  border: `2px solid ${done ? '#10b981' : active ? '#7c3aed' : '#2a2a3e'}`,
                  color: done || active ? '#fff' : '#8888aa',
                  transition: 'all 0.2s',
                }}
              >
                {done ? <Check size={14} /> : i + 1}
              </div>
              <span style={{ fontSize: '0.65rem', color: active ? '#f0f0ff' : '#8888aa', textAlign: 'center', maxWidth: 60 }}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: i < currentStep ? '#10b981' : '#2a2a3e', margin: '0 4px', marginBottom: 20, transition: 'background 0.2s' }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

