-- Campaign Sessions + Rolls tables
-- Phase 2 of Campaign Module 2.0

-- ─── Sessions ────────────────────────────────────────────────────────────────

create table sessions (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  title text,
  status text not null check (status in ('active', 'ended', 'archived')) default 'active',
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  attendee_character_ids uuid[] default '{}',
  dm_notes text,
  shared_summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index sessions_campaign_idx on sessions(campaign_id, started_at desc);
create unique index one_active_session_per_campaign
  on sessions(campaign_id) where status = 'active';

alter table sessions enable row level security;

-- Any campaign member can read sessions
create policy sessions_select on sessions for select using (
  exists (
    select 1 from campaign_members cm
    where cm.campaign_id = sessions.campaign_id
      and cm.user_id = auth.uid()
  )
  or exists (
    select 1 from campaigns c
    where c.id = sessions.campaign_id
      and c.dm_id = auth.uid()
  )
);

-- Only DM can insert/update/delete sessions
create policy sessions_insert on sessions for insert with check (
  exists (
    select 1 from campaigns c
    where c.id = sessions.campaign_id
      and c.dm_id = auth.uid()
  )
);

create policy sessions_update on sessions for update using (
  exists (
    select 1 from campaigns c
    where c.id = sessions.campaign_id
      and c.dm_id = auth.uid()
  )
);

create policy sessions_delete on sessions for delete using (
  exists (
    select 1 from campaigns c
    where c.id = sessions.campaign_id
      and c.dm_id = auth.uid()
  )
);

-- ─── Rolls ───────────────────────────────────────────────────────────────────

create table rolls (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references campaigns(id) on delete cascade,
  session_id uuid references sessions(id) on delete set null,
  character_id uuid references characters(id) on delete set null,
  user_id uuid not null,
  label text not null,
  roll_type text not null,
  dice_expression text not null,
  rolls integer[] not null default '{}',
  modifier integer not null default 0,
  total integer not null,
  is_nat20 boolean default false,
  is_nat1 boolean default false,
  created_at timestamptz not null default now()
);

create index rolls_session_idx on rolls(session_id);
create index rolls_campaign_idx on rolls(campaign_id);

alter table rolls enable row level security;

-- Anyone in the campaign can read rolls
create policy rolls_select on rolls for select using (
  campaign_id is null
  or exists (
    select 1 from campaign_members cm
    where cm.campaign_id = rolls.campaign_id
      and cm.user_id = auth.uid()
  )
  or exists (
    select 1 from campaigns c
    where c.id = rolls.campaign_id
      and c.dm_id = auth.uid()
  )
);

-- Authenticated users can insert their own rolls
create policy rolls_insert on rolls for insert with check (
  auth.uid() = user_id
);

-- Enable realtime for later phases
alter publication supabase_realtime add table rolls;
alter publication supabase_realtime add table sessions;
