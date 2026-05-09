import { create } from 'zustand'

export type Screen = 'home' | 'explore' | 'portfolio' | 'market' | 'activity' | 'wallet' | 'passport'
export type Sheet = 'stake' | 'claim' | 'vault-detail' | 'buy' | 'sell' | null

export type ResultKind = 'success' | 'error'
export interface ResultPayload {
  kind: ResultKind
  title: string
  message?: string
  primaryLabel?: string
}

export interface StoredUser {
  id: string
  privyId: string
  email: string | null
  name: string
  walletAddress: string
  avatarUrl: string | null
}

interface AppState {
  screen: Screen
  navTab: string
  sheet: Sheet
  toast: string | null
  result: ResultPayload | null
  user: StoredUser | null
  isLoadingProfile: boolean
  setScreen: (screen: Screen, tab?: string) => void
  openSheet: (sheet: Sheet) => void
  closeSheet: () => void
  showToast: (msg: string) => void
  hideToast: () => void
  showResult: (payload: ResultPayload) => void
  hideResult: () => void
  setUser: (user: StoredUser | null) => void
  setIsLoadingProfile: (loading: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  screen: 'home',
  navTab: 'home',
  sheet: null,
  toast: null,
  result: null,
  user: null,
  isLoadingProfile: false,
  setScreen: (screen, tab) =>
    set({
      screen,
      navTab: tab ?? screen,
    }),
  openSheet: (sheet) => set({ sheet }),
  closeSheet: () => set({ sheet: null }),
  showToast: (msg) => {
    set({ toast: msg })
    setTimeout(() => set({ toast: null }), 2800)
  },
  hideToast: () => set({ toast: null }),
  showResult: (payload) => set({ result: payload }),
  hideResult: () => set({ result: null }),
  setUser: (user) => set({ user }),
  setIsLoadingProfile: (isLoadingProfile) => set({ isLoadingProfile }),
}))
