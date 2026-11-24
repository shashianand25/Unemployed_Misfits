import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { DEMO_ANALYSIS } from '../data/demoData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const C = {
  bg: '#0a0a0f', surface: '#12121a', surface2: '#1a1a2e', border: '#2a2a3e',
  text: '#f0f0ff', textSec: '#8888aa', violet: '#7c3aed', blue: '#3b82f6',
  green: '#10b981', orange: '#f59e0b',
};

const CHART_DATA = [
  { skill: 'Python', required: 5, yours: 4 },
  { skill: 'PostgreSQL', required: 4, yours: 3 },
  { skill: 'REST APIs', required: 4, yours: 4 },
  { skill: 'Redis', required: 4, yours: 1 },
  { skill: 'Docker', required: 4, yours: 1 },
];

function ScoreArc({ score }: { score: number }) {
  const radius = 80;
  const cx = 110;
  const cy = 110;
  const startAngle = 200;
  const endAngle = 340;
  const totalDeg = endAngle - startAngle + 360; // 300 deg arc (200 → 360 → 340 wraps), actually 300 degrees
  const sweepDeg = 300; // 300 degree arc
  const filled = (score / 100) * sweepDeg;

  const toXY = (angleDeg: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };

  const arcPath = (startDeg: number, endDeg: number) => {
    const start = toXY(startDeg);
    const end = toXY(endDeg);
    const diff = endDeg - startDeg;
    const large = diff > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} 1 ${end.x} ${end.y}`;
  };

  // Track arc: 150deg to 390deg (wraps, so 150 → 90+300=390)
  const trackStart = 150;
  const trackEnd = 150 + sweepDeg; // 450 = effectively 90
  const fillEnd = trackStart + filled;

  const toXYAbs = (angleDeg: number) => {
    const norm = angleDeg % 360;
    const rad = ((norm - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };
  const arcPathAbs = (startDeg: number, endDeg: number) => {
    const start = toXYAbs(startDeg);
    const end = toXYAbs(endDeg % 360);
    const diff = endDeg - startDeg;
    const large = diff > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} 1 ${end.x} ${end.y}`;
  };

  return (
    <svg width={220} height={180} viewBox="0 0 220 180">
      {/* Background track */}
      <path d={arcPathAbs(trackStart, trackEnd)} fill="none" stroke={C.border} strokeWidth={12} strokeLinecap="round" />
      {/* Filled arc */}
      {filled > 0 && (
        <path d={arcPathAbs(trackStart, fillEnd)} fill="none" stroke={C.violet} strokeWidth={12} strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 8px rgba(124,58,237,0.6))' }} />
      )}
      {/* Score text */}
      <text x={cx} y={cy - 10} textAnchor="middle" fill={C.text} fontSize={40} fontWeight={800}>{score}%</text>
      <text x={cx} y={cy + 18} textAnchor="middle" fill={C.textSec} fontSize={13}>match score</text>
    </svg>
  );
}

export default function SkillGapPage() {
  const navigate = useNavigate();
  const { jobAnalysis } = useAppStore();
  const analysis = jobAnalysis || DEMO_ANALYSIS;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: C.text, marginBottom: 8 }}>Your Career Fit Analysis</h1>
        <p style={{ color: C.textSec, fontSize: 16 }}>Here's how your profile stacks up against {analysis.jobTitle}.</p>
      </div>

      {/* Score + disclaimer */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 32, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ScoreArc score={analysis.matchScore} />
          <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 8, padding: '8px 16px', fontSize: 12, color: '#a855f7', textAlign: 'center', maxWidth: 220, lineHeight: 1.5 }}>
            ⚠️ Illustrative demo score — not a validated hiring prediction.
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{analysis.jobTitle}</div>
          <div style={{ color: C.textSec, marginBottom: 20, lineHeight: 1.6 }}>
            You match <strong style={{ color: C.violet }}>{analysis.matchScore}%</strong> of the requirements. You have {analysis.matchedSkills.length} of the required skills and need to develop {analysis.missingSkills.length} more.
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ background: `${C.green}15`, borderRadius: 10, padding: '12px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: C.green }}>{analysis.matchedSkills.length}</div>
              <div style={{ fontSize: 12, color: C.textSec }}>Matched</div>
            </div>
            <div style={{ background: `${C.orange}15`, borderRadius: 10, padding: '12px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: C.orange }}>{analysis.missingSkills.length}</div>
              <div style={{ fontSize: 12, color: C.textSec }}>Missing</div>
            </div>
            <div style={{ background: `${C.blue}15`, borderRadius: 10, padding: '12px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: C.blue }}>{analysis.recommendedSkills.length}</div>
              <div style={{ fontSize: 12, color: C.textSec }}>Recommended</div>
            </div>
          </div>
        </div>
      </div>

      {/* Three skill columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 24 }}>
        {[
          { title: 'Matched Skills', items: analysis.matchedSkills, color: C.green, icon: '✅', variant: `${C.green}15` as string, borderColor: `${C.green}30` },
          { title: 'Missing Skills', items: analysis.missingSkills, color: C.orange, icon: '📚', variant: `${C.orange}15` as string, borderColor: `${C.orange}30` },
          { title: 'Recommended to Learn', items: analysis.recommendedSkills, color: C.blue, icon: '💡', variant: `${C.blue}15` as string, borderColor: `${C.blue}30` },
        ].map((col, i) => (
          <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: col.color, marginBottom: 16 }}>{col.icon} {col.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {col.items.map(skill => (
                <span key={skill} style={{ background: col.variant, color: col.color, border: `1px solid ${col.borderColor}`, borderRadius: 8, padding: '6px 14px', fontSize: 14, fontWeight: 500 }}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 28, marginBottom: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Required vs Your Skills</div>
        <div style={{ height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CHART_DATA} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="skill" tick={{ fill: C.textSec, fontSize: 12 }} axisLine={{ stroke: C.border }} />
              <YAxis domain={[0, 5]} tick={{ fill: C.textSec, fontSize: 12 }} axisLine={{ stroke: C.border }} />
              <Tooltip contentStyle={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text }} />
              <Legend wrapperStyle={{ color: C.textSec, fontSize: 12 }} />
              <Bar dataKey="required" name="Required" fill={C.orange} radius={[4, 4, 0, 0]} opacity={0.7} />
              <Bar dataKey="yours" name="Yours" fill={C.violet} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insight box */}
      <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: 14, padding: 24, marginBottom: 32 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.blue, marginBottom: 10 }}>🎯 Your biggest opportunity</div>
        <p style={{ color: C.text, lineHeight: 1.7, fontSize: 15 }}>
          You already have strong Python and database skills. By adding <strong>Redis</strong> and <strong>Docker</strong> through one focused project, 
          you can jump from 60% to 90%+ match — putting you in the top tier of candidates for backend engineering roles.
        </p>
      </div>

      <button onClick={() => navigate('/dashboard/roadmap')} style={{ background: `linear-gradient(135deg, ${C.violet}, #6d28d9)`, border: 'none', color: 'white', padding: '16px 32px', borderRadius: 12, fontSize: 17, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 24px rgba(124,58,237,0.4)' }}>
        Generate My Project Roadmap →
      </button>
    </div>
  );
}
