
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, 
      isLoading: true,
      setUser: (userData, token) => set({ user: userData, token }),
      clearUser: () => set({ user: null }),
      setIsLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "auth-storage", // Key in localStorage
      getStorage: () => localStorage, // Use localStorage
    }
  )
);
