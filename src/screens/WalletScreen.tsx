import { motion } from 'framer-motion'
import { TopNav } from '@/components/TopNav'
import { useAppStore } from '@/store/app-store'
import { useClaimables, useParticipationTokens, useWallet } from '@/hooks/useWallet'
import { ClaimableRow } from '@/components/shared/ClaimableRow'
import { PTRow } from '@/components/shared/PTRow'
import { staggerContainer, staggerItem } from '@/motion/variants'

export function WalletScreen() {
  const { openSheet, showToast } = useAppStore()
  const { address, balances } = useWallet()
  const claimables = useClaimables()
  const tokens = useParticipationTokens()

  return (
    <div className="flex flex-col h-full bg-surface">
      <TopNav title="Wallet" />
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="px-[22px] pt-[18px]">
          {/* Wallet card */}
          <div className="bg-gradient-to-br from-forest to-[#153D28] rounded-[20px] p-5 mb-4">
            <div className="text-[11px] text-white/40 uppercase tracking-widest mb-1">Phantom Wallet</div>
            <div className="font-mono text-xs text-white/40 mb-4">{address}</div>
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <div className="bg-white/8 rounded-xl p-3">
                <div className="text-[10px] text-white/35 mb-1">USDC Balance</div>
                <div className="font-serif text-[22px] text-white">{balances.usdc}</div>
              </div>
              <div className="bg-white/8 rounded-xl p-3">
                <div className="text-[10px] text-white/35 mb-1">SOL Balance</div>
                <div className="font-serif text-[22px] text-white">{balances.sol}</div>
              </div>
            </div>
            <div className="flex gap-2.5">
              <button
                onClick={() => showToast('Deposit flow...')}
                className="flex-1 py-2.5 rounded-[14px] bg-white/10 text-white font-sans text-[13px] font-semibold border-none cursor-pointer"
              >
                Deposit
              </button>
              <button
                onClick={() => openSheet('claim')}
                className="flex-1 py-2.5 rounded-[14px] bg-white/10 text-white font-sans text-[13px] font-semibold border-none cursor-pointer"
              >
                Withdraw
              </button>
            </div>
          </div>

          {/* Claimable */}
          <div className="font-serif text-[17px] text-forest mb-3">Claimable Profits</div>
          {claimables.map((c) => (
            <ClaimableRow key={c.code} claimable={c} onClaim={() => openSheet('claim')} />
          ))}

          {/* Participation Tokens */}
          <div className="font-serif text-[17px] text-forest mb-3">Participation Tokens</div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-2"
          >
            {tokens.map((t) => (
              <motion.div key={t.code} variants={staggerItem}>
                <PTRow token={t} onList={() => openSheet('sell')} />
              </motion.div>
            ))}
          </motion.div>
          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}
