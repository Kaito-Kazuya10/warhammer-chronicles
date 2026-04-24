import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { useCharacterStore, getModifier } from '../../../store/characterStore'
import { useDiceStore } from '../../../store/diceStore'
import { rollDamage } from '../../../utils/dice'
import { resolveUsesCount } from '../../../utils/resolveUsesCount'
import { renderDescription } from '../../../utils/renderDescription'
import { getItemById, getAllClasses } from '../../../modules/registry'
import { tierDefinitions, weaponProperties } from '../../../modules/core/items/weapons'
import type { ClassFeature, FeatureActionType, Item, ItemTier } from '../../../types/module'
import type { InventoryItem } from '../../../types/character'

// ─── Property tooltip lookup ─────────────────────────────────────────────────

const PROP_MAP = new Map(weaponProperties.map(p => [p.name.toLowerCase(), p]))
function findPropTooltip(propName: string) {
  const key = propName.toLowerCase().replace(/\s*\([^)]*\)/g, '').trim()
  return PROP_MAP.get(key) ?? weaponProperties.find(p => key.startsWith(p.id))
}

function tierTooltipText(tier: ItemTier): string {
  const def = tierDefinitions.find(t => t.tier === tier)
  if (!def) return tier
  const parts: string[] = []
  if (def.bonusAttack) parts.push(`+${def.bonusAttack} to hit`)
  if (def.bonusDamage) parts.push(`${def.bonusDamage} bonus damage`)
  if (def.hasTraitSlot) parts.push('has trait slot')
  return parts.length ? `${tier}: ${parts.join(', ')}` : tier
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Filter =
  | 'all'
  | 'attack'
  | 'action'
  | 'bonus-action'
  | 'reaction'
  | 'other'
  | 'limited-use'

// ─── Constants ────────────────────────────────────────────────────────────────

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all',          label: 'ALL'          },
  { value: 'attack',       label: 'ATTACK'       },
  { value: 'action',       label: 'ACTION'       },
  { value: 'bonus-action', label: 'BONUS ACTION' },
  { value: 'reaction',     label: 'REACTION'     },
  { value: 'other',        label: 'OTHER'        },
  { value: 'limited-use',  label: 'LIMITED USE'  },
]

const ACTION_TYPE_LABELS: Partial<Record<FeatureActionType, string>> = {
  'action':       'Action',
  'bonus-action': 'Bonus Action',
  'reaction':     'Reaction',
  'free':         'Free Action',
}

const ACTION_TYPE_BADGE_CLASS: Partial<Record<FeatureActionType, string>> = {
  'action':       'bg-primary/10 text-primary border-primary/30',
  'bonus-action': 'bg-[var(--wh-gold)]/10 text-[var(--wh-gold)] border-[var(--wh-gold)]/30',
  'reaction':     'bg-[var(--wh-info)]/10 text-[var(--wh-info)] border-[var(--wh-info)]/30',
  'free':         'bg-muted text-muted-foreground border-border',
}

const TIER_BADGE: Record<string, string> = {
  'master-crafted': 'bg-green-100  text-green-800  border-green-300',
  'artificer':      'bg-purple-100 text-purple-800 border-purple-300',
  'relic':          'bg-amber-100  text-amber-800  border-amber-300',
  'heroic':         'bg-red-100    text-red-800    border-red-300',
}

// ─── Tier helpers ─────────────────────────────────────────────────────────────

function getEffectiveTier(invItem: InventoryItem, item: Item): ItemTier {
  return invItem.tierOverride ?? item.tier ?? 'standard'
}

function getTierDef(tier: ItemTier) {
  return tierDefinitions.find(t => t.tier === tier) ?? tierDefinitions[0]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtBonus(n: number): string {
  return n >= 0 ? `+${n}` : String(n)
}

function getAttackMod(item: Item, strMod: number, dexMod: number): number {
  const isFinesse = item.attackAbility === 'finesse' || item.properties?.includes('finesse')
  if (isFinesse) return Math.max(strMod, dexMod)
  if (item.attackAbility === 'dexterity' || item.rangeType === 'ranged') return dexMod
  return strMod
}

function buildDamageStr(item: Item, abilityMod: number, tierBonusDamage: string): string {
  if (!item.damage) return '—'
  const numericBonus = (item.bonusDamage ?? 0) + abilityMod
  const modPart   = numericBonus > 0 ? ` + ${numericBonus}` : numericBonus < 0 ? ` − ${Math.abs(numericBonus)}` : ''
  const dicePart  = tierBonusDamage ? ` ${tierBonusDamage}` : ''
  const typePart  = item.damageType ? ` ${item.damageType}` : ''
  return `${item.damage}${modPart}${dicePart}${typePart}`
}

function buildRangeStr(item: Item): string {
  if (!item.range) return item.rangeType === 'melee' ? '5 ft.' : '—'
  const { normal, long } = item.range
  return long ? `${normal} (${long})` : `${normal}`
}

function featureMatchesFilter(f: ClassFeature, filter: Filter): boolean {
  switch (filter) {
    case 'all':          return true
    case 'attack':       return f.tags?.includes('attack') ?? false
    case 'action':       return f.actionType === 'action'
    case 'bonus-action': return f.actionType === 'bonus-action'
    case 'reaction':     return f.actionType === 'reaction'
    case 'other':
      return !f.actionType || f.actionType === 'passive' || f.actionType === 'special' || f.actionType === 'free'
    case 'limited-use':  return !!f.usesPerRest
    default:             return true
  }
}

// ─── FilterBar ────────────────────────────────────────────────────────────────

function FilterBar({
  active,
  onChange,
}: {
  active: Filter
  onChange: (f: Filter) => void
}) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 filter-bar-scroll">
      {FILTERS.map(({ value, label }) => (
        <Button
          key={value}
          size="sm"
          variant={active === value ? 'default' : 'outline'}
          onClick={() => onChange(value)}
          className="shrink-0 text-[10px] tracking-wide h-7 px-2"
        >
          {label}
        </Button>
      ))}
    </div>
  )
}

// ─── AmmoStrip ────────────────────────────────────────────────────────────────

function AmmoStrip({
  invItem,
  item,
  characterId,
}: {
  invItem: InventoryItem
  item: Item
  characterId: string
}) {
  const [misfire, setMisfire] = useState(false)
  const updateCharacter = useCharacterStore(s => s.updateCharacter)
  const inventory = useCharacterStore(s => s.characters.find(c => c.id === characterId)?.inventory ?? [])

  if (!item.ammoType || item.ammoType === 'unlimited') return null

  const isPack   = item.ammoType === 'pack'
  const capacity = item.ammoCapacity ?? 1
  const current  = isPack
    ? (invItem.packsRemaining ?? capacity)
    : (invItem.ammoRemaining  ?? capacity)
  const pct = current / capacity
  const low = pct <= 0.25

  function patch(delta: number, isMisfire = false) {
    const next = Math.max(0, current + delta)
    updateCharacter(characterId, {
      inventory: inventory.map(e =>
        e.itemId === invItem.itemId
          ? isPack
            ? { ...e, packsRemaining: next }
            : { ...e, ammoRemaining: next }
          : e
      ),
    })
    if (isMisfire) {
      setMisfire(true)
      setTimeout(() => setMisfire(false), 2000)
    }
  }

  function reload() {
    updateCharacter(characterId, {
      inventory: inventory.map(e =>
        e.itemId === invItem.itemId
          ? isPack
            ? { ...e, packsRemaining: capacity }
            : { ...e, ammoRemaining: capacity }
          : e
      ),
    })
  }

  return (
    <div className="flex items-center gap-2 mt-1.5 px-1 flex-wrap">
      <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold shrink-0">AMMO</span>
      {item.ammoName && (
        <span className="text-[10px] text-muted-foreground shrink-0">{item.ammoName}</span>
      )}

      {/* Pack type: pip dots */}
      {isPack ? (
        <div className="flex gap-0.5 items-center">
          {Array.from({ length: capacity }).map((_, i) => (
            <span
              key={i}
              className={`inline-block w-2.5 h-2.5 rounded-full border transition-colors ${
                i < current
                  ? low ? 'bg-destructive border-destructive' : 'bg-foreground border-foreground'
                  : 'bg-transparent border-border'
              }`}
            />
          ))}
          <span className="text-[10px] font-mono ml-1 text-muted-foreground">{current}/{capacity}</span>
        </div>
      ) : (
        /* Shot/belt type: fill bar */
        <div className="flex items-center gap-1.5">
          <span className={`text-xs font-mono tabular-nums ${low ? 'text-destructive' : 'text-foreground'}`}>
            {current}/{capacity}
          </span>
          <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${low ? 'bg-destructive' : 'bg-foreground'}`}
              style={{ width: `${Math.round(pct * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Misfire flash */}
      {misfire && (
        <span className="text-[10px] font-bold text-destructive animate-pulse">MISFIRE!</span>
      )}

      {/* Buttons */}
      {!isPack && (
        <button
          className="text-[10px] px-1.5 py-0.5 rounded border border-border hover:bg-muted transition-colors font-mono"
          onClick={() => patch(-1)}
          disabled={current === 0}
        >
          −1 FIRE
        </button>
      )}
      <button
        className="text-[10px] px-1.5 py-0.5 rounded border border-destructive/50 text-destructive hover:bg-destructive/10 transition-colors font-bold"
        onClick={() => patch(-1, true)}
        disabled={current === 0}
      >
        NAT 1!
      </button>
      <button
        className="text-[10px] px-1.5 py-0.5 rounded border border-border hover:bg-muted transition-colors"
        onClick={reload}
      >
        RELOAD
      </button>
      {item.rechargeable && (
        <button
          className="text-[10px] px-1.5 py-0.5 rounded border border-border text-muted-foreground hover:bg-muted transition-colors"
          onClick={reload}
        >
          ⚡ RECHARGE
        </button>
      )}
    </div>
  )
}

// ─── WeaponRow ────────────────────────────────────────────────────────────────

function WeaponRow({
  invItem,
  item,
  strMod,
  dexMod,
  profBonus,
  characterId,
}: {
  invItem: InventoryItem
  item: Item
  strMod: number
  dexMod: number
  profBonus: number
  characterId: string
}) {
  const [abOpen, setAbOpen] = useState(false)
  const addRoll            = useDiceStore(s => s.addRoll)
  const effectiveTier    = getEffectiveTier(invItem, item)
  const tierDef          = item.isNamed ? null : getTierDef(effectiveTier)
  const abilityMod       = getAttackMod(item, strMod, dexMod)
  const hitBonus         = profBonus + abilityMod + (item.bonusAttack ?? 0) + (tierDef?.bonusAttack ?? 0)
  const tierBonusDmg     = item.isNamed
    ? (item.bonusDamageDice ?? '')
    : (tierDef?.bonusDamage ?? '')
  const damage           = buildDamageStr(item, abilityMod, tierBonusDmg)
  const range            = buildRangeStr(item)
  const activeAbilities  = item.itemAbilities?.filter(a => a.actionType !== 'passive') ?? []
  const hasAmmo          = !!item.ammoType && item.ammoType !== 'unlimited'

  function handleRollDamage() {
    if (!item.damage) return
    const mod = abilityMod + (item.bonusDamage ?? 0)
    const isFinesse = item.attackAbility === 'finesse' || item.properties?.includes('finesse')
    const abilityLabel = isFinesse
      ? `+${mod} (${abilityMod >= 0 ? '+' : ''}${abilityMod} finesse)`
      : item.rangeType === 'ranged'
        ? `+${mod} DEX`
        : `+${mod} STR`
    addRoll(rollDamage(item.damage, mod, tierBonusDmg, item.name, abilityLabel))
  }

  return (
    <>
      <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors group">
        <td className="py-2 pr-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-medium text-foreground text-xs">
              {item.rangeType === 'ranged' ? '🏹' : '⚔'} {item.name}
            </span>
            {effectiveTier !== 'standard' && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span>
                      <Badge
                        variant="outline"
                        className={`text-[9px] h-4 px-1 cursor-help ${TIER_BADGE[effectiveTier] ?? ''}`}
                      >
                        {effectiveTier === 'master-crafted' ? 'MC' : effectiveTier}
                      </Badge>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-[200px] capitalize">{tierTooltipText(effectiveTier)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {invItem.rolledTrait && (
              <Badge variant="outline" className="text-[9px] h-4 px-1 bg-muted/40 text-muted-foreground border-border cursor-help" title={invItem.rolledTrait.effect}>
                ✦ {invItem.rolledTrait.name}
              </Badge>
            )}
            {invItem.quantity > 1 && (
              <span className="text-[10px] text-muted-foreground">×{invItem.quantity}</span>
            )}
          </div>
          <p className="text-[10px] text-muted-foreground capitalize mt-0.5">
            {item.rangeType ?? (item.range ? 'ranged' : 'melee')} weapon
          </p>
          {/* Ammo strip */}
          {hasAmmo && (
            <AmmoStrip invItem={invItem} item={item} characterId={characterId} />
          )}
        </td>
        <td className="py-2 pr-3 text-right text-xs tabular-nums whitespace-nowrap text-foreground/80">
          {range}
        </td>
        <td className="py-2 pr-3 text-right text-xs tabular-nums font-mono font-semibold text-foreground">
          {fmtBonus(hitBonus)}
        </td>
        <td className="py-2 pr-3 text-right text-xs tabular-nums text-foreground/80 whitespace-nowrap">
          {item.damage ? (
            <button
              className="font-mono hover:text-primary hover:underline cursor-pointer transition-colors"
              title={`Click to roll damage (${item.damage})`}
              onClick={handleRollDamage}
            >
              {damage}
            </button>
          ) : damage}
        </td>
        <td className="py-2 text-right text-[10px] text-muted-foreground max-w-[100px]">
          {(item.properties ?? []).length === 0 ? '—' : (
            <TooltipProvider>
              <div className="flex flex-wrap gap-x-1 gap-y-0.5 justify-end">
                {(item.properties ?? []).map(p => {
                  const tip = findPropTooltip(p)
                  return tip ? (
                    <Tooltip key={p}>
                      <TooltipTrigger>
                        <span className="underline decoration-dotted cursor-help">{p}</span>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p className="font-semibold text-xs mb-0.5">{tip.name}</p>
                        <p className="text-xs opacity-90 max-w-[220px]">{tip.shortDescription}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <span key={p}>{p}</span>
                  )
                })}
              </div>
            </TooltipProvider>
          )}
          {activeAbilities.length > 0 && (
            <button
              className="ml-1.5 text-primary hover:underline text-[10px]"
              onClick={() => setAbOpen(o => !o)}
            >
              {abOpen ? '▲' : '▼'} abilities
            </button>
          )}
        </td>
      </tr>

      {/* Item abilities row */}
      {activeAbilities.length > 0 && abOpen && (
        <tr className="bg-muted/20">
          <td colSpan={5} className="px-3 py-2">
            <div className="space-y-2">
              {activeAbilities.map(ab => (
                <div key={ab.name} className="text-xs">
                  <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                    <span className="font-medium">{ab.name}</span>
                    {ab.actionType && ACTION_TYPE_LABELS[ab.actionType] && (
                      <Badge
                        variant="outline"
                        className={`text-[9px] h-4 px-1 ${ACTION_TYPE_BADGE_CLASS[ab.actionType] ?? ''}`}
                      >
                        {ACTION_TYPE_LABELS[ab.actionType]}
                      </Badge>
                    )}
                    {ab.usesPerRest && (
                      <Badge variant="outline" className="text-[9px] h-4 px-1">
                        {ab.usesPerRest} rest
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{ab.description}</p>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

// ─── AttackSection ────────────────────────────────────────────────────────────

function AttackSection({
  characterId,
  show,
}: {
  characterId: string
  show: boolean
}) {
  const character = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const addRoll   = useDiceStore(s => s.addRoll)
  if (!character || !show) return null

  const strMod    = getModifier(character.abilityScores.strength)
  const dexMod    = getModifier(character.abilityScores.dexterity)
  const profBonus = character.proficiencyBonus

  const weapons: { invItem: InventoryItem; item: Item }[] = character.inventory
    .filter(inv => inv.equipped !== false)
    .flatMap(inv => {
      const item = getItemById(inv.itemId)
      return item && item.type === 'weapon' ? [{ invItem: inv, item }] : []
    })

  const cls = getAllClasses().find(c => c.id === character.class)
  const subclass = cls?.subclasses?.find(s => s.id === character.subclass)
  const allFeatures = [
    ...(cls?.features ?? []),
    ...(subclass?.features ?? []),
  ]
  const hasExtraAttack = allFeatures.some(
    f => f.level <= character.level && f.name.toLowerCase().includes('extra attack'),
  )
  const attacksPerAction = hasExtraAttack ? 2 : 1

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
          Attacks per action:{' '}
          <span className="text-foreground">{attacksPerAction}</span>
        </p>
      </div>

      {weapons.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-24 gap-1 text-muted-foreground/50 border border-dashed border-border rounded-lg">
          <span className="text-xl">⚔</span>
          <span className="text-xs italic">No weapons equipped</span>
        </div>
      ) : (
        <>
          {/* Mobile: card layout */}
          <div className="sm:hidden space-y-2">
            {weapons.map(({ invItem, item }) => {
              const effectiveTier = getEffectiveTier(invItem, item)
              const tierDef   = item.isNamed ? null : getTierDef(effectiveTier)
              const abilityMod = getAttackMod(item, strMod, dexMod)
              const hitBonus   = profBonus + abilityMod + (item.bonusAttack ?? 0) + (tierDef?.bonusAttack ?? 0)
              const mobileBonusDmg = item.isNamed ? (item.bonusDamageDice ?? '') : (tierDef?.bonusDamage ?? '')
              const damage     = buildDamageStr(item, abilityMod, mobileBonusDmg)
              const range      = buildRangeStr(item)
              return (
                <div
                  key={invItem.itemId}
                  className="border border-border rounded-md p-3 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">
                      {item.rangeType === 'ranged' ? '🏹' : '⚔'} {item.name}
                    </span>
                    {effectiveTier !== 'standard' && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <span>
                              <Badge variant="outline" className={`text-[9px] h-4 px-1 cursor-help ${TIER_BADGE[effectiveTier] ?? ''}`}>
                                {effectiveTier === 'master-crafted' ? 'MC' : effectiveTier}
                              </Badge>
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs max-w-[200px] capitalize">{tierTooltipText(effectiveTier)}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-[9px] uppercase tracking-wide text-muted-foreground">HIT</p>
                      <p className="font-mono font-semibold">{fmtBonus(hitBonus)}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wide text-muted-foreground">DAMAGE</p>
                      {item.damage ? (
                        <button
                          className="font-mono hover:text-primary hover:underline cursor-pointer transition-colors"
                          title={`Click to roll damage (${item.damage})`}
                          onClick={() => {
                            const mod = abilityMod + (item.bonusDamage ?? 0)
                            const isFinesse = item.attackAbility === 'finesse' || item.properties?.includes('finesse')
                            const modLabel = isFinesse ? `+${mod} finesse` : item.rangeType === 'ranged' ? `+${mod} DEX` : `+${mod} STR`
                            addRoll(rollDamage(item.damage!, mod, mobileBonusDmg, item.name, modLabel))
                          }}
                        >
                          {damage}
                        </button>
                      ) : (
                        <p className="font-mono">{damage}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wide text-muted-foreground">RANGE</p>
                      <p>{range}</p>
                    </div>
                  </div>
                  {item.properties && item.properties.length > 0 && (
                    <TooltipProvider>
                      <div className="flex flex-wrap gap-x-1 gap-y-0.5 text-[10px] text-muted-foreground">
                        {item.properties.map(p => {
                          const tip = findPropTooltip(p)
                          return tip ? (
                            <Tooltip key={p}>
                              <TooltipTrigger>
                                <span className="underline decoration-dotted cursor-help">{p}</span>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <p className="font-semibold text-xs mb-0.5">{tip.name}</p>
                                <p className="text-xs opacity-90 max-w-[220px]">{tip.shortDescription}</p>
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <span key={p}>{p}</span>
                          )
                        })}
                      </div>
                    </TooltipProvider>
                  )}
                  {item.ammoType && item.ammoType !== 'unlimited' && (
                    <AmmoStrip invItem={invItem} item={item} characterId={characterId} />
                  )}
                </div>
              )
            })}
          </div>

          {/* Desktop: table layout */}
          <div className="hidden sm:block overflow-x-auto -mx-1 px-1">
            <table className="w-full min-w-[520px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-[9px] uppercase tracking-wider text-muted-foreground py-1.5 pr-3 font-medium">ATTACK</th>
                  <th className="text-right text-[9px] uppercase tracking-wider text-muted-foreground py-1.5 pr-3 font-medium">RANGE</th>
                  <th className="text-right text-[9px] uppercase tracking-wider text-muted-foreground py-1.5 pr-3 font-medium">HIT / DC</th>
                  <th className="text-right text-[9px] uppercase tracking-wider text-muted-foreground py-1.5 pr-3 font-medium">DAMAGE</th>
                  <th className="text-right text-[9px] uppercase tracking-wider text-muted-foreground py-1.5 font-medium">NOTES</th>
                </tr>
              </thead>
              <tbody>
                {weapons.map(({ invItem, item }) => (
                  <WeaponRow
                    key={invItem.itemId}
                    invItem={invItem}
                    item={item}
                    strMod={strMod}
                    dexMod={dexMod}
                    profBonus={profBonus}
                    characterId={characterId}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

// ─── FeatureRow ───────────────────────────────────────────────────────────────

function FeatureRow({
  feature,
  sourceName,
  characterId,
}: {
  feature: ClassFeature
  sourceName?: string
  characterId: string
}) {
  const [open, setOpen] = useState(false)
  const character       = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)

  const actionLabel = feature.actionType ? ACTION_TYPE_LABELS[feature.actionType] : undefined
  const badgeClass  = feature.actionType ? ACTION_TYPE_BADGE_CLASS[feature.actionType] : undefined

  const hasUses   = !!(feature.usesPerRest && feature.usesPerRest !== 'at-will' && feature.usesCount && character)
  const featureKey = slugify(feature.name)
  const usesMax    = hasUses && character ? resolveUsesCount(feature.usesCount!, character) : 0
  const usesSpent  = character?.featureUsesSpent?.[featureKey] ?? 0

  function toggleUse(i: number) {
    if (!character) return
    const isSpent = i < usesSpent
    updateCharacter(characterId, {
      featureUsesSpent: {
        ...(character.featureUsesSpent ?? {}),
        [featureKey]: isSpent ? i : i + 1,
      },
    })
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-start gap-2 py-2 text-left focus:outline-none group hover:bg-muted/30 px-2 rounded-md transition-colors">
        <span
          className="text-muted-foreground text-[10px] mt-0.5 shrink-0 transition-transform duration-150"
          style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        >
          ▶
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-sm font-medium ${hasUses && usesSpent >= usesMax ? 'text-muted-foreground/50' : 'text-foreground'}`}>
              {feature.name}
            </span>
            {actionLabel && (
              <Badge
                variant="outline"
                className={`text-[9px] h-4 px-1.5 ${badgeClass ?? ''}`}
              >
                {actionLabel}
              </Badge>
            )}
            {sourceName && (
              <span className="text-[10px] text-muted-foreground/60 italic">({sourceName})</span>
            )}
          </div>

          {hasUses && (
            <div className="flex items-center gap-1 mt-1.5">
              {Array.from({ length: usesMax }).map((_, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); toggleUse(i) }}
                  className={`w-4 h-4 rounded-sm border transition-colors ${
                    i < usesSpent
                      ? 'bg-foreground/70 border-foreground/70'
                      : 'bg-transparent border-border hover:border-foreground/40'
                  }`}
                  aria-label={i < usesSpent ? 'Unspend use' : 'Spend use'}
                />
              ))}
              <span className="text-[9px] text-muted-foreground ml-0.5">
                / {feature.usesPerRest === 'short' ? 'Short Rest' : 'Long Rest'}
              </span>
            </div>
          )}
          {!hasUses && feature.usesPerRest && (
            <div className="mt-1">
              <Badge variant="outline" className="text-[9px] h-4 px-1.5 text-muted-foreground">
                {feature.usesMax ? `${feature.usesMax}×` : ''}
                {feature.usesPerRest === 'short' ? ' Short Rest' : ' Long Rest'}
              </Badge>
            </div>
          )}

          <p className="text-[10px] text-muted-foreground mt-0.5">Lv. {feature.level}</p>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="px-7 pb-3 pt-0.5 text-xs text-foreground/80">
          {renderDescription(feature.description)}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// ─── ClassFeaturesSection ─────────────────────────────────────────────────────

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function ClassFeaturesSection({
  characterId,
  filter,
}: {
  characterId: string
  filter: Filter
}) {
  const character = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  if (!character) return null

  const cls      = getAllClasses().find(c => c.id === character.class)
  const subclass = cls?.subclasses?.find(s => s.id === character.subclass)
  const choices  = character.featureChoices ?? {}

  const enhancedOriginals = new Set<string>()
  const enhancementMap = new Map<string, ClassFeature>()
  for (const [optGroup, chosenSlug] of Object.entries(choices)) {
    const chosen = (subclass?.features ?? []).find(
      f => f.optionGroup === optGroup && slugify(f.name) === chosenSlug
    )
    if (chosen?.sourceFeature) {
      enhancedOriginals.add(chosen.sourceFeature)
      enhancementMap.set(chosen.sourceFeature, chosen)
    }
  }

  const resolveFeatures = (features: ClassFeature[], source?: string) => {
    const resolved: { feature: ClassFeature; sourceName?: string }[] = []
    for (const f of features) {
      if (f.level > character.level) continue
      if (f.featureType === 'option' && f.optionGroup) {
        const chosen = choices[f.optionGroup]
        if (!chosen || slugify(f.name) !== chosen) continue
        if (f.sourceFeature) continue
      }
      const fSlug = slugify(f.name)
      if (enhancedOriginals.has(fSlug)) {
        const enhanced = enhancementMap.get(fSlug)!
        if (featureMatchesFilter(enhanced, filter)) {
          resolved.push({ feature: enhanced, sourceName: source })
        }
        continue
      }
      if (featureMatchesFilter(f, filter)) {
        resolved.push({ feature: f, sourceName: source })
      }
    }
    return resolved
  }

  const clsResolved = resolveFeatures(cls?.features ?? [])
  const subResolved = resolveFeatures(subclass?.features ?? [], subclass?.name)
  const totalCount  = clsResolved.length + subResolved.length

  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1 mt-2">
        Class Features
        {totalCount === 0 && (
          <span className="normal-case tracking-normal font-normal ml-1 italic">— none match this filter</span>
        )}
      </p>
      <div className="divide-y divide-border/50">
        {clsResolved.map(({ feature, sourceName }) => (
          <FeatureRow key={`cls-${feature.name}-${feature.level}`} feature={feature} sourceName={sourceName} characterId={characterId} />
        ))}
        {subResolved.map(({ feature, sourceName }) => (
          <FeatureRow
            key={`sub-${feature.name}-${feature.level}`}
            feature={feature}
            sourceName={sourceName}
            characterId={characterId}
          />
        ))}
      </div>
    </div>
  )
}

// ─── CombatReference ─────────────────────────────────────────────────────────

const COMBAT_ACTIONS = [
  'Attack', 'Cast a Spell', 'Dash', 'Disengage', 'Dodge', 'Grapple',
  'Help', 'Hide', 'Ready', 'Search', 'Shove', 'Use Object',
]

function CombatReference() {
  const [open, setOpen] = useState(false)
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 px-2 rounded-md hover:bg-muted/30 transition-colors focus:outline-none text-left mt-2">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
          Actions in Combat
        </span>
        <span
          className="text-muted-foreground text-xs transition-transform duration-150"
          style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        >
          ▶
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-2 pb-3 pt-1">
          <div className="flex flex-wrap gap-1.5">
            {COMBAT_ACTIONS.map(action => (
              <Badge key={action} variant="outline" className="text-xs font-normal">
                {action}
              </Badge>
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// ─── ActionsTab ───────────────────────────────────────────────────────────────

interface Props {
  characterId: string
}

export default function ActionsTab({ characterId }: Props) {
  const [filter, setFilter] = useState<Filter>('all')

  const showAttacks = filter === 'all' || filter === 'attack'

  return (
    <div className="space-y-4">
      <FilterBar active={filter} onChange={setFilter} />
      <AttackSection  characterId={characterId} show={showAttacks} />
      <ClassFeaturesSection characterId={characterId} filter={filter} />
      <CombatReference />
    </div>
  )
}
