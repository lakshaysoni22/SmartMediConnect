-- Run this in Supabase SQL Editor (Dashboard → SQL → New query) after creating a project.
-- Then set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env.local

-- Patient feedback (wired from Feedback page)
create table if not exists public.patient_feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  feedback_type text not null check (feedback_type in ('doctor', 'hospital')),
  subject_name text,
  payload jsonb not null default '{}'::jsonb,
  comment text not null default '',
  is_anonymous boolean not null default false
);

alter table public.patient_feedback enable row level security;

create policy "patient_feedback_insert_anon"
  on public.patient_feedback
  for insert
  to anon, authenticated
  with check (true);

-- Health bot transcript rows (optional logging)
create table if not exists public.health_bot_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_message text not null,
  assistant_message text not null
);

alter table public.health_bot_messages enable row level security;

create policy "health_bot_messages_insert_anon"
  on public.health_bot_messages
  for insert
  to anon, authenticated
  with check (true);

-- SOS / emergency taps (wired from Emergency Support)
create table if not exists public.emergency_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_type text not null default 'sos_press',
  meta jsonb not null default '{}'::jsonb
);

alter table public.emergency_events enable row level security;

create policy "emergency_events_insert_anon"
  on public.emergency_events
  for insert
  to anon, authenticated
  with check (true);
