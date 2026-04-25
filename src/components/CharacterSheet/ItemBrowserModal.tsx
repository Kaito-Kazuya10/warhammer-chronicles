import { useState, useMemo } from 'react'
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
} from '@/components/ui/tooltip'
import { useCharacterStore } from '../../store/characterStore'
import { getAllItems } from '../../modules/registry'
import { weaponProperties } from '../../modules/core/items/weapons'
import type { Item, ItemType, ItemTier, WeaponCategory } from '../../types/module'

interface Props {
  characterId: string
  open: boolean
  onClose: () => void
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TIER_BADGE: Record<string, string> = {
  'standard':       'bg-muted text-muted-foreground border-border',
  'master-crafted': 'bg-green-500/15 text-green-700 border-green-500/30',
  'artificer':      'bg-purple-500/15 text-purple-700 border-purple-500/30',
  'relic':          'bg-[var(--wh-gold)]/15 text-[var(--wh-gold)] border-[var(--wh-gold)]/30',
  'heroic':         'bg-red-500/15 text-red-700 border-red-500/30',
}

const TYPE_FILTERS: { value: ItemType | 'all'; label: string }[] = [
  { value: 'all',        label: 'ALL'        },
  { value: 'weapon',     label: 'WEAPONS'    },
  { value: 'armor',      label: 'ARMOR'      },
  { value: 'consumable', label: 'CONSUMABLE' },
  { value: 'gear',       label: 'GEAR'       },
]

const TIER_FILTERS: { value: ItemTier | 'all'; label: string }[] = [
  { value: 'all',            label: 'ALL'     },
  { value: 'standard',       label: 'STD'     },
  { value: 'master-crafted', label: 'MC'      },
  { value: 'artificer',      label: 'ART'     },
  { value: 'relic',          label: 'RELIC'   },
  { value: 'heroic',         label: 'HEROIC'  },
]

const CATEGORY_FILTERS: { value: WeaponCategory | 'all'; label: string }[] = [
  { value: 'all',     label: 'ALL'    },
  { value: 'simple',  label: 'SIMPLE' },
  { value: 'martial', label: 'MARTIAL'},
  { value: 'heavy',   label: 'HEAVY'  },
  { value: 'exotic',  label: 'EXOTIC' },
]

// lookup map for property tooltips
const PROP_MAP = new Map(weaponProperties.map(p => [p.name.toLowerCase(), p]))
function findPropTooltip(propName: string) {
  const key = propName.toLowerCase().replace(/\s*\([^)]*\)/g, '').trim()
  return PROP_MAP.get(key) ?? weaponProperties.find(p => key.startsWith(p.id))
}

// ─── ItemCard ─────────────────────────────────────────────────────────────────

function ItemCard({
  item,
  characterId,
}: {
  item: Item
  characterId: string
}) {
  const [expanded, setExpanded] = useState(false)
  const [qty, setQty] = useState(1)
  const inventory = useCharacterStore(s => s.characters.find(c => c.id === characterId)?.inventory ?? [])
  const updateCharacter = useCharacterStore(s => s.updateCharacter)
  const effectiveTier = item.tier ?? 'standard'

  function addToInventory() {
    updateCharacter(characterId, {
      inventory: [...inventory, { itemId: item.id, quantity: qty }],
    })
    setQty(1)
  }

  const statLine = item.type === 'weapon'
    ? [item.damage && `${item.damage} ${item.damageType ?? ''}`.trim(), item.range && `${item.range.normal}${item.range.long ? `/${item.range.long}` : ''} ft`].filter(Boolean).join(' · ')
    : item.type === 'armor'
      ? `AC ${item.armorClass ?? '—'}`
      : item.consumableEffect
        ? item.consumableEffect.slice(0, 60) + (item.consumableEffect.length > 60 ? '…' : '')
        : ''

  return (
    <div className="border border-border rounded-md overflow-hidden">
      {/* Header row */}
      <button
        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-muted/30 transition-colors text-left"
        onClick={() => setExpanded(e => !e)}
      >
        <span
          className="text-xs text-muted-foreground/50 shrink-0 transition-transform duration-150"
          style={{ transform: expanded ? 'rotate(90deg)' : undefined }}
        >▶</span>
        <span className="flex-1 min-w-0">
          <span className="font-medium text-base">{item.name}</span>
          {statLine && (
            <span className="ml-2 text-sm text-muted-foreground">{statLine}</span>
          )}
        </span>
        <Badge className={`text-[11px] py-0 px-1.5 border shrink-0 ${TIER_BADGE[effectiveTier]}`}>
          {effectiveTier === 'master-crafted' ? 'MC' : effectiveTier.toUpperCase()}
        </Badge>
        {item.cost && (
          <span className="text-xs text-muted-foreground shrink-0">{item.cost}</span>
        )}
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="px-3 pb-3 pt-1 border-t border-border space-y-2 bg-muted/10">
          {item.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          )}

          {/* Properties with tooltips */}
          {item.properties && item.properties.length > 0 && (
            <TooltipProvider>
              <div className="flex flex-wrap gap-1">
                {item.properties.map(p => {
                  const tip = findPropTooltip(p)
                  return tip ? (
                    <Tooltip key={p}>
                      <TooltipTrigger>
                        <Badge variant="outline" className="text-xs cursor-help">{p}</Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-semibold text-sm mb-0.5">{tip.name}</p>
                        <p className="text-sm opacity-90 max-w-[220px]">{tip.shortDescription}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Badge key={p} variant="outline" className="text-xs">{p}</Badge>
                  )
                })}
              </div>
            </TooltipProvider>
          )}

          {/* Ammo info */}
          {item.ammoType && item.ammoType !== 'unlimited' && item.ammoName && (
            <p className="text-xs text-muted-foreground">
              Ammo: {item.ammoName} · {
                item.ammoType === 'pack'
                  ? `${item.ammoCapacity} packs/session`
                  : `${item.ammoCapacity} shots`
              }{item.rechargeable ? ' · Rechargeable' : ''}
            </p>
          )}

          {/* Item abilities */}
          {item.itemAbilities && item.itemAbilities.length > 0 && (
            <div className="space-y-1">
              {item.itemAbilities.map((ab, i) => (
                <div key={i} className="rounded border border-border/60 px-2 py-1 text-sm">
                  <span className="font-semibold">{ab.name}</span>
                  <span className="text-muted-foreground ml-1.5">{ab.description}</span>
                </div>
              ))}
            </div>
          )}

          {/* Add controls */}
          <div className="flex items-center gap-2 pt-1">
            <button
              className="w-6 h-6 rounded border border-border text-base font-bold hover:bg-muted transition-colors"
              onClick={() => setQty(q => Math.max(1, q - 1))}
            >−</button>
            <span className="text-base font-mono w-6 text-center">{qty}</span>
            <button
              className="w-6 h-6 rounded border border-border text-base font-bold hover:bg-muted transition-colors"
              onClick={() => setQty(q => q + 1)}
            >+</button>
            <Button size="sm" className="h-7 text-sm ml-2" onClick={addToInventory}>
              ADD TO INVENTORY
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── FilterPills ─────────────────────────────────────────────────────────────

function FilterPills<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map(o => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
            value === o.value
              ? 'bg-foreground text-background border-foreground'
              : 'bg-transparent text-muted-foreground border-border hover:border-foreground/40'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

// ─── ItemBrowserModal ─────────────────────────────────────────────────────────

export default function ItemBrowserModal({ characterId, open, onClose }: Props) {
  const [search,         setSearch        ] = useState('')
  const [typeFilter,     setTypeFilter    ] = useState<ItemType | 'all'>('all')
  const [tierFilter,     setTierFilter    ] = useState<ItemTier | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState<WeaponCategory | 'all'>('all')

  const allItems = useMemo(() => getAllItems(), [])

  const filtered = useMemo(() => allItems.filter(item => {
    if (typeFilter !== 'all' && item.type !== typeFilter) return false
    const effectiveTier = item.tier ?? 'standard'
    if (tierFilter !== 'all' && effectiveTier !== tierFilter) return false
    if (typeFilter === 'weapon' && categoryFilter !== 'all' && item.weaponCategory !== categoryFilter) return false
    if (search) {
      const q = search.toLowerCase()
      if (!item.name.toLowerCase().includes(q) && !item.description.toLowerCase().includes(q)) return false
    }
    return true
  }), [allItems, typeFilter, tierFilter, categoryFilter, search])

  return (
    <AlertDialog open={open} onOpenChange={v => { if (!v) onClose() }}>
      <AlertDialogContent className="max-w-3xl w-full max-h-[90vh] flex flex-col gap-0 p-0 overflow-hidden">
        <AlertDialogHeader className="px-4 pt-4 pb-3 border-b border-border shrink-0">
          <div className="flex items-center justify-between">
            <AlertDialogTitle className="text-base font-bold tracking-widest uppercase text-foreground">
              Item Browser
            </AlertDialogTitle>
            <div className="flex items-center gap-3">
              <p className="text-xs text-muted-foreground">{filtered.length} items</p>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors text-lg leading-none"
                aria-label="Close"
              >✕</button>
            </div>
          </div>
        </AlertDialogHeader>

        {/* Filters */}
        <div className="px-4 py-3 border-b border-border space-y-2 shrink-0">
          <Input
            placeholder="Search by name or description…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-8 text-base"
          />
          <FilterPills options={TYPE_FILTERS}     value={typeFilter}     onChange={setTypeFilter} />
          <FilterPills options={TIER_FILTERS}     value={tierFilter}     onChange={setTierFilter} />
          {typeFilter === 'weapon' && (
            <FilterPills options={CATEGORY_FILTERS} value={categoryFilter} onChange={setCategoryFilter} />
          )}
        </div>

        {/* Item list */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 gap-2 text-muted-foreground/50">
              <span className="text-2xl">🔍</span>
              <span className="text-base italic">No items match your filters.</span>
            </div>
          ) : (
            filtered.map(item => (
              <ItemCard key={item.id} item={item} characterId={characterId} />
            ))
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
