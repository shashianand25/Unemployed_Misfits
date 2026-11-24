import React, { useState } from 'react';
import { useAppStore, useAppDispatch } from '../store/useAppStore';
import { DEMO_INTERVIEW_QUESTIONS } from '../data/demoData';

const COLORS = {
  bg: '#0a0a0f',
  surface: '#12121a',
  surface2: '#1a1a2e',
  border: '#2a2a3e',
  text: '#f0f0ff',
  textSec: '#8888aa',
  violet: '#7c3aed',
  blue: '#3b82f6',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
};

export default function InterviewPrepPage() {
  const { practicedQuestions } = useAppStore();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<'technical' | 'project-based'>('technical');
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());

  const totalPracticed = practicedQuestions.length;
  const filteredQuestions = DEMO_INTERVIEW_QUESTIONS.filter((q) => q.type === activeTab);

  function toggleReveal(id: string) {
    setRevealedAnswers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div style={{ minHeight: '100vh', background: COLORS.bg, padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        {/* Header */}
        <h1 style={{ color: COLORS.text, fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>
          Interview Preparation
        </h1>
        <p style={{ color: COLORS.textSec, marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Backend Engineering Intern — Prepare with confidence.
        </p>

        {/* Progress bar */}
        <div
          style={{
            background: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 10,
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: COLORS.text, fontWeight: 600, fontSize: '0.9rem' }}>Practice Progress</span>
            <span style={{ color: COLORS.textSec, fontSize: '0.85rem' }}>
              {totalPracticed} of 10 questions practised
            </span>
          </div>
          <div style={{ background: COLORS.surface2, borderRadius: 8, height: 10, overflow: 'hidden' }}>
            <div
              style={{
                width: `${(totalPracticed / 10) * 100}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${COLORS.violet}, ${COLORS.green})`,
                borderRadius: 8,
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {(['technical', 'project-based'] as const).map((tab) => {
            const isActive = activeTab === tab;
            const count = DEMO_INTERVIEW_QUESTIONS.filter((q) => q.type === tab).length;
            const practisedInTab = DEMO_INTERVIEW_QUESTIONS.filter(
              (q) => q.type === tab && practicedQuestions.includes(q.id)
            ).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: isActive ? COLORS.violet : COLORS.surface,
                  border: `1px solid ${isActive ? COLORS.violet : COLORS.border}`,
                  borderRadius: 8,
                  padding: '0.55rem 1.25rem',
                  color: isActive ? '#fff' : COLORS.textSec,
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                {tab === 'technical' ? 'Technical Questions' : 'Project-Based Questions'}
                <span
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.2)' : COLORS.surface2,
                    borderRadius: 20,
                    padding: '0.1rem 0.5rem',
                    fontSize: '0.72rem',
                  }}
                >
                  {practisedInTab}/{count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Question cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          {filteredQuestions.map((q, idx) => {
            const isPracticed = practicedQuestions.includes(q.id);
            const isRevealed = revealedAnswers.has(q.id);
            const globalIdx = DEMO_INTERVIEW_QUESTIONS.findIndex((x) => x.id === q.id) + 1;

            return (
              <div
                key={q.id}
                style={{
                  background: COLORS.surface,
                  border: `1px solid ${isPracticed ? COLORS.green + '55' : COLORS.border}`,
                  borderRadius: 12,
                  padding: '1.25rem 1.5rem',
                  transition: 'border-color 0.3s',
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
                  {/* Number */}
                  <span
                    style={{
                      flexShrink: 0,
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: isPracticed ? COLORS.green : COLORS.surface2,
                      color: isPracticed ? '#fff' : COLORS.textSec,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                    }}
                  >
                    {isPracticed ? '✓' : globalIdx}
                  </span>

                  {/* Question text */}
                  <p style={{ color: COLORS.text, fontWeight: 600, fontSize: '0.925rem', lineHeight: 1.5, margin: 0, flex: 1 }}>
                    {q.question}
                  </p>

                  {/* Practiced badge */}
                  {isPracticed && (
                    <span
                      style={{
                        flexShrink: 0,
                        background: `${COLORS.green}22`,
                        color: COLORS.green,
                        border: `1px solid ${COLORS.green}44`,
                        borderRadius: 20,
                        padding: '0.15rem 0.6rem',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                      }}
                    >
                      ✓ Practised
                    </span>
                  )}
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => toggleReveal(q.id)}
                    style={{
                      background: isRevealed ? COLORS.surface2 : `${COLORS.blue}22`,
                      color: isRevealed ? COLORS.textSec : COLORS.blue,
                      border: `1px solid ${isRevealed ? COLORS.border : COLORS.blue + '55'}`,
                      borderRadius: 8,
                      padding: '0.4rem 0.9rem',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {isRevealed ? 'Hide Answer' : 'Show Answer'}
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'TOGGLE_QUESTION_PRACTICED', payload: q.id })}
                    style={{
                      background: isPracticed ? `${COLORS.green}22` : COLORS.surface2,
                      color: isPracticed ? COLORS.green : COLORS.textSec,
                      border: `1px solid ${isPracticed ? COLORS.green + '44' : COLORS.border}`,
                      borderRadius: 8,
                      padding: '0.4rem 0.9rem',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {isPracticed ? '✓ Practised' : 'Mark as Practised'}
                  </button>
                </div>

                {/* Revealed answer */}
                {isRevealed && (
                  <div
                    style={{
                      marginTop: '1rem',
                      background: COLORS.surface2,
                      borderLeft: `4px solid ${COLORS.violet}`,
                      borderRadius: '0 8px 8px 0',
                      padding: '0.9rem 1.1rem',
                      color: COLORS.text,
                      fontSize: '0.875rem',
                      lineHeight: 1.7,
                    }}
                  >
                    {q.suggestedAnswer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
