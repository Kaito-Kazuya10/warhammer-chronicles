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
  { value: 'all',        label: 'ALL'         },
  { value: 'weapon',     label: 'WEAPONS'     },
  { value: 'armor',      label: 'ARMOR'       },
  { value: 'consumable', label: 'CONSUMABLES' },
  { value: 'gear',       label: 'GEAR'        },
  { value: 'tool',       label: 'TOOLS'       },
  { value: 'augment',    label: 'AUGMENTS'    },
]

const TIER_FILTERS: { value: ItemTier | 'all'; label: string }[] = [
  { value: 'all',            label: 'ALL'            },
  { value: 'standard',       label: 'STANDARD'       },
  { value: 'master-crafted', label: 'MASTER-CRAFTED' },
  { value: 'artificer',      label: 'ARTIFICER'      },
  { value: 'relic',          label: 'RELIC'           },
  { value: 'heroic',         label: 'HEROIC'         },
]

const CATEGORY_FILTERS: { value: WeaponCategory | 'all'; label: string }[] = [
  { value: 'all',     label: 'ALL'     },
  { value: 'simple',  label: 'SIMPLE'  },
  { value: 'martial', label: 'MARTIAL' },
  { value: 'heavy',   label: 'HEAVY'   },
  { value: 'exotic',  label: 'EXOTIC'  },
]

const PROP_MAP = new Map(weaponProperties.map(p => [p.name.toLowerCase(), p]))
function findPropTooltip(propName: string) {
  const key = propName.toLowerCase().replace(/\s*\([^)]*\)/g, '').trim()
  return PROP_MAP.get(key) ?? weaponProperties.find(p => key.startsWith(p.id))
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// ─── Item list row ───────────────────────────────────────────────────────────

function ItemRow({
  item,
  isSelected,
  onSelect,
}: {
  item: Item
  isSelected: boolean
  onSelect: () => void
}) {
  const effectiveTier = item.tier ?? 'standard'
  const statLine = item.type === 'weapon'
    ? [item.damage && `${item.damage} ${item.damageType ?? ''}`.trim(), item.range && `${item.range.normal}${item.range.long ? `/${item.range.long}` : ''} ft`].filter(Boolean).join(' · ')
    : item.type === 'armor'
      ? `AC ${item.armorClass ?? '—'}`
      : item.consumableEffect
        ? item.consumableEffect.slice(0, 40) + (item.consumableEffect.length > 40 ? '…' : '')
        : ''

  return (
    <button
      className={`w-full flex items-center gap-2 px-3 py-2 text-left transition-colors border-l-2 ${
        isSelected
          ? 'bg-accent/15 border-l-accent text-foreground'
          : 'border-l-transparent hover:bg-muted/30 text-foreground/90'
      }`}
      onClick={onSelect}
    >
      <span className="flex-1 min-w-0">
        <span className="font-medium text-sm">{item.name}</span>
        {statLine && (
          <span className="ml-2 text-xs text-muted-foreground">{statLine}</span>
        )}
      </span>
      <Badge className={`text-[10px] py-0 px-1.5 border shrink-0 ${TIER_BADGE[effectiveTier]}`}>
        {effectiveTier === 'master-crafted' ? 'MC' : effectiveTier.toUpperCase()}
      </Badge>
    </button>
  )
}

// ─── Item detail panel ───────────────────────────────────────────────────────

function ItemDetail({
  item,
  characterId,
}: {
  item: Item
  characterId: string
}) {
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

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
          <Badge className={`text-xs py-0.5 px-2 border shrink-0 ${TIER_BADGE[effectiveTier]}`}>
            {effectiveTier === 'master-crafted' ? 'MASTER-CRAFTED' : effectiveTier.toUpperCase()}
          </Badge>
        </div>
        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
          <span>{capitalize(item.type)}</span>
          {item.cost && <><span className="text-muted-foreground/30">·</span><span>{item.cost}</span></>}
          {item.weight != null && <><span className="text-muted-foreground/30">·</span><span>{item.weight} lb</span></>}
        </div>
      </div>

      {/* Stat block */}
      {item.type === 'weapon' && (
        <div className="grid grid-cols-2 gap-2 text-sm">
          {item.damage && (
            <div className="bg-muted/20 rounded px-3 py-2">
              <span className="text-xs text-muted-foreground block">Damage</span>
              <span className="font-semibold">{item.damage} {item.damageType ?? ''}</span>
            </div>
          )}
          {item.range && (
            <div className="bg-muted/20 rounded px-3 py-2">
              <span className="text-xs text-muted-foreground block">Range</span>
              <span className="font-semibold">{item.range.normal}{item.range.long ? `/${item.range.long}` : ''} ft</span>
            </div>
          )}
          {item.weaponCategory && (
            <div className="bg-muted/20 rounded px-3 py-2">
              <span className="text-xs text-muted-foreground block">Category</span>
              <span className="font-semibold">{capitalize(item.weaponCategory)}</span>
            </div>
          )}
          {item.rangeType && (
            <div className="bg-muted/20 rounded px-3 py-2">
              <span className="text-xs text-muted-foreground block">Type</span>
              <span className="font-semibold">{capitalize(item.rangeType)}</span>
            </div>
          )}
        </div>
      )}
      {item.type === 'armor' && (
        <div className="grid grid-cols-2 gap-2 text-sm">
          {item.armorClass != null && (
            <div className="bg-muted/20 rounded px-3 py-2">
              <span className="text-xs text-muted-foreground block">Armor Class</span>
              <span className="font-semibold">AC {item.armorClass}{item.bonusAC ? ` (+${item.bonusAC})` : ''}</span>
            </div>
          )}
          {item.armorType && (
            <div className="bg-muted/20 rounded px-3 py-2">
              <span className="text-xs text-muted-foreground block">Type</span>
              <span className="font-semibold">{capitalize(item.armorType)}</span>
            </div>
          )}
          {item.strengthRequirement != null && (
            <div className="bg-muted/20 rounded px-3 py-2">
              <span className="text-xs text-muted-foreground block">STR Required</span>
              <span className="font-semibold">{item.strengthRequirement}</span>
            </div>
          )}
          {item.stealthDisadvantage && (
            <div className="bg-muted/20 rounded px-3 py-2">
              <span className="text-xs text-muted-foreground block">Stealth</span>
              <span className="font-semibold text-destructive">Disadvantage</span>
            </div>
          )}
        </div>
      )}

      {/* Description */}
      {item.description && (
        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
      )}

      {/* Lore */}
      {item.lore && (
        <p className="text-sm italic text-muted-foreground/70 border-l-2 border-accent/30 pl-3">{item.lore}</p>
      )}

      {/* Properties */}
      {item.properties && item.properties.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Properties</h4>
          <TooltipProvider>
            <div className="flex flex-wrap gap-1.5">
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
        </div>
      )}

      {/* Ammo info */}
      {item.ammoType && item.ammoType !== 'unlimited' && item.ammoName && (
        <div className="text-sm">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Ammunition</h4>
          <p className="text-muted-foreground">
            {item.ammoName} · {
              item.ammoType === 'pack'
                ? `${item.ammoCapacity} packs/session`
                : `${item.ammoCapacity} shots`
            }{item.rechargeable ? ' · Rechargeable' : ''}
          </p>
        </div>
      )}

      {/* Item abilities */}
      {item.itemAbilities && item.itemAbilities.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Abilities</h4>
          <div className="space-y-2">
            {item.itemAbilities.map((ab, i) => (
              <div key={i} className="rounded border border-border/60 px-3 py-2 text-sm">
                <span className="font-semibold">{ab.name}</span>
                {ab.actionType && (
                  <Badge variant="outline" className="text-[10px] ml-2 py-0">{ab.actionType}</Badge>
                )}
                {ab.usesPerRest && (
                  <Badge variant="outline" className="text-[10px] ml-1 py-0">{ab.usesCount ?? '?'}/{ab.usesPerRest}</Badge>
                )}
                <p className="text-muted-foreground mt-1">{ab.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Consumable effect */}
      {item.consumableEffect && (
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Effect</h4>
          <p className="text-sm text-muted-foreground">{item.consumableEffect}</p>
        </div>
      )}

      {/* Add controls */}
      <div className="flex items-center gap-2 pt-2 border-t border-border">
        <button
          className="w-7 h-7 rounded border border-border text-sm font-bold hover:bg-muted transition-colors"
          onClick={() => setQty(q => Math.max(1, q - 1))}
        >−</button>
        <span className="text-sm font-mono w-6 text-center">{qty}</span>
        <button
          className="w-7 h-7 rounded border border-border text-sm font-bold hover:bg-muted transition-colors"
          onClick={() => setQty(q => q + 1)}
        >+</button>
        <Button size="sm" className="h-8 text-sm ml-2" onClick={addToInventory}>
          ADD TO INVENTORY
        </Button>
      </div>
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
  const [selectedId,     setSelectedId    ] = useState<string | null>(null)

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

  const selectedItem = selectedId ? allItems.find(i => i.id === selectedId) ?? null : null

  return (
    <AlertDialog open={open} onOpenChange={v => { if (!v) onClose() }}>
      <AlertDialogContent className="max-w-6xl w-[90vw] h-[85vh] flex flex-col gap-0 p-0 overflow-hidden">
        {/* Header with search + filters */}
        <AlertDialogHeader className="px-5 pt-4 pb-3 border-b border-border shrink-0">
          <div className="flex items-center justify-between mb-3">
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
          <Input
            placeholder="Search by name or description…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-8 text-sm mb-2"
          />
          <div className="space-y-1.5">
            <FilterPills options={TYPE_FILTERS}     value={typeFilter}     onChange={setTypeFilter} />
            <FilterPills options={TIER_FILTERS}     value={tierFilter}     onChange={setTierFilter} />
            {typeFilter === 'weapon' && (
              <FilterPills options={CATEGORY_FILTERS} value={categoryFilter} onChange={setCategoryFilter} />
            )}
          </div>
        </AlertDialogHeader>

        {/* Two-panel body */}
        <div className="flex-1 flex min-h-0">
          {/* Left panel — scrollable item list */}
          <div className="w-1/2 border-r border-border overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 gap-2 text-muted-foreground/50">
                <span className="text-2xl">🔍</span>
                <span className="text-sm italic">No items match your filters.</span>
              </div>
            ) : (
              filtered.map(item => (
                <ItemRow
                  key={item.id}
                  item={item}
                  isSelected={selectedId === item.id}
                  onSelect={() => setSelectedId(item.id)}
                />
              ))
            )}
          </div>

          {/* Right panel — item detail */}
          <div className="w-1/2 overflow-y-auto px-5 py-4">
            {selectedItem ? (
              <ItemDetail item={selectedItem} characterId={characterId} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground/40 gap-2">
                <span className="text-3xl">📦</span>
                <span className="text-sm">Select an item to view details</span>
              </div>
            )}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
