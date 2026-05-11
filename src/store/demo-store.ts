import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { activeVaults as seedActiveVaults, type ActiveVault } from '@/data/vaults'
import { positions as seedPositions, type Position } from '@/data/positions'
import {
  claimables as seedClaimables,
  participationTokens as seedTokens,
  type Claimable,
  type ParticipationToken,
} from '@/data/wallet'
import { marketListings as seedListings, type MarketListing } from '@/data/listings'
import {
  recentActivity as seedRecent,
  activityHistory as seedHistory,
  type ActivityGroup,
  type ActivityItem,
} from '@/data/activity'
import { formatUsd, formatUsdCompact, formatShortDate, formatMonthYear } from '@/lib/format'

const SEED_CASH_USD = 0
const SEED_FEES_SOL = 0
const MIN_STAKE_USD = 1

type DemoEntities = {
  cashUsd: number
  feesSol: number
  activeVaults: ActiveVault[]
  positions: Position[]
  claimables: Claimable[]
  participationTokens: ParticipationToken[]
  listings: MarketListing[]
  recentActivity: ActivityItem[]
  activityHistory: ActivityGroup[]
}

type StakeInput = {
  vaultCode: string
  vaultSub: string
  crop: Position['crop']
  amountUsd: number
  apyLabel: string
  daysLeftLabel: string
  pct: number
  loc: string
  status?: ActiveVault['status']
}

type ClaimResult = { amountUsd: number; code: string }
type SellInput = { positionCode: string; askPriceUsd: number }

interface DemoState extends DemoEntities {
  stake: (input: StakeInput) => { ok: true } | { ok: false; reason: string }
  claim: (claimableCode: string) => { ok: true; result: ClaimResult } | { ok: false; reason: string }
  buy: (listingCode: string) => { ok: true; totalCostUsd: number } | { ok: false; reason: string }
  sell: (input: SellInput) => { ok: true } | { ok: false; reason: string }
  reset: () => void
}

function seed(): DemoEntities {
  return {
    cashUsd: SEED_CASH_USD,
    feesSol: SEED_FEES_SOL,
    activeVaults: structuredClone(seedActiveVaults),
    positions: structuredClone(seedPositions),
    claimables: structuredClone(seedClaimables),
    participationTokens: structuredClone(seedTokens),
    listings: structuredClone(seedListings),
    recentActivity: structuredClone(seedRecent),
    activityHistory: structuredClone(seedHistory),
  }
}

function parseUsd(s: string): number {
  // "$10M" / "$1.8M" / "$10,000,000" → number
  const trimmed = s.replace(/^\$\s*/, '').replace(/[+−-]/g, '').trim()
  if (/M$/i.test(trimmed)) return Math.round(parseFloat(trimmed) * 1_000_000)
  if (/K$/i.test(trimmed)) return Math.round(parseFloat(trimmed) * 1_000)
  if (/B$/i.test(trimmed)) return Math.round(parseFloat(trimmed) * 1_000_000_000)
  return parseInt(trimmed.replace(/[^\d]/g, ''), 10) || 0
}

function logActivity(state: DemoEntities, item: ActivityItem): Pick<DemoEntities, 'recentActivity' | 'activityHistory'> {
  const recent = [item, ...state.recentActivity].slice(0, 6)
  const monthLabel = formatMonthYear()
  const history = [...state.activityHistory]
  const headIdx = history.findIndex((g) => g.month === monthLabel)
  if (headIdx === -1) {
    history.unshift({ month: monthLabel, items: [item] })
  } else {
    history[headIdx] = { ...history[headIdx], items: [item, ...history[headIdx].items] }
  }
  return { recentActivity: recent, activityHistory: history }
}

export const useDemoStore = create<DemoState>()(
  persist(
    (set, get) => ({
      ...seed(),

      stake: (input) => {
        const state = get()
        if (input.amountUsd < MIN_STAKE_USD) {
          return { ok: false, reason: `Minimum investment is ${formatUsd(MIN_STAKE_USD)}.` }
        }
        if (input.amountUsd > state.cashUsd) {
          return {
            ok: false,
            reason: `Insufficient cash. Available ${formatUsd(state.cashUsd)}, you tried ${formatUsd(input.amountUsd)}.`,
          }
        }

        const positions = [...state.positions]
        const existingPos = positions.findIndex((p) => p.code === input.vaultCode)
        if (existingPos >= 0) {
          const prev = positions[existingPos]
          const prevVal = parseUsd(prev.val)
          positions[existingPos] = { ...prev, val: formatUsdCompact(prevVal + input.amountUsd) }
        } else {
          positions.push({
            crop: input.crop,
            code: input.vaultCode,
            sub: input.vaultSub,
            val: formatUsdCompact(input.amountUsd),
            profit: input.daysLeftLabel,
            pct: input.pct,
            profitColor: 'text-gold',
            gold: input.pct < 50,
          })
        }

        const activeVaults = [...state.activeVaults]
        const existingVault = activeVaults.findIndex((v) => v.name === input.vaultCode)
        if (existingVault >= 0) {
          const prev = activeVaults[existingVault]
          const prevStaked = parseUsd(prev.staked)
          activeVaults[existingVault] = { ...prev, staked: formatUsdCompact(prevStaked + input.amountUsd) }
        } else {
          activeVaults.push({
            crop: input.crop,
            status: input.status ?? 'Early stage',
            type: input.vaultSub,
            name: input.vaultCode,
            loc: input.loc,
            staked: formatUsdCompact(input.amountUsd),
            apy: input.apyLabel,
            daysLeft: input.daysLeftLabel,
            pct: input.pct,
          })
        }

        const tokens = [...state.participationTokens]
        const existingToken = tokens.findIndex((t) => t.code === input.vaultCode)
        if (existingToken >= 0) {
          const prev = tokens[existingToken]
          const prevPrincipal = parseUsd(prev.principal)
          tokens[existingToken] = {
            ...prev,
            principal: `${formatUsdCompact(prevPrincipal + input.amountUsd)} invested`,
          }
        } else {
          tokens.push({
            crop: input.crop,
            code: input.vaultCode,
            principal: `${formatUsdCompact(input.amountUsd)} invested`,
          })
        }

        const activityItem: ActivityItem = {
          action: 'invest',
          name: 'New investment',
          sub: input.vaultCode,
          amt: `−${formatUsdCompact(input.amountUsd)}`,
          pos: false,
          date: formatShortDate(),
        }

        set({
          cashUsd: state.cashUsd - input.amountUsd,
          positions,
          activeVaults,
          participationTokens: tokens,
          ...logActivity(state, activityItem),
        })
        return { ok: true }
      },

      claim: (claimableCode) => {
        const state = get()
        const target = state.claimables.find((c) => c.code === claimableCode)
        if (!target) return { ok: false, reason: 'No matching claimable found.' }
        const amountUsd = parseUsd(target.amount)

        const claimables = state.claimables.filter((c) => c.code !== claimableCode)
        const activityItem: ActivityItem = {
          action: 'profit',
          name: 'Profit claimed',
          sub: `${target.code} · settled`,
          amt: `+${formatUsdCompact(amountUsd)}`,
          pos: true,
          date: formatShortDate(),
        }

        set({
          cashUsd: state.cashUsd + amountUsd,
          claimables,
          ...logActivity(state, activityItem),
        })
        return { ok: true, result: { amountUsd, code: target.code } }
      },

      buy: (listingCode) => {
        const state = get()
        const listing = state.listings.find((l) => l.code === listingCode)
        if (!listing) return { ok: false, reason: 'Listing not found.' }
        const price = parseUsd(listing.price)
        const fee = Math.round(price * 0.01)
        const total = price + fee
        if (total > state.cashUsd) {
          return {
            ok: false,
            reason: `Insufficient cash. Need ${formatUsd(total)}, have ${formatUsd(state.cashUsd)}.`,
          }
        }

        const positions = [...state.positions]
        const existing = positions.findIndex((p) => p.code === listing.code)
        if (existing >= 0) {
          const prev = positions[existing]
          const prevVal = parseUsd(prev.val)
          positions[existing] = { ...prev, val: formatUsdCompact(prevVal + price) }
        } else {
          positions.push({
            crop: listing.crop,
            code: listing.code,
            sub: listing.day,
            val: formatUsdCompact(price),
            profit: listing.chg,
            pct: 50,
            profitColor: listing.up ? 'text-sprout' : 'text-stone',
          })
        }

        const tokens = [...state.participationTokens]
        const tokenIdx = tokens.findIndex((t) => t.code === listing.code)
        if (tokenIdx >= 0) {
          const prev = tokens[tokenIdx]
          const prevPrincipal = parseUsd(prev.principal)
          tokens[tokenIdx] = {
            ...prev,
            principal: `${formatUsdCompact(prevPrincipal + price)} invested`,
          }
        } else {
          tokens.push({
            crop: listing.crop,
            code: listing.code,
            principal: `${formatUsdCompact(price)} invested`,
          })
        }

        const listings = state.listings.filter((l) => l.code !== listingCode)

        const activityItem: ActivityItem = {
          action: 'invest',
          name: 'Bought share',
          sub: listing.code,
          amt: `−${formatUsdCompact(total)}`,
          pos: false,
          date: formatShortDate(),
        }

        set({
          cashUsd: state.cashUsd - total,
          positions,
          participationTokens: tokens,
          listings,
          ...logActivity(state, activityItem),
        })
        return { ok: true, totalCostUsd: total }
      },

      sell: (input) => {
        const state = get()
        const position = state.positions.find((p) => p.code === input.positionCode)
        if (!position) return { ok: false, reason: 'Position not found.' }
        const investedUsd = parseUsd(position.val)
        if (input.askPriceUsd < investedUsd) {
          return {
            ok: false,
            reason: `Asking price ${formatUsd(input.askPriceUsd)} is below your original investment of ${formatUsd(investedUsd)}.`,
          }
        }

        const chgPct = investedUsd > 0 ? ((input.askPriceUsd - investedUsd) / investedUsd) * 100 : 0
        const listing: MarketListing = {
          crop: position.crop,
          code: position.code,
          day: position.sub,
          price: formatUsd(input.askPriceUsd),
          chg: `${chgPct >= 0 ? '+' : '−'}${Math.abs(chgPct).toFixed(1)}% vs entry`,
          up: chgPct >= 0,
        }

        const listings = [...state.listings]
        const existingListing = listings.findIndex((l) => l.code === position.code)
        if (existingListing >= 0) {
          listings[existingListing] = listing
        } else {
          listings.unshift(listing)
        }

        const activityItem: ActivityItem = {
          action: 'milestone',
          name: 'Listed for sale',
          sub: `${position.code} · ${formatUsdCompact(input.askPriceUsd)}`,
          amt: 'On marketplace',
          neutral: true,
          date: formatShortDate(),
        }

        set({
          listings,
          ...logActivity(state, activityItem),
        })
        return { ok: true }
      },

      reset: () => set(seed()),
    }),
    {
      name: 'panora-demo-v2',
      version: 2,
      // Only persist the entity state, not actions
      partialize: (s): DemoEntities => ({
        cashUsd: s.cashUsd,
        feesSol: s.feesSol,
        activeVaults: s.activeVaults,
        positions: s.positions,
        claimables: s.claimables,
        participationTokens: s.participationTokens,
        listings: s.listings,
        recentActivity: s.recentActivity,
        activityHistory: s.activityHistory,
      }),
    }
  )
)

// Allow ?reset in URL to wipe demo state on load. Runs once at module init.
if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('reset')) {
  useDemoStore.persist.clearStorage()
  // Strip the param so a refresh doesn't re-trigger reset (and user gets fresh seed).
  const url = new URL(window.location.href)
  url.searchParams.delete('reset')
  window.history.replaceState({}, '', url.toString())
  useDemoStore.setState(seed())
}
