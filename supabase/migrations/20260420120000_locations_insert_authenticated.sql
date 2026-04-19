-- Allow signed-in users to add rows from the map UI (see AddLocationAtPointPopup)

drop policy if exists "locations_insert_authenticated" on public.locations;

create policy "locations_insert_authenticated"
  on public.locations
  for insert
  to authenticated
  with check (true);
