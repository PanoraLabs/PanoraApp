import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowUpDown, Sparkles, MapPin, X } from 'lucide-react'
import { TopNav } from '@/components/TopNav'
import { useAppStore } from '@/store/app-store'
import { useExploreFilters, useExploreVaults } from '@/hooks/useVaults'
import { ExploreVaultCard } from '@/components/shared/ExploreVaultCard'
import { Input } from '@/components/ui/input'
import { CropIcon } from '@/lib/icons'
import { staggerContainer, staggerItem } from '@/motion/variants'
import { cn } from '@/lib/utils'
import type { ExploreVault } from '@/data/vaults'

type SortKey = 'apy' | 'newest' | 'funded'

const SORT_LABELS: Record<SortKey, string> = {
  apy: 'Highest return',
  newest: 'Just opened',
  funded: 'Almost full',
}

export function ExploreScreen() {
  const { openSheet, showToast } = useAppStore()
  const filters = useExploreFilters()
  const vaults = useExploreVaults()

  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState(filters.find((f) => f.active)?.label ?? 'All')
  const [sort, setSort] = useState<SortKey>('apy')
  const [sortOpen, setSortOpen] = useState(false)

  const featured = useMemo(() => vaults.filter((v) => v.highlight || (!v.full && v.funded < 80)), [vaults])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list: ExploreVault[] = vaults.filter((v) => {
      if (!q) return true
      return (
        v.name.toLowerCase().includes(q) ||
        v.loc.toLowerCase().includes(q) ||
        v.type.toLowerCase().includes(q)
      )
    })
    if (sort === 'apy') list = [...list].sort((a, b) => parseFloat(b.apy) - parseFloat(a.apy))
    if (sort === 'funded') list = [...list].sort((a, b) => b.funded - a.funded)
    return list
  }, [vaults, query, sort])

  const filterActive = activeFilter !== 'All'

  return (
    <div className="flex flex-col h-full bg-surface">
      <TopNav title="Discover Vaults" showBack={false} action={{ label: 'Filter', onClick: () => showToast('Filter opened') }} />
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="px-[22px] pt-[18px]">
          {/* Search */}
          <div className="relative mb-3.5">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone z-10" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-auto py-3 pl-10 pr-9 bg-surface border-[1.5px] border-input rounded-xl font-sans text-sm text-forest placeholder:text-stone focus-visible:border-leaf focus-visible:ring-0 transition-colors"
              placeholder="Search by crop or location..."
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-forest cursor-pointer"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Featured / Trending */}
          {featured.length > 0 && !query && (
            <div className="mb-[18px]">
              <div className="flex items-center justify-between mb-2.5">
                <div className="text-[14px] font-semibold text-forest inline-flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-gold" />
                  Featured
                </div>
                <span className="text-[10px] text-stone uppercase tracking-wider">Trending now</span>
              </div>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="flex gap-3 overflow-x-auto hide-scrollbar -mx-[22px] px-[22px] pb-1"
              >
                {featured.map((v) => (
                  <motion.button
                    key={v.name}
                    variants={staggerItem}
                    onClick={() => openSheet(v.highlight ? 'stake' : 'vault-detail')}
                    className={cn(
                      'shrink-0 w-[200px] text-left rounded-[16px] p-3.5 cursor-pointer border',
                      v.highlight
                        ? 'bg-gradient-to-br from-gold/15 to-amber/10 border-gold/40'
                        : 'bg-card-bg border-border'
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <CropIcon crop={v.crop} size="md" />
                      {v.highlight && (
                        <span className="bg-gold text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                          {v.status}
                        </span>
                      )}
                    </div>
                    <div className="text-[14px] font-semibold text-forest leading-tight mb-0.5 truncate">{v.name}</div>
                    <div className="text-[10px] text-stone inline-flex items-center gap-1 mb-2">
                      <MapPin className="size-3" />
                      {v.loc}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-lg text-sprout leading-none">{v.apy}</span>
                      <span className="text-[10px] text-stone">est. return</span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          )}

          {/* Filter chips */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-3 pb-0.5">
            {filters.map((f) => (
              <button
                key={f.label}
                onClick={() => setActiveFilter(f.label)}
                className={cn(
                  'px-3.5 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap cursor-pointer shrink-0 border-[1.5px] transition-colors',
                  activeFilter === f.label
                    ? 'bg-forest text-white font-semibold border-forest'
                    : 'bg-card-bg border-input text-stone'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Results header: count + sort */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-[11px] text-stone">
              <span className="font-semibold text-forest">{visible.length}</span> {visible.length === 1 ? 'vault' : 'vaults'}
              {filterActive && <> in <span className="font-semibold text-forest">{activeFilter}</span></>}
            </div>
            <div className="relative">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-leaf cursor-pointer border-none bg-transparent"
              >
                <ArrowUpDown className="size-3" />
                {SORT_LABELS[sort]}
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1.5 z-20 bg-card-bg border border-border rounded-xl shadow-lg overflow-hidden min-w-[140px]">
                  {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
                    <button
                      key={k}
                      onClick={() => {
                        setSort(k)
                        setSortOpen(false)
                      }}
                      className={cn(
                        'block w-full text-left px-3 py-2 text-[12px] cursor-pointer border-none bg-transparent',
                        sort === k ? 'text-leaf font-semibold bg-leaf/5' : 'text-forest hover:bg-surface'
                      )}
                    >
                      {SORT_LABELS[k]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Vault cards */}
          {visible.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-14 h-14 rounded-full bg-card-bg border border-border flex items-center justify-center mb-3">
                <Search className="size-5 text-stone" />
              </div>
              <div className="text-[14px] font-semibold text-forest mb-1">No vaults match</div>
              <div className="text-[11px] text-stone mb-4 max-w-[220px]">
                Try a different crop, location, or clear your search to see all open vaults.
              </div>
              <button
                onClick={() => {
                  setQuery('')
                  setActiveFilter('All')
                }}
                className="text-[12px] font-semibold text-leaf border-none bg-transparent cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="flex flex-col gap-3"
            >
              {visible.map((v) => (
                <motion.div key={v.name} variants={staggerItem}>
                  <ExploreVaultCard
                    vault={v}
                    onClick={() => (v.highlight ? openSheet('stake') : openSheet('vault-detail'))}
                    onStake={() => openSheet('stake')}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}
