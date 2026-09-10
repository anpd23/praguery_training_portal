-- Menu / product catalog for till training and the in-app board.
-- Guest-facing screens must not render staff_price_cents (Brand Book: never post prices publicly).

create table menu_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  sku text,
  name text not null,
  category text not null check (category in ('cone', 'cup', 'drink', 'take_home', 'dip', 'add_on', 'snack')),
  board_number int,
  description text,
  is_premium boolean not null default false,
  allergens text[] not null default '{}',
  photo_storage_path text,
  location_type text check (location_type in ('cafe', 'food_truck', 'catering_truck', 'all')),
  staff_price_cents int,
  sort_order int not null default 0,
  is_active boolean not null default true,
  version int not null default 1,
  effective_date date not null default current_date,
  created_at timestamptz not null default now()
);

create index menu_items_org_category_idx on menu_items (organization_id, category, sort_order);

alter table menu_items enable row level security;

create policy "authenticated read menu items"
  on menu_items for select
  to authenticated
  using (
    exists (
      select 1
      from employee_profiles e
      where e.id = auth.uid()
        and e.organization_id = menu_items.organization_id
    )
  );
