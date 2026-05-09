import { useState } from 'react'
import { BottomSheet } from '@/components/BottomSheet'
import { useAppStore } from '@/store/app-store'

const FLOOR = 10_000_000

export function SellSheet() {
  const { closeSheet, showResult } = useAppStore()
  const [price, setPrice] = useState('10,850,000')

  const parsed = parseInt(price.replace(/[^\d]/g, ''), 10) || 0
  const fmt = (v: number) => 'Rp ' + v.toLocaleString('id-ID')

  return (
    <BottomSheet id="sell">
      <div className="text-lg font-semibold text-forest mb-[18px]">Sell my vault share</div>

      <div className="bg-surface rounded-[14px] p-3 mb-4">
        <div className="text-xs text-stone mb-0.5">Red Chili · Subang</div>
        <div className="text-[13px] text-forest">Invested: Rp 10,000,000 · 25 days to harvest</div>
      </div>

      <div className="mb-3.5">
        <label className="text-[11px] font-semibold text-stone uppercase tracking-wider mb-1.5 block">Asking Price</label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-stone">Rp</span>
          <input
            className="w-full py-3 pl-11 pr-3.5 bg-surface border-[1.5px] border-input rounded-xl font-sans text-sm text-forest outline-none focus:border-leaf transition-colors"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="text-[10px] text-stone mt-1">Lowest price allowed: Rp 10,000,000 (your original investment)</div>
      </div>

      <div className="bg-mist rounded-xl p-3 mb-4">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-stone">Platform fee (1%)</span>
          <span>−Rp 108,500</span>
        </div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-stone">Insurance fee (0.5%)</span>
          <span>−Rp 54,250</span>
        </div>
        <div className="h-px bg-forest/10 mb-2" />
        <div className="flex justify-between text-sm font-semibold">
          <span>You receive</span>
          <span className="text-sprout">Rp 10,687,250</span>
        </div>
      </div>

      <button
        onClick={() => {
          if (parsed < FLOOR) {
            showResult({
              kind: 'error',
              title: 'Listing rejected',
              message: `Asking price ${fmt(parsed)} is below the floor of ${fmt(FLOOR)}. Adjust your price and try again.`,
            })
            return
          }
          closeSheet()
          showResult({
            kind: 'success',
            title: 'Listed for sale',
            message: `Your share is on the marketplace at ${fmt(parsed)}. We'll notify you when a buyer takes it.`,
          })
        }}
        className="w-full py-3.5 rounded-[14px] bg-forest text-white font-sans text-[15px] font-semibold border-none cursor-pointer active:bg-moss transition-colors"
      >
        List for Sale
      </button>
    </BottomSheet>
  )
}
