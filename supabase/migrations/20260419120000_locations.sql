-- Locations used by app/map (see app/map/page.tsx). Apply via Dashboard SQL Editor or: supabase db push

create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  name text,
  longitude double precision,
  latitude double precision,
  created_at timestamptz default now()
);

alter table public.locations enable row level security;

drop policy if exists "locations_select_authenticated" on public.locations;

create policy "locations_select_authenticated"
  on public.locations
  for select
  to authenticated
  using (true);
