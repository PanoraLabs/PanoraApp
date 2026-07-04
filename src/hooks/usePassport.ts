import { useEffect, useState } from 'react'
import type { PassportNFT } from '@/data/passport'
import { getPassport } from '@/lib/api'

// Passport NFTs now come from core-services. Starts empty, fills after fetch.
export function usePassportNFTs(): PassportNFT[] {
  const [nfts, setNfts] = useState<PassportNFT[]>([])
  useEffect(() => {
    let alive = true
    getPassport()
      .then((rows) => { if (alive) setNfts(rows) })
      .catch((err) => { console.warn('[usePassport] getPassport:', err); if (alive) setNfts([]) })
    return () => { alive = false }
  }, [])
  return nfts
}
