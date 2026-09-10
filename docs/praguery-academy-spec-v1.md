# Praguery Academy Product & Technical Specification (v1.0)

## 1. Executive Summary
Praguery Academy is the next evolution of `training.praguery.com`: a role-based, PIN-first, iPad-optimized internal training platform for all Praguery locations.

Core product decisions:
- **Primary device:** shared iPad kiosk flow with intermittent Wi-Fi tolerance.
- **System of record:** Supabase (Postgres, Auth, Storage, Realtime, RLS, Edge Functions).
- **Brand locked:** instructional copy must follow Praguery voice and vocabulary rules.

## 2. FURPS+ Requirements

### Functionality
- Role-based onboarding and training paths with prerequisites and recertification.
- Native in-app training content: videos, step guides, SOP library, quizzes.
- Operational checklists (opening/closing/cleaning) with timestamps and optional photo proof.
- Product/menu knowledge and customer service standards training.
- Food safety and manager/supervisor modules.
- Progress tracking and certification issuance.
- Shared-device PIN identity switching and location-scoped content.
- Admin CMS for non-engineering updates to training materials.

### Usability
- iPad-first touch UI with minimum 44pt targets.
- PIN login for line staff.
- Readable instructional copy (grade 6–8).
- Persistent progress visibility.
- Accessibility baseline: WCAG 2.1 AA.
- English-first with i18n-ready architecture.

### Reliability
- Offline-first for checklist/quiz/progress interactions.
- IndexedDB write queue with reconnect sync to Supabase.
- Autosave to survive app kills/sleep.
- Graceful fallback from video to guide content.
- Row-level protections to prevent cross-user/location data leakage.

### Performance
- Video start target: <2s on strong Wi-Fi, <5s on weak links.
- App shell repeat load target: <1.5s.
- Quiz interactions scored locally (<100ms target).
- Supervisor dashboard updates via Realtime in under 2s.

### Supportability
- No-deploy content changes via admin CMS.
- Versioned SOP/checklist/module records.
- Separate Supabase projects: dev/staging/prod.
- Monitoring hooks (Supabase logs + Sentry).
- Runbooks for PIN reset, device reprovisioning, and new location setup.

### Design / Implementation / Interface / Physical
- Installable PWA on iPadOS Safari.
- Shared-kiosk operation and guided-access compatibility.
- Next.js + TypeScript + Tailwind front end.
- Supabase-only backend footprint for v1.
- Internal-only API posture in v1.

## 3. Information Architecture
- `/` landing role selection and PIN pad.
- `/home` trainee dashboard with progress and certs.
- `/paths/[role]` ordered role curriculum.
- `/modules/[moduleId]` video/guide content and quiz link.
- `/checklists/[type]/[location]` location-scoped recurring checklists.
- `/library` searchable versioned SOP knowledge base.
- `/quizzes/[quizId]` quiz flow and pass/fail.
- `/supervisor` location-level live training and expiry tracking.
- `/admin` CMS for content, checklists, quizzes, locations, and exports.
- `/settings` PIN change, language (phase 2), sync controls.

## 4. Roles & Permissions
- **Trainee:** assigned paths, own progress/certifications, own checklist participation.
- **Supervisor:** trainee access + location roster, progress visibility, trial shift scoring, PIN reset.
- **Manager:** supervisor access + content management and staffing/reporting.
- **Franchise/Corporate Admin:** full cross-location governance and compliance export.

## 5. Data Model
The canonical starting schema is versioned in:
- `supabase/migrations/20260910181000_initial_praguery_academy.sql`

It includes:
- organization/location/role/user profile structure
- training paths, modules, quizzes, quiz options
- checklist templates, runs, and proof attachments
- module progress, quiz attempts, certifications
- SOP library versioning
- starter RLS policies for profile and progress access

## 6. Engineering Setup Guide

### Frontend
- Next.js (App Router), TypeScript, Tailwind.
- TanStack Query for caching and background refetch.
- PWA shell and service worker-based offline strategy.

### Backend
- Supabase Postgres for structured data.
- Supabase Auth for identity + PIN workflows via Edge Functions.
- Supabase Storage for videos, captions, SOP attachments, checklist photos, and certificates.
- Supabase Realtime for supervisor dashboard updates.

### Offline Strategy
- Write to IndexedDB first, then sync queue to Supabase.
- Last-write-wins conflict handling.
- Manual “Sync now” in settings.

### Suggested Storage Buckets
- `training-videos`
- `training-captions`
- `checklist-photos`
- `sop-attachments`
- `certificates`

### Deployment
- Vercel for frontend deploys.
- Supabase Cloud for backend.
- GitHub Actions for CI and migration validation.
