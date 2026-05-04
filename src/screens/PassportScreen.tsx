import { motion } from 'framer-motion'
import { TopNav } from '@/components/TopNav'
import { useAppStore } from '@/store/app-store'
import { usePassportNFTs } from '@/hooks/usePassport'
import { PassportCard } from '@/components/shared/PassportCard'
import { Input } from '@/components/ui/input'
import { staggerContainer, staggerItem } from '@/motion/variants'

export function PassportScreen() {
  const showToast = useAppStore((s) => s.showToast)
  const nfts = usePassportNFTs()

  return (
    <div className="flex flex-col h-full bg-surface">
      <TopNav title="Harvest Passports" />
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="px-[22px] pt-[18px]">
          <div className="text-[13px] text-stone leading-relaxed mb-[18px]">
            Every harvest gets a digital certificate — proof of where it came from, who grew it, and when it shipped.
          </div>

          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            {nfts.map((nft) => (
              <motion.div key={nft.id} variants={staggerItem}>
                <PassportCard nft={nft} />
              </motion.div>
            ))}
          </motion.div>

          {/* Verify */}
          <div className="bg-card-bg border border-border rounded-[18px] p-[18px] mt-1">
            <div className="text-sm font-medium text-forest mb-1">Look up a passport</div>
            <div className="text-[11px] text-stone mb-2.5">Verify origin and authenticity using a passport ID.</div>
            <Input
              className="h-auto w-full py-3 px-3.5 bg-surface border-[1.5px] border-input rounded-xl font-sans text-sm text-forest placeholder:text-stone focus-visible:border-leaf focus-visible:ring-0 transition-colors mb-2.5"
              placeholder="e.g. PAN-2026-0041"
            />
            <button
              onClick={() => showToast('Passport verified')}
              className="w-full py-3.5 rounded-[14px] bg-forest text-white font-sans text-[15px] font-semibold border-none cursor-pointer active:bg-moss transition-colors"
            >
              Verify
            </button>
          </div>
          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}
