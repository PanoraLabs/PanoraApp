import { TrendingUp } from 'lucide-react'
import { BottomSheet } from '@/components/BottomSheet'
import { useAppStore } from '@/store/app-store'

export function BuySheet() {
  const { closeSheet, showToast } = useAppStore()

  return (
    <BottomSheet id="buy">
      <div className="font-serif text-xl text-forest mb-[18px]">Buy this vault share</div>

      <div className="bg-surface rounded-[14px] p-3.5 mb-4">
        <div className="text-xs text-stone mb-1">Red Chili · Subang · 25 days to harvest</div>
        <div className="flex items-baseline justify-between">
          <div className="font-serif text-[28px] text-forest">Rp 10,850,000</div>
          <div className="text-xs text-sprout inline-flex items-center gap-1">
            <TrendingUp className="size-3" />
            +8.5% vs entry
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between text-[13px] py-1.5 border-b border-border">
          <span className="text-stone">Share price</span>
          <span className="font-medium">Rp 10,850,000</span>
        </div>
        <div className="flex justify-between text-[13px] py-1.5 border-b border-border">
          <span className="text-stone">Platform fee (1%)</span>
          <span className="text-stone">Rp 108,500</span>
        </div>
        <div className="flex justify-between text-sm py-1.5">
          <span className="font-semibold">Total cost</span>
          <span className="font-semibold text-forest">Rp 10,958,500</span>
        </div>
      </div>

      <div className="text-[11px] text-stone leading-relaxed mb-4">
        After buying, you take over the seller's spot and collect the harvest profit.
      </div>

      <button
        onClick={() => { closeSheet(); showToast('Share purchased') }}
        className="w-full py-3.5 rounded-[14px] bg-forest text-white font-sans text-[15px] font-semibold border-none cursor-pointer active:bg-moss transition-colors"
      >
        Buy Share
      </button>
    </BottomSheet>
  )
}
