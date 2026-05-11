import { useEffect, useState } from 'react'
import { iotInitial, userProfile, type HomeStat, type IoTReading } from '@/data/home'
import { initials, useUser } from '@/hooks/useUser'
import { useDemoStore } from '@/store/demo-store'
import { formatPercent, formatUsdCompact, parseUsd } from '@/lib/format'
import { usePortfolioSummary } from '@/hooks/usePortfolio'

export function useHomeStats(): HomeStat[] {
  const positions = useDemoStore((s) => s.positions)
  const activeVaults = useDemoStore((s) => s.activeVaults)
  const { investedUsd, estProfitUsd, avgApy } = usePortfolioSummary()
  const vaultCount = positions.length || activeVaults.length

  return [
    {
      val: investedUsd > 0 ? formatUsdCompact(investedUsd) : '$0',
      label: 'Invested',
      sub: `${vaultCount} vault${vaultCount === 1 ? '' : 's'}`,
    },
    {
      val: avgApy > 0 ? formatPercent(avgApy) : '—',
      label: 'Avg Return',
      sub: 'per year',
    },
    {
      val: estProfitUsd > 0 ? `+${formatUsdCompact(estProfitUsd)}` : '$0',
      label: 'Est. Profit',
      sub: 'at harvest',
    },
  ]
}

function greetingFor(date = new Date()): string {
  const h = date.getHours()
  if (h < 11) return 'Good morning,'
  if (h < 17) return 'Good afternoon,'
  return 'Good evening,'
}

export function useUserProfile() {
  const { user } = useUser()
  const cashUsd = useDemoStore((s) => s.cashUsd)
  const claimables = useDemoStore((s) => s.claimables)
  const { investedUsd, estProfitUsd, gainPercent } = usePortfolioSummary()

  const claimableValue = claimables.reduce((sum, c) => sum + parseUsd(c.amount), 0)
  const claimableSource = claimables[0]?.code
    ? `From your ${claimables[0].code} harvest`
    : 'Invest in a vault to start earning'
  const totalPortfolioValue = cashUsd + investedUsd

  const base = user
    ? { ...userProfile, greeting: greetingFor(), name: user.name, initials: initials(user.name) }
    : userProfile

  return {
    ...base,
    totalPortfolioValue,
    claimableValue,
    claimableSource,
    gainPercent,
    gainAmount: estProfitUsd > 0
      ? `+${formatUsdCompact(estProfitUsd)} est. at harvest`
      : 'Start your first vault',
  }
}

function jitter(base: number, range: number) {
  return (base + (Math.random() - 0.5) * range).toFixed(1)
}

export function useIoTFeed(intervalMs = 5000): IoTReading {
  const [iot, setIot] = useState<IoTReading>(iotInitial)

  useEffect(() => {
    const seed = () => ({
      temp: jitter(28, 1.5),
      rh: jitter(82, 4),
      ph: parseFloat(jitter(6.4, 0.3)).toFixed(1),
      lux: Math.round(parseFloat(jitter(18000, 2000)) / 1000),
    })
    setIot(seed())
    const id = setInterval(() => setIot(seed()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return iot
}
