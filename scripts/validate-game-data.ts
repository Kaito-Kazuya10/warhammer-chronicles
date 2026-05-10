/**
 * Game Data Integrity Checker
 *
 * Validates all content in src/modules/core/ for:
 *   1. Duplicate IDs within each content type
 *   2. Required fields present on every entity
 *   3. Cross-reference integrity (feat prerequisites, augment specializations, gene mod archetypes)
 *   4. Subclass ID uniqueness across all classes
 *   5. GeneMod stability cost vs tier (minor=1, major=2, extreme=3)
 *   6. Armor tier definitions completeness
 *   7. Class feature completeness
 *   8. Background completeness
 *   9. Item type-specific field warnings
 *
 * Exits 1 on any errors (blocks CI). Warnings print but don't block.
 *
 * Run: npm run validate:data
 */

import { coreModule } from '../src/modules/core/index.ts'
import { armorTierDefinitions } from '../src/modules/core/items/armor.ts'

// ─── Setup ────────────────────────────────────────────────────────────────────

const EXPECTED_TIERS = ['standard', 'master-crafted', 'artificer', 'relic', 'heroic'] as const
const STABILITY_COST_BY_TIER: Record<string, number> = { minor: 1, major: 2, extreme: 3 }

let errorCount = 0
let warnCount  = 0

function error(msg: string): void {
  console.error(`  [ERROR] ${msg}`)
  errorCount++
}

function warn(msg: string): void {
  console.warn(`  [WARN]  ${msg}`)
  warnCount++
}

function checkDuplicateIds(items: { id: string }[], label: string): void {
  const seen = new Map<string, number>()
  for (const item of items) {
    seen.set(item.id, (seen.get(item.id) ?? 0) + 1)
  }
  for (const [id, count] of seen) {
    if (count > 1) error(`${label}: duplicate id "${id}" appears ${count} times`)
  }
}

function checkRequiredStringFields(
  items: Record<string, unknown>[],
  fields: string[],
  label: string,
): void {
  for (const item of items) {
    for (const field of fields) {
      const val = item[field]
      if (val === undefined || val === null || (typeof val === 'string' && val.trim() === '')) {
        error(`${label} id="${item['id']}": missing required field "${field}"`)
      }
    }
  }
}

// ─── Extract content ──────────────────────────────────────────────────────────

const {
  races           = [],
  classes         = [],
  spells          = [],
  items           = [],
  feats           = [],
  npcs            = [],
  backgrounds     = [],
  augments        = [],
  geneModifications = [],
} = coreModule.content

const classIds    = new Set(classes.map(c => c.id))
const raceIds     = new Set(races.map(r => r.id))
const subclassIds = new Set(classes.flatMap(c => (c.subclasses ?? []).map(s => s.id)))

let totalEntries = 0

// ─── 1. Duplicate ID checks ───────────────────────────────────────────────────

console.log('\n── Duplicate IDs ──────────────────────────────────────────')
checkDuplicateIds(races,             'Race')
checkDuplicateIds(classes,           'Class')
checkDuplicateIds(spells,            'Spell')
checkDuplicateIds(items,             'Item')
checkDuplicateIds(feats,             'Feat')
checkDuplicateIds(npcs,             'NPC')
checkDuplicateIds(backgrounds,       'Background')
checkDuplicateIds(augments,          'Augment')
checkDuplicateIds(geneModifications, 'GeneMod')

totalEntries = races.length + classes.length + spells.length + items.length +
  feats.length + npcs.length + backgrounds.length + augments.length + geneModifications.length

// ─── 2. Required fields ───────────────────────────────────────────────────────

console.log('\n── Required Fields ────────────────────────────────────────')
checkRequiredStringFields(items           as Record<string, unknown>[], ['id', 'name', 'type', 'description'], 'Item')
checkRequiredStringFields(races           as Record<string, unknown>[], ['id', 'name', 'description'],         'Race')
checkRequiredStringFields(classes         as Record<string, unknown>[], ['id', 'name', 'description'],         'Class')
checkRequiredStringFields(feats           as Record<string, unknown>[], ['id', 'name', 'description'],         'Feat')
checkRequiredStringFields(augments        as Record<string, unknown>[], ['id', 'name', 'description'],         'Augment')
checkRequiredStringFields(geneModifications as Record<string, unknown>[], ['id', 'name', 'passiveEffect', 'geneSurgeEffect'], 'GeneMod')
checkRequiredStringFields(spells          as Record<string, unknown>[], ['id', 'name', 'description', 'castingTime', 'range', 'duration'], 'Spell')
checkRequiredStringFields(backgrounds     as Record<string, unknown>[], ['id', 'name', 'description'],         'Background')

// ─── 3. Cross-reference integrity ────────────────────────────────────────────

console.log('\n── Cross-References ───────────────────────────────────────')

for (const feat of feats) {
  if (feat.prerequisiteClass && !classIds.has(feat.prerequisiteClass)) {
    error(`Feat "${feat.id}": prerequisiteClass "${feat.prerequisiteClass}" does not match any class id`)
  }
  if (feat.prerequisiteRace && !raceIds.has(feat.prerequisiteRace)) {
    error(`Feat "${feat.id}": prerequisiteRace "${feat.prerequisiteRace}" does not match any race id`)
  }
}

for (const augment of augments) {
  const spec = (augment as Record<string, unknown>)['specialization'] as string | undefined
  if (spec && !subclassIds.has(spec)) {
    warn(`Augment "${augment.id}": specialization "${spec}" does not match any subclass id`)
  }
}

for (const mod of geneModifications) {
  if (mod.archetype && !subclassIds.has(mod.archetype)) {
    warn(`GeneMod "${mod.id}": archetype "${mod.archetype}" does not match any subclass id`)
  }
}

// ─── 4. Subclass ID uniqueness ────────────────────────────────────────────────

console.log('\n── Subclass IDs ───────────────────────────────────────────')

const allSubclassIds: string[] = []
for (const cls of classes) {
  for (const sub of cls.subclasses ?? []) {
    if (!sub.id || sub.id.trim() === '') {
      error(`Class "${cls.id}": subclass missing id (name: "${sub.name}")`)
    }
    allSubclassIds.push(sub.id)
  }
}
const seenSub = new Map<string, number>()
for (const id of allSubclassIds) {
  seenSub.set(id, (seenSub.get(id) ?? 0) + 1)
}
for (const [id, count] of seenSub) {
  if (count > 1) error(`Subclass id "${id}" is duplicated across classes`)
}

// ─── 5. GeneMod stability cost vs tier ───────────────────────────────────────

console.log('\n── GeneMod Stability Costs ────────────────────────────────')

for (const mod of geneModifications) {
  const expected = STABILITY_COST_BY_TIER[mod.tier]
  if (expected === undefined) {
    error(`GeneMod "${mod.id}": unrecognized tier "${mod.tier}"`)
  } else if (mod.stabilityCost !== expected) {
    error(`GeneMod "${mod.id}" (tier: ${mod.tier}): stabilityCost is ${mod.stabilityCost}, expected ${expected}`)
  }
}

// ─── 6. Armor tier definitions completeness ──────────────────────────────────

console.log('\n── Armor Tier Definitions ─────────────────────────────────')

const definedTiers = new Set(armorTierDefinitions.map(t => t.tier))
for (const tier of EXPECTED_TIERS) {
  if (!definedTiers.has(tier)) {
    error(`ArmorTierDefinitions: missing definition for tier "${tier}"`)
  }
}

for (const item of items) {
  if (item.tier && !EXPECTED_TIERS.includes(item.tier as typeof EXPECTED_TIERS[number])) {
    error(`Item "${item.id}": uses unknown tier "${item.tier}"`)
  }
}

// ─── 7. Class feature completeness ───────────────────────────────────────────

console.log('\n── Class Features ─────────────────────────────────────────')

for (const cls of classes) {
  if (!cls.features || cls.features.length === 0) {
    warn(`Class "${cls.id}": has no features defined`)
  }
  for (const feature of cls.features ?? []) {
    if (!feature.name || feature.name.trim() === '') {
      error(`Class "${cls.id}": feature at level ${feature.level} has no name`)
    }
    if (!feature.description || feature.description.trim() === '') {
      error(`Class "${cls.id}" feature "${feature.name}": missing description`)
    }
    if (feature.level < 1 || feature.level > 20) {
      error(`Class "${cls.id}" feature "${feature.name}": level ${feature.level} is out of range 1–20`)
    }
  }
  for (const sub of cls.subclasses ?? []) {
    for (const feature of sub.features ?? []) {
      if (!feature.name || feature.name.trim() === '') {
        error(`Class "${cls.id}" subclass "${sub.id}": feature at level ${feature.level} has no name`)
      }
    }
  }
}

// ─── 8. Background completeness ──────────────────────────────────────────────

console.log('\n── Backgrounds ────────────────────────────────────────────')

for (const bg of backgrounds) {
  const b = bg as Record<string, unknown>
  const feature = b['feature'] as Record<string, unknown> | undefined
  if (!feature || !feature['name'] || !feature['description']) {
    error(`Background "${bg.id}": missing feature.name or feature.description`)
  }
  const skills = b['skillProficiencies'] as unknown[] | undefined
  if (!skills || skills.length !== 2) {
    warn(`Background "${bg.id}": should have exactly 2 skillProficiencies (has ${skills?.length ?? 0})`)
  }
}

// ─── 9. Item type-specific field warnings ────────────────────────────────────

console.log('\n── Item Fields ────────────────────────────────────────────')

for (const item of items) {
  if (item.type === 'weapon') {
    if (!item.weaponCategory) warn(`Item "${item.id}" (weapon): missing weaponCategory`)
    if (!item.rangeType)      warn(`Item "${item.id}" (weapon): missing rangeType`)
    if (!item.damage)         warn(`Item "${item.id}" (weapon): missing damage dice`)
  }
  if (item.type === 'armor') {
    if (!item.armorClass) warn(`Item "${item.id}" (armor): missing armorClass`)
    if (!item.armorType)  warn(`Item "${item.id}" (armor): missing armorType`)
  }
  if (item.isNamed && item.tier === 'standard') {
    warn(`Item "${item.id}": isNamed=true but tier is "standard" — named items should be master-crafted or above`)
  }

  if ((item as Record<string, unknown>)['addictionDC'] && item.type !== 'consumable') {
    error(`Item "${item.id}" (${item.type}): addictionDC is only valid on consumables`)
  }
  if ((item as Record<string, unknown>)['postUseSaveDC'] && !(item as Record<string, unknown>)['postUseSaveAbility']) {
    error(`Item "${item.id}": postUseSaveDC requires postUseSaveAbility`)
  }
  const restricted = (item as Record<string, unknown>)['restrictedToClasses'] as string[] | undefined
  if (restricted?.length) {
    for (const cls of restricted) {
      if (!classIds.has(cls)) {
        error(`Item "${item.id}": restrictedToClasses references unknown class "${cls}"`)
      }
    }
  }
  if (item.type === 'consumable' && item.consumableCharges && !item.consumableActionType) {
    warn(`Item "${item.id}" (consumable): has consumableCharges but no consumableActionType`)
  }
  if (item.tags?.includes('flamer-fuel') && item.type !== 'consumable') {
    warn(`Item "${item.id}": tagged as 'flamer-fuel' but type is "${item.type}" — expected consumable`)
  }
}

// ─── 10. Feature formula and uses consistency ───────────────────────────────

console.log('\n── Feature Formulas & Uses ─────────────────────────────────')

const KNOWN_TOKENS = new Set([
  'proficiency', 'strength', 'dexterity', 'constitution',
  'intelligence', 'wisdom', 'charisma', 'gene-surge',
])

function isValidToken(token: string): boolean {
  if (KNOWN_TOKENS.has(token)) return true
  return !isNaN(parseInt(token, 10))
}

for (const cls of classes) {
  const allFeatures = [
    ...(cls.features ?? []),
    ...(cls.subclasses ?? []).flatMap(s => s.features ?? []),
  ]
  for (const f of allFeatures) {
    if (f.usesCount) {
      const tokens = f.usesCount.toLowerCase().trim().split('+').map(t => t.trim())
      for (const token of tokens) {
        if (!isValidToken(token)) {
          warn(`Class "${cls.id}" feature "${f.name}": usesCount contains unrecognized token "${token}" in "${f.usesCount}"`)
        }
      }
    }
    if (f.usesPerRest && f.usesPerRest !== 'at-will' && f.usesPerRest !== 'per-encounter' && !f.usesCount) {
      warn(`Class "${cls.id}" feature "${f.name}": has usesPerRest="${f.usesPerRest}" but no usesCount`)
    }
    if (f.usesCount && !f.usesPerRest) {
      warn(`Class "${cls.id}" feature "${f.name}": has usesCount="${f.usesCount}" but no usesPerRest`)
    }
  }

  if (cls.classResource && !cls.classResource.resetOn) {
    const name = cls.classResource.name
    if (cls.classResource.type !== 'bar') {
      warn(`Class "${cls.id}": classResource "${name}" has no resetOn (pool/dice resources usually reset on rest)`)
    }
  }

  const deprecated = ['arcana']
  for (const skill of cls.skillChoices ?? []) {
    if (deprecated.includes(skill)) {
      warn(`Class "${cls.id}": skillChoices contains deprecated skill "${skill}"`)
    }
  }
}

// ─── Final report ─────────────────────────────────────────────────────────────

console.log('\n' + '═'.repeat(60))
console.log(`Checked ${totalEntries} content entries.`)

if (errorCount > 0) {
  console.error(`\n❌ ${errorCount} error(s), ${warnCount} warning(s) — FAILED\n`)
  process.exit(1)
} else if (warnCount > 0) {
  console.warn(`\n⚠  0 errors, ${warnCount} warning(s) — PASSED with warnings\n`)
} else {
  console.log(`\n✓  All checks passed.\n`)
}
