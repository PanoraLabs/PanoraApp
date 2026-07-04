import { API_URL } from './env'

// Shape returned by core-services /app/vaults (the domain projection). The local
// ExploreVault (data/vaults.ts) adds presentation-only fields (statusClass) that
// the hook derives — those don't belong in the canonical API.
export interface ApiExploreVault {
  crop: string
  type: string
  name: string
  loc: string
  status: string
  target: string
  apy: string
  duration: string
  funded: number
  highlight?: boolean
  full?: boolean
}

// The Privy access-token getter, wired once from useUser (mirrors setSupabaseTokenGetter).
let getToken: () => Promise<string | null> = async () => null
export function setApiTokenGetter(fn: () => Promise<string | null>) {
  getToken = fn
}

async function req<T>(path: string): Promise<T> {
  const token = await getToken()
  const res = await fetch(`${API_URL}${path}`, {
    headers: token ? { authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`)
  return res.json() as Promise<T>
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const token = await getToken()
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`POST ${path} → ${res.status}`)
  return res.json() as Promise<T>
}

export function getExploreVaults(): Promise<ApiExploreVault[]> {
  return req<ApiExploreVault[]>('/app/vaults')
}

export function getVault(id: string): Promise<ApiExploreVault> {
  return req<ApiExploreVault>(`/app/vaults/${id}`)
}

// ── Positions / wallet (positions slice) ───────────────────────────────────

export interface ApiPosition {
  crop: string
  code: string
  sub: string
  val: string
  profit: string
  pct: number
  profitColor: string
  gold?: boolean
}
export interface ApiActiveVault {
  crop: string
  status: string
  type: string
  name: string
  loc: string
  staked: string
  apy: string
  daysLeft: string
  pct: number
  gold?: boolean
}
export interface ApiClaimable { code: string; settledOn: string; amount: string }
export interface ApiHomeStat { val: string; label: string; sub: string }
export interface ApiAllocation { color: string; label: string }

export interface ApiPortfolio {
  stats: ApiHomeStat[]
  positions: ApiPosition[]
  allocations: ApiAllocation[]
}
export interface ApiWallet {
  address: string
  balances: { cash: string; cashLabel: string; fees: string }
  participationTokens: unknown[]
  claimables: ApiClaimable[]
  cashUsd: number
  feesSol: number
}

export function getPortfolio(): Promise<ApiPortfolio> {
  return req<ApiPortfolio>('/app/portfolio')
}
export function getActiveVaults(): Promise<ApiActiveVault[]> {
  return req<ApiActiveVault[]>('/app/vaults/active')
}
export function getWallet(): Promise<ApiWallet> {
  return req<ApiWallet>('/app/wallet')
}
export function invest(vaultCode: string, amountUsd: number): Promise<{ ok: boolean }> {
  return post('/app/invest', { vaultCode, amountUsd })
}
export function claim(claimableCode: string): Promise<{ ok: boolean; result?: { amountUsd: number; code: string } }> {
  return post('/app/claim', { claimableCode })
}
export function addCash(amountUsd: number): Promise<{ ok: boolean }> {
  return post('/app/wallet/cash', { amountUsd })
}
export function withdraw(amountUsd: number): Promise<{ ok: boolean }> {
  return post('/app/wallet/withdraw', { amountUsd })
}
