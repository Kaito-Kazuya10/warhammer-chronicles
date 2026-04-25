# Campaign Module 2.0 — Phase Tracker

## Phases

- [x] **Phase 1** — Role detection and view forking
- [x] **Phase 2** — Sessions table + start/end session UX
- [x] **Phase 3** — Realtime channel + live roll feed
- [x] **Phase 4** — Party strip and player cards
- [x] **Phase 5** — DM active controls (damage, heal, GM-only sliders)
- [x] **Phase 6** — DM notes (profile, triggers, moments)

## Schema Changes

- **New:** `sessions` — first-class session records per campaign
- **New:** `rolls` — persisted dice rolls with campaign/session context
- **New:** `dm_character_notes` — per-character DM notes with JSONB triggers
- **New:** `session_moments` — tagged in-session beats
- Migrations: `supabase/migrations/20260425_campaign_sessions.sql`, `supabase/migrations/20260425_dm_character_notes.sql`

## Known Discrepancies (prompt vs. codebase)

| Prompt assumes | Reality | Resolution |
|---|---|---|
| Route `/campaigns/:id` | Route is `/campaign` (flat) | Phase 1: added parameterized route |
| `campaign_members` has role column | No role column; DM = `campaigns.dm_id` | `useCampaignRole` checks `dm_id` |
| `rolls` table exists | Rolls are client-side only (diceStore) | Phase 2: CREATED table |
| Supabase Realtime configured | Not configured | Phase 3: migration enables publication |
| `supabase/migrations/` exists | No migrations directory | Phase 2: created |
| DM inserted into `campaign_members` | Only `dm_id` set on campaign | Preserved for now |

## Known Limitations / 2.1 Candidates

- Co-DM roles not supported
- Spectator mode not implemented
- Ability-request flow (DM asks player to roll) not built
- Initiative tracker not implemented
- NPC/enemy stat block integration not in scope
- Online presence indicators (last_seen_at on campaign_members) not implemented
- Retention cron for untethered rolls (7-day cleanup) documented as manual query — not automated
- JoinPage still redirects to `/campaign` list, not directly to `/campaigns/:id`
