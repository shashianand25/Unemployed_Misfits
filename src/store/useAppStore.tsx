import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { AppState, UserProfile, ApplicationStatus, JobAnalysis } from '../types';

type Action =
  | { type: 'SET_USER'; payload: UserProfile }
  | { type: 'SET_DEMO_MODE'; payload: boolean }
  | { type: 'TOGGLE_MILESTONE'; payload: string }
  | { type: 'SET_APPLICATION_STATUS'; payload: { id: string; status: ApplicationStatus } }
  | { type: 'TOGGLE_QUESTION_PRACTICED'; payload: string }
  | { type: 'SET_GITHUB_URL'; payload: { projectId: string; url: string } }
  | { type: 'SET_JOB_ANALYSIS'; payload: JobAnalysis }
  | { type: 'SET_ANALYSING'; payload: boolean }
  | { type: 'RESET_DEMO' };

const initialState: AppState = {
  user: null,
  isDemoMode: false,
  completedMilestones: [],
  applicationStatuses: {},
  practicedQuestions: [],
  projectGithubUrls: {},
  jobAnalysis: null,
  isAnalysing: false,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_DEMO_MODE':
      return { ...state, isDemoMode: action.payload };
    case 'TOGGLE_MILESTONE': {
      const id = action.payload;
      const already = state.completedMilestones.includes(id);
      return {
        ...state,
        completedMilestones: already
          ? state.completedMilestones.filter((m) => m !== id)
          : [...state.completedMilestones, id],
      };
    }
    case 'SET_APPLICATION_STATUS':
      return {
        ...state,
        applicationStatuses: {
          ...state.applicationStatuses,
          [action.payload.id]: action.payload.status,
        },
      };
    case 'TOGGLE_QUESTION_PRACTICED': {
      const id = action.payload;
      const already = state.practicedQuestions.includes(id);
      return {
        ...state,
        practicedQuestions: already
          ? state.practicedQuestions.filter((q) => q !== id)
          : [...state.practicedQuestions, id],
      };
    }
    case 'SET_GITHUB_URL':
      return {
        ...state,
        projectGithubUrls: {
          ...state.projectGithubUrls,
          [action.payload.projectId]: action.payload.url,
        },
      };
    case 'SET_JOB_ANALYSIS':
      return { ...state, jobAnalysis: action.payload };
    case 'SET_ANALYSING':
      return { ...state, isAnalysing: action.payload };
    case 'RESET_DEMO':
      return { ...initialState };
    default:
      return state;
  }
}

const STORAGE_KEY = 'unemployed-misfits-state';

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    return { ...initialState, ...JSON.parse(raw) };
  } catch {
    return initialState;
  }
}

function saveState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

const StateContext = createContext<AppState>(initialState);
const DispatchContext = createContext<React.Dispatch<Action>>(() => undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useAppStore(): AppState {
  return useContext(StateContext);
}

export function useAppDispatch(): React.Dispatch<Action> {
  return useContext(DispatchContext);
}
