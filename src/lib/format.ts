const groupedNumber = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

export function formatUsd(value: number): string {
  return `$${groupedNumber.format(value)}`
}

export function formatUsdCompact(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(value % 1_000_000_000 === 0 ? 0 : 1)}B`
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}k`
  return `$${value}`
}

export function formatPercent(value: number, fractionDigits = 0): string {
  return `${value.toFixed(fractionDigits)}%`
}

export function formatSignedUsdCompact(value: number): string {
  const sign = value > 0 ? '+' : value < 0 ? '−' : ''
  return `${sign}${formatUsdCompact(Math.abs(value))}`
}

export function shortenAddress(address: string, head = 4, tail = 4): string {
  if (address.length <= head + tail + 3) return address
  return `${address.slice(0, head)}...${address.slice(-tail)}`
}

export function formatShortDate(d = new Date()): string {
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric' })
}

export function formatMonthYear(d = new Date()): string {
  return d.toLocaleString('en-US', { month: 'long', year: 'numeric' })
}
