# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install                 # pnpm workspaces; Node >=18, pnpm 10.28.1
pnpm dev:merchant            # @storeos/merchant on :3000
pnpm dev:admin               # @storeos/admin on :3001
pnpm build                   # both apps, --concurrency=1
pnpm build:merchant          # single app
pnpm lint                    # = `nuxt typecheck` in each app (no ESLint config in repo)
pnpm clean                   # rm -rf .nuxt .output per package
```

Per-package tasks go through the filter: `pnpm --filter @storeos/merchant lint`.
Dependencies must be installed into the right workspace package, not the root:
`pnpm add <pkg> --filter @storeos/core` (Nuxt modules/runtime deps belong in `layers/core`).

There is no test framework or test suite in this repo — `lint` (typecheck) is the only automated check.

## Architecture

pnpm workspace + Turborepo. Two Nuxt 4 apps, two Nuxt layers:

```
apps/merchant   @storeos/merchant  — marketing site + merchant dashboard + storefront builder
apps/admin      @storeos/admin     — near-duplicate of the dashboard (see below)
layers/core     @storeos/core      — Nuxt modules, i18n config + locale files, theme plugin
layers/ui       @storeos/ui        — CSS/design tokens, tailwind.config.ts, V* components
```

Both apps are `extends: ["@storeos/ui", "@storeos/core"]`. The root [nuxt.config.ts](nuxt.config.ts) is a
reference-only stub — **shared module config lives in [layers/core/nuxt.config.ts](layers/core/nuxt.config.ts)**, so adding a
module (or changing i18n/router/head defaults) for both apps is done there, not in an app.
`layers/*/package.json` sets `"main": "./nuxt.config.ts"`, which is how `extends` resolves.

Apps use the flat Nuxt-3-style layout (`pages/`, `components/`, `stores/`, `composables/`, `types/`
directly under the app root — there is no `app/` srcDir).

### Data layer is still mocked

Nothing talks to a backend yet. Treat this as the default assumption when adding a feature:

- Pinia stores in `apps/*/stores/*.ts` are setup-style stores holding **hardcoded demo data** inline.
- `apps/merchant/server/api/{orders,products,shipping,webhooks}/index.ts` are empty `defineEventHandler` stubs.
- `composables/usePageSections.ts`, `useStorePages.ts`, `useStoreTheme.ts` are stubs returning `[]`/`null`.
- `useAuth()` is in-memory `useState` only — `login()` flips a boolean; there is no Supabase client wired up.
- [supabase/migrations/](supabase/migrations/) holds the intended schema (stores, store_members, products,
  product_variants, inventory_movements, customers, orders, order_items, coupons, shipping_zones,
  store_themes, store_pages, page_sections + builder RLS). Use it as the target shape for types.

### apps/admin is stale

`apps/admin` is an older near-copy of the merchant dashboard (same `components/dashboard/*` and
`pages/dashboard/*` trees, but no builder, no `server/`, fewer pages). Active development is in
`apps/merchant`. Don't mirror changes into `apps/admin` unless asked — check `git log -- apps/admin`
first. Note the naming is misleading: `rules/*.md` calls the customer-facing storefront "admin", and
`layers/core/i18n/locales/*.json` has an `admin.*` namespace holding **storefront** strings.

### Storefront builder (merchant only)

The page builder is the one subsystem spanning many files. Adding or changing a section type means
touching all of these:

- `types/sections.ts` — `SectionType` union + `SECTION_TYPE_LABELS` + `PageSection`/`StorePage`
- `components/storefront/sections/section-<name>.vue` — the renderer (one per `SectionType`)
- `components/builder/section-settings/` — the settings panel for that type
- `data/builder-section-templates.ts` — default settings payload
- `stores/builder.ts` — `sectionsMap` (sections keyed by page id), global navbar/footer settings, `isDirty`
- `supabase/migrations/013–016` — `store_themes`, `store_pages`, `page_sections`, builder RLS

Builder routes live under `pages/dashboard/builder/` with a dedicated `builder` layout and the
`redirect-builder-home` middleware.

### Auth & plan gating

`middleware/auth.global.ts` strips the locale prefix with a regex, then guards `/dashboard` and
`/onboarding`, and bounces authenticated users off `/auth/*`. Feature access is plan-driven:
`PLAN_CONFIGS` in `composables/useAuth.ts` (trial/free/starter/growth/enterprise) defines limits and a
`features` array; gate UI with `hasFeature('builder')` rather than checking the plan name.

## Conventions

**Design tokens — never hardcode colors.** [layers/ui/assets/css/main.css](layers/ui/assets/css/main.css) defines RGB-triplet CSS
variables under `html[data-theme="dark"]` (default) and `html[data-theme="light"]`;
[layers/ui/tailwind.config.ts](layers/ui/tailwind.config.ts) maps them to classes. Use those classes:
`bg-bg-base|bg-primary|bg-elevated|bg-overlay`, `border-border-subtle|default`,
`text-tx-primary|secondary|muted`, `brand`/`brand-hover`/`brand-dim`, `accent` (orange, new orders),
`success|warning|danger|info` + `-dim`, `status-purple|yellow`. Theme is toggled by `useAppTheme()`
(memory-only, resets to dark on reload) and applied as `html[data-theme]` by `layers/core/plugins/theme.ts`.

**Design system rules** live in [rules/design.md](rules/design.md) (full spec) and [rules/storeos-design.mdc](rules/storeos-design.mdc) (hard rules,
Cursor-style with `globs: apps/**/*.vue,layers/**/*.vue`). Load-bearing points: IBM Plex Sans for UI and
**IBM Plex Mono for every number** (prices, order ids, counts, percentages, dates in tables); merchant
UI is dense and dark with tight radii; merchant cards use border + background layering, never
box-shadows; status badges are always pills (`rounded-full`, 9–10px, weight 600); animations ≤ 0.3s;
every data table needs an empty state.

**SEO rules** live in [rules/seo.md](rules/seo.md) and [rules/storeos-seo.mdc](rules/storeos-seo.mdc). Every page calls `useSeoMeta(...)`.
`/dashboard/*`, `/onboarding/*`, `/auth/*`, `/cart`, `/checkout` and order-detail pages must be
`robots: 'noindex, nofollow'`. `apps/merchant/app.vue` also sets robots per-route and wires
`useLocaleHead()` + `dir`/`lang`. Note the project uses `useSeoPage()` (a thin alias for `useHead` in
`layers/core/composables/`) in app.vue/plugins — follow whichever the surrounding file uses.

**i18n** is `strategy: "prefix"`, so **every** route is locale-prefixed (`/en/...`, `/ar/...`). Always link
with `useLocalePath()` / `<nuxt-link-locale>`, never a bare path. Locale files are shared by both apps at
`layers/core/i18n/locales/{en,ar}.json` (namespaces: `auth`, `nav`, `home`, `dashboard`, `admin`, `layout`,
`common`) — add keys to **both** files. `ar` is RTL; `tailwindcss-rtl` is installed, so prefer its
logical utilities (`ms-`/`me-`, `ps-`/`pe-`) over `ml-`/`mr-`.

**Components** are auto-imported with `pathPrefix: false` in both the `ui` layer and each app, so nested
files register under their bare filename — `components/dashboard/orders/orders-table.vue` is
`<orders-table>`. Names are therefore globally unique across the whole app; kebab-case files, kebab-case
in templates. Shared cross-app components are `V*` in `layers/ui/components/` (`VTable`, `VInput`,
`VPagination`, `VStatCard`, …) with prop types in `layers/ui/types/v-*.ts`; heavy ones are pulled in via
the `Lazy` prefix (`<LazyVPagination>`). Icons come from `@nuxt/icon` with `serverBundle: 'local'` — only
the `@iconify-json/*` collections in the root `package.json` are available offline.

**Deployment** is Vercel per app: each `apps/*/vercel.json` builds from the repo root
(`cd ../.. && pnpm turbo build --filter=<app> --force`) with `outputDirectory: .output`.

## Gotchas

- Both app configs carry a `fix-vue-default-import` Vite `generateBundle` plugin that rewrites
  `Vue__default` in output chunks. It's a build workaround — leave it in place.
- A past global find-and-replace corrupted vendor prefixes and literals: `::-merchantkit-scrollbar`
  (should be `-webkit-`) in `layers/ui/assets/css/*.css`, and `og:type: 'merchantsite'` (should be
  `website`) in both `nuxt.config.ts` files. Fix these only when the task touches them.
- Several `apps/merchant/pages/dashboard/` directories (affiliates, bundles, campaigns, gift-cards,
  loyalty, returns) exist but are empty — planned routes, not missing files.
- [ROADMAP.md](ROADMAP.md) (Arabic) defines phase scope and the plan/pricing tiers that `PLAN_CONFIGS` mirrors.
- [README.md](README.md) is still the unmodified Nuxt starter template — ignore it.
