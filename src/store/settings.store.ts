import { create } from 'zustand';

export interface SettingsUiState {
  isHydrated: boolean;
  setHydrated: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsUiState>((set) => ({
  isHydrated: false,
  setHydrated: (value) => set({ isHydrated: value }),
}));
