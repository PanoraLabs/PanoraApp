import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './env'

// Note: not forwarding the Privy JWT for now — Supabase can't verify it without
// the third-party auth integration set up. Anon key only. Re-add `accessToken`
// here once we wire JWKS verification (via Supabase third-party auth or an
// Edge Function proxy).
export function setSupabaseTokenGetter(_fn: () => Promise<string | null>) {
  // no-op for now; kept so callers don't need to change yet
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
})

export interface ProfileRow {
  id: string
  privy_id: string
  email: string | null
  name: string
  wallet_address: string
  avatar_url: string | null
  created_at: string
  updated_at: string
}

function withTimeout<T>(p: PromiseLike<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    Promise.resolve(p),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
    ),
  ])
}

export async function fetchProfile(privyId: string): Promise<ProfileRow | null> {
  const query = supabase.from('profiles').select('*').eq('privy_id', privyId).maybeSingle()
  const { data, error } = await withTimeout(query, 7000, 'fetchProfile')
  if (error) throw error
  return data as ProfileRow | null
}

export async function upsertProfile(input: {
  privyId: string
  email: string | null
  name: string
  walletAddress: string
  avatarUrl?: string | null
}): Promise<ProfileRow> {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(
      {
        privy_id: input.privyId,
        email: input.email,
        name: input.name,
        wallet_address: input.walletAddress,
        avatar_url: input.avatarUrl ?? null,
      },
      { onConflict: 'privy_id' }
    )
    .select()
    .single()
  if (error) throw error
  return data as ProfileRow
}

export async function updateProfileName(privyId: string, name: string): Promise<ProfileRow> {
  const { data, error } = await supabase
    .from('profiles')
    .update({ name })
    .eq('privy_id', privyId)
    .select()
    .single()
  if (error) throw error
  return data as ProfileRow
}
