# Praguery Academy

iPad-first employee training for [The Praguery](https://www.praguery.com/). Role tap on a shared iPad (no PIN), role paths, shift checklists, quizzes, SOP library, and a supervisor desk. Demo mode works on a laptop without Supabase; link a project when you are ready for a live system of record.

Locations in the app match the public site: Lafarge Lake cafe (Coquitlam), McArthurGlen truck (Richmond), Sea-to-Sky Gondola truck (Squamish), Grouse Mountain, and Metro Vancouver catering.

## Run it on your laptop

You need Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Tap a role to begin. Use **Switch teammate** in Settings when the next person starts.

Progress, checklists, quizzes, and photos save in the browser (IndexedDB) so a Wi-Fi drop does not lose the shift.

## Publish on Vercel

1. Push this repo to GitHub (already the intended path).
2. In [Vercel](https://vercel.com/new), **Import** the GitHub repository. Framework preset: **Next.js**. Root directory: repo root.
3. You can deploy with no env vars — the app runs in demo mode.
4. When you link Supabase, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (see `.env.example`). Redeploy.
5. After the first production URL is live, add the iPads via Safari → Add to Home Screen.

## What is in this version

- Role landing (tap to sign in as that role’s demo teammate)
- New-hire paths, step-by-step modules, quizzes, certificates
- Opening / closing / pre-close / cleaning checklists numbered like CAFE-CLOSE-C001, with actual readings, exceptions (`none` if nothing went wrong), and a different verifier
- In-app SOP library (replaces the Google Drive panel)
- Staff menu board (prices stay off guest-facing surfaces)
- Supervisor roster, trial-shift scorecard, manager CMS + CSV export
- Offline banner and Sync now
- Brand from the live site: cream, chalkboard, “Make life just a little bit sweeter”

## Supabase (optional next)

1. Copy `.env.example` to `.env.local` and fill in the project URL and anon key.
2. `npx supabase db push` using `supabase/migrations/`.
3. `npx supabase db reset` (local) applies `supabase/seed.sql`.

The historical `employee_pin_credentials` table remains in the first migration. The app does not use PINs.

## Docs

- Product spec: `docs/praguery-academy-spec-v1.md`
- Brand excerpt: `docs/brand-book.md`
- Runbooks: `docs/runbooks/` (role switch, device re-provision, new location)
