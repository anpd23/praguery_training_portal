-- Seed The Praguery org, current locations, roles, and barista MVP content.
-- Employee rows require auth.users after you link a project.

insert into organizations (id, name)
values ('00000000-0000-0000-0000-000000000001', 'The Praguery')
on conflict (id) do nothing;

insert into locations (id, organization_id, name, type, slug) values
  ('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000001', 'Praguery Cafe — Lafarge Lake', 'cafe', 'lafarge-lake'),
  ('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000001', 'Praguery Ice Cream Truck — McArthurGlen', 'food_truck', 'mcarthurglen'),
  ('00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000001', 'Praguery Ice Cream Truck — Sea-to-Sky Gondola', 'food_truck', 'sea-to-sky'),
  ('00000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000001', 'Praguery Ice Cream Truck — Grouse Mountain', 'food_truck', 'grouse-mountain'),
  ('00000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000001', 'Praguery Catering Truck', 'catering_truck', 'catering')
on conflict do nothing;

insert into roles (id, key, label, sort_order) values
  ('00000000-0000-0000-0000-000000000021', 'barista', 'Barista / Counter', 1),
  ('00000000-0000-0000-0000-000000000022', 'cake_roller', 'Cake Roller', 2),
  ('00000000-0000-0000-0000-000000000023', 'truck_lead', 'Truck Lead', 3),
  ('00000000-0000-0000-0000-000000000024', 'supervisor', 'Supervisor', 4),
  ('00000000-0000-0000-0000-000000000025', 'manager', 'Manager', 5)
on conflict (key) do nothing;

insert into training_paths (id, organization_id, role_id, title, description, is_new_hire_default) values
  ('00000000-0000-0000-0000-000000000031', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000021', 'Barista / Counter — new hire path', 'Learn the brand, the till, the drinks, and how we take care of guests.', true),
  ('00000000-0000-0000-0000-000000000032', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000022', 'Cake Roller — new hire path', 'From dough to golden chimney cake.', true),
  ('00000000-0000-0000-0000-000000000033', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000023', 'Truck Lead — new hire path', 'Lead a truck like a small cafe.', true),
  ('00000000-0000-0000-0000-000000000034', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000024', 'Supervisor — new hire path', 'Coach the team and sign off the shift.', true),
  ('00000000-0000-0000-0000-000000000035', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000025', 'Manager — new hire path', 'Own the library and the standard.', true)
on conflict (id) do nothing;

insert into menu_items (
  id, organization_id, name, category, board_number, description, is_premium, allergens, location_type, sort_order
) values
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', 'Salted Caramel Pecan', 'cone', 1, 'Salted caramel and candied pecans made in house.', true, '{milk,wheat,tree nuts}', 'food_truck', 1),
  ('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000001', 'Strawberry Cheesecake', 'cone', 2, 'Strawberry coulis, cheesecake, graham crackers.', true, '{milk,wheat}', 'food_truck', 2),
  ('00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000001', 'Pistachio', 'cone', 3, 'House-made pistachio sauce and pistachios.', true, '{milk,wheat,tree nuts}', 'food_truck', 3),
  ('00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0000-000000000001', 'Chocolate Brownie', 'cone', 4, 'Nutella, chocolate sauce, brownies.', true, '{milk,wheat,tree nuts}', 'food_truck', 4),
  ('00000000-0000-0000-0000-000000000105', '00000000-0000-0000-0000-000000000001', 'Mango Tango', 'cone', 5, 'Mango coulis, toasted coconut, dried mango.', false, '{milk,wheat}', 'food_truck', 5),
  ('00000000-0000-0000-0000-000000000106', '00000000-0000-0000-0000-000000000001', 'Lemon Crumble', 'cone', 6, 'Lemon sauce and graham crackers.', false, '{milk,wheat}', 'food_truck', 6),
  ('00000000-0000-0000-0000-000000000107', '00000000-0000-0000-0000-000000000001', 'Affogato', 'drink', null, 'Vanilla soft serve with a double shot of hot espresso.', false, '{milk}', 'all', 20)
on conflict (id) do nothing;
