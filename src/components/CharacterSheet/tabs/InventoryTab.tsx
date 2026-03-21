import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { useCharacterStore } from '../../../store/characterStore'
import { getItemById } from '../../../modules/registry'
import type { Item, FeatureActionType } from '../../../types/module'
import type { InventoryItem } from '../../../types/character'

interface Props {
  characterId: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TIER_BADGE: Record<string, string> = {
  uncommon: 'bg-green-500/15 text-green-700 border-green-500/30',
  rare:     'bg-blue-500/15 text-blue-700 border-blue-500/30',
  relic:    'bg-purple-500/15 text-purple-700 border-purple-500/30',
  heroic:   'bg-[var(--wh-gold)]/15 text-[var(--wh-gold)] border-[var(--wh-gold)]/30',
}

const ACTION_LABEL: Record<FeatureActionType, string> = {
  'action':       'Action',
  'bonus-action': 'Bonus',
  'reaction':     'Reaction',
  'free':         'Free',
  'passive':      'Passive',
  'special':      'Special',
}

// ─── Group definitions ────────────────────────────────────────────────────────

type GroupKey = 'Weapons' | 'Armor' | 'Gear' | 'Consumables' | 'Other'

function groupKey(item: Item | undefined): GroupKey {
  if (!item) return 'Other'
  if (item.type === 'weapon')  return 'Weapons'
  if (item.type === 'armor')   return 'Armor'
  if (item.type === 'consumable') return 'Consumables'
  if (item.type === 'gear' || item.type === 'tool' || item.type === 'magical') return 'Gear'
  return 'Other'
}

const GROUP_ORDER: GroupKey[] = ['Weapons', 'Armor', 'Gear', 'Consumables', 'Other']

// ─── ItemRow ──────────────────────────────────────────────────────────────────

interface ItemRowProps {
  entry: InventoryItem
  item: Item | undefined
  index: number
  characterId: string
}

function ItemRow({ entry, item, index, characterId }: ItemRowProps) {
  const [open, setOpen] = useState(false)
  const updateCharacter = useCharacterStore(s => s.updateCharacter)
  const inventory = useCharacterStore(s => s.characters.find(c => c.id === characterId)?.inventory ?? [])

  const displayName = item?.name ?? entry.itemId
  const hasDetails  = !!(item?.description || (item?.itemAbilities && item.itemAbilities.length > 0))

  function setQty(qty: number) {
    updateCharacter(characterId, {
      inventory: inventory.map((e, i) => i === index ? { ...e, quantity: Math.max(1, qty) } : e),
    })
  }

  function toggleEquipped(checked: boolean) {
    updateCharacter(characterId, {
      inventory: inventory.map((e, i) => i === index ? { ...e, equipped: checked } : e),
    })
  }

  function remove() {
    updateCharacter(characterId, {
      inventory: inventory.filter((_, i) => i !== index),
    })
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-muted/30 transition-colors group">
        {/* Expand toggle */}
        <CollapsibleTrigger asChild>
          <button
            className="flex-shrink-0 w-4 h-4 text-muted-foreground/50 hover:text-muted-foreground transition-colors disabled:opacity-30"
            disabled={!hasDetails}
            aria-label="Expand item details"
          >
            <span className="text-xs leading-none" style={{ display: 'inline-block', transform: open ? 'rotate(90deg)' : undefined, transition: 'transform 150ms' }}>▶</span>
          </button>
        </CollapsibleTrigger>

        {/* Name + tier badge */}
        <span className="flex-1 min-w-0 font-medium text-sm truncate">
          {displayName}
          {item?.tier && item.tier !== 'standard' && (
            <Badge className={`ml-1.5 text-[9px] py-0 px-1 ${TIER_BADGE[item.tier] ?? ''}`}>
              {item.tier.toUpperCase()}
            </Badge>
          )}
        </span>

        {/* Quantity */}
        <input
          type="number"
          min={1}
          value={entry.quantity}
          onChange={e => setQty(Number(e.target.value) || 1)}
          className="w-12 text-center text-xs font-mono bg-transparent border border-border rounded-md outline-none focus:border-ring py-0.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        {/* Weight */}
        {item?.weight != null && (
          <span className="text-xs text-muted-foreground w-12 text-right flex-shrink-0">
            {item.weight * entry.quantity} lb
          </span>
        )}

        {/* Equipped */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <Checkbox
            checked={entry.equipped ?? false}
            onCheckedChange={(v) => toggleEquipped(v as boolean)}
          />
          <span className="text-[9px] text-muted-foreground uppercase tracking-wide">EQ</span>
        </div>

        {/* Remove */}
        <Button
          variant="ghost"
          size="sm"
          onClick={remove}
          className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 text-destructive hover:text-destructive"
        >
          ×
        </Button>
      </div>

      {/* Expanded details */}
      <CollapsibleContent>
        <div className="mx-3 mb-2 mt-0.5 pl-6 text-sm text-muted-foreground space-y-2 border-l border-border">
          {item?.description && <p>{item.description}</p>}
          {item?.properties && item.properties.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.properties.map(p => (
                <Badge key={p} variant="outline" className="text-[10px]">{p}</Badge>
              ))}
            </div>
          )}
          {item?.itemAbilities && item.itemAbilities.length > 0 && (
            <div className="space-y-1">
              {item.itemAbilities.map((ab, i) => (
                <div key={i} className="rounded-md border border-border px-2 py-1.5">
                  <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                    <span className="text-xs font-semibold">{ab.name}</span>
                    {ab.actionType && (
                      <Badge className="text-[9px] py-0 px-1 bg-muted text-muted-foreground border-border">
                        {ACTION_LABEL[ab.actionType]}
                      </Badge>
                    )}
                    {ab.usesMax != null && (
                      <Badge variant="outline" className="text-[9px] py-0 px-1">
                        {ab.usesMax}/{ab.usesPerRest === 'short' ? 'SR' : 'LR'}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{ab.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// ─── AddItemForm ──────────────────────────────────────────────────────────────

function AddItemForm({ characterId, onClose }: { characterId: string; onClose: () => void }) {
  const [name, setName] = useState('')
  const [qty, setQty]   = useState(1)
  const inventory = useCharacterStore(s => s.characters.find(c => c.id === characterId)?.inventory ?? [])
  const updateCharacter = useCharacterStore(s => s.updateCharacter)

  function submit() {
    const trimmed = name.trim()
    if (!trimmed) return
    updateCharacter(characterId, {
      inventory: [...inventory, { itemId: trimmed, quantity: Math.max(1, qty) }],
    })
    setName('')
    setQty(1)
    onClose()
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-md border border-border">
      <Input
        placeholder="Item name or ID"
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') submit(); if (e.key === 'Escape') onClose() }}
        className="flex-1 h-7 text-sm"
        autoFocus
      />
      <input
        type="number"
        min={1}
        value={qty}
        onChange={e => setQty(Number(e.target.value) || 1)}
        className="w-14 text-center text-xs font-mono bg-transparent border border-border rounded-md outline-none focus:border-ring py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <Button size="sm" className="h-7 text-xs" onClick={submit}>Add</Button>
      <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={onClose}>Cancel</Button>
    </div>
  )
}

// ─── InventoryTab ─────────────────────────────────────────────────────────────

export default function InventoryTab({ characterId }: Props) {
  const [showAdd, setShowAdd] = useState(false)
  const character = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)
  if (!character) return null

  // Build grouped map
  type EnrichedEntry = { entry: InventoryItem; item: Item | undefined; index: number }
  const groups = new Map<GroupKey, EnrichedEntry[]>(GROUP_ORDER.map(k => [k, []]))

  character.inventory.forEach((entry, index) => {
    const item = getItemById(entry.itemId)
    const key  = groupKey(item)
    groups.get(key)!.push({ entry, item, index })
  })

  const hasItems = character.inventory.length > 0

  // Total weight
  const totalWeight = character.inventory.reduce((sum, entry) => {
    const item = getItemById(entry.itemId)
    return sum + (item?.weight ?? 0) * entry.quantity
  }, 0)

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">
          {hasItems ? `${character.inventory.length} item${character.inventory.length !== 1 ? 's' : ''}` : 'Empty'}
          {totalWeight > 0 && ` · ${totalWeight} lb`}
        </span>
        {!showAdd && (
          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setShowAdd(true)}>
            + Add Item
          </Button>
        )}
      </div>

      {/* Add form */}
      {showAdd && <AddItemForm characterId={characterId} onClose={() => setShowAdd(false)} />}

      {/* Item groups */}
      {!hasItems && !showAdd && (
        <div className="flex flex-col items-center justify-center h-32 gap-2 text-muted-foreground/50 border border-dashed border-border rounded-lg">
          <span className="text-2xl">🎒</span>
          <span className="text-sm italic text-center px-4">Your inventory is empty. Acquire equipment during your adventures.</span>
        </div>
      )}

      {GROUP_ORDER.map(groupName => {
        const entries = groups.get(groupName)!
        if (entries.length === 0) return null
        return (
          <Card key={groupName} className="overflow-hidden">
            <CardHeader className="py-2 px-3 bg-muted/20 border-b border-border">
              <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                {groupName}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-border">
              {entries.map(({ entry, item, index }) => (
                <ItemRow key={index} entry={entry} item={item} index={index} characterId={characterId} />
              ))}
            </CardContent>
          </Card>
        )
      })}

      {/* Currency */}
      <Card>
        <CardHeader className="py-2 px-3 bg-muted/20 border-b border-border">
          <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
            Currency
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="flex gap-3">
            {(['thrones', 'melt', 'aquila'] as const).map(key => (
              <div key={key} className="flex-1 flex flex-col items-center gap-1">
                <Input
                  type="number"
                  min={0}
                  value={character.currency[key]}
                  onChange={e =>
                    updateCharacter(characterId, {
                      currency: { ...character.currency, [key]: Math.max(0, Number(e.target.value) || 0) },
                    })
                  }
                  className="text-center font-mono text-sm h-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
