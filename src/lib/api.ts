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

export function getExploreVaults(): Promise<ApiExploreVault[]> {
  return req<ApiExploreVault[]>('/app/vaults')
}

export function getVault(id: string): Promise<ApiExploreVault> {
  return req<ApiExploreVault>(`/app/vaults/${id}`)
}
