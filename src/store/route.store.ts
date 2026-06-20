import { create } from 'zustand';

export interface RouteExecutionState {
  activeRouteId: string | null;
  currentStepIndex: number;
  setActiveRoute: (routeId: string, stepIndex?: number) => void;
  clearActiveRoute: () => void;
}

export const useRouteStore = create<RouteExecutionState>((set) => ({
  activeRouteId: null,
  currentStepIndex: 0,
  setActiveRoute: (routeId, stepIndex = 0) =>
    set({ activeRouteId: routeId, currentStepIndex: stepIndex }),
  clearActiveRoute: () => set({ activeRouteId: null, currentStepIndex: 0 }),
}));
