-- Praguery Academy v1 initial schema

create extension if not exists pgcrypto;

-- ============================================================
-- CORE IDENTITY & ORG STRUCTURE
-- ============================================================

create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'The Praguery',
  created_at timestamptz not null default now()
);

create table locations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  name text not null,
  type text not null check (type in ('cafe', 'food_truck', 'catering_truck')),
  slug text unique not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table roles (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  label text not null,
  sort_order int not null default 0
);

create table employee_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  primary_location_id uuid not null references locations(id),
  primary_role_id uuid not null references roles(id),
  pin_hash text not null,
  employment_status text not null default 'active'
    check (employment_status in ('active', 'on_leave', 'terminated')),
  hired_at date not null default current_date,
  created_at timestamptz not null default now()
);

create table employee_locations (
  employee_id uuid references employee_profiles(id),
  location_id uuid references locations(id),
  primary key (employee_id, location_id)
);

-- ============================================================
-- TRAINING CONTENT
-- ============================================================

create table training_paths (
  id uuid primary key default gen_random_uuid(),
  role_id uuid not null references roles(id),
  title text not null,
  description text,
  is_new_hire_default boolean not null default false,
  created_at timestamptz not null default now()
);

create table modules (
  id uuid primary key default gen_random_uuid(),
  training_path_id uuid references training_paths(id),
  title text not null,
  content_type text not null check (content_type in ('video', 'step_guide', 'checklist_intro', 'scenario')),
  video_storage_path text,
  video_duration_seconds int,
  captions_storage_path text,
  body_markdown text,
  sort_order int not null default 0,
  prerequisite_module_id uuid references modules(id),
  is_downloadable_offline boolean not null default true,
  version int not null default 1,
  effective_date date not null default current_date,
  superseded_by uuid references modules(id),
  created_at timestamptz not null default now()
);

create table quizzes (
  id uuid primary key default gen_random_uuid(),
  module_id uuid references modules(id),
  title text not null,
  pass_threshold_pct int not null default 80,
  max_attempts int,
  created_at timestamptz not null default now()
);

create table quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references quizzes(id) on delete cascade,
  prompt text not null,
  question_type text not null default 'multiple_choice',
  sort_order int not null default 0
);

create table quiz_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references quiz_questions(id) on delete cascade,
  label text not null,
  is_correct boolean not null default false
);

-- ============================================================
-- CHECKLISTS
-- ============================================================

create table checklist_templates (
  id uuid primary key default gen_random_uuid(),
  location_id uuid references locations(id),
  location_type text check (location_type in ('cafe', 'food_truck', 'catering_truck', 'all')),
  title text not null,
  cadence text not null check (cadence in ('per_shift', 'daily', 'weekly', 'monthly')),
  version int not null default 1,
  effective_date date not null default current_date,
  is_active boolean not null default true
);

create table checklist_items (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references checklist_templates(id) on delete cascade,
  label text not null,
  requires_photo boolean not null default false,
  sort_order int not null default 0
);

create table checklist_runs (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references checklist_templates(id),
  location_id uuid not null references locations(id),
  started_by uuid not null references employee_profiles(id),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  synced_at timestamptz
);

create table checklist_run_items (
  run_id uuid not null references checklist_runs(id) on delete cascade,
  item_id uuid not null references checklist_items(id),
  completed_at timestamptz,
  photo_storage_path text,
  primary key (run_id, item_id)
);

-- ============================================================
-- PROGRESS & CERTIFICATION
-- ============================================================

create table module_progress (
  employee_id uuid not null references employee_profiles(id),
  module_id uuid not null references modules(id),
  status text not null default 'not_started'
    check (status in ('not_started', 'in_progress', 'completed')),
  started_at timestamptz,
  completed_at timestamptz,
  synced_at timestamptz,
  primary key (employee_id, module_id)
);

create table quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references employee_profiles(id),
  quiz_id uuid not null references quizzes(id),
  score_pct numeric(5,2) not null,
  passed boolean not null,
  attempted_at timestamptz not null default now(),
  synced_at timestamptz
);

create table certifications (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references employee_profiles(id),
  training_path_id uuid references training_paths(id),
  title text not null,
  issued_at timestamptz not null default now(),
  expires_at timestamptz
);

-- ============================================================
-- KNOWLEDGE BASE / SOP LIBRARY
-- ============================================================

create table sop_documents (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  body_markdown text,
  file_storage_path text,
  location_id uuid references locations(id),
  version int not null default 1,
  effective_date date not null default current_date,
  superseded_by uuid references sop_documents(id),
  created_at timestamptz not null default now()
);

-- ============================================================
-- RLS baseline policies
-- ============================================================

alter table employee_profiles enable row level security;

create policy "employees read own profile"
  on employee_profiles for select
  using (id = auth.uid());

create policy "supervisors read profiles at their location"
  on employee_profiles for select
  using (
    exists (
      select 1 from employee_profiles supervisor
      join roles r on r.id = supervisor.primary_role_id
      where supervisor.id = auth.uid()
        and r.key in ('supervisor', 'manager')
        and supervisor.primary_location_id = employee_profiles.primary_location_id
    )
  );

alter table module_progress enable row level security;

create policy "employees manage own progress"
  on module_progress for all
  using (employee_id = auth.uid())
  with check (employee_id = auth.uid());

create policy "supervisors read location progress"
  on module_progress for select
  using (
    exists (
      select 1 from employee_profiles e
      join employee_profiles supervisor on supervisor.id = auth.uid()
      join roles r on r.id = supervisor.primary_role_id
      where e.id = module_progress.employee_id
        and r.key in ('supervisor', 'manager')
        and e.primary_location_id = supervisor.primary_location_id
    )
  );
