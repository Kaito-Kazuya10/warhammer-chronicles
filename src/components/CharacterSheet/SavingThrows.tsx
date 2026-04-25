import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { useCharacterStore, getModifier } from '../../store/characterStore'
import { useDiceStore } from '../../store/diceStore'
import { rollCheck, fmtMod } from '../../utils/dice'
import type { AbilityScores } from '../../types/character'
import type { AbilityScore } from '../../types/module'

// ─── Constants ────────────────────────────────────────────────────────────────

const SAVES: { key: keyof AbilityScores; abbr: string }[] = [
  { key: 'strength',     abbr: 'STR' },
  { key: 'dexterity',    abbr: 'DEX' },
  { key: 'constitution', abbr: 'CON' },
  { key: 'intelligence', abbr: 'INT' },
  { key: 'wisdom',       abbr: 'WIS' },
  { key: 'charisma',     abbr: 'CHA' },
]

// ─── SavingThrows ─────────────────────────────────────────────────────────────

interface Props {
  characterId: string
}

export default function SavingThrows({ characterId }: Props) {
  const character       = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)
  const addRoll         = useDiceStore(s => s.addRoll)

  if (!character) return null

  const toggleProf = (key: AbilityScore) => {
    const current = character.savingThrowProficiencies
    const updated = current.includes(key)
      ? current.filter(k => k !== key)
      : [...current, key]
    updateCharacter(characterId, { savingThrowProficiencies: updated })
  }

  return (
    <Card>
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-sm font-bold tracking-widest uppercase text-muted-foreground">
          Saving Throws
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3 space-y-0.5">
        {SAVES.map(({ key, abbr }) => {
          const isProficient = character.savingThrowProficiencies.includes(key as AbilityScore)
          const mod          = getModifier(character.abilityScores[key])
          const profBonus    = isProficient ? character.proficiencyBonus : 0
          const bonus        = mod + profBonus
          const bonusStr     = bonus >= 0 ? `+${bonus}` : String(bonus)

          const handleRoll = () => {
            const breakdown = isProficient
              ? `${fmtMod(mod)} ${abbr}  +${profBonus} Prof`
              : `${fmtMod(mod)} ${abbr}`
            addRoll(rollCheck(`${abbr} Save`, 'save', bonus, breakdown))
          }

          return (
            <div
              key={key}
              className="flex items-center gap-2 py-0.5 rounded hover:bg-muted/50 px-1 transition-colors group"
            >
              {/* Proficiency dot — click to toggle */}
              <span
                className={`w-3 h-3 rounded-full border-2 flex-shrink-0 transition-colors cursor-pointer ${
                  isProficient
                    ? 'bg-primary border-primary'
                    : 'bg-transparent border-border hover:border-muted-foreground'
                }`}
                role="checkbox"
                aria-checked={isProficient}
                aria-label={`Toggle saving throw proficiency: ${abbr}`}
                tabIndex={0}
                onClick={e => { e.stopPropagation(); toggleProf(key as AbilityScore) }}
                onKeyDown={e => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault()
                    e.stopPropagation()
                    toggleProf(key as AbilityScore)
                  }
                }}
              />

              {/* Clickable area: bonus + label — rolls */}
              <div
                className="flex items-center gap-2 flex-1 cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`Roll ${abbr} saving throw (${bonusStr})`}
                onClick={handleRoll}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleRoll() } }}
                title={`Click to roll ${abbr} save`}
              >
                <span className="w-7 text-right font-mono text-sm font-medium text-foreground/90 flex-shrink-0">
                  {bonusStr}
                </span>
                <span className="text-sm uppercase tracking-wide text-muted-foreground flex-1">
                  {abbr}
                </span>
                {/* Dice icon hint */}
                <span className="text-[11px] text-muted-foreground/0 group-hover:text-muted-foreground/40 transition-opacity shrink-0" aria-hidden>
                  🎲
                </span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
