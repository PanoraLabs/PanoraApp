export interface PassportMeta {
  label: string
  value: string
}

export interface PassportNFT {
  bg: string
  id: string
  name: string
  meta: PassportMeta[]
}

// Passport NFTs come from core-services now (GET /app/passport).
export const passportNFTs: PassportNFT[] = []
