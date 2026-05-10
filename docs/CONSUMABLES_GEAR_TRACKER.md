# Consumables & Gear Round 1 — Phase Tracker

## Phases

- [x] **Phase 1** — Schema: addiction tracking interfaces, class-restriction field
- [x] **Phase 2** — Item content: 96 consumables, gear, and tech items
- [x] **Phase 3** — Behavioral wiring: USE button, addiction saves at long rest, badges, substance history
- [x] **Phase 4** — Validation: 5 new rules for addiction, post-use saves, class restrictions

## Item Counts

| File | Type | Count |
|---|---|---|
| `consumables.ts` | Consumable | 47 (3 converted + 44 new) |
| `gear.ts` | Gear / Tool | 26 |
| `tech.ts` | Gear / Tool | 23 |
| **Total** | | **96** |

## Schema Changes

- **`Item` interface** — added `addictionDC`, `postUseSaveDC`, `postUseSaveAbility`, `postUseFailureEffect`, `restrictedToClasses`
- **`Character` interface** — added `pendingAddictionChecks`, `addictions` (both optional, backward-compatible)
- **New types** — `PendingAddictionCheck`, `Addiction` (with status: active/withdrawal/cured)

## Addiction Flow

1. Player uses addictive consumable → `PendingAddictionCheck` queued
2. Long rest → RestDialog prompts CON saves for each pending check
3. Failed save → `Addiction` created with `status: 'active'`
4. TopStatBar badges show active (red) and withdrawal (yellow) addictions
5. Badge dropdown: Begin Withdrawal → Use Again → Mark Cured
6. Cured addictions move to Substance History in ExtrasTab

## Discrepancies Fixed (prompt vs. codebase)

| Prompt assumes | Reality | Resolution |
|---|---|---|
| Create new `consumables.ts` | File already exists with 3 items using `gp/cp` | Merged: converted to Thrones, added new items |
| `npm run validate` | Actual command is `npm run validate:data` | Used correct command |
| Condition badges exist | No status badge area on sheet | Built inline in TopStatBar |
| Consumable "Use" button exists | No Use action in InventoryTab | Built from scratch |

## Known Limitations / Round 2 Candidates

- Post-use save results shown inline only (no toast system)
- Withdrawal mechanical penalties not enforced (flavor only)
- No crafting/combining system for items
- Flamer fuel consumption not tied to weapon firing
- No item weight / encumbrance system
