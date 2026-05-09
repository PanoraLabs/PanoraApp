import { useState, useCallback } from 'react'
import { Info } from 'lucide-react'
import { BottomSheet } from '@/components/BottomSheet'
import { useAppStore } from '@/store/app-store'
import { CropIcon } from '@/lib/icons'

export function StakeSheet() {
  const { closeSheet, showResult } = useAppStore()
  const [amount, setAmount] = useState(5000000)

  const profit = Math.round(amount * 0.18)
  const total = amount + profit

  const fmt = useCallback((v: number) => 'Rp ' + v.toLocaleString('id-ID'), [])

  return (
    <BottomSheet id="stake">
      <div className="text-lg font-semibold text-forest mb-[18px]">Invest in this vault</div>

      <div className="bg-surface rounded-[14px] p-3 flex items-center gap-2.5 mb-4">
        <CropIcon crop="chili" size="lg" />
        <div>
          <div className="text-[13px] font-semibold text-forest">Red Chili · Subang</div>
          <div className="text-[11px] text-stone">Greenhouse · West Java · Est. 18% · 90 days</div>
        </div>
      </div>

      <div className="mb-3.5">
        <label className="text-[11px] font-semibold text-stone uppercase tracking-wider mb-1.5 block">Amount</label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-stone">Rp</span>
          <input
            className="w-full py-3 pl-11 pr-3.5 bg-surface border-[1.5px] border-input rounded-xl font-sans text-sm text-forest outline-none focus:border-leaf transition-colors"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      <input
        type="range"
        min={500000}
        max={25000000}
        step={500000}
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
        className="w-full accent-leaf mb-1"
      />
      <div className="flex justify-between text-[10px] text-stone mb-4">
        <span>Min Rp 500K</span>
        <span>Max Rp 25M</span>
      </div>

      <div className="bg-mist rounded-[14px] p-3.5 mb-4">
        <div className="flex justify-between mb-2 text-[13px]">
          <span className="text-stone">You invest</span>
          <span className="font-medium text-forest">{fmt(amount)}</span>
        </div>
        <div className="flex justify-between mb-2 text-[13px]">
          <span className="text-stone">Estimated profit (18%)</span>
          <span className="font-medium text-sprout">+{fmt(profit)}</span>
        </div>
        <div className="h-px bg-forest/10 mb-2" />
        <div className="flex justify-between text-sm">
          <span className="font-semibold text-forest">Estimated total back</span>
          <span className="font-semibold text-forest">{fmt(total)}</span>
        </div>
      </div>

      <div className="text-[11px] text-stone leading-relaxed mb-4 inline-flex items-start gap-1.5">
        <Info className="size-3.5 mt-px shrink-0" />
        Your money is locked for 90 days. To exit early, sell your share on the marketplace.
      </div>

      <button
        onClick={() => {
          if (amount < 500000) {
            showResult({
              kind: 'error',
              title: 'Investment failed',
              message: `Minimum investment is Rp 500,000. You entered ${fmt(amount)}.`,
            })
            return
          }
          closeSheet()
          showResult({
            kind: 'success',
            title: 'Investment confirmed',
            message: `${fmt(amount)} locked into Red Chili · Subang. Estimated total back ${fmt(total)} in 90 days.`,
          })
        }}
        className="w-full py-3.5 rounded-[14px] bg-forest text-white font-sans text-[15px] font-semibold border-none cursor-pointer active:bg-moss transition-colors"
      >
        Confirm Investment
      </button>
    </BottomSheet>
  )
}
