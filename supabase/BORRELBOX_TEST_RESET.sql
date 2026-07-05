-- Zet alle huidige testdata weer terug, zodat je opnieuw schoon kunt testen.
-- Inclusief zondag 28 juni 2026.

delete from public.borrelbox_reservations
where service_date in ('2026-06-28', '2026-07-04', '2026-08-08', '2026-08-15', '2026-08-22');

insert into public.borrelbox_dates (service_date, status, max_boxes)
values
  ('2026-06-28', 'available', 4),
  ('2026-07-04', 'available', 4),
  ('2026-08-08', 'available', 4),
  ('2026-08-15', 'available', 4),
  ('2026-08-22', 'available', 4)
on conflict (service_date) do update
set
  status = excluded.status,
  max_boxes = excluded.max_boxes;
