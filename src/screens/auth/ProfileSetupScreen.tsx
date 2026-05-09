import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useUser } from '@/hooks/useUser'
import { useAppStore } from '@/store/app-store'

export function ProfileSetupScreen() {
  const { googleName, googleEmail, walletAddress, saveProfile, signOut } = useUser()
  const showResult = useAppStore((s) => s.showResult)
  const [name, setName] = useState(googleName ?? '')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (googleName && !name) setName(googleName)
  }, [googleName, name])

  const walletReady = walletAddress !== null
  const canSubmit = name.trim().length >= 2 && walletReady && !submitting

  async function handleContinue() {
    setError(null)
    if (name.trim().length < 2) {
      setError('Please enter a name with at least 2 characters.')
      return
    }
    if (!walletReady) {
      setError('Setting up your account... give us a moment.')
      return
    }
    setSubmitting(true)
    try {
      await saveProfile(name.trim())
      showResult({
        kind: 'success',
        title: `Welcome, ${name.trim().split(/\s+/)[0]}!`,
        message:
          "Your account is ready. We've set up a secure account ID for you — no seed phrase needed.",
        primaryLabel: 'Start exploring',
      })
    } catch (e) {
      setError(humanize(e))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-surface px-6 pt-6 pb-7">
      <div className="flex items-center gap-1.5 mb-7">
        <div className="h-1 rounded-full bg-forest w-7" />
        <div className="h-1 rounded-full bg-forest w-7" />
        <div className="h-1 rounded-full bg-forest w-7" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex-1 flex flex-col"
      >
        <h1 className="text-2xl font-semibold text-forest tracking-tight mb-1.5">
          What should we call you?
        </h1>
        <p className="text-[13px] text-stone leading-relaxed mb-6">
          This is how we'll greet you on the home screen. You can change it later.
        </p>

        <label className="text-[11px] font-semibold text-stone uppercase tracking-wider mb-1.5 block">
          Your name
        </label>
        <input
          type="text"
          autoFocus
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && canSubmit && handleContinue()}
          placeholder="e.g. Agung Wibowo"
          className="w-full py-3 px-3.5 bg-card-bg border-[1.5px] border-input rounded-xl font-sans text-sm text-forest outline-none focus:border-leaf transition-colors mb-3"
        />

        {googleEmail && (
          <div className="text-[11px] text-stone mb-3">
            Signing in as <span className="text-forest font-medium">{googleEmail}</span>
          </div>
        )}

        {!walletReady && (
          <div className="bg-mist text-moss rounded-lg px-3 py-2.5 text-[12px] mb-3 inline-flex items-center gap-2">
            <Loader2 className="size-3.5 animate-spin" />
            Setting up your account ID...
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 text-[12px] rounded-lg px-3 py-2 mb-3">
            {error}
          </div>
        )}

        <div className="mt-auto">
          <button
            onClick={handleContinue}
            disabled={!canSubmit}
            className="w-full py-3.5 rounded-[14px] bg-forest text-white font-sans text-[14px] font-semibold border-none cursor-pointer active:bg-moss transition-colors disabled:opacity-60"
          >
            {submitting ? 'Creating your account...' : 'Continue'}
          </button>
          <button
            onClick={signOut}
            className="w-full mt-2 py-2 text-[12px] text-stone bg-transparent border-none cursor-pointer"
          >
            Use a different account
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function humanize(e: unknown): string {
  if (e instanceof Error) return e.message
  return 'Could not save your profile. Please try again.'
}
