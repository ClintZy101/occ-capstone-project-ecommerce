// import { create } from "zustand";

// export const useAuthStore = create((set) => ({
//   user: null,
//   loading: true,

//   setUser: (user) => set({ user }),
//   setLoading: (loading) => set({ loading }),
// }));

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // User state
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // Key in localStorage
      getStorage: () => localStorage, // Use localStorage
    }
  )
);
