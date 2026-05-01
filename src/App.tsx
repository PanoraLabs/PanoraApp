import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '@/store/app-store'
import { PhoneFrame } from '@/components/PhoneFrame'
import { StatusBar } from '@/components/StatusBar'
import { BottomNav } from '@/components/BottomNav'
import { Toast } from '@/components/Toast'
import { HomeScreen } from '@/screens/HomeScreen'
import { ExploreScreen } from '@/screens/ExploreScreen'
import { PortfolioScreen } from '@/screens/PortfolioScreen'
import { MarketScreen } from '@/screens/MarketScreen'
import { ActivityScreen } from '@/screens/ActivityScreen'
import { PassportScreen } from '@/screens/PassportScreen'
import { WalletScreen } from '@/screens/WalletScreen'
import { StakeSheet } from '@/screens/sheets/StakeSheet'
import { ClaimSheet } from '@/screens/sheets/ClaimSheet'
import { VaultDetailSheet } from '@/screens/sheets/VaultDetailSheet'
import { BuySheet } from '@/screens/sheets/BuySheet'
import { SellSheet } from '@/screens/sheets/SellSheet'

const screens = {
  home: HomeScreen,
  explore: ExploreScreen,
  portfolio: PortfolioScreen,
  market: MarketScreen,
  activity: ActivityScreen,
  passport: PassportScreen,
  wallet: WalletScreen,
} as const

export default function App() {
  const screen = useAppStore((s) => s.screen)

  return (
    <PhoneFrame>
      <StatusBar />
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {Object.entries(screens).map(([key, Screen]) =>
            key === screen ? (
              <motion.div
                key={key}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Screen />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
        {/* Bottom sheets */}
        <StakeSheet />
        <ClaimSheet />
        <VaultDetailSheet />
        <BuySheet />
        <SellSheet />
      </div>
      <BottomNav />
      <Toast />
    </PhoneFrame>
  )
}
