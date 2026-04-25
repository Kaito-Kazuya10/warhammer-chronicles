-- DM Character Notes + Session Moments
-- Phase 6 of Campaign Module 2.0

-- ─── DM Character Notes ─────────────────────────────────────────────────────

create table dm_character_notes (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  character_id uuid not null references characters(id) on delete cascade,
  profile_note text default '',
  triggers jsonb default '[]',
  updated_at timestamptz not null default now(),
  unique (campaign_id, character_id)
);

alter table dm_character_notes enable row level security;

-- Only DM can read/write notes
create policy dm_notes_select on dm_character_notes for select using (
  exists (
    select 1 from campaigns c
    where c.id = dm_character_notes.campaign_id
      and c.dm_id = auth.uid()
  )
);

create policy dm_notes_insert on dm_character_notes for insert with check (
  exists (
    select 1 from campaigns c
    where c.id = dm_character_notes.campaign_id
      and c.dm_id = auth.uid()
  )
);

create policy dm_notes_update on dm_character_notes for update using (
  exists (
    select 1 from campaigns c
    where c.id = dm_character_notes.campaign_id
      and c.dm_id = auth.uid()
  )
);

create policy dm_notes_delete on dm_character_notes for delete using (
  exists (
    select 1 from campaigns c
    where c.id = dm_character_notes.campaign_id
      and c.dm_id = auth.uid()
  )
);

-- ─── Session Moments ────────────────────────────────────────────────────────

create table session_moments (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id) on delete cascade,
  campaign_id uuid not null references campaigns(id) on delete cascade,
  character_id uuid references characters(id) on delete set null,
  text text not null,
  kind text check (kind in ('beat', 'lie_told', 'promise', 'revelation', 'death_flag', 'custom')),
  created_at timestamptz not null default now()
);

create index session_moments_session_idx on session_moments(session_id);
create index session_moments_character_idx on session_moments(character_id);

alter table session_moments enable row level security;

-- Only DM can read/write moments
create policy moments_select on session_moments for select using (
  exists (
    select 1 from campaigns c
    where c.id = session_moments.campaign_id
      and c.dm_id = auth.uid()
  )
);

create policy moments_insert on session_moments for insert with check (
  exists (
    select 1 from campaigns c
    where c.id = session_moments.campaign_id
      and c.dm_id = auth.uid()
  )
);

create policy moments_delete on session_moments for delete using (
  exists (
    select 1 from campaigns c
    where c.id = session_moments.campaign_id
      and c.dm_id = auth.uid()
  )
);
