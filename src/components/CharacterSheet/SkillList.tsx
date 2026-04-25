import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { useCharacterStore, getModifier } from '../../store/characterStore'
import { useDiceStore } from '../../store/diceStore'
import { rollCheck, fmtMod } from '../../utils/dice'
import type { AbilityScore, SkillName } from '../../types/module'

// ─── Constants ────────────────────────────────────────────────────────────────

const ABILITY_ABBR: Record<AbilityScore, string> = {
  strength:     'STR',
  dexterity:    'DEX',
  constitution: 'CON',
  intelligence: 'INT',
  wisdom:       'WIS',
  charisma:     'CHA',
}

// Sorted alphabetically by label
const SKILLS_RAW: { key: SkillName; label: string; ability: AbilityScore }[] = [
  { key: 'acrobatics',     label: 'Acrobatics',      ability: 'dexterity'    },
  { key: 'animalHandling', label: 'Animal Handling',  ability: 'wisdom'       },
  { key: 'arcana',         label: 'Arcana',           ability: 'intelligence' },
  { key: 'athletics',      label: 'Athletics',        ability: 'strength'     },
  { key: 'deception',      label: 'Deception',        ability: 'charisma'     },
  { key: 'history',        label: 'History',          ability: 'intelligence' },
  { key: 'insight',        label: 'Insight',          ability: 'wisdom'       },
  { key: 'intimidation',   label: 'Intimidation',     ability: 'charisma'     },
  { key: 'investigation',  label: 'Investigation',    ability: 'intelligence' },
  { key: 'medicine',       label: 'Medicine',         ability: 'wisdom'       },
  { key: 'nature',         label: 'Nature',           ability: 'intelligence' },
  { key: 'perception',     label: 'Perception',       ability: 'wisdom'       },
  { key: 'performance',    label: 'Performance',      ability: 'charisma'     },
  { key: 'persuasion',     label: 'Persuasion',       ability: 'charisma'     },
  { key: 'religion',       label: 'Religion',         ability: 'intelligence' },
  { key: 'sleightOfHand',  label: 'Sleight of Hand',  ability: 'dexterity'    },
  { key: 'stealth',        label: 'Stealth',          ability: 'dexterity'    },
  { key: 'survival',       label: 'Survival',         ability: 'wisdom'       },
  { key: 'technology',     label: 'Technology',       ability: 'intelligence' },
  { key: 'warpControl',    label: 'Warp Control',     ability: 'wisdom'       },
  { key: 'xenology',       label: 'Xenology',         ability: 'intelligence' },
]
const SKILLS = SKILLS_RAW.slice().sort((a, b) => a.label.localeCompare(b.label))

// ─── SkillList ────────────────────────────────────────────────────────────────

interface Props {
  characterId: string
}

export default function SkillList({ characterId }: Props) {
  const character         = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const toggleSkill       = useCharacterStore(s => s.toggleSkill)
  const addRoll           = useDiceStore(s => s.addRoll)
  const showRollContext    = useDiceStore(s => s.showRollContext)

  if (!character) return null

  return (
    <Card>
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-sm font-bold tracking-widest uppercase text-muted-foreground">
          Skills
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 pb-1">
        {/* Column header */}
        <div className="flex items-center gap-2 px-1 py-1.5 border-b border-border/50">
          <span className="w-3 flex-shrink-0" />
          <span className="w-7 text-[11px] uppercase tracking-wider text-muted-foreground/60 flex-shrink-0">MOD</span>
          <span className="flex-1 text-[11px] uppercase tracking-wider text-muted-foreground/60">SKILL</span>
          <span className="w-8 text-right text-[11px] uppercase tracking-wider text-muted-foreground/60 flex-shrink-0">BONUS</span>
        </div>

        {/* Skill rows */}
        <div className="max-h-[calc(100vh-220px)] overflow-y-auto lg:max-h-none lg:overflow-visible skill-list-scroll">
          {SKILLS.map(({ key, label, ability }) => {
            const proficient  = character.skills[key]
            const abilityMod  = getModifier(character.abilityScores[ability])
            const profBonus   = proficient ? character.proficiencyBonus : 0
            const bonus       = abilityMod + profBonus
            const bonusStr    = bonus >= 0 ? `+${bonus}` : String(bonus)

            const doRoll = (mode?: 'advantage' | 'disadvantage') => {
              const breakdown = proficient
                ? `${fmtMod(abilityMod)} ${ABILITY_ABBR[ability]}  +${profBonus} Prof`
                : `${fmtMod(abilityMod)} ${ABILITY_ABBR[ability]}`
              addRoll(rollCheck(label, 'skill', bonus, breakdown, mode))
            }

            return (
              <div
                key={key}
                className="flex items-center gap-2 px-1 py-[3px] rounded hover:bg-muted/50 transition-colors group"
              >
                {/* Proficiency dot — click to toggle, stops propagation */}
                <span
                  className={`w-3 h-3 rounded-full border-2 flex-shrink-0 transition-colors cursor-pointer ${
                    proficient
                      ? 'bg-primary border-primary'
                      : 'bg-transparent border-border hover:border-muted-foreground'
                  }`}
                  role="checkbox"
                  aria-checked={proficient}
                  aria-label={`Toggle proficiency: ${label}`}
                  tabIndex={0}
                  onClick={e => { e.stopPropagation(); toggleSkill(characterId, key) }}
                  onKeyDown={e => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleSkill(characterId, key)
                    }
                  }}
                />

                {/* Clickable area: ability abbr + skill name + bonus — rolls */}
                <div
                  className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label={`Roll ${label} check (${bonusStr})`}
                  onClick={() => doRoll()}
                  onContextMenu={e => { e.preventDefault(); showRollContext(e.clientX, e.clientY, doRoll) }}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); doRoll() } }}
                  title={`Left-click to roll · Right-click for Advantage/Disadvantage`}
                >
                  <span className="w-7 text-xs uppercase text-muted-foreground flex-shrink-0 group-hover:text-muted-foreground/80">
                    {ABILITY_ABBR[ability]}
                  </span>
                  <span className={`flex-1 text-sm transition-colors ${proficient ? 'text-foreground font-medium' : 'text-foreground/75'}`}>
                    {label}
                  </span>
                  <span className={`w-8 text-right font-mono text-sm flex-shrink-0 tabular-nums ${proficient ? 'text-foreground font-semibold' : 'text-foreground/70'}`}>
                    {bonusStr}
                  </span>
                  {/* Dice icon hint */}
                  <span className="text-[11px] text-muted-foreground/0 group-hover:text-muted-foreground/40 transition-opacity shrink-0" aria-hidden>
                    🎲
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
