import { BottomSheet } from '@/components/BottomSheet'
import { useAppStore } from '@/store/app-store'
import { useDemoStore } from '@/store/demo-store'
import { formatRupiah } from '@/lib/format'

export function ClaimSheet() {
  const closeSheet = useAppStore((s) => s.closeSheet)
  const showResult = useAppStore((s) => s.showResult)
  const sheetContext = useAppStore((s) => s.sheetContext)
  const claimables = useDemoStore((s) => s.claimables)
  const claim = useDemoStore((s) => s.claim)

  // Default to first claimable if no specific code passed.
  const target =
    claimables.find((c) => c.code === sheetContext?.claimableCode) ?? claimables[0] ?? null

  if (!target) {
    return (
      <BottomSheet id="claim">
        <div className="text-lg font-semibold text-forest mb-[18px]">Nothing to claim</div>
        <div className="text-[13px] text-stone mb-4">
          You don't have any settled vaults waiting to be claimed right now. They'll show up here once a harvest settles.
        </div>
        <button
          onClick={closeSheet}
          className="w-full py-3.5 rounded-[14px] bg-forest text-white font-sans text-[15px] font-semibold border-none cursor-pointer active:bg-moss transition-colors"
        >
          Close
        </button>
      </BottomSheet>
    )
  }

  return (
    <BottomSheet id="claim">
      <div className="text-lg font-semibold text-forest mb-[18px]">Claim your profit</div>

      <div className="bg-mist rounded-2xl p-5 text-center mb-4">
        <div className="text-xs text-stone mb-1">Available to claim</div>
        <div className="font-serif text-[38px] text-moss">{target.amount}</div>
        <div className="text-xs text-stone mt-1">{target.code} · {target.settledOn}</div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between text-[13px] py-2 border-b border-border">
          <span className="text-stone">Profit</span>
          <span className="font-medium text-sprout">+{target.amount}</span>
        </div>
        <div className="flex justify-between text-sm py-2">
          <span className="font-semibold">Total received</span>
          <span className="font-semibold text-forest">{target.amount}</span>
        </div>
      </div>

      <div className="mb-3.5">
        <label className="text-[11px] font-semibold text-stone uppercase tracking-wider mb-1.5 block">Send to</label>
        <select className="w-full py-3 px-3.5 bg-surface border-[1.5px] border-input rounded-xl font-sans text-sm text-forest outline-none appearance-none">
          <option>Account balance (IDR)</option>
          <option>BCA bank account (IDR)</option>
        </select>
      </div>

      <button
        onClick={() => {
          const result = claim(target.code)
          if (!result.ok) {
            showResult({ kind: 'error', title: 'Claim failed', message: result.reason })
            return
          }
          closeSheet()
          showResult({
            kind: 'success',
            title: 'Profit claimed',
            message: `${formatRupiah(result.result.amountIdr)} transferred to your account balance.`,
            primaryLabel: 'Great',
          })
        }}
        className="w-full py-3.5 rounded-[14px] bg-forest text-white font-sans text-[15px] font-semibold border-none cursor-pointer active:bg-moss transition-colors"
      >
        Confirm Claim
      </button>
    </BottomSheet>
  )
}
