import type { WarhamerModule, Spell, Item, Race, CharacterClass, Feat, NPC, Background } from '../types/module'

// ─── Module Registry ──────────────────────────────────────────────────────────
// Holds all loaded modules and provides lookup helpers.
// Import a new module with registerModule(myModule) and its content
// becomes immediately available everywhere.

const registry: Map<string, WarhamerModule> = new Map()

export function registerModule(mod: WarhamerModule): void {
  if (registry.has(mod.id)) {
    console.warn(`[Registry] Module "${mod.id}" is already registered. Overwriting.`)
  }
  registry.set(mod.id, mod)
  console.info(`[Registry] Loaded module: ${mod.name} v${mod.version}`)
}

export function unregisterModule(id: string): void {
  registry.delete(id)
}

export function getLoadedModules(): WarhamerModule[] {
  return Array.from(registry.values())
}

// ─── Aggregated lookups (searches across ALL loaded modules) ──────────────────

export function getAllSpells(): Spell[] {
  return getLoadedModules().flatMap(m => m.content.spells ?? [])
}

export function getAllItems(): Item[] {
  return getLoadedModules().flatMap(m => m.content.items ?? [])
}

export function getAllRaces(): Race[] {
  return getLoadedModules().flatMap(m => m.content.races ?? [])
}

export function getAllClasses(): CharacterClass[] {
  return getLoadedModules().flatMap(m => m.content.classes ?? [])
}

export function getAllFeats(): Feat[] {
  return getLoadedModules().flatMap(m => m.content.feats ?? [])
}

export function getSpellById(id: string): Spell | undefined {
  return getAllSpells().find(s => s.id === id)
}

export function getItemById(id: string): Item | undefined {
  return getAllItems().find(i => i.id === id)
}

export function getRaceById(id: string): Race | undefined {
  return getAllRaces().find(r => r.id === id)
}

export function getClassById(id: string): CharacterClass | undefined {
  return getAllClasses().find(c => c.id === id)
}

export function getFeatById(id: string): Feat | undefined {
  return getAllFeats().find(f => f.id === id)
}

export function getAllNPCs(): NPC[] {
  return getLoadedModules().flatMap(m => m.content.npcs ?? [])
}

export function getNPCById(id: string): NPC | undefined {
  return getAllNPCs().find(n => n.id === id)
}

export function getAllBackgrounds(): Background[] {
  return getLoadedModules().flatMap(m => m.content.backgrounds ?? [])
}

export function getBackgroundById(id: string): Background | undefined {
  return getAllBackgrounds().find(b => b.id === id)
}

// ─── Load a module from a JSON file (browser file picker) ────────────────────

export async function loadModuleFromFile(file: File): Promise<WarhamerModule> {
  const text = await file.text()
  const mod = JSON.parse(text) as WarhamerModule

  if (!mod.id || !mod.name || !mod.version || !mod.content) {
    throw new Error('Invalid module format: missing required fields (id, name, version, content)')
  }

  registerModule(mod)
  return mod
}
