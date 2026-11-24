import React from 'react';
import Badge from './Badge';
import type { SkillStatus } from '../../types';

interface SkillBadgeProps {
  name: string;
  status: SkillStatus;
}

const DOT_COLORS: Record<SkillStatus, string> = {
  matched: '#10b981',
  missing: '#f59e0b',
  recommended: '#3b82f6',
};

export default function SkillBadge({ name, status }: SkillBadgeProps) {
  return (
    <Badge variant={status} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: DOT_COLORS[status], flexShrink: 0 }} />
      {name}
    </Badge>
  );
}

