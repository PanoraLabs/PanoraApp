import type { ReactNode } from 'react'

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-[390px] h-[844px] bg-surface rounded-[48px] overflow-hidden relative flex flex-col shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_40px_100px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.04)] [@media(display-mode:standalone)]:w-full [@media(display-mode:standalone)]:max-w-full [@media(display-mode:standalone)]:h-dvh [@media(display-mode:standalone)]:rounded-none [@media(display-mode:standalone)]:shadow-none">
      {children}
    </div>
  )
}
