import { useState, useCallback, useMemo } from 'react'
import { Info } from 'lucide-react'
import { BottomSheet } from '@/components/BottomSheet'
import { useAppStore } from '@/store/app-store'
import { useDemoStore } from '@/store/demo-store'
import { CropIcon, type CropKey } from '@/lib/icons'
import { formatUsd, formatUsdCompact } from '@/lib/format'

const DEFAULT_TARGET = {
  vaultCode: 'Red Chili · Subang',
  vaultSub: 'Greenhouse · West Java · Est. 0% · 0 days',
  crop: 'chili' as CropKey,
  apyLabel: '0%',
  daysLeftLabel: '0 days to harvest',
  pct: 0,
  loc: 'Subang, West Java',
}

export function StakeSheet() {
  const closeSheet = useAppStore((s) => s.closeSheet)
  const showResult = useAppStore((s) => s.showResult)
  const sheetContext = useAppStore((s) => s.sheetContext)
  const stake = useDemoStore((s) => s.stake)
  const cashUsd = useDemoStore((s) => s.cashUsd)
  const [amount, setAmount] = useState(0)

  const target = useMemo(() => {
    if (!sheetContext?.vaultCode) return DEFAULT_TARGET
    return {
      vaultCode: sheetContext.vaultCode,
      vaultSub: sheetContext.vaultSub ?? DEFAULT_TARGET.vaultSub,
      crop: (sheetContext.crop as CropKey) ?? DEFAULT_TARGET.crop,
      apyLabel: sheetContext.apyLabel ?? DEFAULT_TARGET.apyLabel,
      daysLeftLabel: sheetContext.daysLeftLabel ?? DEFAULT_TARGET.daysLeftLabel,
      pct: sheetContext.pct ?? DEFAULT_TARGET.pct,
      loc: sheetContext.loc ?? DEFAULT_TARGET.loc,
    }
  }, [sheetContext])

  const apyPct = parseFloat(target.apyLabel) || 0
  const profit = Math.round(amount * (apyPct / 100))
  const total = amount + profit

  const fmt = useCallback((v: number) => formatUsd(v), [])

  return (
    <BottomSheet id="stake">
      <div className="text-lg font-semibold text-forest mb-[18px]">Invest in this vault</div>

      <div className="bg-surface rounded-[14px] p-3 flex items-center gap-2.5 mb-4">
        <CropIcon crop={target.crop} size="lg" />
        <div>
          <div className="text-[13px] font-semibold text-forest">{target.vaultCode}</div>
          <div className="text-[11px] text-stone">{target.vaultSub}</div>
        </div>
      </div>

      <div className="mb-3.5">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] font-semibold text-stone uppercase tracking-wider">Amount</label>
          <span className="text-[10px] text-stone">Available: {formatUsdCompact(cashUsd)}</span>
        </div>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-stone">$</span>
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
        min={1}
        max={1_000_000}
        step={1}
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
        className="w-full accent-leaf mb-1"
      />
      <div className="flex justify-between text-[10px] text-stone mb-4">
        <span>Min $1</span>
        <span>Max $1M</span>
      </div>

      <div className="bg-mist rounded-[14px] p-3.5 mb-4">
        <div className="flex justify-between mb-2 text-[13px]">
          <span className="text-stone">You invest</span>
          <span className="font-medium text-forest">{fmt(amount)}</span>
        </div>
        <div className="flex justify-between mb-2 text-[13px]">
          <span className="text-stone">Estimated profit ({target.apyLabel})</span>
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
        Your money is locked for {target.daysLeftLabel.toLowerCase().includes('day') ? target.daysLeftLabel : `${target.daysLeftLabel} days`}. To exit early, sell your share on the marketplace.
      </div>

      <button
        onClick={() => {
          const result = stake({
            vaultCode: target.vaultCode,
            vaultSub: target.vaultSub,
            crop: target.crop,
            amountUsd: amount,
            apyLabel: target.apyLabel,
            daysLeftLabel: target.daysLeftLabel,
            pct: target.pct,
            loc: target.loc,
          })
          if (!result.ok) {
            showResult({ kind: 'error', title: 'Investment failed', message: result.reason })
            return
          }
          closeSheet()
          showResult({
            kind: 'success',
            title: 'Investment confirmed',
            message: `${fmt(amount)} locked into ${target.vaultCode}. Estimated total back ${fmt(total)}.`,
          })
        }}
        className="w-full py-3.5 rounded-[14px] bg-forest text-white font-sans text-[15px] font-semibold border-none cursor-pointer active:bg-moss transition-colors"
      >
        Confirm Investment
      </button>
    </BottomSheet>
  )
}
