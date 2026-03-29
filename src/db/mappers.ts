import type { Character } from '@/types/character'
import type { DbCharacterRow } from './types'

// ─── Class-specific fields packed into class_data JSONB ──────────────────────

const CLASS_DATA_KEYS = [
  'augmentSlots',
  'powerCells',
  'installedAugmentIds',
  'fightingStyle',
  'featureChoices',
  'classResourceCurrent',
  'classResourceDiceRemaining',
  'techniquesKnown',
  'commandsKnownIds',
  'commandDiceRemaining',
  'tricksKnownIds',
  'trickUsesRemaining',
  'isInGeneSurge',
  'geneSurgesRemaining',
  'geneticInstability',
  'installedModIds',
  'psykerDiscipline',
  'sanctioningStatus',
  'preparedSpellIds',
  'featureUsesSpent',
  'lastShortRest',
  'lastLongRest',
] as const

// ─── Character → DB row ──────────────────────────────────────────────────────

export function characterToRow(char: Character, userId: string): DbCharacterRow {
  // Pack class-specific fields
  const classData: Record<string, unknown> = {}
  for (const key of CLASS_DATA_KEYS) {
    const val = (char as Record<string, unknown>)[key]
    if (val !== undefined) classData[key] = val
  }

  return {
    id: char.id,
    user_id: userId,
    campaign_id: char.campaignId ?? null,

    name: char.name,
    race: char.race,
    class: char.class,
    subclass: char.subclass ?? null,
    level: char.level,
    experience_points: char.experiencePoints,
    background: char.background,
    alignment: char.alignment,
    portrait: char.portrait ?? null,

    ability_scores: char.abilityScores,
    skills: char.skills,
    saving_throw_proficiencies: char.savingThrowProficiencies,
    max_hit_points: char.maxHitPoints,
    current_hit_points: char.currentHitPoints,
    temporary_hit_points: char.temporaryHitPoints,
    hit_dice_used: char.hitDiceUsed,
    armor_class: char.armorClass,
    initiative: char.initiative,
    speed: char.speed,
    proficiency_bonus: char.proficiencyBonus,

    inventory: char.inventory,
    spell_ids: char.spellIds,
    spell_slots: char.spellSlots as Record<string, { total: number; used: number }>,
    feat_ids: char.featIds,
    languages: char.languages,
    proficiencies_list: char.proficiencies,

    personality_traits: char.personalityTraits,
    ideals: char.ideals,
    bonds: char.bonds,
    flaws: char.flaws,
    backstory: char.backstory,

    inspiration: char.inspiration,
    death_save_successes: char.deathSaveSuccesses,
    death_save_failures: char.deathSaveFailures,

    warp_exposure: char.warpExposure,
    warp_bar: char.warpBar ?? null,
    corruption: char.corruption,
    faith: char.faith,
    currency: char.currency,

    class_data: classData,

    notes: char.notes,
    created_at: new Date(char.createdAt).toISOString(),
    updated_at: new Date(char.updatedAt).toISOString(),
  }
}

// ─── DB row → Character ──────────────────────────────────────────────────────

export function rowToCharacter(row: DbCharacterRow): Character {
  const classData = (row.class_data ?? {}) as Record<string, unknown>

  return {
    id: row.id,
    campaignId: row.campaign_id ?? undefined,
    name: row.name,
    race: row.race,
    class: row.class,
    subclass: row.subclass ?? undefined,
    level: row.level,
    experiencePoints: row.experience_points,
    background: row.background,
    alignment: row.alignment,
    portrait: row.portrait,

    abilityScores: row.ability_scores as Character['abilityScores'],
    skills: row.skills as Character['skills'],
    savingThrowProficiencies: row.saving_throw_proficiencies as Character['savingThrowProficiencies'],
    maxHitPoints: row.max_hit_points,
    currentHitPoints: row.current_hit_points,
    temporaryHitPoints: row.temporary_hit_points,
    hitDiceUsed: row.hit_dice_used,
    armorClass: row.armor_class,
    initiative: row.initiative,
    speed: row.speed,
    proficiencyBonus: row.proficiency_bonus,

    inventory: row.inventory as Character['inventory'],
    spellIds: row.spell_ids,
    spellSlots: row.spell_slots as Character['spellSlots'],
    featIds: row.feat_ids,
    languages: row.languages,
    proficiencies: row.proficiencies_list,

    personalityTraits: row.personality_traits,
    ideals: row.ideals,
    bonds: row.bonds,
    flaws: row.flaws,
    backstory: row.backstory,

    inspiration: row.inspiration,
    deathSaveSuccesses: row.death_save_successes,
    deathSaveFailures: row.death_save_failures,

    warpExposure: row.warp_exposure,
    warpBar: row.warp_bar ?? undefined,
    corruption: row.corruption,
    faith: row.faith,
    currency: row.currency,

    // Spread class-specific fields from the JSONB blob
    ...(classData.augmentSlots !== undefined && { augmentSlots: classData.augmentSlots as number }),
    ...(classData.powerCells !== undefined && { powerCells: classData.powerCells as Character['powerCells'] }),
    ...(classData.installedAugmentIds !== undefined && { installedAugmentIds: classData.installedAugmentIds as string[] }),
    ...(classData.fightingStyle !== undefined && { fightingStyle: classData.fightingStyle as string }),
    ...(classData.featureChoices !== undefined && { featureChoices: classData.featureChoices as Record<string, string> }),
    ...(classData.classResourceCurrent !== undefined && { classResourceCurrent: classData.classResourceCurrent as number }),
    ...(classData.classResourceDiceRemaining !== undefined && { classResourceDiceRemaining: classData.classResourceDiceRemaining as number }),
    ...(classData.techniquesKnown !== undefined && { techniquesKnown: classData.techniquesKnown as string[] }),
    ...(classData.commandsKnownIds !== undefined && { commandsKnownIds: classData.commandsKnownIds as string[] }),
    ...(classData.commandDiceRemaining !== undefined && { commandDiceRemaining: classData.commandDiceRemaining as number }),
    ...(classData.tricksKnownIds !== undefined && { tricksKnownIds: classData.tricksKnownIds as string[] }),
    ...(classData.trickUsesRemaining !== undefined && { trickUsesRemaining: classData.trickUsesRemaining as number }),
    ...(classData.isInGeneSurge !== undefined && { isInGeneSurge: classData.isInGeneSurge as boolean }),
    ...(classData.geneSurgesRemaining !== undefined && { geneSurgesRemaining: classData.geneSurgesRemaining as number }),
    ...(classData.geneticInstability !== undefined && { geneticInstability: classData.geneticInstability as number }),
    ...(classData.installedModIds !== undefined && { installedModIds: classData.installedModIds as string[] }),
    ...(classData.psykerDiscipline !== undefined && { psykerDiscipline: classData.psykerDiscipline as Character['psykerDiscipline'] }),
    ...(classData.sanctioningStatus !== undefined && { sanctioningStatus: classData.sanctioningStatus as Character['sanctioningStatus'] }),
    ...(classData.preparedSpellIds !== undefined && { preparedSpellIds: classData.preparedSpellIds as string[] }),
    ...(classData.featureUsesSpent !== undefined && { featureUsesSpent: classData.featureUsesSpent as Record<string, number> }),
    ...(classData.lastShortRest !== undefined && { lastShortRest: classData.lastShortRest as number }),
    ...(classData.lastLongRest !== undefined && { lastLongRest: classData.lastLongRest as number }),

    notes: row.notes,
    createdAt: new Date(row.created_at).getTime(),
    updatedAt: new Date(row.updated_at).getTime(),
  }
}
