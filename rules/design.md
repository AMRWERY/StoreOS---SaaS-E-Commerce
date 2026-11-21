# StoreOS — Design System

> Single source of truth for design decisions.
> Sections describe what the code in `layers/ui` does today; **Spec** blocks are design targets that
> the code only partly follows, and **Drift** notes list where code and spec disagree.
> Last verified against the code: 2026-11-13.

---

## 1. CONCEPT & AESTHETIC

StoreOS is a pnpm/Turborepo workspace of **five Nuxt 4 apps and two layers** sharing one brand and **one token system**:

| App | Audience | Aesthetic |
| --- | --- | --- |
| `apps/merchant-dashboard` | Store owners & staff | Dark, dense, data-rich — Bloomberg Terminal meets Linear |
| `apps/admin` | Platform operators (`/platform/*`, `/status`) | Same dark operational look as the dashboard |
| `apps/store-builder` | Merchants building a storefront (`/builder/*`) | Same tokens as the dashboard |
| `apps/landing` | Marketing visitors | Same tokens; marketing layout (`.page-shell`, `.text-kicker`) |
| `apps/storefront` | Shoppers | Customer-facing store, built from the same `V*` components and tokens |

| Layer | Package | Contents |
| --- | --- | --- |
| `layers/ui` | `@storeos/ui` | CSS tokens, `tailwind.config.ts`, `V*` components |
| `layers/core` | `@storeos/core` | Nuxt modules, i18n, theme plugin, shared composables |

> **Drift:** an earlier version of this doc described a separate light "storefront" palette (`--sf-*` tokens,
> max-width 1280, softer radii). No `--sf-*` token exists in the code. Every app, storefront included, uses the
> single token set in §2 and switches between dark and light with `html[data-theme]`.

---

## 2. COLOR SYSTEM

Tokens are defined in `layers/ui/assets/css/main.css` as space-separated RGB channels (`--bg-base-rgb: 8 8 14`)
so Tailwind can apply alpha. **Dark is the default** (also when `data-theme` is missing before hydration);
`html[data-theme="light"]` overrides the same variables.

### Theme switching

- `useAppTheme()` (`layers/core/composables/useAppTheme.ts`) holds `"dark" | "light"` in `useState('app-theme')`.
  It is **memory-only**: every page load/refresh resets to dark.
- `layers/core/plugins/theme.ts` writes `data-theme` onto `<html>`.
- `ThemeToggle.vue` in `layers/ui/components` is the UI control.
- `tailwind.config.ts` has `darkMode: "class"`, but theming is driven by `data-theme` and CSS variables, so
  **don't use `dark:` variants** — use the semantic tokens below.

### Dark values (default)

```
BACKGROUNDS (darkest → lightest):
  --bg-base:      #08080E   page background
  --bg-primary:   #0D0D18   sidebar, cards
  --bg-elevated:  #141422   hover states, inputs
  --bg-overlay:   #1A1A2E   modals, dropdowns, tooltips

BORDERS:    --border-subtle #1C1C30 | --border-default #262640
TEXT:       --text-primary #F0F0FF | --text-secondary #8888AA | --text-muted #50506A
BRAND:      --brand #6366F1 | --brand-hover #818CF8 | --brand-dim rgba(99,102,241,.12)
ACCENT:     --orange #F97316 | --orange-hover #FB923C | --orange-dim rgba(249,115,22,.12)

STATUS:     success #10B981 | warning #F59E0B | danger #EF4444 | info #3B82F6
            purple  #A78BFA (shipped) | yellow #EAB308 (processing)
            each has a -dim variant at 0.12 alpha
```

### Light values (`data-theme="light"`)

```
--bg-base #F6F6FA | --bg-primary #FFFFFF | --bg-elevated #EEEEF5 | --bg-overlay #E4E4EE
--border-subtle #DADAE8 | --border-default #C6C6DA
--text-primary #0F0F1C | --text-secondary #525266 | --text-muted #808094
--brand #6366F1 | --brand-hover #818CF8 (unchanged)  | --orange #F97316 (unchanged)
success #059669 | warning #D97706 | danger #DC2626 | info #2563EB
purple #7C3AED | yellow #CA8A04      (-dim alphas are 0.10–0.12)
```

### Using tokens in markup (Tailwind names)

| Token | Tailwind utility |
| --- | --- |
| Backgrounds | `bg-bg-base`, `bg-bg-primary`, `bg-bg-elevated`, `bg-bg-overlay` |
| Borders | `border-border-subtle`, `border-border-default` |
| Text | `text-tx-primary`, `text-tx-secondary`, `text-tx-muted` |
| Brand | `bg-brand`, `hover:bg-brand-hover`, `bg-brand-dim` |
| Orange accent | `accent`, `accent-hover`, `accent-dim` — **named `accent` in Tailwind, `--orange` as a CSS variable** |
| Status | `success`, `warning`, `danger`, `info` (+ `-dim`), `status-purple`, `status-yellow` (+ `-purple-dim`, `-yellow-dim`) |

Never hardcode hex values in components; use the tokens so both themes work.

---

## 3. TYPOGRAPHY

```
PRIMARY FONT:  IBM Plex Sans   — all UI text. Weights loaded: 300, 400, 500, 600, 700
MONO FONT:     IBM Plex Mono   — numbers/codes.             Weights loaded: 400, 500, 600
```

- Loaded by a `@import url('https://fonts.googleapis.com/…')` at the top of `layers/ui/assets/css/main.css`
  (so it blocks render and depends on Google Fonts at runtime).
- Tailwind: `font-sans` → IBM Plex Sans, `font-mono` → IBM Plex Mono (`tailwind.config.ts`). `html, body` use `font-sans antialiased`.

**RULE:** any number shown in the UI uses `font-mono` — prices, order/invoice numbers, stock counts,
percentages, dates in tables (`$450`, `#ORD-089`, `24 units`, `92%`).

### Type scale (Spec — dashboard)

Tailwind's default scale is not overridden; dashboard text is set with arbitrary sizes (`text-[10px]`, `text-xs`, …).

```
xs   10px / 400   captions, timestamps, badge text
sm   11px / 400   table cells, secondary labels
base 12px / 500   nav items, card body
md   13px / 500   primary table text
lg   15px / 600   page titles
xl   20px / 700   dashboard headlines
2xl  22px / 600   stat values (mono)
3xl  28px / 700   hero numbers
```

Storefront/landing use the standard Tailwind scale (`text-sm`, `text-xs`, …) at larger sizes.

---

## 4. SPACING & LAYOUT

Base unit 4px, Tailwind spacing scale plus `4.5` = 18px (`tailwind.config.ts`).

```
DASHBOARD LAYOUT (apps/merchant-dashboard/components/layouts/sidebar.vue):
  Sidebar: w-[220px], `fixed lg:sticky`, bg-bg-primary, border-e border-border-subtle
  Card padding: set per use (p-6, px-4 py-3.5, …)

STOREFRONT (apps/storefront/layouts/default.vue):
  Container: max-w-6xl (1152px) mx-auto, px-4 sm:px-6
```

Use logical utilities for RTL (`ms-`/`me-`, `ps-`/`pe-`, `start-`/`end-`, `border-e`) — `tailwindcss-rtl` is installed.

---

## 5. BORDER RADIUS

`tailwind.config.ts` **overrides** the default radius scale:

```
xs 4px  (badges, tags)        sm 6px  (inputs)
md 8px  (buttons, nav items)  lg 10px (modals, dropdowns)
xl 12px (cards, icon tiles)   2xl 14px (large cards — `.card`)
full / rounded-full: pills, badges
```

> **Drift:** the earlier "storefront softer radii" scale (20px, 999px named `full`) does not exist as a separate scale.

---

## 6. COMPONENT SPECS

### Shared component classes (`layers/ui/assets/css/tailwind.css`, `@layer components`)

| Class | Purpose |
| --- | --- |
| `.card` | `bg-bg-primary border border-border-subtle rounded-2xl` — pair with a padding utility |
| `.badge` | `rounded-full px-2 py-0.5 text-[10px] font-semibold` — pair with a color utility (`bg-success-dim text-success`) |
| `.page-shell` | full-page wrapper: `bg-bg-base min-h-screen text-tx-primary pb-32` |
| `.text-eyebrow` | 10px / 600 muted label above a section |
| `.text-kicker` | marketing-page section kicker (uppercase, wide tracking) |
| `.icon-tile` | 48px rounded-xl square, `bg-bg-elevated` |
| `.overlay-backdrop` | fixed full-screen `bg-bg-overlay/60 backdrop-blur-sm` |
| `.status-dot` | 6px dot |
| `.transition-base` / `-slow` / `-spring` | 150ms / 250ms / 250ms spring |
| `.icon-nudge-{end,start,diagonal,up,down}`, `.icon-spin-hover` | icon hover motion, RTL-aware |
| `.hide-scrollbar`, `.select-scrollbar` | scrollbar/select helpers (`main.css`) |

### Shared Vue components (`layers/ui/components`, auto-imported with `pathPrefix: false`, use `Lazy` prefix for heavy ones)

`ThemeToggle`, `VAccordion`, `VAlertBanner`, `VBackButton`, `VBreadcrumb`, `VButton`, `VColorInput`, `VDatePicker`,
`VDialog`, `VDropdownMenu`, `VFileUpload`, `VFormWrapper`, `VInput`, `VLoadingSpinner`, `VLocaleSwitch`, `VOtp`,
`VOverlay`, `VPagination`, `VProductCard`, `VProgressBar`, `VRangeInput`, `VSearchInput`, `VSelectInput`,
`VSidePanel`, `VStatCard`, `VSwitchButton`, `VTable`, `VTabs`, `VTextareaInput`.
Prefer these over hand-rolled equivalents.

### Buttons — `VButton`

Props: `variant` (`primary` default | `secondary` | `ghost` | `none`), `size`, `icon`, `iconPosition`, `to`, `disabled`.
With `to` it renders `<nuxt-link-locale>`, otherwise `<button>`. Directional arrow icons flip in RTL automatically.

```
Base:       flex items-center justify-center gap-2 rounded-md font-bold text-sm, py-2 px-4, active:scale-[0.98]
primary:    bg-brand hover:bg-brand-hover text-white shadow-lg shadow-brand/20
secondary:  bg-bg-elevated border border-border-default text-tx-secondary hover:text-tx-primary
ghost:      bg-transparent text-tx-secondary hover:text-tx-primary
disabled:   opacity-50 cursor-not-allowed
```

There is no built-in danger or orange variant — compose with `variant="none"` + `className`, e.g.
`bg-danger-dim text-danger` (danger) or `bg-accent hover:bg-accent-hover text-white` (new-order actions).

> **Drift vs. spec:** the old spec said 12px/600 text with 8px radius and no shadow; code is `text-sm font-bold rounded-md`
> (`rounded-md` = 8px per §5) and adds a brand-tinted shadow on primary.

### Status badges

Use `.badge` plus pill colors. Mapping:

```
ORDER:    NEW (pending) bg-accent-dim text-accent + pulse dot | CONFIRMED bg-info-dim text-info
          PROCESSING bg-status-yellow-dim text-status-yellow  | SHIPPED bg-status-purple-dim text-status-purple
          DELIVERED bg-success-dim text-success               | CANCELLED bg-bg-overlay text-tx-muted
          REFUNDED bg-danger-dim text-danger
PAYMENT:  PAID success | UNPAID warning | COD bg-bg-overlay text-tx-secondary | REFUNDED danger
STOCK:    in stock text-success | low stock text-warning (threshold ≤ 5) | out of stock text-danger
```

Badges are always pills (`rounded-full`), 9–10px, weight 600.

### Inputs, tables, cards, stats

Use `VInput`, `VTextareaInput`, `VSelectInput`, `VTable`, `VStatCard`, `VPagination`. Focus uses the brand colour;
errors use `danger`. Cards use border + background layering, **never box-shadows** (dashboard).
Every data table needs an empty state (§12).

### Navigation (dashboard sidebar)

220px wide (`w-[220px]`), `bg-bg-primary`, `border-e border-border-subtle`. Active item: `text-brand` on `bg-brand-dim`;
default `text-tx-secondary`; the new-orders badge is `bg-accent` white 9px/700 pill.

---

## 7. ELEVATION & SHADOWS

Dashboard depth comes from colour layering, not shadow:

```
Level 1 cards:   bg-bg-primary           Level 2 elevated: bg-bg-elevated
Level 3 overlay: bg-bg-overlay + backdrop-blur        Level 4 modal: bg-bg-overlay + large shadow
```

Glows (sparingly): brand `0 0 12px rgba(99,102,241,.3)`, orange, success.
`VButton` primary currently adds `shadow-lg shadow-brand/20` (see §6 drift).

---

## 8. MOTION & ANIMATION

```
Tailwind: transition-base 150ms ease-out | transition-slow 250ms | transition-spring 250ms cubic-bezier(0.34,1.56,0.64,1)
Keyframes / animation utilities (tailwind.config.ts):
  fade-up    0.3s ease-out forwards   (opacity 0→1, translateY 8→0)
  pulse-dot  1.5s infinite            (opacity 1→.5, scale 1→.85) — new-order indicator
  spin-slow  3s linear infinite
Vue transitions (layers/ui/assets/css/transitions.css): .fade (0.3s), .slide (0.3s, RTL-aware),
  .page-* / .layout-* (0.4s, opacity + blur(1rem)), registered via app.pageTransition / layoutTransition (mode out-in)
Theme switch: view-transition cross-fade suppressed (tailwind.css)
```

RULES: no animation > 0.3s; at most one pulsing element per screen section.

> **Drift:** the page/layout transition is 0.4s and blurs, exceeding the 0.3s rule; `VButton` uses `duration-200`.

---

## 9. ICONOGRAPHY

Icons use **`@nuxt/icon`** (`<Icon name="…" />`) with `serverBundle: 'local'`, so only collections installed as
`@iconify-json/*` work offline. Installed: `lucide`, `ph`, `solar`, `material-symbols`, `ic`, `devicon`, `logos`,
`fluent-emoji-flat`, `garden`, `svg-spinners`. Heroicons is **not** installed — don't use `heroicons:*` names.

Default size in `VButton`: `w-4 h-4`. Dashboard nav 14–16px, actions 16–18px, empty states ~20px+.
Colours: nav default `text-tx-secondary`, active `text-brand`, action icons `text-tx-muted` → hover brand, status icons match status colour.
Emoji only in empty states and celebratory moments; never in nav or tables.

---

## 10. GRID SYSTEM

```
DASHBOARD:  sidebar (220px) + main flex-1; CSS grid for cards
            Spec: 4-col stat cards · 2-col main + ~300px right panel · 3-col product grid (set per page, not a shared component)
STOREFRONT: container max-w-6xl; column counts are set per page under apps/storefront
```

---

## 11. SCROLLBAR STYLE

Global (`tailwind.css`, all apps): width 4px, transparent track, thumb `--border-default` (hover `--text-muted`), radius 4px.
Utilities `.hide-scrollbar` / `.select-scrollbar` in `main.css`.

---

## 12. EMPTY STATES

```
Centered: 1) icon 40–48px, --text-muted  2) headline 13px/500 secondary  3) subtext 11px muted, 1–2 lines  4) primary CTA
No orders → "No orders yet" · No products → "Add your first product" · No customers → "Customers appear after first order"
```

Copy goes through i18n (`en.json` **and** `ar.json` in `layers/core/i18n/locales/`).

---

## 13. RESPONSIVE BEHAVIOR

```
DASHBOARD: sidebar is `sticky` at lg+ and `fixed` below lg (toggle behavior not verified)
STOREFRONT: container px-4 → sm:px-6
```

The earlier spec's icon-only 40px collapsed sidebar and a mobile bottom tab bar are **not implemented** —
treat them as roadmap, not current behavior. Capacitor is not a dependency of this repo.

---

## 14. i18n & RTL

- `@nuxtjs/i18n`, `strategy: "prefix"`: every route is `/en/...` or `/ar/...`. Link with `useLocalePath()` / `<nuxt-link-locale>`.
- `ar` is RTL (`dir: "rtl"`); each `app.vue` sets `dir`/`lang` on `<html>`. `VLocaleSwitch` toggles language.
- Use logical Tailwind utilities (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`); flip directional icons with `rtl:rotate-180`.
- Currency: `useCurrency()` plus per-currency number formats in `layers/core/i18n/i18n.config.ts`.

---

## 15. PLATFORM NOTES

```
TECH STACK
  Framework: Nuxt 4 (Vue 3 Composition API, <script setup lang="ts">), flat layout (no app/ srcDir)
  Styling:   Tailwind CSS + CSS-variable tokens (layers/ui); plugins: forms, typography, aspect-ratio,
             container-queries, tailwindcss-rtl
  State:     Pinia setup stores with mock data (no backend yet)
  Perf:      @vercel/speed-insights (layers/core)

GENERATION RULES (for design tools such as Stitch / Figma)
  1. IBM Plex Sans for UI + IBM Plex Mono for every number. Never Inter/Roboto/system-ui.
  2. Default surface is dark (#08080E base); the app also supports a light theme via the same tokens.
  3. Prices/numbers: IBM Plex Mono, weight 600.
  4. Status badges: pill shape (rounded-full).
  5. Dashboard cards: border + bg layering, no box-shadows.
  6. Sidebar is 220px.
  7. Every data table has an empty state.
  8. Animations: fade-up on page load, pulse only for "new order" indicators; ≤ 0.3s.
  9. Components are `V*` from layers/ui; components registered by bare filename (kebab-case), globally unique.
```
