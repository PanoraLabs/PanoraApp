import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PassportNFT } from '@/data/passport'

interface PassportCardProps {
  nft: PassportNFT
  onClick?: () => void
}

export function PassportCard({ nft, onClick }: PassportCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(nft.bg, 'rounded-[18px] p-[18px] relative overflow-hidden mb-3 cursor-pointer')}
    >
      <div className="absolute -top-10 -right-10 w-[130px] h-[130px] rounded-full bg-white/7" />
      <div className="text-[10px] text-white/40 tracking-widest uppercase mb-1">Passport · {nft.id}</div>
      <div className="text-[15px] font-semibold text-white mb-3">{nft.name}</div>
      <div className="grid grid-cols-2 gap-2">
        {nft.meta.map((m) => (
          <div key={m.label}>
            <div className="text-[9px] text-white/35 uppercase tracking-wider mb-0.5">{m.label}</div>
            <div className="text-xs text-white/85">{m.value}</div>
          </div>
        ))}
      </div>
      <div className="inline-flex items-center gap-1 bg-white/15 text-white/90 px-2.5 py-1 rounded-full text-[10px] font-semibold mt-2.5">
        <Check className="size-3" />
        Origin verified
      </div>
    </div>
  )
}
