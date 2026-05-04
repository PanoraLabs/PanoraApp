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
      <TopNav title="Account" showBack={false} />
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="px-[22px] pt-[18px]">
          {/* Account card */}
          <div className="bg-gradient-to-br from-forest to-[#153D28] rounded-[20px] p-5 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[11px] text-white/40 uppercase tracking-widest mb-1">My Account</div>
                <div className="font-serif text-xl text-white">Agung Wibowo</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-white/40 mb-0.5">Wallet ID</div>
                <div className="font-mono text-[11px] text-white/55">{address}</div>
              </div>
            </div>

            <div className="bg-white/8 rounded-xl p-3.5 mb-4">
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Cash Available</div>
              <div className="flex items-baseline gap-1.5">
                <div className="font-serif text-[28px] text-white leading-none">{balances.cash}</div>
                <div className="text-[11px] text-white/40">{balances.cashLabel}</div>
              </div>
              <div className="text-[10px] text-white/35 mt-1.5">+ {balances.fees} for network fees</div>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => showToast('Deposit flow...')}
                className="flex-1 py-2.5 rounded-[14px] bg-white/10 text-white font-sans text-[13px] font-semibold border-none cursor-pointer"
              >
                Add Cash
              </button>
              <button
                onClick={() => openSheet('claim')}
                className="flex-1 py-2.5 rounded-[14px] bg-white/10 text-white font-sans text-[13px] font-semibold border-none cursor-pointer"
              >
                Cash Out
              </button>
            </div>
          </div>

          {/* Claimable */}
          {claimables.length > 0 && (
            <>
              <div className="font-serif text-[17px] text-forest mb-3">Ready to Claim</div>
              {claimables.map((c) => (
                <ClaimableRow key={c.code} claimable={c} onClaim={() => openSheet('claim')} />
              ))}
            </>
          )}

          {/* Vault Shares */}
          <div className="font-serif text-[17px] text-forest mb-1">My Vault Shares</div>
          <div className="text-[11px] text-stone mb-3">Your stake in each active vault. Sell anytime on the marketplace.</div>
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
