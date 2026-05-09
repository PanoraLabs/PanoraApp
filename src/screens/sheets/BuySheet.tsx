import { TrendingUp, TrendingDown } from 'lucide-react'
import { BottomSheet } from '@/components/BottomSheet'
import { useAppStore } from '@/store/app-store'
import { useDemoStore } from '@/store/demo-store'
import { formatRupiah } from '@/lib/format'

export function BuySheet() {
  const closeSheet = useAppStore((s) => s.closeSheet)
  const showResult = useAppStore((s) => s.showResult)
  const sheetContext = useAppStore((s) => s.sheetContext)
  const listings = useDemoStore((s) => s.listings)
  const buy = useDemoStore((s) => s.buy)
  const cashIdr = useDemoStore((s) => s.cashIdr)

  const target =
    listings.find((l) => l.code === sheetContext?.listingCode) ?? listings[0] ?? null

  if (!target) {
    return (
      <BottomSheet id="buy">
        <div className="text-lg font-semibold text-forest mb-[18px]">No listings available</div>
        <div className="text-[13px] text-stone mb-4">There are no vault shares for sale right now. Check back later.</div>
        <button
          onClick={closeSheet}
          className="w-full py-3.5 rounded-[14px] bg-forest text-white font-sans text-[15px] font-semibold border-none cursor-pointer active:bg-moss transition-colors"
        >
          Close
        </button>
      </BottomSheet>
    )
  }

  const TrendIcon = target.up ? TrendingUp : TrendingDown
  const trendClass = target.up ? 'text-sprout' : 'text-stone'

  // Pull display fee numbers from the listing price.
  const priceNum = parseInt(target.price.replace(/[^\d]/g, ''), 10) || 0
  const fee = Math.round(priceNum * 0.01)
  const total = priceNum + fee

  return (
    <BottomSheet id="buy">
      <div className="text-lg font-semibold text-forest mb-[18px]">Buy this vault share</div>

      <div className="bg-surface rounded-[14px] p-3.5 mb-4">
        <div className="text-xs text-stone mb-1">{target.code} · {target.day}</div>
        <div className="flex items-baseline justify-between">
          <div className="font-serif text-[28px] text-forest">{target.price}</div>
          <div className={`text-xs inline-flex items-center gap-1 ${trendClass}`}>
            <TrendIcon className="size-3" />
            {target.chg}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between text-[13px] py-1.5 border-b border-border">
          <span className="text-stone">Share price</span>
          <span className="font-medium">{target.price}</span>
        </div>
        <div className="flex justify-between text-[13px] py-1.5 border-b border-border">
          <span className="text-stone">Platform fee (1%)</span>
          <span className="text-stone">{formatRupiah(fee)}</span>
        </div>
        <div className="flex justify-between text-sm py-1.5">
          <span className="font-semibold">Total cost</span>
          <span className="font-semibold text-forest">{formatRupiah(total)}</span>
        </div>
        <div className="flex justify-between text-[11px] py-1">
          <span className="text-stone">Your cash</span>
          <span className="text-stone">{formatRupiah(cashIdr)}</span>
        </div>
      </div>

      <div className="text-[11px] text-stone leading-relaxed mb-4">
        After buying, you take over the seller's spot and collect the harvest profit.
      </div>

      <button
        onClick={() => {
          const result = buy(target.code)
          if (!result.ok) {
            showResult({ kind: 'error', title: 'Purchase failed', message: result.reason })
            return
          }
          closeSheet()
          showResult({
            kind: 'success',
            title: 'Share purchased',
            message: `You now hold ${target.code}. Profit will arrive at harvest.`,
          })
        }}
        className="w-full py-3.5 rounded-[14px] bg-forest text-white font-sans text-[15px] font-semibold border-none cursor-pointer active:bg-moss transition-colors"
      >
        Buy Share
      </button>
    </BottomSheet>
  )
}
