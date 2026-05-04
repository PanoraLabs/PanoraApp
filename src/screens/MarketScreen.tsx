import { motion } from 'framer-motion'
import { TopNav } from '@/components/TopNav'
import { useAppStore } from '@/store/app-store'
import { useMarketListings } from '@/hooks/useMarket'

export function MarketScreen() {
  const { openSheet } = useAppStore()
  const listings = useMarketListings()

  return (
    <div className="flex flex-col h-full bg-surface">
      <TopNav title="Secondary Market" action={{ label: 'Sell PT', onClick: () => openSheet('sell') }} />
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="px-[22px] pt-[18px]">
          {/* Summary bar */}
          <div className="bg-forest rounded-[14px] px-4 py-3.5 mb-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-white/40 mb-0.5">
                <span className="live-dot inline-block w-1.5 h-1.5 rounded-full bg-sprout mr-1 align-middle" />
                Live Listings
              </div>
              <div className="font-serif text-[17px] text-white">38 active tokens</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-white/40 mb-0.5">24h Volume</div>
              <div className="text-base font-semibold text-sprout">Rp 142M</div>
            </div>
          </div>

          {/* Info card */}
          <div className="bg-mist rounded-[14px] px-3.5 py-3.5 mb-4">
            <div className="text-xs font-semibold text-leaf mb-1.5">How Secondary Market Works</div>
            <div className="text-[11px] text-moss leading-relaxed">
              Participation Tokens (PT) represent your vault rights. Trade them anytime — price updates based on live IoT crop health. Price floor = your original stake.
            </div>
          </div>

          <div className="font-serif text-[17px] text-forest mb-3">Available Listings</div>

          {listings.map((l) => (
            <motion.div
              key={l.code}
              whileTap={{ scale: 0.98 }}
              onClick={() => openSheet('buy')}
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
          ))}
          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}
