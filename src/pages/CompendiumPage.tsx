import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'
import {
  getAllItems,
  getAllClasses,
  getAllRaces,
  getAllBackgrounds,
} from '../modules/registry'
import { weaponProperties } from '../modules/core/items/weapons'
import type { Item, ItemType, ItemTier, WeaponCategory, CharacterClass, Race, Background } from '../types/module'

// ─── Constants ────────────────────────────────────────────────────────────────

type Tab = 'items' | 'classes' | 'species' | 'backgrounds'

const TABS: { value: Tab; label: string }[] = [
  { value: 'items',       label: 'Items'       },
  { value: 'classes',     label: 'Classes'     },
  { value: 'species',     label: 'Species'     },
  { value: 'backgrounds', label: 'Backgrounds' },
]

const TIER_BADGE: Record<string, string> = {
  'standard':       'bg-slate-500/15 text-slate-400 border-slate-500/30',
  'master-crafted': 'bg-green-500/15 text-green-400 border-green-500/30',
  'artificer':      'bg-purple-500/15 text-purple-400 border-purple-500/30',
  'relic':          'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'heroic':         'bg-red-500/15 text-red-400 border-red-500/30',
}

const TYPE_FILTERS: { value: ItemType | 'all'; label: string }[] = [
  { value: 'all',        label: 'ALL'        },
  { value: 'weapon',     label: 'WEAPONS'    },
  { value: 'armor',      label: 'ARMOR'      },
  { value: 'consumable', label: 'CONSUMABLE' },
  { value: 'gear',       label: 'GEAR'       },
]

const TIER_FILTERS: { value: ItemTier | 'all'; label: string }[] = [
  { value: 'all',            label: 'ALL'   },
  { value: 'standard',       label: 'STD'   },
  { value: 'master-crafted', label: 'MC'    },
  { value: 'artificer',      label: 'ART'   },
  { value: 'relic',          label: 'RELIC' },
  { value: 'heroic',         label: 'HEROIC'},
]

const CATEGORY_FILTERS: { value: WeaponCategory | 'all'; label: string }[] = [
  { value: 'all',     label: 'ALL'    },
  { value: 'simple',  label: 'SIMPLE' },
  { value: 'martial', label: 'MARTIAL'},
  { value: 'heavy',   label: 'HEAVY'  },
  { value: 'exotic',  label: 'EXOTIC' },
]

const ABILITY_SHORT: Record<string, string> = {
  strength: 'STR', dexterity: 'DEX', constitution: 'CON',
  intelligence: 'INT', wisdom: 'WIS', charisma: 'CHA',
}

// ─── Property tooltip lookup ──────────────────────────────────────────────────

const PROP_MAP = new Map(weaponProperties.map(p => [p.name.toLowerCase(), p]))
function findPropTooltip(propName: string) {
  const key = propName.toLowerCase().replace(/\s*\([^)]*\)/g, '').trim()
  return PROP_MAP.get(key) ?? weaponProperties.find(p => key.startsWith(p.id))
}

// ─── Shared pill filter bar ───────────────────────────────────────────────────

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
          className={`px-2 py-0.5 rounded text-[10px] tracking-wider border transition-colors ${
            value === o.value
              ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
              : 'bg-slate-800/40 text-slate-500 border-slate-700/30 hover:text-slate-300 hover:border-slate-600/40'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

// ─── Items Tab ────────────────────────────────────────────────────────────────

function ItemsTab() {
  const [search, setSearch]         = useState('')
  const [typeFilter, setTypeFilter] = useState<ItemType | 'all'>('all')
  const [tierFilter, setTierFilter] = useState<ItemTier | 'all'>('all')
  const [catFilter, setCatFilter]   = useState<WeaponCategory | 'all'>('all')

  const items = useMemo(() => {
    const q = search.toLowerCase()
    return getAllItems().filter(item => {
      if (typeFilter !== 'all' && item.type !== typeFilter) return false
      if (tierFilter !== 'all' && item.tier !== tierFilter) return false
      if (catFilter !== 'all' && item.weaponCategory !== catFilter) return false
      if (q && !item.name.toLowerCase().includes(q) && !item.description?.toLowerCase().includes(q)) return false
      return true
    })
  }, [search, typeFilter, tierFilter, catFilter])

  return (
    <div className="space-y-3">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or description…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-3 py-2 rounded-md bg-slate-800/50 border border-slate-700/40 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-amber-500/40 transition-colors"
      />
      {/* Filters */}
      <div className="space-y-1.5">
        <FilterPills options={TYPE_FILTERS} value={typeFilter} onChange={setTypeFilter} />
        <FilterPills options={TIER_FILTERS} value={tierFilter} onChange={setTierFilter} />
        {(typeFilter === 'weapon' || typeFilter === 'all') && (
          <FilterPills options={CATEGORY_FILTERS} value={catFilter} onChange={setCatFilter} />
        )}
      </div>
      {/* Count */}
      <p className="text-[10px] text-slate-600 tracking-wider">{items.length} entries</p>
      {/* Item cards */}
      <div className="space-y-1">
        {items.map(item => <ItemCard key={item.id} item={item} />)}
      </div>
    </div>
  )
}

function ItemCard({ item }: { item: Item }) {
  const [open, setOpen] = useState(false)
  const tier = item.tier ?? 'standard'

  const statLine = item.type === 'weapon'
    ? [item.damage && `${item.damage} ${item.damageType ?? ''}`.trim(), item.range && `${item.range.normal}${item.range.long ? `/${item.range.long}` : ''} ft`].filter(Boolean).join(' · ')
    : item.type === 'armor'
      ? `AC ${item.armorClass ?? '—'}`
      : item.consumableEffect
        ? item.consumableEffect.slice(0, 60) + (item.consumableEffect.length > 60 ? '…' : '')
        : ''

  return (
    <div className="border border-slate-700/25 rounded-md overflow-hidden bg-slate-800/20">
      <button
        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-700/20 transition-colors text-left"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-[10px] text-slate-600 shrink-0 transition-transform duration-150"
          style={{ transform: open ? 'rotate(90deg)' : undefined }}>▶</span>
        <span className="flex-1 min-w-0">
          <span className="font-medium text-sm text-slate-100">{item.name}</span>
          {statLine && <span className="ml-2 text-xs text-slate-500">{statLine}</span>}
        </span>
        <Badge className={`text-[9px] py-0 px-1.5 border shrink-0 ${TIER_BADGE[tier]}`}>
          {tier === 'master-crafted' ? 'MC' : tier.toUpperCase()}
        </Badge>
        {item.cost && <span className="text-[10px] text-slate-600 shrink-0">{item.cost}</span>}
      </button>

      {open && (
        <div className="px-3 pb-3 pt-1 border-t border-slate-700/20 space-y-2 bg-slate-800/10">
          {item.description && (
            <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
          )}
          {item.properties && item.properties.length > 0 && (
            <TooltipProvider>
              <div className="flex flex-wrap gap-1">
                {item.properties.map(p => {
                  const tip = findPropTooltip(p)
                  return tip ? (
                    <Tooltip key={p}>
                      <TooltipTrigger>
                        <span><Badge variant="outline" className="text-[10px] cursor-help border-slate-600/40 text-slate-400">{p}</Badge></span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-semibold text-xs mb-0.5">{tip.name}</p>
                        <p className="text-xs opacity-90 max-w-[220px]">{tip.shortDescription}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Badge key={p} variant="outline" className="text-[10px] border-slate-600/40 text-slate-400">{p}</Badge>
                  )
                })}
              </div>
            </TooltipProvider>
          )}
          {item.ammoType && item.ammoType !== 'unlimited' && item.ammoName && (
            <p className="text-[10px] text-slate-500">
              Ammo: {item.ammoName} · {item.ammoType === 'pack' ? `${item.ammoCapacity} packs/session` : `${item.ammoCapacity} shots`}
              {item.rechargeable ? ' · Rechargeable' : ''}
            </p>
          )}
          {item.itemAbilities && item.itemAbilities.length > 0 && (
            <div className="space-y-1">
              {item.itemAbilities.map((ab, i) => (
                <div key={i} className="rounded border border-slate-700/30 px-2 py-1.5 bg-slate-800/30">
                  <p className="text-[11px] font-semibold text-slate-200 mb-0.5">{ab.name}</p>
                  <p className="text-[10px] text-slate-400 leading-relaxed">{ab.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Classes Tab ──────────────────────────────────────────────────────────────

function ClassesTab() {
  const [search, setSearch] = useState('')
  const classes = useMemo(() => {
    const q = search.toLowerCase()
    return getAllClasses().filter(c => !q || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
  }, [search])

  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Search classes…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-3 py-2 rounded-md bg-slate-800/50 border border-slate-700/40 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-amber-500/40 transition-colors"
      />
      <p className="text-[10px] text-slate-600 tracking-wider">{classes.length} classes</p>
      <div className="space-y-1">
        {classes.map(cls => <ClassCard key={cls.id} cls={cls} />)}
      </div>
    </div>
  )
}

function ClassCard({ cls }: { cls: CharacterClass }) {
  const [open, setOpen] = useState(false)
  const lvl1Features = cls.features.filter(f => f.level === 1 && f.featureType === 'base').slice(0, 3)

  return (
    <div className="border border-slate-700/25 rounded-md overflow-hidden bg-slate-800/20">
      <button
        className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-slate-700/20 transition-colors text-left"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-[10px] text-slate-600 shrink-0 transition-transform duration-150"
          style={{ transform: open ? 'rotate(90deg)' : undefined }}>▶</span>
        <span className="flex-1 min-w-0">
          <span className="font-semibold text-sm text-slate-100">{cls.name}</span>
        </span>
        <Badge className="text-[9px] py-0 px-1.5 border shrink-0 bg-slate-700/40 text-slate-400 border-slate-600/40">
          d{cls.hitDie}
        </Badge>
      </button>

      {open && (
        <div className="px-3 pb-3 pt-1 border-t border-slate-700/20 space-y-3 bg-slate-800/10">
          <p className="text-xs text-slate-400 leading-relaxed">{cls.description}</p>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-slate-600 mb-1">Primary Abilities</p>
              <div className="flex gap-1 flex-wrap">
                {cls.primaryAbility.map(a => (
                  <span key={a} className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300/80 text-[10px] border border-amber-500/20">
                    {ABILITY_SHORT[a] ?? a.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-widest text-slate-600 mb-1">Saving Throws</p>
              <div className="flex gap-1 flex-wrap">
                {cls.savingThrows.map(a => (
                  <span key={a} className="px-1.5 py-0.5 rounded bg-slate-700/40 text-slate-300 text-[10px] border border-slate-600/30">
                    {ABILITY_SHORT[a] ?? a.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Proficiencies */}
          {(cls.armorProficiencies?.length || cls.weaponProficiencies?.length) ? (
            <div className="text-xs text-slate-500 space-y-0.5">
              {cls.armorProficiencies && cls.armorProficiencies.length > 0 && (
                <p><span className="text-slate-600">Armor:</span> {cls.armorProficiencies.join(', ')}</p>
              )}
              {cls.weaponProficiencies && cls.weaponProficiencies.length > 0 && (
                <p><span className="text-slate-600">Weapons:</span> {cls.weaponProficiencies.join(', ')}</p>
              )}
            </div>
          ) : null}

          {/* Subclasses */}
          {cls.subclasses && cls.subclasses.length > 0 && (
            <div>
              <p className="text-[9px] uppercase tracking-widest text-slate-600 mb-1.5">
                {cls.subclassLabel ?? 'Specializations'} ({cls.subclasses.length})
              </p>
              <div className="flex flex-wrap gap-1">
                {cls.subclasses.map(s => (
                  <span key={s.id} className="text-[10px] px-2 py-0.5 rounded border border-slate-700/30 bg-slate-800/40 text-slate-300">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Level 1 features preview */}
          {lvl1Features.length > 0 && (
            <div>
              <p className="text-[9px] uppercase tracking-widest text-slate-600 mb-1.5">Level 1 Features</p>
              <div className="space-y-1.5">
                {lvl1Features.map(f => (
                  <div key={f.name} className="rounded border border-slate-700/30 px-2 py-1.5 bg-slate-800/30">
                    <p className="text-[11px] font-semibold text-slate-200">{f.name}</p>
                    <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2 mt-0.5">
                      {f.description.split('\n')[0]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Species Tab ──────────────────────────────────────────────────────────────

function SpeciesTab() {
  const [search, setSearch] = useState('')
  const races = useMemo(() => {
    const q = search.toLowerCase()
    return getAllRaces().filter(r => !q || r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q))
  }, [search])

  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Search species…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-3 py-2 rounded-md bg-slate-800/50 border border-slate-700/40 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-amber-500/40 transition-colors"
      />
      <p className="text-[10px] text-slate-600 tracking-wider">{races.length} species</p>
      <div className="space-y-1">
        {races.map(r => <RaceCard key={r.id} race={r} />)}
      </div>
    </div>
  )
}

function RaceCard({ race }: { race: Race }) {
  const [open, setOpen] = useState(false)
  const abilityBonuses = Object.entries(race.abilityScoreIncreases).filter(([, v]) => v !== 0)

  return (
    <div className="border border-slate-700/25 rounded-md overflow-hidden bg-slate-800/20">
      <button
        className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-slate-700/20 transition-colors text-left"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-[10px] text-slate-600 shrink-0 transition-transform duration-150"
          style={{ transform: open ? 'rotate(90deg)' : undefined }}>▶</span>
        <span className="flex-1 min-w-0">
          <span className="font-semibold text-sm text-slate-100">{race.name}</span>
          {race.tier === 'advanced' && (
            <span className="ml-2 text-[9px] text-red-400/70 border border-red-500/20 rounded px-1 py-0.5">GM APPROVAL</span>
          )}
        </span>
        <div className="flex gap-0.5 shrink-0">
          {abilityBonuses.slice(0, 3).map(([ability, val]) => (
            <span key={ability} className="text-[9px] px-1 py-0.5 rounded bg-amber-500/10 text-amber-300/70 border border-amber-500/20">
              {val && val > 0 ? '+' : ''}{val} {ABILITY_SHORT[ability] ?? ability.slice(0, 3).toUpperCase()}
            </span>
          ))}
        </div>
      </button>

      {open && (
        <div className="px-3 pb-3 pt-1 border-t border-slate-700/20 space-y-3 bg-slate-800/10">
          <p className="text-xs text-slate-400 leading-relaxed">{race.description}</p>

          {/* Stats */}
          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
            <span><span className="text-slate-600">Speed:</span> {race.speed} ft</span>
            <span><span className="text-slate-600">Size:</span> {race.size}</span>
            {race.languages.length > 0 && (
              <span><span className="text-slate-600">Languages:</span> {race.languages.join(', ')}</span>
            )}
          </div>

          {/* Ability score choices */}
          {race.abilityScoreChoices && (
            <p className="text-xs text-slate-500">
              +{race.abilityScoreChoices.amount} to {race.abilityScoreChoices.choose} ability score{race.abilityScoreChoices.choose > 1 ? 's' : ''} of your choice
            </p>
          )}

          {/* Traits */}
          {race.traits.length > 0 && (
            <div>
              <p className="text-[9px] uppercase tracking-widest text-slate-600 mb-1.5">Traits</p>
              <div className="space-y-1.5">
                {race.traits.map(t => (
                  <div key={t.name} className="rounded border border-slate-700/30 px-2 py-1.5 bg-slate-800/30">
                    <p className="text-[11px] font-semibold text-slate-200">{t.name}</p>
                    <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">{t.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Drawbacks */}
          {race.drawbacks && race.drawbacks.length > 0 && (
            <div>
              <p className="text-[9px] uppercase tracking-widest text-red-500/60 mb-1.5">Drawbacks</p>
              <div className="space-y-1.5">
                {race.drawbacks.map(d => (
                  <div key={d.name} className="rounded border border-red-500/20 px-2 py-1.5 bg-red-500/5">
                    <p className="text-[11px] font-semibold text-red-300/80">{d.name}</p>
                    <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">{d.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Backgrounds Tab ──────────────────────────────────────────────────────────

function BackgroundsTab() {
  const [search, setSearch] = useState('')
  const backgrounds = useMemo(() => {
    const q = search.toLowerCase()
    return getAllBackgrounds().filter(b => !q || b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q))
  }, [search])

  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Search backgrounds…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-3 py-2 rounded-md bg-slate-800/50 border border-slate-700/40 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-amber-500/40 transition-colors"
      />
      <p className="text-[10px] text-slate-600 tracking-wider">{backgrounds.length} backgrounds</p>
      <div className="space-y-1">
        {backgrounds.map(b => <BackgroundCard key={b.id} bg={b} />)}
      </div>
    </div>
  )
}

function BackgroundCard({ bg }: { bg: Background }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-slate-700/25 rounded-md overflow-hidden bg-slate-800/20">
      <button
        className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-slate-700/20 transition-colors text-left"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-[10px] text-slate-600 shrink-0 transition-transform duration-150"
          style={{ transform: open ? 'rotate(90deg)' : undefined }}>▶</span>
        <span className="flex-1 min-w-0">
          <span className="font-semibold text-sm text-slate-100">{bg.name}</span>
          {bg.special && (
            <span className="ml-2 text-[9px] text-red-400/70 border border-red-500/20 rounded px-1 py-0.5">GM APPROVAL</span>
          )}
        </span>
        <div className="flex gap-0.5 shrink-0">
          {bg.skillProficiencies.map(s => (
            <span key={s} className="text-[9px] px-1 py-0.5 rounded bg-slate-700/40 text-slate-400 border border-slate-600/30 capitalize">
              {s.replace(/([A-Z])/g, ' $1').trim()}
            </span>
          ))}
        </div>
      </button>

      {open && (
        <div className="px-3 pb-3 pt-1 border-t border-slate-700/20 space-y-3 bg-slate-800/10">
          <p className="text-xs text-slate-400 leading-relaxed">{bg.description}</p>

          {/* Feature */}
          <div className="rounded border border-slate-700/30 px-2 py-1.5 bg-slate-800/30">
            <p className="text-[9px] uppercase tracking-widest text-slate-600 mb-1">Background Feature</p>
            <p className="text-[11px] font-semibold text-slate-200">{bg.feature.name}</p>
            <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">{bg.feature.description}</p>
          </div>

          {/* Tool proficiencies / languages */}
          {(bg.toolProficiencies?.length || bg.languages?.length || bg.languageChoices) ? (
            <div className="text-xs text-slate-500 space-y-0.5">
              {bg.toolProficiencies && bg.toolProficiencies.length > 0 && (
                <p><span className="text-slate-600">Tools:</span> {bg.toolProficiencies.join(', ')}</p>
              )}
              {bg.languages && bg.languages.length > 0 && (
                <p><span className="text-slate-600">Languages:</span> {bg.languages.join(', ')}</p>
              )}
              {bg.languageChoices && bg.languageChoices > 0 && (
                <p>+{bg.languageChoices} language{bg.languageChoices > 1 ? 's' : ''} of your choice</p>
              )}
            </div>
          ) : null}

          {/* Starting equipment */}
          {bg.startingEquipment.length > 0 && (
            <div>
              <p className="text-[9px] uppercase tracking-widest text-slate-600 mb-1">Starting Equipment</p>
              <ul className="space-y-0.5">
                {bg.startingEquipment.map((e, i) => (
                  <li key={i} className="text-[10px] text-slate-400 flex gap-1.5">
                    <span className="text-slate-600">·</span> {e}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── CompendiumPage ───────────────────────────────────────────────────────────

export default function CompendiumPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('items')

  return (
    <div className="min-h-screen bg-[#131519]">
      {/* Header */}
      <div
        className="sticky top-0 z-10 border-b"
        style={{ backgroundColor: '#0f1115', borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center gap-0 h-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 px-4 h-12 text-slate-400 hover:text-amber-300 hover:bg-white/5 transition-colors shrink-0 border-r border-white/[0.07] text-[11px] tracking-[0.15em] uppercase font-medium"
          >
            ← Home
          </button>
          <h1 className="px-4 text-[11px] tracking-[0.2em] uppercase font-semibold text-slate-300">
            Compendium
          </h1>
        </div>

        {/* Tab bar */}
        <div className="flex border-t border-white/[0.05]">
          {TABS.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase font-medium transition-colors relative ${
                activeTab === tab.value
                  ? 'text-amber-200'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.label}
              {activeTab === tab.value && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--wh-gold)]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {activeTab === 'items'       && <ItemsTab />}
        {activeTab === 'classes'     && <ClassesTab />}
        {activeTab === 'species'     && <SpeciesTab />}
        {activeTab === 'backgrounds' && <BackgroundsTab />}
      </div>
    </div>
  )
}
