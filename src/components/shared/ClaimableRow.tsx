import type { Claimable } from '@/data/wallet'

interface ClaimableRowProps {
  claimable: Claimable
  onClaim?: () => void
}

export function ClaimableRow({ claimable: c, onClaim }: ClaimableRowProps) {
  return (
    <div className="flex items-center justify-between p-3.5 bg-mist border border-leaf/20 rounded-[14px] mb-4">
      <div>
        <div className="text-xs font-medium text-forest">{c.code}</div>
        <div className="text-[11px] text-stone">{c.settledOn}</div>
      </div>
      <div className="text-right">
        <div className="font-serif text-lg text-moss">{c.amount}</div>
        <button
          onClick={onClaim}
          className="mt-1.5 px-4 py-2 rounded-[10px] bg-forest text-white text-[13px] font-semibold border-none cursor-pointer"
        >
          Claim
        </button>
      </div>
    </div>
  )
}
