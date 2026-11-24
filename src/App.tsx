import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store/useAppStore';
import AppLayout from './components/layout/AppLayout';

import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import AnalyseJobPage from './pages/AnalyseJobPage';
import SkillGapPage from './pages/SkillGapPage';
import ProjectRoadmapPage from './pages/ProjectRoadmapPage';
import ProjectWorkspacePage from './pages/ProjectWorkspacePage';
import PortfolioPage from './pages/PortfolioPage';
import ApplicationsPage from './pages/ApplicationsPage';
import InterviewPrepPage from './pages/InterviewPrepPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="analyse" element={<AnalyseJobPage />} />
            <Route path="skill-gap" element={<SkillGapPage />} />
            <Route path="roadmap" element={<ProjectRoadmapPage />} />
            <Route path="workspace" element={<ProjectWorkspacePage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="applications" element={<ApplicationsPage />} />
            <Route path="interview" element={<InterviewPrepPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
