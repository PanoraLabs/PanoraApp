import { motion } from 'framer-motion'
import {
  Languages,
  Coins as CurrencyIcon,
  Bell,
  ShieldCheck,
  Wallet as WalletIcon,
  CloudUpload,
  HelpCircle,
  FileText,
  Info,
  LogOut,
} from 'lucide-react'
import { TopNav } from '@/components/TopNav'
import { useAppStore } from '@/store/app-store'
import { useClaimables, useParticipationTokens, useWallet } from '@/hooks/useWallet'
import { useUser } from '@/hooks/useUser'
import { ClaimableRow } from '@/components/shared/ClaimableRow'
import { PTRow } from '@/components/shared/PTRow'
import { SettingsRow, SettingsGroup } from '@/components/shared/SettingsRow'
import { staggerContainer, staggerItem } from '@/motion/variants'

export function WalletScreen() {
  const { openSheet, showToast, showResult } = useAppStore()
  const { address, balances } = useWallet()
  const { user, signOut } = useUser()
  const claimables = useClaimables()
  const tokens = useParticipationTokens()
  const displayName = user?.name ?? 'Account'
  const displayEmail = user?.email ?? null

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
                <div className="text-xl font-semibold text-white">{displayName}</div>
                {displayEmail && (
                  <div className="text-[11px] text-white/45 mt-0.5">{displayEmail}</div>
                )}
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
                onClick={() =>
                  showResult({
                    kind: 'success',
                    title: 'Deposit received',
                    message: 'Rp 1,000,000 added to your account balance.',
                  })
                }
                className="flex-1 py-2.5 rounded-[14px] bg-white/10 text-white font-sans text-[13px] font-semibold border-none cursor-pointer"
              >
                Add Cash
              </button>
              <button
                onClick={() =>
                  showResult({
                    kind: 'error',
                    title: 'Cash out unavailable',
                    message: 'No bank account is connected yet. Add a payout destination in Pengaturan first.',
                    primaryLabel: 'Got it',
                  })
                }
                className="flex-1 py-2.5 rounded-[14px] bg-white/10 text-white font-sans text-[13px] font-semibold border-none cursor-pointer"
              >
                Cash Out
              </button>
            </div>
          </div>

          {/* Claimable */}
          {claimables.length > 0 && (
            <>
              <div className="text-[15px] font-semibold text-forest mb-3">Ready to Claim</div>
              {claimables.map((c) => (
                <ClaimableRow key={c.code} claimable={c} onClaim={() => openSheet('claim')} />
              ))}
            </>
          )}

          {/* Vault Shares */}
          <div className="text-[15px] font-semibold text-forest mb-1">My Vault Shares</div>
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

          <div className="mt-6">
            <SettingsGroup title="Preferensi">
              <SettingsRow
                Icon={Languages}
                label="Language"
                hint="Bahasa Indonesia"
                trailing="ID"
                onClick={() => showToast('Language settings')}
              />
              <SettingsRow
                Icon={CurrencyIcon}
                label="Currency"
                hint="Indonesian Rupiah"
                trailing="IDR"
                onClick={() => showToast('Currency settings')}
              />
              <SettingsRow
                Icon={Bell}
                label="Notifications"
                hint="Harvest, claims, market"
                onClick={() => showToast('Notifications')}
              />
            </SettingsGroup>

            <SettingsGroup title="Pengaturan">
              <SettingsRow
                Icon={ShieldCheck}
                label="Security & PIN"
                hint="Biometric, 6-digit PIN"
                onClick={() => showToast('Security settings')}
              />
              <SettingsRow
                Icon={WalletIcon}
                label="Connected Wallet"
                hint={address}
                onClick={() => showToast('Wallet management')}
              />
              <SettingsRow
                Icon={CloudUpload}
                label="Backup & Recovery"
                hint="Last backup 3 days ago"
                onClick={() => showToast('Backup options')}
              />
            </SettingsGroup>

            <SettingsGroup title="Lainnya">
              <SettingsRow
                Icon={HelpCircle}
                label="Help & Support"
                onClick={() => showToast('Help center')}
              />
              <SettingsRow
                Icon={FileText}
                label="Terms & Privacy"
                onClick={() => showToast('Terms & privacy')}
              />
              <SettingsRow
                Icon={Info}
                label="About Panora"
                trailing="v1.0"
                onClick={() => showToast('About Panora')}
              />
              <SettingsRow
                Icon={LogOut}
                label="Log out"
                tone="danger"
                onClick={() => {
                  signOut().catch((err) => showToast(`Sign out failed: ${err.message}`))
                }}
              />
            </SettingsGroup>
          </div>

          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}
