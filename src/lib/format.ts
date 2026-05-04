const groupedNumber = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

export function formatRupiah(value: number): string {
  return `Rp ${groupedNumber.format(value)}`
}

export function formatRupiahCompact(value: number): string {
  if (value >= 1_000_000_000) return `Rp ${(value / 1_000_000_000).toFixed(value % 1_000_000_000 === 0 ? 0 : 1)}B`
  if (value >= 1_000_000) return `Rp ${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`
  if (value >= 1_000) return `Rp ${(value / 1_000).toFixed(0)}k`
  return `Rp ${value}`
}

export function formatPercent(value: number, fractionDigits = 0): string {
  return `${value.toFixed(fractionDigits)}%`
}

export function formatSignedRupiahCompact(value: number): string {
  const sign = value > 0 ? '+' : value < 0 ? '−' : ''
  return `${sign}${formatRupiahCompact(Math.abs(value))}`
}

export function shortenAddress(address: string, head = 4, tail = 4): string {
  if (address.length <= head + tail + 3) return address
  return `${address.slice(0, head)}...${address.slice(-tail)}`
}
