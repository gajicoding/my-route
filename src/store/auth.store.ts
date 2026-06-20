import { create } from 'zustand';

export interface AuthState {
  isAuthenticated: boolean;
  uid: string | null;
  setAuthenticated: (uid: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  uid: null,
  setAuthenticated: (uid) => set({ isAuthenticated: true, uid }),
  clearAuth: () => set({ isAuthenticated: false, uid: null }),
}));
