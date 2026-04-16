import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useCharacterStore, getModifier, getProficiencyBonus } from '../../../store/characterStore'
import { getClassById, getAllFeats } from '../../../modules/registry'
import { rollDie } from '../../../utils/dice'
import type { ClassFeature } from '../../../types/module'
import type { AbilityScores } from '../../../types/character'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const ABILITIES: (keyof AbilityScores)[] = [
  'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma',
]
const AB_LABEL: Record<string, string> = {
  strength: 'STR', dexterity: 'DEX', constitution: 'CON',
  intelligence: 'INT', wisdom: 'WIS', charisma: 'CHA',
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const ACTION_LABELS: Record<string, string> = {
  'action': 'Action', 'bonus-action': 'Bonus Action', 'reaction': 'Reaction',
  'free': 'Free Action', 'passive': 'Passive', 'special': 'Special',
}

function featureMeta(f: ClassFeature): string {
  const parts: string[] = []
  if (f.actionType) parts.push(ACTION_LABELS[f.actionType] ?? f.actionType)
  if (f.usesPerRest && f.usesCount) {
    const rest = f.usesPerRest === 'short' ? 'Short Rest' : f.usesPerRest === 'long' ? 'Long Rest' : f.usesPerRest
    parts.push(`${f.usesCount}/${rest}`)
  }
  return parts.join(' · ')
}

// ─── Types ───────────────────────────────────────────────────────────────────

type Step = 'summary' | 'hp' | 'asi' | 'features' | 'confirm'

interface Props {
  characterId: string
  onClose: () => void
}

// ─── ExpandableFeatureCard ───────────────────────────────────────────────────

function ExpandableFeatureCard({ feature, badge }: { feature: ClassFeature; badge: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <button
      onClick={() => setExpanded(v => !v)}
      className="w-full text-left rounded-md border border-border bg-muted/30 px-3 py-2 hover:bg-muted/40 transition-colors"
    >
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-sm font-semibold text-foreground">{feature.name}</span>
        {badge}
        <span className="ml-auto text-[10px] text-muted-foreground flex-shrink-0">
          {expanded ? '▲ less' : '▼ more'}
        </span>
      </div>
      <p className={`text-xs text-foreground/70 mt-0.5 leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}>
        {feature.description}
      </p>
    </button>
  )
}

// ─── LevelUpFlow ─────────────────────────────────────────────────────────────

export default function LevelUpFlow({ characterId, onClose }: Props) {
  const character = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)

  const [levelUpCount, setLevelUpCount] = useState(0)
  const [step, setStep] = useState<Step>('summary')
  const [confirmed, setConfirmed] = useState(false)
  const [confirmedFromLevel, setConfirmedFromLevel] = useState<number | null>(null)

  // Per-level choices
  const [hpGain, setHpGain] = useState<number | null>(null)
  const [hpMethod, setHpMethod] = useState<'roll' | 'average' | null>(null)
  const [hpRollValue, setHpRollValue] = useState<number | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [asiMode, setAsiMode] = useState<'asi' | 'feat'>('asi')
  const [asiChanges, setAsiChanges] = useState<Record<string, number>>({})
  const [asiPointsUsed, setAsiPointsUsed] = useState(0)
  const [selectedFeat, setSelectedFeat] = useState<string | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

  if (!character) return null

  const targetLevel = character.level + 1
  const cls = getClassById(character.class)
  const subclass = cls?.subclasses?.find(sc => sc.id === character.subclass)
  const conMod = getModifier(character.abilityScores.constitution)
  const hitDie = cls?.hitDie ?? 10
  const avgHPValue = Math.floor(hitDie / 2) + 1
  const oldProf = getProficiencyBonus(character.level)
  const newProf = getProficiencyBonus(targetLevel)
  const profChanged = oldProf !== newProf
  const isASI = [4, 8, 10].includes(targetLevel)

  // Features at new level
  const baseFeatures = (cls?.features ?? []).filter(f => f.level === targetLevel)
  const subFeatures  = (subclass?.features ?? []).filter(f => f.level === targetLevel)
  const coreFeatures = subFeatures.filter(f => f.featureType === 'core')
  const mainFeatures = subFeatures.filter(f => f.featureType === 'main')
  // Option features from BOTH base class and subclass
  const optionFeatures = [
    ...baseFeatures.filter(f => f.featureType === 'option'),
    ...subFeatures.filter(f => f.featureType === 'option'),
  ]
  // Unique option groups (preserving order)
  const optionGroups = [...new Set(
    optionFeatures.map(f => f.optionGroup).filter((g): g is string => !!g)
  )]
  const hasOptions = optionGroups.length > 0
  // Automatic (non-choice) features — exclude option-type and ASI entries
  const nonASIBase = baseFeatures.filter(
    f => f.name !== 'Ability Score Improvement' && f.featureType !== 'option'
  )
  const allNewFeatures = [...nonASIBase, ...coreFeatures, ...mainFeatures]

  // All features for finding originals of ENHANCE options
  const allClassFeatures = [...(cls?.features ?? []), ...(subclass?.features ?? [])]
  const findOriginal = (sourceFeature: string) =>
    allClassFeatures.find(f => slugify(f.name) === sourceFeature)

  // Available feats
  const allFeats = getAllFeats()
  const availableFeats = allFeats.filter(
    feat => !character.featIds?.includes(feat.id) &&
      (!feat.prerequisiteClass || feat.prerequisiteClass === character.class) &&
      (!feat.prerequisiteRace || feat.prerequisiteRace === character.race)
  )

  // Build step list
  const steps: Step[] = ['summary', 'hp']
  if (isASI) steps.push('asi')
  if (hasOptions) steps.push('features')
  steps.push('confirm')

  const stepIdx = steps.indexOf(step)

  const canProceed = (() => {
    switch (step) {
      case 'summary': return true
      case 'hp': return hpGain !== null
      case 'asi': return asiMode === 'feat' ? selectedFeat !== null : asiPointsUsed === 2
      case 'features': return !hasOptions || optionGroups.every(g => selectedOptions[g] !== undefined)
      case 'confirm': return true
    }
  })()

  const goNext = () => { if (stepIdx < steps.length - 1) setStep(steps[stepIdx + 1]) }
  const goBack = () => { if (stepIdx > 0) setStep(steps[stepIdx - 1]) }

  // ─── HP Handlers ─────────────────────────────────────────────────────────

  const handleRollHP = () => {
    setIsRolling(true)
    setTimeout(() => {
      const roll = rollDie(hitDie)
      const gain = Math.max(1, roll + conMod)
      setHpRollValue(roll)
      setHpGain(gain)
      setHpMethod('roll')
      setIsRolling(false)
    }, 500)
  }

  const handleAverageHP = () => {
    setHpGain(Math.max(1, avgHPValue + conMod))
    setHpMethod('average')
    setHpRollValue(null)
  }

  // ─── ASI Handlers ────────────────────────────────────────────────────────

  const addPoint = (ab: string) => {
    if (asiPointsUsed >= 2) return
    const current = character.abilityScores[ab as keyof AbilityScores] + (asiChanges[ab] ?? 0)
    if (current >= 20) return
    setAsiChanges(prev => ({ ...prev, [ab]: (prev[ab] ?? 0) + 1 }))
    setAsiPointsUsed(prev => prev + 1)
  }
  const removePoint = (ab: string) => {
    if ((asiChanges[ab] ?? 0) <= 0) return
    setAsiChanges(prev => ({ ...prev, [ab]: (prev[ab] ?? 0) - 1 }))
    setAsiPointsUsed(prev => prev - 1)
  }
  const resetASI = () => { setAsiChanges({}); setAsiPointsUsed(0) }

  // ─── Confirm ─────────────────────────────────────────────────────────────

  const resetPerLevel = () => {
    setStep('summary')
    setConfirmed(false)
    setConfirmedFromLevel(null)
    setHpGain(null)
    setHpMethod(null)
    setHpRollValue(null)
    setIsRolling(false)
    setAsiMode('asi')
    setAsiChanges({})
    setAsiPointsUsed(0)
    setSelectedFeat(null)
    setSelectedOptions({})
  }

  const handleConfirm = () => {
    setConfirmedFromLevel(character.level)

    const patch: Partial<typeof character> = {
      level: targetLevel,
      maxHitPoints: character.maxHitPoints + (hpGain ?? 0),
      currentHitPoints: character.currentHitPoints + (hpGain ?? 0),
      proficiencyBonus: newProf,
    }

    if (isASI && asiMode === 'asi') {
      const scores = { ...character.abilityScores }
      for (const [ab, inc] of Object.entries(asiChanges)) {
        if (inc > 0) scores[ab as keyof AbilityScores] = scores[ab as keyof AbilityScores] + inc
      }
      patch.abilityScores = scores
    }
    if (isASI && asiMode === 'feat' && selectedFeat) {
      patch.featIds = [...(character.featIds ?? []), selectedFeat]
    }
    if (hasOptions && optionGroups.length > 0) {
      const newChoices = { ...(character.featureChoices ?? {}) }
      for (const [group, optSlug] of Object.entries(selectedOptions)) {
        if (optSlug) newChoices[group] = optSlug
      }
      patch.featureChoices = newChoices
    }

    updateCharacter(characterId, patch)
    setConfirmed(true)
    setLevelUpCount(prev => prev + 1)
  }

  const handleContinue = () => resetPerLevel()

  // ─── Feature badge helpers ───────────────────────────────────────────────

  const typeBadge = (ft?: string) => {
    switch (ft) {
      case 'core': return <Badge className="text-[9px] py-0 px-1.5 bg-[var(--wh-gold)]/15 text-[var(--wh-gold)] border-[var(--wh-gold)]/30">CORE</Badge>
      case 'main': return <Badge className="text-[9px] py-0 px-1.5 bg-blue-500/15 text-blue-400 border-blue-500/30">MAIN</Badge>
      case 'base': return <Badge className="text-[9px] py-0 px-1.5 bg-muted text-muted-foreground border-border">BASE</Badge>
      default: return null
    }
  }

  // ─── RENDER: Summary Step ────────────────────────────────────────────────

  const renderSummary = () => (
    <div className="space-y-5">
      <div className="text-center py-2">
        <p className="text-3xl font-bold text-foreground">
          Level {character.level} → Level {targetLevel}
        </p>
        <p className="text-sm text-foreground/70 mt-1">
          Here's what you gain at your new level.
        </p>
      </div>

      <Separator />

      {/* HP */}
      <div>
        <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">Wounds</p>
        <p className="text-sm text-foreground/70">
          Roll <span className="font-mono font-semibold text-foreground">1d{hitDie}</span> + <span className="font-mono text-foreground">{conMod >= 0 ? '+' : ''}{conMod}</span> CON modifier for new Wounds
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Or take the average: <span className="font-mono font-semibold">{avgHPValue}</span> + <span className="font-mono">{conMod >= 0 ? '+' : ''}{conMod}</span> = <span className="font-mono font-semibold">{Math.max(1, avgHPValue + conMod)}</span>
        </p>
      </div>

      {/* Proficiency */}
      <div>
        <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">Proficiency Bonus</p>
        {profChanged ? (
          <p className="text-sm text-[var(--wh-gold)] font-semibold">
            Increases to +{newProf}!
          </p>
        ) : (
          <p className="text-sm text-foreground/80">Stays at +{oldProf}</p>
        )}
      </div>

      {/* New features */}
      {allNewFeatures.length > 0 && (
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">New Features</p>
          <div className="space-y-2">
            {allNewFeatures.map(f => (
              <ExpandableFeatureCard key={f.name} feature={f} badge={typeBadge(f.featureType)} />
            ))}
          </div>
        </div>
      )}

      {/* ASI notice */}
      {isASI && (
        <div className="rounded-md border border-[var(--wh-gold)]/30 bg-[var(--wh-gold)]/5 p-3">
          <p className="text-sm font-semibold text-[var(--wh-gold)]">Ability Score Improvement</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Increase one ability score by 2, or two ability scores by 1. Or choose a feat.
          </p>
        </div>
      )}

      {/* Options notice */}
      {hasOptions && (
        <div className="rounded-md border border-primary/30 bg-primary/5 p-3">
          <p className="text-sm font-semibold text-primary">
            {optionGroups.length > 1 ? `${optionGroups.length} Choices Required` : 'Choice Required'}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {optionGroups.length > 1
              ? `You must make ${optionGroups.length} separate choices at this level.`
              : `You must choose one of ${optionFeatures.length} options at this level.`}
          </p>
        </div>
      )}
    </div>
  )

  // ─── RENDER: HP Step ─────────────────────────────────────────────────────

  const renderHP = () => (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">Increase Your Wounds</p>
        <p className="text-sm text-foreground/70">
          Choose how to determine your Wound increase.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Roll */}
        <button
          onClick={handleRollHP}
          disabled={isRolling}
          className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
            hpMethod === 'roll'
              ? 'border-primary bg-primary/5'
              : 'border-border bg-muted/20 hover:border-primary/40 hover:bg-muted/30'
          }`}
        >
          <span className={`text-3xl ${isRolling ? 'animate-bounce' : ''}`}>🎲</span>
          <span className="text-sm font-semibold">Roll 1d{hitDie}</span>
          <span className="text-[10px] text-muted-foreground">Take your chances</span>
        </button>

        {/* Average */}
        <button
          onClick={handleAverageHP}
          className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
            hpMethod === 'average'
              ? 'border-primary bg-primary/5'
              : 'border-border bg-muted/20 hover:border-primary/40 hover:bg-muted/30'
          }`}
        >
          <span className="text-3xl">📊</span>
          <span className="text-sm font-semibold">Take Average ({avgHPValue})</span>
          <span className="text-[10px] text-muted-foreground">Safe and steady</span>
        </button>
      </div>

      {/* Result */}
      {hpGain !== null && (
        <div className="rounded-lg border border-primary/20 bg-muted/40 p-4 text-center space-y-2">
          {hpMethod === 'roll' && hpRollValue !== null && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">Rolled:</span>
              <span className={`text-2xl font-bold font-mono ${
                hpRollValue === hitDie ? 'text-[var(--wh-gold)]' : hpRollValue === 1 ? 'text-destructive' : 'text-foreground'
              }`}>
                {hpRollValue}
              </span>
              <span className="text-sm text-muted-foreground">+ {conMod >= 0 ? '+' : ''}{conMod} CON</span>
            </div>
          )}
          {hpMethod === 'average' && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">Average:</span>
              <span className="text-2xl font-bold font-mono text-foreground">{avgHPValue}</span>
              <span className="text-sm text-muted-foreground">+ {conMod >= 0 ? '+' : ''}{conMod} CON</span>
            </div>
          )}
          <Separator />
          <p className="text-sm">
            Your maximum Wounds increase from{' '}
            <span className="font-mono font-semibold">{character.maxHitPoints}</span>
            {' '}to{' '}
            <span className="font-mono font-semibold text-[var(--wh-success)]">{character.maxHitPoints + hpGain}</span>
          </p>
          <p className="text-xs text-muted-foreground font-mono">+{hpGain} Wounds</p>
        </div>
      )}
    </div>
  )

  // ─── RENDER: ASI Step ────────────────────────────────────────────────────

  const renderASI = () => (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">
          Ability Score Improvement
        </p>
        <p className="text-sm text-foreground/70">
          Increase your ability scores or choose a feat.
        </p>
      </div>

      {/* Toggle: ASI vs Feat */}
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={asiMode === 'asi' ? 'default' : 'outline'}
          onClick={() => { setAsiMode('asi'); setSelectedFeat(null) }}
          className="flex-1"
        >
          Ability Scores
        </Button>
        <Button
          size="sm"
          variant={asiMode === 'feat' ? 'default' : 'outline'}
          onClick={() => { setAsiMode('feat'); resetASI() }}
          className="flex-1"
        >
          Choose a Feat
        </Button>
      </div>

      {asiMode === 'asi' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Points remaining: <span className="font-mono text-primary">{2 - asiPointsUsed}</span></p>
            {asiPointsUsed > 0 && (
              <Button size="sm" variant="ghost" onClick={resetASI} className="text-xs h-7">
                Reset
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {ABILITIES.map(ab => {
              const current = character.abilityScores[ab]
              const added = asiChanges[ab] ?? 0
              const newVal = current + added
              return (
                <div key={ab} className={`flex items-center justify-between p-2 rounded-md border transition-colors ${
                  added > 0 ? 'border-primary/50 bg-primary/5' : 'border-border bg-muted/20'
                }`}>
                  <div>
                    <span className="text-xs font-semibold tracking-wider">{AB_LABEL[ab]}</span>
                    <span className="text-xs text-muted-foreground ml-2 font-mono">
                      {current}{added > 0 && <span className="text-primary"> → {newVal}</span>}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removePoint(ab)}
                      disabled={added <= 0}
                      className="w-6 h-6 p-0 text-xs"
                    >
                      −
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => addPoint(ab)}
                      disabled={asiPointsUsed >= 2 || newVal >= 20}
                      className="w-6 h-6 p-0 text-xs"
                    >
                      +
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>

          {asiPointsUsed === 2 && (
            <p className="text-xs text-[var(--wh-success)] text-center font-medium">All points allocated!</p>
          )}
        </div>
      )}

      {asiMode === 'feat' && (
        <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
          {availableFeats.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4 italic">No feats available.</p>
          ) : (
            availableFeats.map(feat => (
              <button
                key={feat.id}
                onClick={() => setSelectedFeat(feat.id)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  selectedFeat === feat.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-muted/15 hover:bg-muted/30 hover:border-primary/30'
                }`}
              >
                <p className="text-sm font-semibold">{feat.name}</p>
                {feat.prerequisite && (
                  <p className="text-[10px] text-muted-foreground italic mt-0.5">Prerequisite: {feat.prerequisite}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1 line-clamp-3">{feat.description}</p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )

  // ─── RENDER: Features / Options Step ─────────────────────────────────────

  const renderFeatures = () => (
    <div className="space-y-5">
      {/* Informational features */}
      {allNewFeatures.length > 0 && (
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">New Features (Automatic)</p>
          <div className="space-y-2">
            {allNewFeatures.map(f => (
              <ExpandableFeatureCard
                key={f.name}
                feature={f}
                badge={
                  <span className="flex gap-1">
                    {typeBadge(f.featureType)}
                    {f.actionType && (
                      <Badge variant="outline" className="text-[9px] py-0 px-1">{ACTION_LABELS[f.actionType]}</Badge>
                    )}
                  </span>
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Option selection — one section per group */}
      {hasOptions && optionGroups.map(group => {
        const groupFeatures = optionFeatures.filter(f => f.optionGroup === group)
        return (
          <div key={group}>
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">
              {optionGroups.length > 1 ? `Choose One — ${group}` : 'Choose One'}
            </p>
            <p className="text-xs text-muted-foreground mb-3">Select one of the following options.</p>

            <div className="space-y-3">
              {groupFeatures.map((opt, i) => {
                const isEnhance = !!opt.sourceFeature
                const original = isEnhance ? findOriginal(opt.sourceFeature!) : null
                const optSlug = slugify(opt.name)
                const isSelected = selectedOptions[group] === optSlug
                const letter = String.fromCharCode(65 + i) // A, B, C...

                return (
                  <button
                    key={opt.name}
                    onClick={() => setSelectedOptions(prev => ({ ...prev, [group]: optSlug }))}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all shadow-sm ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-muted/20 hover:border-primary/30 hover:bg-muted/30'
                    }`}
                  >
                  {/* Header */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                    }`}>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-background" />}
                    </span>
                    <span className="text-sm font-semibold">
                      {letter}) {isEnhance ? `Enhance — ${original?.name ?? opt.sourceFeature}` : opt.name}
                    </span>
                    <Badge className={`text-[9px] py-0 px-1.5 ${
                      isEnhance
                        ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
                        : 'bg-green-500/15 text-green-400 border-green-500/30'
                    }`}>
                      {isEnhance ? 'ENHANCE' : 'NEW'}
                    </Badge>
                  </div>

                  {/* Enhance: show what it upgrades */}
                  {isEnhance && original && (
                    <p className="text-[10px] text-purple-400/80 mt-1.5 ml-7">
                      ⬆ Upgrades: {original.name} (Level {original.level})
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-xs text-muted-foreground mt-2 ml-7 leading-relaxed">
                    {opt.description.replace(/^\[CHOOSE ONE\]\s*/i, '')}
                  </p>

                  {/* Meta */}
                  {featureMeta(opt) && (
                    <p className="text-[10px] text-muted-foreground/70 mt-2 ml-7 font-mono">
                      {featureMeta(opt)}
                    </p>
                  )}
                </button>
              )
            })}
            </div>
          </div>
        )
      })}
    </div>
  )

  // ─── RENDER: Confirm Step ────────────────────────────────────────────────

  const renderConfirm = () => {
    const showFromLevel = confirmed ? confirmedFromLevel ?? character.level - 1 : character.level
    const showToLevel = showFromLevel + 1

    const chosenOptionEntries = optionGroups
      .map(g => ({ group: g, feature: optionFeatures.find(f => selectedOptions[g] && slugify(f.name) === selectedOptions[g]) }))
      .filter((x): x is { group: string; feature: NonNullable<typeof x.feature> } => !!x.feature)
    const chosenFeat = selectedFeat
      ? availableFeats.find(f => f.id === selectedFeat)
      : null

    return (
      <div className="space-y-4">
        {confirmed && (
          <div className="rounded-lg border border-[var(--wh-success)]/30 bg-[var(--wh-success)]/10 p-4 text-center shadow-sm">
            <p className="text-lg font-bold text-[var(--wh-success)]">Level Up Complete!</p>
            <p className="text-sm text-foreground/60 mt-0.5">
              Level {showFromLevel} → Level {showToLevel}
            </p>
          </div>
        )}

        {!confirmed && (
          <div className="text-center py-1">
            <p className="text-lg font-bold text-foreground">Confirm Level Up</p>
            <p className="text-sm text-foreground/70">Review your choices before confirming.</p>
          </div>
        )}

        <Separator />

        {/* Summary lines */}
        <div className="divide-y divide-border/40">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-foreground/60">Level</span>
            <span className="text-sm font-mono font-semibold">
              {showFromLevel} → <span className="text-primary">{showToLevel}</span>
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-foreground/60">Max Wounds</span>
            <span className="text-sm font-mono font-semibold">
              {character.maxHitPoints - (confirmed ? 0 : (hpGain ?? 0))} → <span className="text-[var(--wh-success)]">{confirmed ? character.maxHitPoints : character.maxHitPoints + (hpGain ?? 0)}</span>
              <span className="text-xs text-muted-foreground ml-1">(+{hpGain})</span>
            </span>
          </div>

          {profChanged && (
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-foreground/60">Proficiency Bonus</span>
              <span className="text-sm font-mono font-semibold">
                +{oldProf} → <span className="text-[var(--wh-gold)]">+{newProf}</span>
              </span>
            </div>
          )}

          {allNewFeatures.length > 0 && (
            <div className="py-2">
              <span className="text-sm text-foreground/60">New Features</span>
              <div className="mt-1 space-y-0.5">
                {allNewFeatures.map(f => (
                  <div key={f.name} className="flex items-center gap-1.5 ml-2">
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-sm">{f.name}</span>
                    {typeBadge(f.featureType)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {chosenOptionEntries.map(({ group, feature }) => (
            <div key={group} className="flex items-center justify-between py-2">
              <span className="text-sm text-foreground/60">
                {chosenOptionEntries.length > 1 ? `Choice (${group})` : 'Chosen Option'}
              </span>
              <span className="text-sm font-semibold">{feature.name}</span>
            </div>
          ))}

          {isASI && asiMode === 'asi' && asiPointsUsed > 0 && (
            <div className="py-2">
              <span className="text-sm text-foreground/60">Ability Score Increases</span>
              <div className="mt-1 space-y-0.5">
                {Object.entries(asiChanges).filter(([, v]) => v > 0).map(([ab, inc]) => (
                  <div key={ab} className="flex items-center gap-2 ml-2">
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-sm">{AB_LABEL[ab]} +{inc}</span>
                    <span className="text-xs text-muted-foreground font-mono">
                      ({character.abilityScores[ab as keyof AbilityScores]} → {character.abilityScores[ab as keyof AbilityScores] + inc})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isASI && asiMode === 'feat' && chosenFeat && (
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-foreground/60">Feat</span>
              <span className="text-sm font-semibold">{chosenFeat.name}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ─── Main Render ─────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-border border-t-4 border-t-[var(--wh-gold)] shrink-0">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-bold text-foreground">
            Level Up{levelUpCount > 0 ? ` #${levelUpCount + 1}` : ''}
          </h2>
          {!confirmed && (
            <Badge variant="outline" className="text-xs">
              Step {stepIdx + 1} / {steps.length}
            </Badge>
          )}
        </div>
        {!confirmed && (
          <p className="text-sm text-foreground/60">
            Level {character.level} → Level {targetLevel}
          </p>
        )}
        {/* Progress bar */}
        {!confirmed && (
          <div className="flex gap-1 mt-3">
            {steps.map((s, i) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i <= stepIdx ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {step === 'summary' && !confirmed && renderSummary()}
        {step === 'hp' && !confirmed && renderHP()}
        {step === 'asi' && !confirmed && renderASI()}
        {step === 'features' && !confirmed && renderFeatures()}
        {step === 'confirm' && renderConfirm()}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border flex justify-between shrink-0">
        {!confirmed ? (
          <>
            <Button variant="outline" size="sm" onClick={stepIdx === 0 ? onClose : goBack} className="text-foreground border-foreground/30 hover:bg-muted/40">
              {stepIdx === 0 ? 'Cancel' : '← Back'}
            </Button>
            {step === 'confirm' ? (
              <Button size="sm" onClick={handleConfirm}>
                Confirm Level Up
              </Button>
            ) : (
              <Button size="sm" onClick={goNext} disabled={!canProceed}>
                Next →
              </Button>
            )}
          </>
        ) : (
          <>
            <Button variant="outline" size="sm" onClick={onClose} className="text-foreground border-foreground/30 hover:bg-muted/40">Done</Button>
            {character.level < 10 && (
              <Button size="sm" onClick={handleContinue}>
                Continue to Level {character.level + 1} →
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
