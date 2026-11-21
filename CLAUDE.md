# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install                 # pnpm workspaces; Node >=18, pnpm 10.28.1
pnpm dev:merchant-dashboard   # @storeos/merchant-dashboard on :3002
pnpm dev:admin               # @storeos/admin on :3001
pnpm dev:landing             # @storeos/landing on :3005
pnpm dev:store-builder       # @storeos/store-builder on :3006
pnpm build                   # all apps, --concurrency=1
pnpm build:merchant-dashboard # single app
pnpm lint                    # = `nuxt typecheck` in each app (no ESLint config in repo)
pnpm clean                   # rm -rf .nuxt .output per package
```

Per-package tasks go through the filter: `pnpm --filter @storeos/merchant-dashboard lint`.
Dependencies must be installed into the right workspace package, not the root:
`pnpm add <pkg> --filter @storeos/core` (Nuxt modules/runtime deps belong in `layers/core`).

There is no test framework or test suite in this repo — `lint` (typecheck) is the only automated check.

## Architecture

pnpm workspace + Turborepo. Five Nuxt 4 apps, two Nuxt layers:

```
apps/merchant-dashboard @storeos/merchant-dashboard — merchant dashboard + auth (sign-in/register/onboarding), dev on :3002
apps/landing    @storeos/landing   — marketing site only (no auth/dashboard/builder), dev on :3005
apps/store-builder @storeos/store-builder — page/storefront builder at /builder/*, open trial access, dev on :3006
apps/admin      @storeos/admin     — platform operator console at /platform (login, status page; no dashboard route)
apps/storefront @storeos/storefront — customer-facing store UI (mock data), dev on :3004; strings under `shop.*`
layers/core     @storeos/core      — Nuxt modules, i18n config + locale files, theme plugin
layers/ui       @storeos/ui        — CSS/design tokens, tailwind.config.ts, V* components
```

All apps are `extends: ["@storeos/ui", "@storeos/core"]`. The root [nuxt.config.ts](nuxt.config.ts) is a
reference-only stub — **shared module config lives in [layers/core/nuxt.config.ts](layers/core/nuxt.config.ts)**, so adding a
module (or changing i18n/router/head defaults) for both apps is done there, not in an app.
`layers/*/package.json` sets `"main": "./nuxt.config.ts"`, which is how `extends` resolves.

Apps use the flat Nuxt-3-style layout (`pages/`, `components/`, `stores/`, `composables/`, `types/`
directly under the app root — there is no `app/` srcDir).

### Data layer is still mocked

Nothing talks to a backend yet. Treat this as the default assumption when adding a feature:

- Pinia stores in `apps/*/stores/*.ts` are setup-style stores holding **hardcoded demo data** inline.
- `apps/merchant-dashboard/server/api/{orders,products,shipping,webhooks}/index.ts` are empty `defineEventHandler` stubs.
- In `apps/store-builder`, `composables/usePageSections.ts`, `useStorePages.ts`, `useStoreTheme.ts` are stubs returning `[]`/`null`.
- `useAuth()` is in-memory `useState` only — `login()` flips a boolean; there is no auth/backend client wired up.
- There is no database schema in the repo; the types in `types/` are the source of truth for data shapes.

### apps/admin: platform operator console

`apps/admin` is the StoreOS operator console (mock data, no backend). Routes: `/platform/*` (layout `platform`, stores
`platform*.ts`, strings under `platform.*`), a public `/status` page, `/platform/login` (mock operator sign-in + 2FA,
session cookie in `composables/usePlatformAuth.ts`, guarded in `middleware/auth.global.ts`), and a kept legacy `/auth`
sign-in. There is no `/dashboard` in admin anymore (the old merchant-dashboard copy was removed). Note the naming is
misleading elsewhere: `rules/*.md` calls the customer-facing storefront "admin", and `layers/core/i18n/locales/*.json` has an
`admin.*` namespace holding **storefront** strings.

### apps/store-builder: storefront builder

The page builder is registry-driven. A block ("section type") is two files plus a union member:

- `types/sections.ts` — add the type to the `SectionType` union + `SECTION_TYPE_LABELS`
- `data/sections/<type-with-dashes>.ts` — default-exports a `SectionDefinition` (name, category, icon, `defaults`, and a
  `groups` schema that drives the generic settings form incl. a `variant` "Design" picker). `data/section-registry.ts`
  picks every file up via `import.meta.glob`; the original 24 blocks' metadata lives in `data/sections/_legacy.ts`.
- `components/storefront/sections/section-<type-with-dashes>.vue` — the renderer. It is the **only** renderer: the editor canvas
  (`section-preview-block.vue` wraps it) and the published preview both go through `section-render.vue`, which resolves the
  component by file name, applies the Advanced settings (padding/background/width/shape/visibility) and the active language.
  Read settings with `useSectionData(() => props.section)`. Use only the standard neutral/indigo Tailwind utilities — the theme
  (`assets/css/section-shapes.css`, scoped to `.sb-site`) remaps them to the merchant's colors, dark backgrounds, radius and buttons.
- The 24 original blocks keep hand-written forms in `components/builder/section-settings/`; new blocks need no form.

Cross-cutting pieces (all in `stores/builder.ts` unless noted): `snapshot()`/`applySnapshot()` define what a saved design contains;
the draft autosaves to IndexedDB (`composables/useBuilderStorage.ts`, not localStorage — images are large) and is restored by
`initBuilder()`; publishing also writes a restorable version. Translations: block text lives in `settings.i18n.<locale>`
(`data/localize.ts`); navbar/footer/page/announcement text have `*I18n` bags with `local*` getters. Theme, site settings, media
library and clipboard are store state (`data/site-theme.ts`). The published preview (`pages/builder/preview.vue`) is a real
multi-page site: `useSitePreview()` resolves links to pages, `useTracking()` injects analytics after cookie consent. The guided
tour is `data/tour-steps.ts` + `components/builder/tour/`; elements it points at carry `data-tour="…"` attributes.
Drag & drop uses `vue-draggable-plus` (SortableJS, forced pointer mode).

These all live in `apps/store-builder` (the dashboard app has no builder). Routes are `pages/builder/*` (`/en/builder/home`)
with a dedicated `builder` layout; `/` and `/builder` redirect to `/builder/home` via `redirect-builder-home`, and the global
`trial-session` middleware starts a trial session for every visitor. The upgrade dialog
(`components/builder/right/plan-gate-overlay.vue`) renders the landing plans from `data/pricing-tiers.ts`; keep it in sync with
`apps/landing/components/home-components/pricing.vue`.

### Auth & plan gating (apps/merchant-dashboard)

`middleware/auth.global.ts` strips the locale prefix with a regex, then guards `/dashboard` and
`/auth/add-first-product`, and bounces authenticated users off `/auth/*`. Feature access is plan-driven:
`PLAN_CONFIGS` in `composables/useAuth.ts` (trial/free/starter/growth/enterprise) defines limits and a
`features` array; gate UI with `hasFeature('builder')` rather than checking the plan name.

## Conventions

**Arrow functions only — no `function` declarations.** In every `.vue`, `.ts`, `.js` and `.mjs` file (including
`<script setup>`, composables, stores, middleware, server handlers and utilities) write
`const name = (args): Ret => { … }` / `export const name = async () => { … }`, never `function name() {}` or
`function () {}` callbacks. Details in [rules/code-style.md](rules/code-style.md). Applies to all new code and to any
function you touch.

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
`/dashboard/*`, `/auth/add-first-product/*`, `/auth/*`, `/cart`, `/checkout` and order-detail pages must be
`robots: 'noindex, nofollow'`. `apps/merchant-dashboard/app.vue` also sets robots per-route and wires
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

## Gotchas

- Both app configs carry a `fix-vue-default-import` Vite `generateBundle` plugin that rewrites
  `Vue__default` in output chunks. It's a build workaround — leave it in place.
- A past global find-and-replace corrupted vendor prefixes and literals: `::-merchantkit-scrollbar`
  (should be `-webkit-`) in `layers/ui/assets/css/*.css`, and `og:type: 'merchantsite'` (should be
  `website`) in both `nuxt.config.ts` files. Fix these only when the task touches them.
- Several `apps/merchant-dashboard/pages/dashboard/` directories (affiliates, bundles, campaigns, gift-cards,
  loyalty, returns) exist but are empty — planned routes, not missing files.
- [ROADMAP.md](ROADMAP.md) (Arabic) defines phase scope and the plan/pricing tiers that `PLAN_CONFIGS` mirrors.
- [README.md](README.md) is still the unmodified Nuxt starter template — ignore it.
