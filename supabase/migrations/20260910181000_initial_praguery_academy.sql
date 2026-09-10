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
  slug text not null,
  is_active boolean not null default true,
  unique (organization_id, slug),
  unique (organization_id, id),
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
  organization_id uuid not null references organizations(id),
  full_name text not null,
  primary_location_id uuid not null,
  primary_role_id uuid not null references roles(id),
  employment_status text not null default 'active'
    check (employment_status in ('active', 'on_leave', 'terminated')),
  hired_at date not null default current_date,
  unique (organization_id, id),
  foreign key (organization_id, primary_location_id) references locations(organization_id, id),
  created_at timestamptz not null default now()
);

create table employee_locations (
  organization_id uuid not null references organizations(id),
  employee_id uuid not null,
  location_id uuid not null,
  foreign key (organization_id, employee_id) references employee_profiles(organization_id, id) on delete cascade,
  foreign key (organization_id, location_id) references locations(organization_id, id) on delete cascade,
  primary key (employee_id, location_id)
);

create table employee_pin_credentials (
  employee_id uuid primary key references employee_profiles(id) on delete cascade,
  pin_hash text not null,
  updated_at timestamptz not null default now()
);

-- ============================================================
-- TRAINING CONTENT
-- ============================================================

create table training_paths (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  role_id uuid not null references roles(id),
  title text not null,
  description text,
  is_new_hire_default boolean not null default false,
  created_at timestamptz not null default now()
);

create table modules (
  id uuid primary key default gen_random_uuid(),
  training_path_id uuid not null references training_paths(id),
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
  module_id uuid not null references modules(id),
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
  organization_id uuid not null references organizations(id),
  location_id uuid,
  location_type text check (location_type in ('cafe', 'food_truck', 'catering_truck', 'all')),
  title text not null,
  cadence text not null check (cadence in ('per_shift', 'daily', 'weekly', 'monthly')),
  version int not null default 1,
  effective_date date not null default current_date,
  is_active boolean not null default true,
  unique (organization_id, id),
  check (
    (location_id is not null and location_type is null)
    or
    (location_id is null and location_type is not null)
  ),
  foreign key (organization_id, location_id) references locations(organization_id, id)
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
  organization_id uuid not null references organizations(id),
  template_id uuid not null,
  location_id uuid not null,
  started_by uuid not null,
  foreign key (organization_id, template_id) references checklist_templates(organization_id, id),
  foreign key (organization_id, location_id) references locations(organization_id, id),
  foreign key (organization_id, started_by) references employee_profiles(organization_id, id),
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
  organization_id uuid not null references organizations(id),
  employee_id uuid not null,
  module_id uuid not null references modules(id),
  status text not null default 'not_started'
    check (status in ('not_started', 'in_progress', 'completed')),
  started_at timestamptz,
  completed_at timestamptz,
  synced_at timestamptz,
  primary key (organization_id, employee_id, module_id),
  foreign key (organization_id, employee_id) references employee_profiles(organization_id, id) on delete cascade
);

create table quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  employee_id uuid not null,
  quiz_id uuid not null references quizzes(id),
  score_pct numeric(5,2) not null,
  passed boolean not null,
  attempted_at timestamptz not null default now(),
  synced_at timestamptz,
  foreign key (organization_id, employee_id) references employee_profiles(organization_id, id) on delete cascade
);

create table certifications (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  employee_id uuid not null,
  training_path_id uuid references training_paths(id),
  title text not null,
  certificate_storage_path text,
  issued_at timestamptz not null default now(),
  expires_at timestamptz,
  foreign key (organization_id, employee_id) references employee_profiles(organization_id, id) on delete cascade
);

-- ============================================================
-- KNOWLEDGE BASE / SOP LIBRARY
-- ============================================================

create table sop_documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  category text not null,
  title text not null,
  body_markdown text,
  file_storage_path text,
  location_id uuid,
  version int not null default 1,
  effective_date date not null default current_date,
  superseded_by uuid references sop_documents(id),
  created_at timestamptz not null default now(),
  foreign key (organization_id, location_id) references locations(organization_id, id)
);

-- ============================================================
-- RLS baseline policies
-- ============================================================

alter table employee_profiles enable row level security;
alter table organizations enable row level security;
alter table locations enable row level security;
alter table roles enable row level security;

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

create policy "employees read own organization"
  on organizations for select
  using (
    exists (
      select 1
      from employee_profiles e
      where e.id = auth.uid()
        and e.organization_id = organizations.id
    )
  );

create policy "employees read organization locations"
  on locations for select
  using (
    exists (
      select 1
      from employee_profiles e
      where e.id = auth.uid()
        and e.organization_id = locations.organization_id
    )
  );

create policy "employees read roles"
  on roles for select
  to authenticated
  using (true);

alter table module_progress enable row level security;

create policy "employees read own progress"
  on module_progress for select
  using (
    employee_id = auth.uid()
    and exists (
      select 1
      from employee_profiles e
      where e.id = auth.uid()
        and e.organization_id = module_progress.organization_id
    )
  );

create policy "employees insert own progress"
  on module_progress for insert
  with check (
    employee_id = auth.uid()
    and exists (
      select 1
      from employee_profiles e
      join roles er on er.id = e.primary_role_id
      join modules m on m.id = module_progress.module_id
      join training_paths tp on tp.id = m.training_path_id
      where e.id = auth.uid()
        and e.organization_id = module_progress.organization_id
        and e.organization_id = tp.organization_id
        and (
          e.primary_role_id = tp.role_id
          or er.key in ('supervisor', 'manager')
        )
    )
  );

create policy "employees update own progress"
  on module_progress for update
  using (
    employee_id = auth.uid()
    and exists (
      select 1
      from employee_profiles e
      join roles er on er.id = e.primary_role_id
      join modules m on m.id = module_progress.module_id
      join training_paths tp on tp.id = m.training_path_id
      where e.id = auth.uid()
        and e.organization_id = module_progress.organization_id
        and e.organization_id = tp.organization_id
        and (
          e.primary_role_id = tp.role_id
          or er.key in ('supervisor', 'manager')
        )
    )
  )
  with check (
    employee_id = auth.uid()
    and exists (
      select 1
      from employee_profiles e
      join roles er on er.id = e.primary_role_id
      join modules m on m.id = module_progress.module_id
      join training_paths tp on tp.id = m.training_path_id
      where e.id = auth.uid()
        and e.organization_id = module_progress.organization_id
        and e.organization_id = tp.organization_id
        and (
          e.primary_role_id = tp.role_id
          or er.key in ('supervisor', 'manager')
        )
    )
  );

create policy "supervisors read location progress"
  on module_progress for select
  using (
    exists (
      select 1 from employee_profiles e
      join employee_profiles supervisor on supervisor.id = auth.uid()
      join roles r on r.id = supervisor.primary_role_id
      where e.id = module_progress.employee_id
        and supervisor.organization_id = module_progress.organization_id
        and r.key in ('supervisor', 'manager')
        and (
          e.primary_location_id = supervisor.primary_location_id
          or e.primary_location_id in (
            select location_id
            from employee_locations
            where organization_id = supervisor.organization_id
              and employee_id = supervisor.id
          )
          or supervisor.primary_location_id in (
            select location_id
            from employee_locations
            where organization_id = e.organization_id
              and employee_id = e.id
          )
          or exists (
            select 1
            from employee_locations sl
            join employee_locations el
              on el.organization_id = sl.organization_id
             and el.location_id = sl.location_id
            where sl.organization_id = supervisor.organization_id
              and sl.employee_id = supervisor.id
              and el.employee_id = e.id
          )
        )
    )
  );

alter table employee_locations enable row level security;
alter table employee_pin_credentials enable row level security;
alter table training_paths enable row level security;
alter table modules enable row level security;
alter table quizzes enable row level security;
alter table quiz_questions enable row level security;
alter table quiz_options enable row level security;
alter table checklist_templates enable row level security;
alter table checklist_items enable row level security;
alter table checklist_runs enable row level security;
alter table checklist_run_items enable row level security;
alter table quiz_attempts enable row level security;
alter table certifications enable row level security;
alter table sop_documents enable row level security;

create policy "employees read own locations"
  on employee_locations for select
  using (employee_id = auth.uid());

create policy "service role manages pin credentials"
  on employee_pin_credentials for all
  to service_role
  using (true)
  with check (true);

create policy "authenticated read training paths"
  on training_paths for select
  to authenticated
  using (
    exists (
      select 1
      from employee_profiles e
      join roles er on er.id = e.primary_role_id
      where e.id = auth.uid()
        and e.organization_id = training_paths.organization_id
        and (
          e.primary_role_id = training_paths.role_id
          or er.key in ('supervisor', 'manager')
        )
    )
  );

create policy "authenticated read modules"
  on modules for select
  to authenticated
  using (
    exists (
      select 1
      from employee_profiles e
      join roles er on er.id = e.primary_role_id
      join training_paths tp on tp.id = modules.training_path_id
      where e.id = auth.uid()
        and e.organization_id = tp.organization_id
        and (
          e.primary_role_id = tp.role_id
          or er.key in ('supervisor', 'manager')
        )
    )
  );

create policy "authenticated read quizzes"
  on quizzes for select
  to authenticated
  using (
    exists (
      select 1
      from employee_profiles e
      join roles er on er.id = e.primary_role_id
      join modules m on m.id = quizzes.module_id
      join training_paths tp on tp.id = m.training_path_id
      where e.id = auth.uid()
        and e.organization_id = tp.organization_id
        and (
          e.primary_role_id = tp.role_id
          or er.key in ('supervisor', 'manager')
        )
    )
  );

create policy "authenticated read quiz questions"
  on quiz_questions for select
  to authenticated
  using (
    exists (
      select 1
      from employee_profiles e
      join roles er on er.id = e.primary_role_id
      join quizzes q on q.id = quiz_questions.quiz_id
      join modules m on m.id = q.module_id
      join training_paths tp on tp.id = m.training_path_id
      where e.id = auth.uid()
        and e.organization_id = tp.organization_id
        and (
          e.primary_role_id = tp.role_id
          or er.key in ('supervisor', 'manager')
        )
    )
  );

create policy "authenticated read quiz options"
  on quiz_options for select
  to authenticated
  using (
    exists (
      select 1
      from employee_profiles e
      join roles er on er.id = e.primary_role_id
      join quiz_questions qq on qq.id = quiz_options.question_id
      join quizzes q on q.id = qq.quiz_id
      join modules m on m.id = q.module_id
      join training_paths tp on tp.id = m.training_path_id
      where e.id = auth.uid()
        and e.organization_id = tp.organization_id
        and (
          e.primary_role_id = tp.role_id
          or er.key in ('supervisor', 'manager')
        )
    )
  );

create policy "authenticated read checklist templates"
  on checklist_templates for select
  to authenticated
  using (
    exists (
      select 1
      from employee_profiles e
      left join employee_locations el
        on el.organization_id = e.organization_id
       and el.employee_id = e.id
      left join locations pl
        on pl.id = e.primary_location_id
      left join locations al
        on al.id = el.location_id
      where e.id = auth.uid()
        and e.organization_id = checklist_templates.organization_id
        and (
          (checklist_templates.location_id is not null and (
            checklist_templates.location_id = e.primary_location_id
            or checklist_templates.location_id = el.location_id
          ))
          or
          (checklist_templates.location_id is null and (
            checklist_templates.location_type = 'all'
            or checklist_templates.location_type = pl.type
            or checklist_templates.location_type = al.type
          ))
        )
    )
  );

create policy "authenticated read checklist items"
  on checklist_items for select
  to authenticated
  using (
    exists (
      select 1
      from employee_profiles e
      left join employee_locations el
        on el.organization_id = e.organization_id
       and el.employee_id = e.id
      left join locations pl
        on pl.id = e.primary_location_id
      left join locations al
        on al.id = el.location_id
      join checklist_templates ct on ct.id = checklist_items.template_id
      where e.id = auth.uid()
        and e.organization_id = ct.organization_id
        and (
          (ct.location_id is not null and (
            ct.location_id = e.primary_location_id
            or ct.location_id = el.location_id
          ))
          or
          (ct.location_id is null and (
            ct.location_type = 'all'
            or ct.location_type = pl.type
            or ct.location_type = al.type
          ))
        )
    )
  );

create policy "employees read own checklist runs"
  on checklist_runs for select
  using (started_by = auth.uid());

create policy "supervisors read location checklist runs"
  on checklist_runs for select
  using (
    exists (
      select 1
      from employee_profiles starter
      join employee_profiles supervisor on supervisor.id = auth.uid()
      join roles r on r.id = supervisor.primary_role_id
      where starter.id = checklist_runs.started_by
        and r.key in ('supervisor', 'manager')
        and (
          checklist_runs.location_id = supervisor.primary_location_id
          or checklist_runs.location_id in (
            select location_id
            from employee_locations
            where organization_id = supervisor.organization_id
              and employee_id = supervisor.id
          )
          or starter.primary_location_id = supervisor.primary_location_id
          or exists (
            select 1
            from employee_locations sl
            join employee_locations el
              on el.organization_id = sl.organization_id
             and el.location_id = sl.location_id
            where sl.organization_id = supervisor.organization_id
              and sl.employee_id = supervisor.id
              and el.employee_id = starter.id
          )
        )
    )
  );

create policy "employees insert own checklist runs"
  on checklist_runs for insert
  with check (
    started_by = auth.uid()
    and exists (
      select 1
      from employee_profiles e
      join checklist_templates ct on ct.id = checklist_runs.template_id
      join locations rl on rl.id = checklist_runs.location_id
      where e.id = auth.uid()
        and e.organization_id = checklist_runs.organization_id
        and ct.organization_id = checklist_runs.organization_id
        and (
          e.primary_location_id = checklist_runs.location_id
          or exists (
            select 1
            from employee_locations el
            where el.organization_id = e.organization_id
              and el.employee_id = e.id
              and el.location_id = checklist_runs.location_id
          )
        )
        and (
          ct.location_id = checklist_runs.location_id
          or (
            ct.location_id is null
            and (
              ct.location_type = 'all'
              or ct.location_type = rl.type
            )
          )
        )
    )
  );

create policy "employees update own checklist runs"
  on checklist_runs for update
  using (started_by = auth.uid())
  with check (
    started_by = auth.uid()
    and exists (
      select 1
      from employee_profiles e
      join checklist_templates ct on ct.id = checklist_runs.template_id
      join locations rl on rl.id = checklist_runs.location_id
      where e.id = auth.uid()
        and e.organization_id = checklist_runs.organization_id
        and ct.organization_id = checklist_runs.organization_id
        and (
          e.primary_location_id = checklist_runs.location_id
          or exists (
            select 1
            from employee_locations el
            where el.organization_id = e.organization_id
              and el.employee_id = e.id
              and el.location_id = checklist_runs.location_id
          )
        )
        and (
          ct.location_id = checklist_runs.location_id
          or (
            ct.location_id is null
            and (
              ct.location_type = 'all'
              or ct.location_type = rl.type
            )
          )
        )
    )
  );

create policy "employees delete own draft checklist runs"
  on checklist_runs for delete
  using (
    started_by = auth.uid()
    and completed_at is null
  );

create policy "employees read own checklist run items"
  on checklist_run_items for select
  using (
    exists (
      select 1
      from checklist_runs cr
      where cr.id = checklist_run_items.run_id
        and cr.started_by = auth.uid()
    )
  );

create policy "employees insert own checklist run items"
  on checklist_run_items for insert
  with check (
    exists (
      select 1
      from checklist_runs cr
      where cr.id = checklist_run_items.run_id
        and cr.started_by = auth.uid()
    )
  );

create policy "employees update own checklist run items"
  on checklist_run_items for update
  using (
    exists (
      select 1
      from checklist_runs cr
      where cr.id = checklist_run_items.run_id
        and cr.started_by = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from checklist_runs cr
      where cr.id = checklist_run_items.run_id
        and cr.started_by = auth.uid()
    )
  );

create policy "employees read own quiz attempts"
  on quiz_attempts for select
  using (
    employee_id = auth.uid()
    and exists (
      select 1
      from employee_profiles e
      where e.id = auth.uid()
        and e.organization_id = quiz_attempts.organization_id
    )
  );

create policy "employees insert own quiz attempts"
  on quiz_attempts for insert
  with check (
    employee_id = auth.uid()
    and exists (
      select 1
      from employee_profiles e
      join roles er on er.id = e.primary_role_id
      join quizzes q on q.id = quiz_attempts.quiz_id
      join modules m on m.id = q.module_id
      join training_paths tp on tp.id = m.training_path_id
      where e.id = auth.uid()
        and e.organization_id = quiz_attempts.organization_id
        and e.organization_id = tp.organization_id
        and (
          e.primary_role_id = tp.role_id
          or er.key in ('supervisor', 'manager')
        )
    )
  );

create policy "employees update own quiz attempts"
  on quiz_attempts for update
  using (
    employee_id = auth.uid()
    and exists (
      select 1
      from employee_profiles e
      where e.id = auth.uid()
        and e.organization_id = quiz_attempts.organization_id
    )
  )
  with check (
    employee_id = auth.uid()
    and exists (
      select 1
      from employee_profiles e
      where e.id = auth.uid()
        and e.organization_id = quiz_attempts.organization_id
    )
  );

create policy "employees read own certifications"
  on certifications for select
  using (
    employee_id = auth.uid()
    and exists (
      select 1
      from employee_profiles e
      where e.id = auth.uid()
        and e.organization_id = certifications.organization_id
    )
  );

create policy "supervisors read location certifications"
  on certifications for select
  using (
    exists (
      select 1
      from employee_profiles e
      join employee_profiles supervisor on supervisor.id = auth.uid()
      join roles r on r.id = supervisor.primary_role_id
      where e.id = certifications.employee_id
        and supervisor.organization_id = certifications.organization_id
        and r.key in ('supervisor', 'manager')
        and (
          e.primary_location_id = supervisor.primary_location_id
          or e.primary_location_id in (
            select location_id
            from employee_locations
            where organization_id = supervisor.organization_id
              and employee_id = supervisor.id
          )
          or supervisor.primary_location_id in (
            select location_id
            from employee_locations
            where organization_id = e.organization_id
              and employee_id = e.id
          )
          or exists (
            select 1
            from employee_locations sl
            join employee_locations el
              on el.organization_id = sl.organization_id
             and el.location_id = sl.location_id
            where sl.organization_id = supervisor.organization_id
              and sl.employee_id = supervisor.id
              and el.employee_id = e.id
          )
        )
    )
  );

create policy "authenticated read sops"
  on sop_documents for select
  to authenticated
  using (
    exists (
      select 1
      from employee_profiles e
      left join employee_locations el
        on el.organization_id = e.organization_id
       and el.employee_id = e.id
      where e.id = auth.uid()
        and e.organization_id = sop_documents.organization_id
        and (
          sop_documents.location_id is null
          or sop_documents.location_id = e.primary_location_id
          or sop_documents.location_id = el.location_id
        )
    )
  );
