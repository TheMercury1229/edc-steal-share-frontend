// store.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("playerId"), // Check localStorage on initialization
  login: () => set({ isAuthenticated: true }),
  logout: () => {
    localStorage.removeItem("playerId"); // Remove playerId on logout
    set({ isAuthenticated: false });
  },
}));

export { useAuthStore };
