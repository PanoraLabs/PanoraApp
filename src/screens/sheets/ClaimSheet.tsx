import { BottomSheet } from '@/components/BottomSheet'
import { useAppStore } from '@/store/app-store'

export function ClaimSheet() {
  const { closeSheet, showResult } = useAppStore()

  return (
    <BottomSheet id="claim">
      <div className="text-lg font-semibold text-forest mb-[18px]">Claim your profit</div>

      <div className="bg-mist rounded-2xl p-5 text-center mb-4">
        <div className="text-xs text-stone mb-1">Available to claim</div>
        <div className="font-serif text-[38px] text-moss">Rp 1,820,000</div>
        <div className="text-xs text-stone mt-1">Cacao Flores · Settled Apr 10</div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between text-[13px] py-2 border-b border-border">
          <span className="text-stone">Money returned</span>
          <span className="font-medium">Rp 15,000,000</span>
        </div>
        <div className="flex justify-between text-[13px] py-2 border-b border-border">
          <span className="text-stone">Profit</span>
          <span className="font-medium text-sprout">+Rp 1,820,000</span>
        </div>
        <div className="flex justify-between text-sm py-2">
          <span className="font-semibold">Total received</span>
          <span className="font-semibold text-forest">Rp 16,820,000</span>
        </div>
      </div>

      <div className="mb-3.5">
        <label className="text-[11px] font-semibold text-stone uppercase tracking-wider mb-1.5 block">Send to</label>
        <select className="w-full py-3 px-3.5 bg-surface border-[1.5px] border-input rounded-xl font-sans text-sm text-forest outline-none appearance-none">
          <option>Account balance (USDC)</option>
          <option>BCA bank account (IDR)</option>
        </select>
      </div>

      <button
        onClick={() => {
          closeSheet()
          showResult({
            kind: 'success',
            title: 'Profit claimed',
            message: 'Rp 1,820,000 transferred to your account balance.',
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
