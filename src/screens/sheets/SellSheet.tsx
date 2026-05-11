import { useMemo, useState } from 'react'
import { BottomSheet } from '@/components/BottomSheet'
import { useAppStore } from '@/store/app-store'
import { useDemoStore } from '@/store/demo-store'
import { formatUsd } from '@/lib/format'

function parseUsd(s: string): number {
  return parseInt(s.replace(/[^\d]/g, ''), 10) || 0
}

export function SellSheet() {
  const closeSheet = useAppStore((s) => s.closeSheet)
  const showResult = useAppStore((s) => s.showResult)
  const sheetContext = useAppStore((s) => s.sheetContext)
  const positions = useDemoStore((s) => s.positions)
  const sell = useDemoStore((s) => s.sell)

  // Default to first position if none specified.
  const position = useMemo(
    () =>
      positions.find((p) => p.code === sheetContext?.positionCode) ?? positions[0] ?? null,
    [positions, sheetContext?.positionCode]
  )

  const investedUsd = position ? parseUsd(position.val) : 0
  const suggested = Math.round(investedUsd * 1.085)
  const [price, setPrice] = useState<string>(suggested ? suggested.toLocaleString('en-US') : '')

  if (!position) {
    return (
      <BottomSheet id="sell">
        <div className="text-lg font-semibold text-forest mb-[18px]">Nothing to sell</div>
        <div className="text-[13px] text-stone mb-4">You don't have any positions to list yet.</div>
        <button
          onClick={closeSheet}
          className="w-full py-3.5 rounded-[14px] bg-forest text-white font-sans text-[15px] font-semibold border-none cursor-pointer active:bg-moss transition-colors"
        >
          Close
        </button>
      </BottomSheet>
    )
  }

  const parsed = parseUsd(price)
  const platformFee = Math.round(parsed * 0.01)
  const insuranceFee = Math.round(parsed * 0.005)
  const youReceive = Math.max(0, parsed - platformFee - insuranceFee)

  return (
    <BottomSheet id="sell">
      <div className="text-lg font-semibold text-forest mb-[18px]">Sell my vault share</div>

      <div className="bg-surface rounded-[14px] p-3 mb-4">
        <div className="text-xs text-stone mb-0.5">{position.code}</div>
        <div className="text-[13px] text-forest">Invested: {formatUsd(investedUsd)} · {position.sub}</div>
      </div>

      <div className="mb-3.5">
        <label className="text-[11px] font-semibold text-stone uppercase tracking-wider mb-1.5 block">Asking Price</label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-stone">$</span>
          <input
            className="w-full py-3 pl-11 pr-3.5 bg-surface border-[1.5px] border-input rounded-xl font-sans text-sm text-forest outline-none focus:border-leaf transition-colors"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="text-[10px] text-stone mt-1">Lowest price allowed: {formatUsd(investedUsd)} (your original investment)</div>
      </div>

      <div className="bg-mist rounded-xl p-3 mb-4">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-stone">Platform fee (1%)</span>
          <span>−{formatUsd(platformFee)}</span>
        </div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-stone">Insurance fee (0.5%)</span>
          <span>−{formatUsd(insuranceFee)}</span>
        </div>
        <div className="h-px bg-forest/10 mb-2" />
        <div className="flex justify-between text-sm font-semibold">
          <span>You receive</span>
          <span className="text-sprout">{formatUsd(youReceive)}</span>
        </div>
      </div>

      <button
        onClick={() => {
          const result = sell({ positionCode: position.code, askPriceUsd: parsed })
          if (!result.ok) {
            showResult({ kind: 'error', title: 'Listing rejected', message: result.reason })
            return
          }
          closeSheet()
          showResult({
            kind: 'success',
            title: 'Listed for sale',
            message: `Your share is on the marketplace at ${formatUsd(parsed)}. We'll notify you when a buyer takes it.`,
          })
        }}
        className="w-full py-3.5 rounded-[14px] bg-forest text-white font-sans text-[15px] font-semibold border-none cursor-pointer active:bg-moss transition-colors"
      >
        List for Sale
      </button>
    </BottomSheet>
  )
}
