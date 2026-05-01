import { BottomSheet } from '@/components/BottomSheet'
import { useAppStore } from '@/store/app-store'

export function SellSheet() {
  const { closeSheet, showToast } = useAppStore()

  return (
    <BottomSheet id="sell">
      <div className="font-serif text-xl text-forest mb-[18px]">List Token for Sale</div>

      <div className="bg-surface rounded-[14px] p-3 mb-4">
        <div className="text-xs text-stone mb-0.5">CHILI-GH-SUBANG-Q2</div>
        <div className="text-[13px] text-forest">Your stake: Rp 10,000,000 · Day 65 of 90</div>
      </div>

      <div className="mb-3.5">
        <label className="text-[11px] font-semibold text-stone uppercase tracking-wider mb-1.5 block">Listing Price</label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-stone">Rp</span>
          <input
            className="w-full py-3 pl-11 pr-3.5 bg-surface border-[1.5px] border-input rounded-xl font-sans text-sm text-forest outline-none focus:border-leaf transition-colors"
            defaultValue="10,850,000"
          />
        </div>
        <div className="text-[10px] text-stone mt-1">Price floor: Rp 10,000,000 (original stake)</div>
      </div>

      <div className="bg-mist rounded-xl p-3 mb-4">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-stone">Platform fee (1%)</span>
          <span>−Rp 108,500</span>
        </div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-stone">Insurance royalty (0.5%)</span>
          <span>−Rp 54,250</span>
        </div>
        <div className="h-px bg-forest/10 mb-2" />
        <div className="flex justify-between text-sm font-semibold">
          <span>You receive</span>
          <span className="text-sprout">Rp 10,687,250</span>
        </div>
      </div>

      <button
        onClick={() => { closeSheet(); showToast('✓ Listed on secondary market') }}
        className="w-full py-3.5 rounded-[14px] bg-forest text-white font-sans text-[15px] font-semibold border-none cursor-pointer active:bg-moss transition-colors"
      >
        List for Sale
      </button>
    </BottomSheet>
  )
}
