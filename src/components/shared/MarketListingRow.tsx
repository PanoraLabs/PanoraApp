import { motion } from 'framer-motion'
import type { MarketListing } from '@/data/listings'

interface MarketListingRowProps {
  listing: MarketListing
  onClick?: () => void
}

export function MarketListingRow({ listing: l, onClick }: MarketListingRowProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex items-center justify-between p-3.5 bg-surface rounded-[14px] cursor-pointer mb-2 active:bg-forest/5 transition-colors"
    >
      <div className="flex items-center gap-2.5 flex-1">
        <div className="w-9 h-9 rounded-[10px] bg-mist flex items-center justify-center text-[17px] shrink-0">
          {l.emoji}
        </div>
        <div>
          <div className="text-[13px] font-medium text-forest">{l.code}</div>
          <div className="text-[11px] text-stone mt-px">{l.day}</div>
        </div>
      </div>
      <div>
        <div className="text-sm font-semibold text-forest text-right">{l.price}</div>
        <div className={`text-[11px] text-right mt-px ${l.up ? 'text-sprout' : 'text-danger'}`}>{l.chg}</div>
      </div>
    </motion.div>
  )
}
