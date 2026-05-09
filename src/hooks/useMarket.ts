import { useDemoStore } from '@/store/demo-store'

export function useMarketListings() {
  return useDemoStore((s) => s.listings)
}
