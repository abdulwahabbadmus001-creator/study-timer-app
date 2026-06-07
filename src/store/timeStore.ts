import { create } from "zustand";

export interface Session {
  id: number;
  duration: number;
  completedAt: string;
}

interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  sessions: Session[];

  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  decrement: () => void;
  addSession: (session: Session) => void;
  setSessions: (sessions: Session[]) => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  timeLeft: 1500,
  isRunning: false,
  sessions: [],

  startTimer: () => set({ isRunning: true }),

  pauseTimer: () => set({ isRunning: false }),

  resetTimer: () =>
    set({
      timeLeft: 1500,
      isRunning: false,
    }),

  decrement: () =>
    set((state) => ({
      timeLeft: state.timeLeft - 1,
    })),

  addSession: (session) =>
    set((state) => ({
      sessions: [...state.sessions, session],
    })),

  setSessions: (sessions) =>
    set({ sessions }),
}));