function required(key: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing required env var: ${key}. Copy .env.example to .env.local and fill it in.`
    )
  }
  return value
}

export const PRIVY_APP_ID = required('VITE_PRIVY_APP_ID', import.meta.env.VITE_PRIVY_APP_ID)
export const API_URL = required('VITE_API_URL', import.meta.env.VITE_API_URL)
