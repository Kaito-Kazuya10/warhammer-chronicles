import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { useCharacterStore } from '../../../store/characterStore'
import { getBackgroundById } from '../../../modules/registry'

interface Props {
  characterId: string
}

// ─── Skill name → display label ───────────────────────────────────────────────

const SKILL_LABEL: Record<string, string> = {
  acrobatics: 'Acrobatics', animalHandling: 'Animal Handling', arcana: 'Arcana',
  athletics: 'Athletics', deception: 'Deception', history: 'History',
  insight: 'Insight', intimidation: 'Intimidation', investigation: 'Investigation',
  medicine: 'Medicine', nature: 'Nature', perception: 'Perception',
  performance: 'Performance', persuasion: 'Persuasion', religion: 'Religion',
  sleightOfHand: 'Sleight of Hand', stealth: 'Stealth', survival: 'Survival',
  xenology: 'Xenology', technology: 'Technology', warpControl: 'Warp Control',
}

// ─── BackgroundTab ────────────────────────────────────────────────────────────

export default function BackgroundTab({ characterId }: Props) {
  const character = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)
  if (!character) return null

  const bg = character.background ? getBackgroundById(character.background) : undefined

  if (!bg) {
    return (
      <div className="flex flex-col items-center justify-center h-32 gap-2 text-muted-foreground/50 border border-dashed border-border rounded-lg">
        <span className="text-2xl">📜</span>
        <span className="text-sm italic">No background selected</span>
      </div>
    )
  }

  return (
    <div className="space-y-3">

      {/* Card 1 — Background overview */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{bg.name}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground leading-relaxed">
          {bg.description}
        </CardContent>
      </Card>

      {/* Card 2 — Background feature */}
      <Card>
        <CardHeader className="py-2 px-3 bg-muted/20 border-b border-border">
          <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
            Feature
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3 space-y-1">
          <p className="text-sm font-semibold">{bg.feature.name}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{bg.feature.description}</p>
        </CardContent>
      </Card>

      {/* Card 3 — Proficiencies & Languages */}
      <Card>
        <CardHeader className="py-2 px-3 bg-muted/20 border-b border-border">
          <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
            Proficiencies & Languages
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3 space-y-3">
          {/* Skill proficiencies */}
          {bg.skillProficiencies.length > 0 && (
            <div className="space-y-1">
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">Skills</p>
              <div className="flex flex-wrap gap-1">
                {bg.skillProficiencies.map(s => (
                  <Badge key={s} variant="outline" className="text-xs">
                    {SKILL_LABEL[s] ?? s}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Tool proficiencies */}
          {bg.toolProficiencies && bg.toolProficiencies.length > 0 && (
            <div className="space-y-1">
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">Tools</p>
              <div className="flex flex-wrap gap-1">
                {bg.toolProficiencies.map(t => (
                  <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Languages from background */}
          {bg.languages && bg.languages.length > 0 && (
            <div className="space-y-1">
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">Languages</p>
              <div className="flex flex-wrap gap-1">
                {bg.languages.map(l => (
                  <Badge key={l} variant="outline" className="text-xs">{l}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Language choices note */}
          {bg.languageChoices != null && bg.languageChoices > 0 && (
            <p className="text-xs text-muted-foreground italic">
              + {bg.languageChoices} language{bg.languageChoices !== 1 ? 's' : ''} of your choice
            </p>
          )}
        </CardContent>
      </Card>

      {/* Card 4 — Character details (editable) */}
      <Card>
        <CardHeader className="py-2 px-3 bg-muted/20 border-b border-border">
          <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
            Character Details
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3 space-y-4">
          {(
            [
              { key: 'personalityTraits', label: 'Personality Traits' },
              { key: 'ideals',            label: 'Ideals'             },
              { key: 'bonds',             label: 'Bonds'              },
              { key: 'flaws',             label: 'Flaws'              },
            ] as const
          ).map(({ key, label }, i) => (
            <div key={key}>
              {i > 0 && <Separator className="mb-4" />}
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">
                  {label}
                </p>
                <Textarea
                  value={character[key]}
                  onChange={e => updateCharacter(characterId, { [key]: e.target.value })}
                  placeholder={`${label}…`}
                  className="min-h-[60px] resize-y text-sm"
                />
                {/* Suggested hints */}
                {key === 'personalityTraits' && bg.suggestedPersonalityTraits && bg.suggestedPersonalityTraits.length > 0 && (
                  <p className="text-[10px] text-muted-foreground/70 italic">
                    Suggested: {bg.suggestedPersonalityTraits[0]}
                  </p>
                )}
                {key === 'ideals' && bg.suggestedIdeals && bg.suggestedIdeals.length > 0 && (
                  <p className="text-[10px] text-muted-foreground/70 italic">
                    Suggested: {bg.suggestedIdeals[0]}
                  </p>
                )}
                {key === 'bonds' && bg.suggestedBonds && bg.suggestedBonds.length > 0 && (
                  <p className="text-[10px] text-muted-foreground/70 italic">
                    Suggested: {bg.suggestedBonds[0]}
                  </p>
                )}
                {key === 'flaws' && bg.suggestedFlaws && bg.suggestedFlaws.length > 0 && (
                  <p className="text-[10px] text-muted-foreground/70 italic">
                    Suggested: {bg.suggestedFlaws[0]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  )
}
