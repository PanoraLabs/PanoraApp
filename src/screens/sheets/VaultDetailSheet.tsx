import { Thermometer, Droplets, Sprout, Sun } from 'lucide-react'
import { BottomSheet } from '@/components/BottomSheet'
import { useAppStore } from '@/store/app-store'
import { CropIcon } from '@/lib/icons'
import { StatusBadge } from '@/components/shared/StatusBadge'

export function VaultDetailSheet() {
  const { closeSheet, openSheet } = useAppStore()

  return (
    <BottomSheet id="vault-detail">
      <div className="flex items-center gap-3 mb-[18px]">
        <CropIcon crop="chili" size="xl" />
        <div>
          <div className="text-[10px] text-stone uppercase tracking-wider mb-0.5">Greenhouse · High Value</div>
          <div className="text-lg font-semibold text-forest">Red Chili · Subang</div>
        </div>
        <span className="ml-auto">
          <StatusBadge tone="leaf-soft">Growing</StatusBadge>
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'You invested', val: 'Rp 10M' },
          { label: 'Est. return', val: '18%', color: 'text-sprout' },
          { label: 'Days left', val: '25' },
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
          <span className="font-serif text-forest">72%</span>
        </div>
        <div className="h-1.5 bg-surface rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-leaf to-sprout" style={{ width: '72%' }} />
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
            { Icon: Thermometer, val: '28°C', label: 'Temp' },
            { Icon: Droplets, val: '82%', label: 'Humidity' },
            { Icon: Sprout, val: '6.4', label: 'Soil pH' },
            { Icon: Sun, val: '18k', label: 'Light', color: 'text-amber' },
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
          onClick={() => { closeSheet(); setTimeout(() => openSheet('stake'), 200) }}
          className="flex-[2] py-3.5 rounded-[14px] bg-forest text-white font-sans text-[15px] font-semibold border-none cursor-pointer active:bg-moss transition-colors"
        >
          Invest More
        </button>
        <button
          onClick={() => { closeSheet(); setTimeout(() => openSheet('sell'), 200) }}
          className="flex-1 py-3.5 rounded-[14px] bg-surface text-forest font-sans text-[15px] font-semibold border-[1.5px] border-input cursor-pointer"
        >
          Sell
        </button>
      </div>
    </BottomSheet>
  )
}
