import { motion } from 'framer-motion'
import { TopNav } from '@/components/TopNav'
import { useAppStore } from '@/store/app-store'
import { useMarketListings } from '@/hooks/useMarket'
import { MarketListingRow } from '@/components/shared/MarketListingRow'
import { staggerContainer, staggerItem } from '@/motion/variants'

export function MarketScreen() {
  const { openSheet } = useAppStore()
  const listings = useMarketListings()

  return (
    <div className="flex flex-col h-full bg-surface">
      <TopNav title="Trade Vault Shares" showBack={false} action={{ label: 'Sell mine', onClick: () => openSheet('sell') }} />
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="px-[22px] pt-[18px]">
          {/* Summary bar */}
          <div className="bg-forest rounded-[14px] px-4 py-3.5 mb-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-white/40 mb-0.5 flex items-center">
                <span className="live-dot inline-block w-1.5 h-1.5 rounded-full bg-sprout mr-1 align-middle" />
                Live now
              </div>
              <div className="font-serif text-[17px] text-white">38 shares for sale</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-white/40 mb-0.5">Today's volume</div>
              <div className="text-base font-semibold text-sprout">Rp 142M</div>
            </div>
          </div>

          {/* Info card */}
          <div className="bg-mist rounded-[14px] px-3.5 py-3.5 mb-4">
            <div className="text-xs font-semibold text-leaf mb-1.5">What is this?</div>
            <div className="text-[11px] text-moss leading-relaxed">
              Need cash before harvest? Sell your vault share here. Want to buy in late? Pick one up below — prices reflect live crop health, but never drop below the original stake.
            </div>
          </div>

          <div className="font-serif text-[17px] text-forest mb-3">Available now</div>

          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            {listings.map((l) => (
              <motion.div key={l.code} variants={staggerItem}>
                <MarketListingRow listing={l} onClick={() => openSheet('buy')} />
              </motion.div>
            ))}
          </motion.div>
          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}
