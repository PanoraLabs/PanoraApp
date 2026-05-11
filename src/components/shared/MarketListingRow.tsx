import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, X } from 'lucide-react'
import { CropIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import type { MarketListing } from '@/data/listings'

interface MarketListingRowProps {
  listing: MarketListing
  onClick?: () => void
  onCancel?: () => void
}

export function MarketListingRow({ listing: l, onClick, onCancel }: MarketListingRowProps) {
  const Trend = l.up ? TrendingUp : TrendingDown
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={l.owned ? undefined : onClick}
      className={cn(
        'flex items-center justify-between p-3.5 bg-surface rounded-[14px] mb-2 transition-colors',
        l.owned ? 'border border-leaf/40' : 'cursor-pointer active:bg-forest/5'
      )}
    >
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <CropIcon crop={l.crop} size="md" />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <div className="text-[13px] font-medium text-forest truncate">{l.code}</div>
            {l.owned && (
              <span className="text-[9px] font-semibold uppercase tracking-wider text-leaf bg-leaf/10 px-1.5 py-0.5 rounded">
                Yours
              </span>
            )}
          </div>
          <div className="text-[11px] text-stone mt-px truncate">{l.day}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div>
          <div className="font-serif text-base text-forest text-right">{l.price}</div>
          <div className={cn('text-[11px] text-right mt-px inline-flex items-center gap-1 justify-end w-full', l.up ? 'text-sprout' : 'text-danger')}>
            <Trend className="size-3" />
            {l.chg}
          </div>
        </div>
        {l.owned && onCancel && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onCancel()
            }}
            className="ml-1 w-7 h-7 rounded-full bg-forest/5 hover:bg-danger/10 text-stone hover:text-danger flex items-center justify-center transition-colors"
            aria-label="Cancel listing"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
    </motion.div>
  )
}
