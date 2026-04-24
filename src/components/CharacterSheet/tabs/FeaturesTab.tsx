import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { useCharacterStore } from '../../../store/characterStore'
import { getClassById } from '../../../modules/registry'
import { resolveUsesCount } from '../../../utils/resolveUsesCount'
import { renderDescription } from '../../../utils/renderDescription'
import type { ClassFeature, FeatureActionType } from '../../../types/module'

interface Props {
  characterId: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// ─── Label maps ───────────────────────────────────────────────────────────────

const ACTION_LABEL: Record<FeatureActionType, string> = {
  'action':       'Action',
  'bonus-action': 'Bonus Action',
  'reaction':     'Reaction',
  'free':         'Free Action',
  'passive':      'Passive',
  'special':      'Special',
}

const ACTION_COLOR: Record<FeatureActionType, string> = {
  'action':       'bg-[var(--wh-crimson)]/10 text-[var(--wh-crimson)] border-[var(--wh-crimson)]/30',
  'bonus-action': 'bg-blue-500/10 text-blue-700 border-blue-500/30',
  'reaction':     'bg-amber-500/10 text-amber-700 border-amber-500/30',
  'free':         'bg-green-500/10 text-green-700 border-green-500/30',
  'passive':      'bg-muted text-muted-foreground border-border',
  'special':      'bg-purple-500/10 text-purple-700 border-purple-500/30',
}

// Tag → badge label + colour
const TAG_BADGE: Record<string, { label: string; cls: string }> = {
  core:   { label: 'CORE',   cls: 'bg-[var(--wh-gold)]/15 text-[var(--wh-gold)] border-[var(--wh-gold)]/30' },
  main:   { label: 'MAIN',   cls: 'bg-blue-500/15 text-blue-700 border-blue-500/30' },
  option: { label: 'OPTION', cls: 'bg-green-500/15 text-green-700 border-green-500/30' },
}

// ─── FeatureRow ───────────────────────────────────────────────────────────────

interface FeatureRowProps {
  feature: ClassFeature
  source?: string    // 'Subclass' label when from a subclass
  enhanced?: boolean // true if this feature was enhanced via featureChoices
  characterId: string
}

function FeatureRow({ feature, source, enhanced, characterId }: FeatureRowProps) {
  const [open, setOpen] = useState(false)
  const character       = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)

  // Resolve use tracking for limited-use features
  const hasUses = !!(
    feature.usesPerRest &&
    feature.usesPerRest !== 'at-will' &&
    feature.usesPerRest !== 'per-encounter' &&
    feature.usesCount &&
    character
  )
  const usesMax       = hasUses && character ? resolveUsesCount(feature.usesCount, character) : 0
  const featureKey    = slugify(feature.name)
  const usesSpent     = character?.featureUsesSpent?.[featureKey] ?? 0
  const usesRemaining = Math.max(0, usesMax - usesSpent)

  const handleUse = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!character || usesRemaining <= 0) return
    updateCharacter(characterId, {
      featureUsesSpent: {
        ...(character.featureUsesSpent ?? {}),
        [featureKey]: usesSpent + 1,
      },
    })
  }

  const tagBadges = (feature.tags ?? [])
    .filter(t => t in TAG_BADGE)
    .map(t => TAG_BADGE[t])

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="flex items-start gap-1 rounded-md hover:bg-muted/30 transition-colors group">
        <CollapsibleTrigger className="flex-1 text-left min-w-0">
          <div className="flex items-start gap-2 py-2 pl-3 pr-1">
            {/* Chevron */}
            <span
              className="mt-0.5 flex-shrink-0 text-xs text-muted-foreground/50 group-hover:text-muted-foreground transition-colors"
              style={{ display: 'inline-block', transform: open ? 'rotate(90deg)' : undefined, transition: 'transform 150ms' }}
            >
              ▶
            </span>

            {/* Name */}
            <span className={`flex-1 min-w-0 font-medium text-sm ${hasUses && usesRemaining === 0 ? 'text-muted-foreground/50' : ''}`}>
              {feature.name}
            </span>

            {/* Badges */}
            <div className="flex flex-wrap gap-1 flex-shrink-0">
              {enhanced && (
                <Badge className="text-[9px] py-0 px-1 bg-purple-500/15 text-purple-400 border-purple-500/30">⬆ ENHANCED</Badge>
              )}
              {tagBadges.map(({ label, cls }) => (
                <Badge key={label} className={`text-[9px] py-0 px-1 ${cls}`}>{label}</Badge>
              ))}
              {source && (
                <Badge className="text-[9px] py-0 px-1 bg-purple-500/10 text-purple-700 border-purple-500/30">
                  {source.toUpperCase()}
                </Badge>
              )}
              {feature.actionType && (
                <Badge className={`text-[9px] py-0 px-1 ${ACTION_COLOR[feature.actionType]}`}>
                  {ACTION_LABEL[feature.actionType]}
                </Badge>
              )}
              {/* Use count badge (new tracking system) */}
              {hasUses && (
                <Badge
                  variant="outline"
                  className={`text-[9px] py-0 px-1 ${usesRemaining === 0 ? 'opacity-40' : ''}`}
                >
                  {usesRemaining}/{usesMax} {feature.usesPerRest === 'short' ? 'SR' : 'LR'}
                </Badge>
              )}
              {/* Legacy usesMax badge (for features without usesCount) */}
              {!hasUses && feature.usesMax != null && (
                <Badge variant="outline" className="text-[9px] py-0 px-1">
                  {feature.usesMax}/{feature.usesPerRest === 'short' ? 'SR' : 'LR'}
                </Badge>
              )}
            </div>
          </div>
        </CollapsibleTrigger>

        {/* USE button — outside the trigger to avoid toggling collapsible */}
        {hasUses && (
          <button
            onClick={handleUse}
            disabled={usesRemaining <= 0}
            className={`self-start mt-1.5 mr-2 text-[9px] px-1.5 py-0.5 rounded border transition-colors flex-shrink-0 ${
              usesRemaining > 0
                ? 'border-primary/30 text-primary hover:bg-primary/10 cursor-pointer'
                : 'border-border text-muted-foreground/30 cursor-not-allowed'
            }`}
            title={usesRemaining > 0 ? `Use ${feature.name}` : 'No uses remaining'}
          >
            USE
          </button>
        )}
      </div>

      <CollapsibleContent>
        <div className="mx-3 mb-2 mt-0.5 pl-6 text-sm text-muted-foreground border-l border-border">
          {renderDescription(feature.description)}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// ─── LevelGroup ───────────────────────────────────────────────────────────────

interface LevelGroupProps {
  level: number
  features: { feature: ClassFeature; source?: string; enhanced?: boolean }[]
  characterId: string
}

function LevelGroup({ level, features, characterId }: LevelGroupProps) {
  return (
    <div className="space-y-0.5">
      {/* Level header */}
      <div className="flex items-center gap-2 py-1">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
          Level {level}
        </span>
        <Separator className="flex-1" />
      </div>
      {features.map(({ feature, source, enhanced }, i) => (
        <FeatureRow key={i} feature={feature} source={source} enhanced={enhanced} characterId={characterId} />
      ))}
    </div>
  )
}

// ─── FeaturesTab ──────────────────────────────────────────────────────────────

export default function FeaturesTab({ characterId }: Props) {
  const character = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  if (!character) return null

  const cls = character.class ? getClassById(character.class) : undefined
  const subclass = cls?.subclasses?.find(sc => sc.id === character.subclass)

  const tabLabel = cls?.featureTabName?.toUpperCase() ?? 'FEATURES & TRAITS'

  if (!cls) {
    return (
      <div className="flex flex-col items-center justify-center h-32 gap-2 text-muted-foreground/50 border border-dashed border-border rounded-lg">
        <span className="text-2xl">✦</span>
        <span className="text-sm italic">Select a class to view features.</span>
      </div>
    )
  }

  // Collect all features at or below character level, tagged with source
  // Apply featureChoices: show chosen options, hide unchosen, replace enhanced originals
  type Entry = { feature: ClassFeature; source?: string; enhanced?: boolean }
  const byLevel = new Map<number, Entry[]>()
  const choices = character.featureChoices ?? {}

  // Track which original features are replaced by ENHANCE options
  const enhancedOriginals = new Set<string>() // slugified names of replaced originals
  const enhancementMap = new Map<string, ClassFeature>() // original slug → enhanced feature

  // First pass: determine which originals are enhanced
  for (const [optGroup, chosenSlug] of Object.entries(choices)) {
    const chosen = (subclass?.features ?? []).find(
      f => f.optionGroup === optGroup && slugify(f.name) === chosenSlug
    )
    if (chosen?.sourceFeature) {
      enhancedOriginals.add(chosen.sourceFeature)
      enhancementMap.set(chosen.sourceFeature, chosen)
    }
  }

  const addFeature = (feature: ClassFeature, source?: string) => {
    if (feature.level > character.level) return

    // Handle options: only show chosen option, skip unchosen
    if (feature.featureType === 'option' && feature.optionGroup) {
      const chosen = choices[feature.optionGroup]
      if (!chosen) return // no choice made yet — hide all options for this group
      if (slugify(feature.name) !== chosen) return // not the chosen option
      // If it's an ENHANCE option, it will be shown in place of the original
      if (feature.sourceFeature) return // will be rendered as replacement below
      // It's a NEW option — add it
    }

    // Handle originals that have been enhanced — replace with enhanced version
    const featureSlug = slugify(feature.name)
    if (enhancedOriginals.has(featureSlug)) {
      const enhanced = enhancementMap.get(featureSlug)!
      if (!byLevel.has(feature.level)) byLevel.set(feature.level, [])
      byLevel.get(feature.level)!.push({ feature: enhanced, source, enhanced: true })
      return
    }

    if (!byLevel.has(feature.level)) byLevel.set(feature.level, [])
    byLevel.get(feature.level)!.push({ feature, source })
  }

  cls.features.forEach(f => addFeature(f))
  subclass?.features.forEach(f => addFeature(f, subclass.name))

  const sortedLevels = Array.from(byLevel.keys()).sort((a, b) => a - b)

  if (sortedLevels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 gap-2 text-muted-foreground/50 border border-dashed border-border rounded-lg">
        <span className="text-2xl">✦</span>
        <span className="text-sm italic">No features available yet</span>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {/* Section title */}
      <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold px-1 pb-1">
        {tabLabel}
      </p>

      {sortedLevels.map(level => (
        <LevelGroup key={level} level={level} features={byLevel.get(level)!} characterId={characterId} />
      ))}
    </div>
  )
}
