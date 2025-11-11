import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '@/types';
import { STORAGE_KEYS } from '@/constants';

interface AuthStore extends AuthState {
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
      setAuth: (user: User, token: string) => {
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: STORAGE_KEYS.AUTH_STORAGE,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
          if (state.token) {
            state.isAuthenticated = true;
          } else {
            state.isAuthenticated = false;
          }
        }
      },
    }
  )
);
