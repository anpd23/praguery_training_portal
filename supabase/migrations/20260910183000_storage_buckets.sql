-- Private storage buckets for Academy assets.
-- Apply after the initial schema, on a project that has Storage enabled.

insert into storage.buckets (id, name, public)
values
  ('training-videos', 'training-videos', false),
  ('training-captions', 'training-captions', false),
  ('checklist-photos', 'checklist-photos', false),
  ('sop-attachments', 'sop-attachments', false),
  ('certificates', 'certificates', false)
on conflict (id) do nothing;
