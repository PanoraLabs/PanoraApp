import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, Mail } from 'lucide-react'
import { useLoginWithEmail, useLoginWithOAuth } from '@privy-io/react-auth'

interface LoginScreenProps {
  onBack: () => void
}

type Step = 'choose' | 'email' | 'verify'

export function LoginScreen({ onBack }: LoginScreenProps) {
  const [step, setStep] = useState<Step>('choose')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [resendIn, setResendIn] = useState(0)

  const { sendCode, loginWithCode, state: emailState } = useLoginWithEmail()
  const { initOAuth, loading: oauthLoading } = useLoginWithOAuth()

  const codeInputRef = useRef<HTMLInputElement>(null)

  const isSending = emailState.status === 'sending-code'
  const isSubmitting = emailState.status === 'submitting-code'
  const oauthBusy = oauthLoading

  useEffect(() => {
    if (step === 'verify' && codeInputRef.current) {
      codeInputRef.current.focus()
    }
  }, [step])

  useEffect(() => {
    if (resendIn <= 0) return
    const id = window.setTimeout(() => setResendIn((s) => s - 1), 1000)
    return () => window.clearTimeout(id)
  }, [resendIn])

  function isValidEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
  }

  async function handleSendCode() {
    setError(null)
    if (!isValidEmail(email)) {
      setError('Enter a valid email address.')
      return
    }
    try {
      await sendCode({ email: email.trim() })
      setStep('verify')
      setResendIn(30)
    } catch (e) {
      setError(humanizeError(e))
    }
  }

  async function handleResend() {
    setError(null)
    try {
      await sendCode({ email: email.trim() })
      setResendIn(30)
    } catch (e) {
      setError(humanizeError(e))
    }
  }

  async function handleVerify() {
    setError(null)
    if (code.length !== 6) {
      setError('Enter the 6-digit code from your email.')
      return
    }
    try {
      await loginWithCode({ code })
    } catch (e) {
      setError(humanizeError(e))
    }
  }

  async function handleGoogle() {
    setError(null)
    try {
      await initOAuth({ provider: 'google' })
    } catch (e) {
      setError(humanizeError(e))
    }
  }

  function backFromInner() {
    if (step === 'verify') {
      setCode('')
      setStep('email')
      return
    }
    if (step === 'email') {
      setStep('choose')
      return
    }
    onBack()
  }

  return (
    <div className="flex flex-col h-full bg-surface px-6 pt-5 pb-7">
      <button
        onClick={backFromInner}
        className="w-9 h-9 rounded-full bg-card-bg border-none flex items-center justify-center text-forest cursor-pointer mb-4 self-start active:bg-mist transition-colors"
        aria-label="Back"
      >
        <ChevronLeft className="size-5" />
      </button>

      <ProgressDots step={step} />

      <motion.div
        key={step}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22 }}
        className="flex-1 flex flex-col"
      >
        {step === 'choose' && (
          <>
            <h1 className="text-2xl font-semibold text-forest tracking-tight mb-1.5">
              Welcome
            </h1>
            <p className="text-[13px] text-stone leading-relaxed mb-7">
              Sign in or create an account to start investing.
            </p>

            <button
              onClick={handleGoogle}
              disabled={oauthBusy}
              className="w-full py-3.5 rounded-[14px] bg-card-bg border-[1.5px] border-input text-forest font-sans text-[14px] font-semibold cursor-pointer flex items-center justify-center gap-3 mb-2.5 active:bg-mist transition-colors disabled:opacity-60"
            >
              <GoogleGlyph />
              {oauthBusy ? 'Connecting...' : 'Continue with Google'}
            </button>

            <button
              onClick={() => setStep('email')}
              className="w-full py-3.5 rounded-[14px] bg-forest text-white font-sans text-[14px] font-semibold border-none cursor-pointer flex items-center justify-center gap-2 active:bg-moss transition-colors"
            >
              <Mail className="size-4" />
              Continue with email
            </button>

            <div className="text-[11px] text-stone text-center mt-auto pt-6">
              We'll set up a secure account for you automatically. No seed phrases, no jargon.
            </div>
          </>
        )}

        {step === 'email' && (
          <>
            <h1 className="text-2xl font-semibold text-forest tracking-tight mb-1.5">
              Enter your email
            </h1>
            <p className="text-[13px] text-stone leading-relaxed mb-6">
              We'll send you a 6-digit code to confirm.
            </p>

            <label className="text-[11px] font-semibold text-stone uppercase tracking-wider mb-1.5 block">
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendCode()}
              placeholder="you@example.com"
              className="w-full py-3 px-3.5 bg-card-bg border-[1.5px] border-input rounded-xl font-sans text-sm text-forest outline-none focus:border-leaf transition-colors mb-3"
            />

            {error && <ErrorBanner message={error} />}

            <button
              onClick={handleSendCode}
              disabled={isSending || !email}
              className="w-full mt-auto py-3.5 rounded-[14px] bg-forest text-white font-sans text-[14px] font-semibold border-none cursor-pointer active:bg-moss transition-colors disabled:opacity-60"
            >
              {isSending ? 'Sending code...' : 'Send code'}
            </button>
          </>
        )}

        {step === 'verify' && (
          <>
            <h1 className="text-2xl font-semibold text-forest tracking-tight mb-1.5">
              Check your email
            </h1>
            <p className="text-[13px] text-stone leading-relaxed mb-6">
              We sent a 6-digit code to <span className="text-forest font-medium">{email}</span>.
            </p>

            <label className="text-[11px] font-semibold text-stone uppercase tracking-wider mb-1.5 block">
              Verification code
            </label>
            <input
              ref={codeInputRef}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              placeholder="000000"
              className="w-full py-3 px-3.5 bg-card-bg border-[1.5px] border-input rounded-xl font-serif text-2xl text-forest outline-none focus:border-leaf transition-colors text-center tracking-[0.4em] mb-2"
            />

            <div className="text-[11px] text-stone mb-5">
              Didn't get it?{' '}
              {resendIn > 0 ? (
                <span>Resend in {resendIn}s</span>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-leaf font-semibold border-none bg-transparent cursor-pointer p-0"
                >
                  Resend code
                </button>
              )}
            </div>

            {error && <ErrorBanner message={error} />}

            <button
              onClick={handleVerify}
              disabled={isSubmitting || code.length !== 6}
              className="w-full mt-auto py-3.5 rounded-[14px] bg-forest text-white font-sans text-[14px] font-semibold border-none cursor-pointer active:bg-moss transition-colors disabled:opacity-60"
            >
              {isSubmitting ? 'Verifying...' : 'Verify'}
            </button>
          </>
        )}
      </motion.div>
    </div>
  )
}

function ProgressDots({ step }: { step: Step }) {
  const idx = step === 'choose' ? 0 : step === 'email' ? 1 : 2
  return (
    <div className="flex items-center gap-1.5 mb-7">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all ${
            i <= idx ? 'bg-forest w-7' : 'bg-input w-3'
          }`}
        />
      ))}
    </div>
  )
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="bg-red-50 text-red-600 text-[12px] rounded-lg px-3 py-2 mb-3">
      {message}
    </div>
  )
}

function GoogleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29 35.5 26.6 36.5 24 36.5c-5.1 0-9.6-3.3-11.2-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.7 2.1-2.1 3.9-3.9 5.1l6.2 5.2C41.7 35.5 44 30.2 44 24c0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  )
}

function humanizeError(e: unknown): string {
  if (e instanceof Error) {
    if (e.message.toLowerCase().includes('invalid')) return 'That code didn\'t match. Try again.'
    return e.message
  }
  return 'Something went wrong. Please try again.'
}
