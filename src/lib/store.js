import { create } from 'zustand';

export const useSearchStore = create((set) => ({
  searchQuery: '',
  aiSearchQuery: '',
  isAuthenticated: false,
  currentSearch: '',
  aiCurrentSearch: '',
  showAiButton: false,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setAiSearchQuery: (query) => set({ aiSearchQuery: query }),
  setCurrentSearch: (search) => set({ currentSearch: search }),
  setAiCurrentSearch: (search) => set({ aiCurrentSearch: search }),
  setShowAiButton: (show) => set({ showAiButton: show }),
  setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
}));