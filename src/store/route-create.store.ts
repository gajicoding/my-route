import { create } from 'zustand';

import type { RouteStep, RouteStepType } from '@/features/routes/types';

import { createPlaceholderStep } from '@/features/routes/utils/create-placeholder-step';

export interface RouteCreateFormState {
  name: string;
  groupId: string | null;
  steps: RouteStep[];
  setName: (name: string) => void;
  setGroupId: (groupId: string) => void;
  addStep: (type: RouteStepType) => void;
  removeStep: (stepId: string) => void;
  moveStepUp: (stepId: string) => void;
  moveStepDown: (stepId: string) => void;
  resetForm: () => void;
}

const initialState = {
  name: '',
  groupId: null as string | null,
  steps: [] as RouteStep[],
};

function reorderSteps(steps: RouteStep[], fromIndex: number, toIndex: number): RouteStep[] {
  if (fromIndex < 0 || toIndex < 0 || fromIndex >= steps.length || toIndex >= steps.length) {
    return steps;
  }

  const nextSteps = [...steps];
  const [movedStep] = nextSteps.splice(fromIndex, 1);
  nextSteps.splice(toIndex, 0, movedStep);
  return nextSteps;
}

export const useRouteCreateStore = create<RouteCreateFormState>((set) => ({
  ...initialState,
  setName: (name) => set({ name }),
  setGroupId: (groupId) => set({ groupId }),
  addStep: (type) =>
    set((state) => ({
      steps: [...state.steps, createPlaceholderStep(type, state.steps.length)],
    })),
  removeStep: (stepId) =>
    set((state) => ({
      steps: state.steps.filter((step) => step.id !== stepId),
    })),
  moveStepUp: (stepId) =>
    set((state) => {
      const index = state.steps.findIndex((step) => step.id === stepId);
      return { steps: reorderSteps(state.steps, index, index - 1) };
    }),
  moveStepDown: (stepId) =>
    set((state) => {
      const index = state.steps.findIndex((step) => step.id === stepId);
      return { steps: reorderSteps(state.steps, index, index + 1) };
    }),
  resetForm: () => set({ ...initialState }),
}));
