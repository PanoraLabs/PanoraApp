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
      <TopNav title="NFT Passport" />
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="px-[22px] pt-[18px]">
          <div className="text-[13px] text-stone leading-relaxed mb-[18px]">
            cNFT certificates minted on Solana for every harvested batch — immutable proof of origin.
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
            <div className="text-sm font-medium text-forest mb-2.5">Verify a Passport</div>
            <Input
              className="h-auto w-full py-3 px-3.5 bg-surface border-[1.5px] border-input rounded-xl font-sans text-sm text-forest placeholder:text-stone focus-visible:border-leaf focus-visible:ring-0 transition-colors mb-2.5"
              placeholder="Enter cNFT ID (e.g. PAN-2026-0041)"
            />
            <button
              onClick={() => showToast('✓ NFT verified on Solana mainnet')}
              className="w-full py-3.5 rounded-[14px] bg-forest text-white font-sans text-[15px] font-semibold border-none cursor-pointer active:bg-moss transition-colors"
            >
              Verify On-Chain
            </button>
          </div>
          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}
