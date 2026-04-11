import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'
import { useCharacterStore } from '../../../store/characterStore'
import { getItemById } from '../../../modules/registry'
import {
  tierDefinitions, TIER_ORDER,
  artificerTraits, relicTraits, heroicAbilities,
  type RollableTrait,
  weaponProperties,
} from '../../../modules/core/items/weapons'
import { armorTierDefinitions } from '../../../modules/core/items/armor'
import ItemBrowserModal from '../ItemBrowserModal'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'
import type { Item, FeatureActionType, ItemTier } from '../../../types/module'
import type { InventoryItem } from '../../../types/character'

// ─── Property tooltip lookup ─────────────────────────────────────────────────

const INV_PROP_MAP = new Map(weaponProperties.map(p => [p.name.toLowerCase(), p]))
function findInvPropTooltip(propName: string) {
  const key = propName.toLowerCase().replace(/\s*\([^)]*\)/g, '').trim()
  return INV_PROP_MAP.get(key) ?? weaponProperties.find(p => key.startsWith(p.id))
}

interface Props {
  characterId: string
}

// ─── Tier helpers ─────────────────────────────────────────────────────────────

const TIER_BADGE: Record<string, string> = {
  'master-crafted': 'bg-green-500/15 text-green-700 border-green-500/30',
  'artificer':      'bg-purple-500/15 text-purple-700 border-purple-500/30',
  'relic':          'bg-[var(--wh-gold)]/15 text-[var(--wh-gold)] border-[var(--wh-gold)]/30',
  'heroic':         'bg-red-500/15 text-red-700 border-red-500/30',
}

function getEffectiveTier(invItem: InventoryItem, item: Item | undefined): ItemTier {
  return invItem.tierOverride ?? item?.tier ?? 'standard'
}

function getTierDef(tier: ItemTier) {
  return tierDefinitions.find(t => t.tier === tier) ?? tierDefinitions[0]
}

function getNextTier(tier: ItemTier): ItemTier | null {
  const idx = TIER_ORDER.indexOf(tier)
  return idx >= 0 && idx < TIER_ORDER.length - 1 ? TIER_ORDER[idx + 1] : null
}

function traitTableForTier(tier: ItemTier): RollableTrait[] | null {
  if (tier === 'artificer') return artificerTraits
  if (tier === 'relic')     return relicTraits
  if (tier === 'heroic')    return heroicAbilities
  return null
}

function rollTrait(table: RollableTrait[]): RollableTrait {
  return table[Math.floor(Math.random() * table.length)]
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

// ─── UpgradeDialog ────────────────────────────────────────────────────────────

function UpgradeDialog({
  open,
  currentTier,
  nextTier,
  itemName,
  itemType,
  onConfirm,
  onCancel,
}: {
  open: boolean
  currentTier: ItemTier
  nextTier: ItemTier
  itemName: string
  itemType: 'weapon' | 'armor' | string
  onConfirm: (trait: RollableTrait | null) => void
  onCancel: () => void
}) {
  const [rolledTrait, setRolledTrait] = useState<RollableTrait | null>(null)
  const isArmor  = itemType === 'armor' || itemType === 'gear'
  // Armor upgrades never roll traits — the table is null for armor
  const table    = isArmor ? null : traitTableForTier(nextTier)
  const nextDef  = getTierDef(nextTier)
  const nextArmorDef = armorTierDefinitions.find(d => d.tier === nextTier)

  function handleRoll() {
    if (!table) return
    setRolledTrait(rollTrait(table))
  }

  function handleConfirm() {
    onConfirm(isArmor ? null : rolledTrait)
    setRolledTrait(null)
  }

  function handleCancel() {
    setRolledTrait(null)
    onCancel()
  }

  const bonusText = isArmor
    ? `+${nextArmorDef?.bonusAC ?? 0} AC (total from tier)`
    : `+${nextDef.bonusAttack} to hit${nextDef.bonusDamage ? `, ${nextDef.bonusDamage} bonus damage` : ''}`

  return (
    <AlertDialog open={open} onOpenChange={v => { if (!v) handleCancel() }}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sm font-bold uppercase tracking-widest">
            Upgrade: {itemName}
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <Badge className={`text-[10px] px-2 border ${TIER_BADGE[currentTier] ?? 'bg-muted text-muted-foreground border-border'}`}>
              {currentTier.toUpperCase()}
            </Badge>
            <span className="text-muted-foreground">→</span>
            <Badge className={`text-[10px] px-2 border ${TIER_BADGE[nextTier] ?? 'bg-muted text-muted-foreground border-border'}`}>
              {nextTier.toUpperCase()}
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground">
            Bonus: <span className="text-foreground font-medium">{bonusText}</span>
          </p>

          {table && !rolledTrait && (
            <Button size="sm" variant="outline" className="h-7 text-xs w-full" onClick={handleRoll}>
              🎲 Roll Trait (1d{table.length})
            </Button>
          )}

          {rolledTrait && (
            <div className="rounded-md border border-border bg-muted/20 px-3 py-2 space-y-1">
              <p className="text-xs font-semibold text-foreground">{rolledTrait.name}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{rolledTrait.effect}</p>
            </div>
          )}

          {table && rolledTrait && (
            <Button size="sm" variant="ghost" className="h-6 text-[10px] text-muted-foreground" onClick={handleRoll}>
              Reroll
            </Button>
          )}

          {table && !rolledTrait && (
            <p className="text-[10px] text-muted-foreground italic">
              Roll the trait table before confirming.
            </p>
          )}
        </div>

        <AlertDialogFooter className="gap-2">
          <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            size="sm"
            className="h-7 text-xs"
            onClick={handleConfirm}
            disabled={!!table && !rolledTrait}
          >
            Upgrade
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// ─── ItemRow ──────────────────────────────────────────────────────────────────

interface ItemRowProps {
  entry: InventoryItem
  item: Item | undefined
  index: number
  characterId: string
}

function ItemRow({ entry, item, index, characterId }: ItemRowProps) {
  const [open,          setOpen         ] = useState(false)
  const [upgradeOpen,   setUpgradeOpen  ] = useState(false)
  const updateCharacter = useCharacterStore(s => s.updateCharacter)
  const inventory = useCharacterStore(s => s.characters.find(c => c.id === characterId)?.inventory ?? [])

  const displayName    = item?.name ?? entry.itemId
  const hasDetails     = !!(item?.description || (item?.itemAbilities && item.itemAbilities.length > 0))
  const effectiveTier  = getEffectiveTier(entry, item)
  const nextTier       = getNextTier(effectiveTier)
  const canUpgrade     = !!(item && (item.type === 'weapon' || item.type === 'armor' || item.type === 'gear') && !item.isNamed && nextTier)

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

  function applyUpgrade(trait: RollableTrait | null) {
    if (!nextTier) return
    updateCharacter(characterId, {
      inventory: inventory.map((e, i) =>
        i === index
          ? { ...e, tierOverride: nextTier, rolledTrait: trait ?? undefined }
          : e
      ),
    })
    setUpgradeOpen(false)
  }

  return (
    <>
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-muted/30 transition-colors group">
          {/* Expand toggle */}
          <CollapsibleTrigger
            className="flex-shrink-0 w-4 h-4 text-muted-foreground/50 hover:text-muted-foreground transition-colors disabled:opacity-30"
            disabled={!hasDetails}
            aria-label="Expand item details"
          >
            <span className="text-xs leading-none" style={{ display: 'inline-block', transform: open ? 'rotate(90deg)' : undefined, transition: 'transform 150ms' }}>▶</span>
          </CollapsibleTrigger>

          {/* Name + tier badge */}
          <span className="flex-1 min-w-0 font-medium text-sm truncate">
            {displayName}
            {effectiveTier !== 'standard' && (
              <Badge className={`ml-1.5 text-[9px] py-0 px-1 border ${TIER_BADGE[effectiveTier] ?? ''}`}>
                {effectiveTier === 'master-crafted' ? 'MC' : effectiveTier.toUpperCase()}
              </Badge>
            )}
          </span>

          {/* Upgrade button */}
          {canUpgrade && (
            <Button
              size="sm"
              variant="outline"
              className="h-5 text-[9px] px-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
              onClick={() => setUpgradeOpen(true)}
            >
              ↑ UPGRADE
            </Button>
          )}

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
              <TooltipProvider>
                <div className="flex flex-wrap gap-1">
                  {item.properties.map(p => {
                    const tip = findInvPropTooltip(p)
                    return tip ? (
                      <Tooltip key={p}>
                        <TooltipTrigger>
                          <span>
                            <Badge variant="outline" className="text-[10px] cursor-help">{p}</Badge>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-semibold text-xs mb-0.5">{tip.name}</p>
                          <p className="text-xs opacity-90 max-w-[220px]">{tip.shortDescription}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Badge key={p} variant="outline" className="text-[10px]">{p}</Badge>
                    )
                  })}
                </div>
              </TooltipProvider>
            )}
            {/* Rolled trait */}
            {entry.rolledTrait && (
              <div className="rounded border border-border/60 bg-muted/20 px-2 py-1.5">
                <p className="text-[10px] font-semibold text-foreground mb-0.5">
                  ✦ {entry.rolledTrait.name}
                </p>
                <p className="text-[10px] leading-relaxed">{entry.rolledTrait.effect}</p>
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
                    </div>
                    <p className="text-xs text-muted-foreground">{ab.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Upgrade dialog */}
      {canUpgrade && nextTier && (
        <UpgradeDialog
          open={upgradeOpen}
          currentTier={effectiveTier}
          nextTier={nextTier}
          itemName={displayName}
          itemType={item?.type ?? 'weapon'}
          onConfirm={applyUpgrade}
          onCancel={() => setUpgradeOpen(false)}
        />
      )}
    </>
  )
}

// ─── InventoryTab ─────────────────────────────────────────────────────────────

export default function InventoryTab({ characterId }: Props) {
  const [browserOpen, setBrowserOpen] = useState(false)
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
        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs"
          onClick={() => setBrowserOpen(true)}
        >
          + BROWSE ITEMS
        </Button>
      </div>

      {/* Item groups */}
      {!hasItems && (
        <div className="flex flex-col items-center justify-center h-32 gap-2 text-muted-foreground/50 border border-dashed border-border rounded-lg">
          <span className="text-2xl">🎒</span>
          <span className="text-sm italic text-center px-4">Your inventory is empty. Browse items to get started.</span>
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

      {/* Item Browser */}
      <ItemBrowserModal
        characterId={characterId}
        open={browserOpen}
        onClose={() => setBrowserOpen(false)}
      />
    </div>
  )
}
