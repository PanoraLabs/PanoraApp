import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePrivy } from '@privy-io/react-auth'
import { useWallets as useSolanaWallets } from '@privy-io/react-auth/solana'
import { useUser } from '@/hooks/useUser'
import { SplashScreen } from '@/screens/auth/SplashScreen'
import { WelcomeScreen } from '@/screens/auth/WelcomeScreen'
import { LoginScreen } from '@/screens/auth/LoginScreen'
import { ProfileSetupScreen } from '@/screens/auth/ProfileSetupScreen'

interface AuthGateProps {
  children: ReactNode
}

type UnauthedStep = 'welcome' | 'login'

export function AuthGate({ children }: AuthGateProps) {
  const { isReady, isAuthenticated, hasProfile, isLoadingProfile, walletAddress, signOut } =
    useUser()
  const [step, setStep] = useState<UnauthedStep>('welcome')

  // Diagnostics
  const privy = usePrivy()
  const solana = useSolanaWallets()
  useEffect(() => {
    console.log('[AuthGate] privy', {
      ready: privy.ready,
      authenticated: privy.authenticated,
      userId: privy.user?.id,
      linkedAccounts: privy.user?.linkedAccounts?.map((a) => ({
        type: (a as { type?: string }).type,
        chainType: (a as { chainType?: string }).chainType,
        address: (a as { address?: string }).address,
        walletClientType: (a as { walletClientType?: string }).walletClientType,
      })),
    })
    console.log('[AuthGate] solana', {
      ready: solana.ready,
      count: solana.wallets.length,
      addresses: solana.wallets.map((w) => w.address),
    })
  }, [privy.ready, privy.authenticated, privy.user?.id, solana.ready, solana.wallets.length])

  if (!isReady) {
    return <SplashScreen subtitle="Loading..." />
  }

  if (!isAuthenticated) {
    if (step === 'welcome') {
      return <WelcomeScreen onContinue={() => setStep('login')} />
    }
    return <LoginScreen onBack={() => setStep('welcome')} />
  }

  if (isLoadingProfile) {
    return <RecoverableSplash subtitle="Getting your profile..." onSignOut={signOut} />
  }

  if (!hasProfile) {
    if (!walletAddress) {
      return <RecoverableSplash subtitle="Setting up your account..." onSignOut={signOut} />
    }
    return <ProfileSetupScreen />
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="app"
        className="flex flex-col h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

function RecoverableSplash({
  subtitle,
  onSignOut,
}: {
  subtitle: string
  onSignOut: () => Promise<void>
}) {
  const [showEscape, setShowEscape] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setShowEscape(true), 6000)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className="relative h-full">
      <SplashScreen subtitle={subtitle} />
      {showEscape && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-x-0 bottom-10 flex flex-col items-center px-8 z-10"
        >
          <div className="text-[12px] text-white/55 text-center mb-3 leading-relaxed">
            Taking longer than usual. Check the browser console for details, or sign out and try
            again.
          </div>
          <button
            onClick={() => onSignOut().catch(console.error)}
            className="px-5 py-2.5 rounded-[14px] bg-white/15 text-white font-sans text-[13px] font-semibold border-none cursor-pointer active:bg-white/25 transition-colors"
          >
            Sign out and try again
          </button>
        </motion.div>
      )}
    </div>
  )
}
