import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { CropIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import type { MarketListing } from '@/data/listings'

interface MarketListingRowProps {
  listing: MarketListing
  onClick?: () => void
}

export function MarketListingRow({ listing: l, onClick }: MarketListingRowProps) {
  const Trend = l.up ? TrendingUp : TrendingDown
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex items-center justify-between p-3.5 bg-surface rounded-[14px] cursor-pointer mb-2 active:bg-forest/5 transition-colors"
    >
      <div className="flex items-center gap-2.5 flex-1">
        <CropIcon crop={l.crop} size="md" />
        <div>
          <div className="text-[13px] font-medium text-forest">{l.code}</div>
          <div className="text-[11px] text-stone mt-px">{l.day}</div>
        </div>
      </div>
      <div>
        <div className="font-serif text-base text-forest text-right">{l.price}</div>
        <div className={cn('text-[11px] text-right mt-px inline-flex items-center gap-1 justify-end w-full', l.up ? 'text-sprout' : 'text-danger')}>
          <Trend className="size-3" />
          {l.chg}
        </div>
      </div>
    </motion.div>
  )
}
