import type { ReactNode } from 'react'

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex flex-col w-full max-w-[520px] h-dvh bg-surface relative overflow-hidden md:my-6 md:h-[calc(100dvh-3rem)] md:rounded-[28px] md:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.04)]">
      {children}
    </div>
  )
}
