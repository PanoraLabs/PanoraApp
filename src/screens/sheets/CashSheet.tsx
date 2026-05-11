import { useEffect, useMemo, useState } from 'react'
import { ArrowDownToLine, ArrowUpFromLine, Building2, Info } from 'lucide-react'
import { BottomSheet } from '@/components/BottomSheet'
import { useAppStore } from '@/store/app-store'
import { useDemoStore } from '@/store/demo-store'
import { formatUsd, formatUsdCompact } from '@/lib/format'
import { cn } from '@/lib/utils'

const QUICK_AMOUNTS = [100, 1_000, 10_000, 100_000]

export function CashSheet() {
  const sheet = useAppStore((s) => s.sheet)
  const sheetContext = useAppStore((s) => s.sheetContext)
  const closeSheet = useAppStore((s) => s.closeSheet)
  const showResult = useAppStore((s) => s.showResult)
  const addCash = useDemoStore((s) => s.addCash)
  const withdraw = useDemoStore((s) => s.withdraw)
  const cashUsd = useDemoStore((s) => s.cashUsd)

  const mode = sheetContext?.cashMode ?? 'add'
  const [amount, setAmount] = useState(0)
  const [source, setSource] = useState<string>(mode === 'add' ? 'Bank transfer' : 'Bank transfer')

  useEffect(() => {
    if (sheet === 'cash') {
      setAmount(0)
      setSource('Bank transfer')
    }
  }, [sheet, mode])

  const isAdd = mode === 'add'
  const title = isAdd ? 'Add cash to your account' : 'Cash out to your bank'
  const ctaLabel = isAdd ? 'Confirm Top Up' : 'Confirm Withdrawal'
  const Icon = isAdd ? ArrowDownToLine : ArrowUpFromLine
  const accent = isAdd ? 'text-sprout' : 'text-forest'

  const newBalance = useMemo(() => {
    return isAdd ? cashUsd + amount : Math.max(0, cashUsd - amount)
  }, [cashUsd, amount, isAdd])

  const handleConfirm = () => {
    const action = isAdd ? addCash : withdraw
    const result = action({ amountUsd: amount, source })
    if (!result.ok) {
      showResult({
        kind: 'error',
        title: isAdd ? 'Top up failed' : 'Withdrawal failed',
        message: result.reason,
      })
      return
    }
    closeSheet()
    showResult({
      kind: 'success',
      title: isAdd ? 'Cash added' : 'Withdrawal sent',
      message: isAdd
        ? `${formatUsd(amount)} added to your account via ${source}.`
        : `${formatUsd(amount)} on its way to ${source}. New balance ${formatUsd(newBalance)}.`,
    })
  }

  return (
    <BottomSheet id="cash">
      <div className="text-lg font-semibold text-forest mb-[18px]">{title}</div>

      <div className="bg-surface rounded-[14px] p-3 flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 rounded-full bg-leaf/15 flex items-center justify-center">
          <Icon className={cn('size-4', accent)} />
        </div>
        <div className="flex-1">
          <div className="text-[13px] font-semibold text-forest">{isAdd ? 'Top up account' : 'Withdraw cash'}</div>
          <div className="text-[11px] text-stone">Available: {formatUsdCompact(cashUsd)}</div>
        </div>
      </div>

      <div className="mb-3.5">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] font-semibold text-stone uppercase tracking-wider">Amount</label>
          <span className="text-[10px] text-stone">USD</span>
        </div>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-stone">$</span>
          <input
            className="w-full py-3 pl-11 pr-3.5 bg-surface border-[1.5px] border-input rounded-xl font-sans text-sm text-forest outline-none focus:border-leaf transition-colors"
            type="number"
            min={0}
            value={amount || ''}
            placeholder="0"
            onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {QUICK_AMOUNTS.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setAmount(v)}
            className={cn(
              'py-2 rounded-[12px] text-[12px] font-semibold border transition-colors',
              amount === v
                ? 'bg-forest text-white border-forest'
                : 'bg-surface text-forest border-input hover:border-leaf'
            )}
          >
            {formatUsdCompact(v)}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <div className="text-[11px] font-semibold text-stone uppercase tracking-wider mb-1.5">
          {isAdd ? 'From' : 'To'}
        </div>
        <div className="flex items-center gap-2.5 p-3 bg-surface rounded-[12px] border border-input">
          <Building2 className="size-4 text-stone" />
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="flex-1 bg-transparent text-[13px] text-forest outline-none cursor-pointer"
          >
            <option>Bank transfer</option>
            <option>Debit card</option>
            <option>E-wallet</option>
          </select>
        </div>
      </div>

      <div className="bg-mist rounded-[14px] p-3.5 mb-4">
        <div className="flex justify-between mb-2 text-[13px]">
          <span className="text-stone">Current balance</span>
          <span className="font-medium text-forest">{formatUsd(cashUsd)}</span>
        </div>
        <div className="flex justify-between mb-2 text-[13px]">
          <span className="text-stone">{isAdd ? 'Top up' : 'Withdraw'}</span>
          <span className={cn('font-medium', isAdd ? 'text-sprout' : 'text-forest')}>
            {isAdd ? '+' : '−'}
            {formatUsd(amount)}
          </span>
        </div>
        <div className="h-px bg-forest/10 mb-2" />
        <div className="flex justify-between text-sm">
          <span className="font-semibold text-forest">New balance</span>
          <span className="font-semibold text-forest">{formatUsd(newBalance)}</span>
        </div>
      </div>

      <div className="text-[11px] text-stone leading-relaxed mb-4 inline-flex items-start gap-1.5">
        <Info className="size-3.5 mt-px shrink-0" />
        {isAdd
          ? 'Demo top up — funds appear instantly so you can try investing flow.'
          : 'Demo withdrawal — settles instantly. In production this takes 1–2 business days.'}
      </div>

      <button
        onClick={handleConfirm}
        disabled={amount <= 0}
        className="w-full py-3.5 rounded-[14px] bg-forest text-white font-sans text-[15px] font-semibold border-none cursor-pointer active:bg-moss transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {ctaLabel}
      </button>
    </BottomSheet>
  )
}
