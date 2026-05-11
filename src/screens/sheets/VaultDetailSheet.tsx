import { useMemo } from 'react'
import { Thermometer, Droplets, Sprout, Sun } from 'lucide-react'
import { BottomSheet } from '@/components/BottomSheet'
import { useAppStore } from '@/store/app-store'
import { useDemoStore } from '@/store/demo-store'
import { useIoTFeed } from '@/hooks/useHome'
import { CropIcon, type CropKey } from '@/lib/icons'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { formatUsd, parseUsd } from '@/lib/format'
import { exploreVaults } from '@/data/vaults'

export function VaultDetailSheet() {
  const { closeSheet, openSheet, sheetContext } = useAppStore()
  const positions = useDemoStore((s) => s.positions)
  const activeVaults = useDemoStore((s) => s.activeVaults)
  const iot = useIoTFeed()

  const vault = useMemo(() => {
    const code = sheetContext?.vaultCode
    const active = activeVaults.find((v) => v.name === code)
    const position = positions.find((p) => p.code === code)
    const explore = exploreVaults.find((v) => v.name === code)

    const crop: CropKey = (sheetContext?.crop as CropKey) ?? active?.crop ?? position?.crop ?? explore?.crop ?? 'chili'
    const name = code ?? explore?.name ?? 'Vault detail'
    const sub = sheetContext?.vaultSub ?? active?.type ?? explore?.type ?? '—'
    const apyLabel = sheetContext?.apyLabel ?? active?.apy ?? explore?.apy ?? '—'
    const daysLeftLabel = sheetContext?.daysLeftLabel ?? active?.daysLeft ?? explore?.duration ?? '—'
    const investedUsd = position ? parseUsd(position.val) : 0
    const pct = sheetContext?.pct ?? active?.pct ?? explore?.funded ?? 0
    const status = active?.status ?? (explore?.status === 'Sold out' ? 'Sold out' : 'Open')
    const hasPosition = !!position

    return { crop, name, sub, apyLabel, daysLeftLabel, investedUsd, pct, status, hasPosition }
  }, [sheetContext, activeVaults, positions])

  return (
    <BottomSheet id="vault-detail">
      <div className="flex items-center gap-3 mb-[18px]">
        <CropIcon crop={vault.crop} size="xl" />
        <div className="min-w-0">
          <div className="text-[10px] text-stone uppercase tracking-wider mb-0.5 truncate">{vault.sub}</div>
          <div className="text-lg font-semibold text-forest truncate">{vault.name}</div>
        </div>
        <span className="ml-auto">
          <StatusBadge tone="leaf-soft">{vault.status}</StatusBadge>
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'You invested', val: vault.investedUsd > 0 ? formatUsd(vault.investedUsd) : '—' },
          { label: 'Est. return', val: vault.apyLabel, color: 'text-sprout' },
          { label: 'Time left', val: vault.daysLeftLabel },
        ].map((m) => (
          <div key={m.label} className="bg-surface rounded-lg p-2">
            <div className="text-[9px] text-stone uppercase tracking-wider mb-0.5">{m.label}</div>
            <div className={`font-serif text-base ${m.color ?? 'text-forest'}`}>{m.val}</div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-[10px] text-stone mb-1">
          <span>Progress</span>
          <span className="font-serif text-forest">{vault.pct}%</span>
        </div>
        <div className="h-1.5 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-leaf to-sprout"
            style={{ width: `${Math.min(100, Math.max(0, vault.pct))}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-surface rounded-lg p-2">
          <div className="text-[9px] text-stone uppercase tracking-wider mb-0.5">Farmer / Agent</div>
          <div className="text-xs font-medium text-forest">Pak Hendra G.</div>
        </div>
        <div className="bg-surface rounded-lg p-2">
          <div className="text-[9px] text-stone uppercase tracking-wider mb-0.5">Buyer</div>
          <div className="text-xs font-medium text-forest">PT Agro Segar</div>
        </div>
      </div>

      {/* Live readings */}
      <div className="bg-forest rounded-[14px] p-3.5 mb-4">
        <div className="text-[11px] text-white/40 mb-2.5 flex items-center">
          <span className="live-dot inline-block w-1.5 h-1.5 rounded-full bg-sprout mr-1 align-middle" />
          Live from the farm
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { Icon: Thermometer, val: `${iot.temp}°C`, label: 'Temp' },
            { Icon: Droplets, val: `${iot.rh}%`, label: 'Humidity' },
            { Icon: Sprout, val: iot.ph, label: 'Soil pH' },
            { Icon: Sun, val: `${iot.lux}k`, label: 'Light', color: 'text-amber' },
          ].map((d) => (
            <div key={d.label} className="text-center">
              <d.Icon className="size-3.5 mx-auto mb-1 text-white/60" />
              <div className={`font-serif text-base ${d.color ?? 'text-white'}`}>{d.val}</div>
              <div className="text-[9px] text-white/40">{d.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2.5">
        <button
          onClick={() => {
            closeSheet()
            setTimeout(() => openSheet('stake', sheetContext ?? undefined), 200)
          }}
          className="flex-[2] py-3.5 rounded-[14px] bg-forest text-white font-sans text-[15px] font-semibold border-none cursor-pointer active:bg-moss transition-colors"
        >
          {vault.hasPosition ? 'Invest More' : 'Invest now'}
        </button>
        {vault.hasPosition && (
          <button
            onClick={() => {
              closeSheet()
              setTimeout(
                () => openSheet('sell', { positionCode: vault.name }),
                200
              )
            }}
            className="flex-1 py-3.5 rounded-[14px] bg-surface text-forest font-sans text-[15px] font-semibold border-[1.5px] border-input cursor-pointer"
          >
            Sell
          </button>
        )}
      </div>
    </BottomSheet>
  )
}
