import type { Item } from '../../../types/module'

// ─── Data & Communication ────────────────────────────────────────────────────

const dataCommsItems: Item[] = [
  {
    id: 'micro-bead',
    name: 'Micro-Bead',
    type: 'gear',
    description: 'Compact ear-piece communicator. Short-range encrypted vox. 1-mile range.',
    cost: '10 Thrones',
    weight: 0,
  },
  {
    id: 'vox-caster',
    name: 'Vox-Caster',
    type: 'gear',
    description: 'Backpack-mounted long-range radio. 50-mile range. Can patch into Imperial vox networks.',
    cost: '50 Thrones',
    weight: 5,
  },
  {
    id: 'data-slate',
    name: 'Data-Slate',
    type: 'gear',
    description: 'Portable computing tablet. Stores documents, maps, and basic data. Standard administratum tool.',
    cost: '15 Thrones',
    weight: 0.5,
  },
  {
    id: 'pict-recorder',
    name: 'Pict-Recorder',
    type: 'gear',
    description: 'Handheld camera and video recorder. Stores images on data-crystal.',
    cost: '20 Thrones',
    weight: 1,
  },
  {
    id: 'vox-scrambler',
    name: 'Vox-Scrambler',
    type: 'gear',
    description: 'Encryption module for vox-casters. Makes transmissions unreadable without the matching decryption key.',
    cost: '40 Thrones',
    weight: 0.5,
  },
  {
    id: 'cartograph',
    name: 'Cartograph',
    type: 'gear',
    description: 'Portable mapping device. Records terrain as you travel. Requires data-slate to display.',
    cost: '25 Thrones',
    weight: 0.5,
  },
]

// ─── Detection & Scanning ────────────────────────────────────────────────────

const detectionItems: Item[] = [
  {
    id: 'auspex',
    name: 'Auspex',
    type: 'gear',
    description: 'Multi-spectrum scanner. Detects life signs, energy signatures, and movement within 50 ft. +2 to Perception checks to detect hidden creatures.',
    cost: '75 Thrones',
    weight: 1,
  },
  {
    id: 'bio-scanner',
    name: 'Bio-Scanner',
    type: 'gear',
    description: 'Specialized life-form detector. Identifies species type and approximate number within 100 ft.',
    cost: '50 Thrones',
    weight: 1,
  },
  {
    id: 'rad-counter',
    name: 'Rad-Counter',
    type: 'gear',
    description: 'Radiation detection meter. Alerts to dangerous radiation levels. Essential on irradiated worlds.',
    cost: '15 Thrones',
    weight: 0.5,
  },
  {
    id: 'motion-detector',
    name: 'Motion Detector',
    type: 'gear',
    description: 'Proximity alarm system. Alerts when movement is detected within 30 ft of the sensor. Set-and-forget.',
    cost: '30 Thrones',
    weight: 1,
  },
  {
    id: 'psyocculum',
    name: 'Psyocculum',
    type: 'gear',
    tier: 'artificer',
    description: 'Warp-sight goggles. Reveals psykers, daemons, and warp anomalies within 60 ft. Grants +2 to attack rolls against psykers.',
    cost: '200 Thrones',
    weight: 0.5,
  },
]

// ─── Security & Hacking ─────────────────────────────────────────────────────

const securityItems: Item[] = [
  {
    id: 'auto-quill',
    name: 'Auto-Quill',
    type: 'gear',
    description: 'Forging tool. Replicates handwriting, signatures, and official seals. +2 to Forgery checks.',
    cost: '30 Thrones',
    weight: 0.5,
  },
  {
    id: 'cogitator-spike',
    name: 'Cogitator Spike',
    type: 'gear',
    description: 'Hacking tool for Imperial cogitators (computers). +2 to Technology checks to bypass security.',
    cost: '40 Thrones',
    weight: 0.1,
  },
  {
    id: 'signal-jammer',
    name: 'Signal Jammer',
    type: 'gear',
    description: 'Blocks vox transmissions in a 100-ft radius for 1 hour. Affects allies too.',
    cost: '50 Thrones',
    weight: 1,
  },
  {
    id: 'alarm-mine',
    name: 'Alarm Mine',
    type: 'gear',
    description: 'Non-lethal proximity device. Emits a piercing alarm when triggered. Audible within 300 ft.',
    cost: '10 Thrones',
    weight: 0.5,
  },
  {
    id: 'concealment-case',
    name: 'Concealment Case',
    type: 'gear',
    description: 'Signal-shielded container. Blocks auspex scans of contents. Fits small items (weapons, contraband).',
    cost: '35 Thrones',
    weight: 2,
  },
]

// ─── Power & Maintenance ─────────────────────────────────────────────────────

const powerItems: Item[] = [
  {
    id: 'charge-pack',
    name: 'Charge Pack',
    type: 'gear',
    description: 'Standard power cell for las-weapons and electronics. Rechargeable from any power source.',
    cost: '5 Thrones',
    weight: 0.5,
  },
  {
    id: 'hot-shot-charge-pack',
    name: 'Hot-Shot Charge Pack',
    type: 'gear',
    description: 'Overcharged power cell. +1 damage per die on las-weapon attacks. Burns out after one encounter (single use).',
    cost: '15 Thrones',
    weight: 0.5,
  },
  {
    id: 'portable-generator',
    name: 'Portable Generator',
    type: 'gear',
    description: 'Promethium-fueled micro-generator. Powers lights, cogitators, and medical equipment for 24 hours.',
    cost: '50 Thrones',
    weight: 10,
  },
  {
    id: 'sacred-machine-oil',
    name: 'Sacred Machine Oil',
    type: 'gear',
    description: 'Mechanicus-blessed lubricant. Used to maintain weapons and machines. +1 to next Technology check on the anointed item.',
    cost: '5 Thrones',
    weight: 0.5,
  },
  {
    id: 'weapon-maintenance-kit',
    name: 'Weapon Maintenance Kit',
    type: 'tool',
    description: 'Cleaning rods, oils, spare parts, microfiber cloths. Prevents weapon jamming on a short rest maintenance ritual.',
    cost: '10 Thrones',
    weight: 1,
  },
  {
    id: 'combi-tool',
    name: 'Combi-Tool',
    type: 'tool',
    description: 'Multi-function Mechanicus tool. Welder, cutter, scanner, calibrator. Required for augmetic installation and advanced repairs.',
    cost: '75 Thrones',
    weight: 2,
  },
  {
    id: 'lascutter',
    name: 'Lascutter',
    type: 'tool',
    description: 'Industrial cutting laser. Cuts through bulkheads, locks, and barriers. Takes 1 minute per inch of steel.',
    cost: '50 Thrones',
    weight: 4,
  },
]

// ─── Export ──────────────────────────────────────────────────────────────────

export const allTech: Item[] = [
  ...dataCommsItems,
  ...detectionItems,
  ...securityItems,
  ...powerItems,
]
