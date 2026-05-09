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

// Context passed when opening a sheet so it knows which entity to act on.
// Optional fields let callers be lazy when the sheet's default is enough.
export interface SheetContext {
  vaultCode?: string
  vaultSub?: string
  crop?: string
  apyLabel?: string
  daysLeftLabel?: string
  pct?: number
  loc?: string
  positionCode?: string
  positionInvestedIdr?: number
  listingCode?: string
  claimableCode?: string
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
  sheetContext: SheetContext | null
  toast: string | null
  result: ResultPayload | null
  user: StoredUser | null
  isLoadingProfile: boolean
  setScreen: (screen: Screen, tab?: string) => void
  openSheet: (sheet: Sheet, context?: SheetContext) => void
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
  sheetContext: null,
  toast: null,
  result: null,
  user: null,
  isLoadingProfile: false,
  setScreen: (screen, tab) =>
    set({
      screen,
      navTab: tab ?? screen,
    }),
  openSheet: (sheet, context) => set({ sheet, sheetContext: context ?? null }),
  closeSheet: () => set({ sheet: null, sheetContext: null }),
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
