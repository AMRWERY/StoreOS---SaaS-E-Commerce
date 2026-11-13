# StoreOS — SEO Strategy

> Single source of truth for SEO decisions across all five apps.
> Reference this file when adding or editing any page.
> Sections marked **Current state** describe what the code does today;
> sections marked **Target** are rules to follow that are not yet implemented.
> Last verified against the code: 2026-11-13.

---

## 1. APP-LEVEL STRATEGY

| App | Package | Audience | Indexing strategy |
| --- | --- | --- | --- |
| **storefront** (`apps/storefront`) | `@storeos/storefront` | Public shoppers | **Full index**, except cart, checkout, account, auth, order-status |
| **landing** (`apps/landing`) | `@storeos/landing` | Public marketing visitors | **Full index** — marketing pages only (no auth/dashboard/builder) |
| **merchant-dashboard** (`apps/merchant-dashboard`) | `@storeos/merchant-dashboard` | Auth-protected merchants | **Selective** — `/dashboard/*` and `/auth/add-first-product/*` are `noindex`; see §13 for the auth pages |
| **store-builder** (`apps/store-builder`) | `@storeos/store-builder` | Merchants (open trial access) | **No index** — everything is `noindex, nofollow` |
| **admin** (`apps/admin`) | `@storeos/admin` | Platform operators | **No index**, except the public `/status`, `/terms`, `/privacy` pages |

> `apps/admin` is the platform operator console (`/platform/*`), **not** the shopper-facing store.
> The shopper-facing store is `apps/storefront`. Older versions of this doc called admin the public store.

---

## 2. TITLE PATTERN

```
storefront:   {Page Title} | StoreOS Store      (titleTemplate in apps/storefront/nuxt.config.ts)
landing:      {Page Title}                       (titleTemplate '%s'; pages write the full title)
merchant:     {Page Title}                       (titleTemplate '%s')
store-builder:{Page Title}                       (titleTemplate '%s')
admin:        {Page Title} | StoreOS Store      (see Known issues — inherited from storefront)
```

Each page sets its title with `useSeoMeta({ title })`. Dashboard pages in `apps/merchant-dashboard`
mostly use `useSeoPage({ titleTemplate: () => '...' })` instead (see §11), which overrides the whole title.

---

## 3. META DESCRIPTION

- **Length**: 120–155 characters
- **Include**: main keyword, value proposition, CTA where natural
- **No duplication**: every public page must have a unique description

Global fallback descriptions (`app.head.meta` in each app's `nuxt.config.ts`):

| App | Fallback |
| --- | --- |
| storefront | "Shop the latest collection with cash on delivery across Egypt." |
| landing / merchant-dashboard | "StoreOS — The all-in-one merchant dashboard. Manage orders, products, customers, and analytics in one place." |
| store-builder | "StoreOS Store Builder — design and publish your storefront." |
| admin | "Shop the latest collection. Free shipping on orders over $50. New arrivals every week." (storefront copy, see Known issues) |

Storefront pages take their copy from i18n keys `shop.seo.*` in `layers/core/i18n/locales/{en,ar}.json`
(e.g. `shop.seo.homeTitle`, `shop.seo.homeDesc`, `shop.seo.collectionsDesc`). Add keys to **both** locale files.

---

## 4. OPEN GRAPH & TWITTER CARDS

**Current state.** Only global defaults are set in `app.head.meta`:

| App | `og:site_name` | `og:type` | `og:image` | `twitter:card` |
| --- | --- | --- | --- | --- |
| storefront | StoreOS Store | `website` | `/og-default.jpg` | `summary_large_image` |
| landing / merchant-dashboard | StoreOS | `merchantsite` ⚠ | `/og-dashboard.jpg` | `summary_large_image` |
| store-builder | StoreOS | `website` | — | `summary_large_image` |
| admin | StoreOS Store | `merchantsite` ⚠ | `/og-default.jpg` | `summary_large_image` |

- ⚠ `merchantsite` is **not a valid Open Graph type**. Use `website` (or `product` / `article`). Fix in
  `apps/landing`, `apps/merchant-dashboard`, `apps/admin` configs.
- **The referenced image files do not exist**: none of `og-default.jpg` / `og-dashboard.jpg` is present in any
  app's `public/` folder. Add 1200×630 images or the tags point at 404s.
- Per-page `ogTitle` / `ogDescription` are set only on some storefront pages (home, product, collection) and
  admin `/status`. `og:url` and per-page `og:image` / `twitter:*` are not set anywhere.

**Target** — every public page emits:

```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="[Site name]" />
<meta property="og:title" content="[Same as <title>]" />
<meta property="og:description" content="[Same as meta description]" />
<meta property="og:image" content="[Absolute URL, 1200×630]" />
<meta property="og:url" content="[Canonical URL]" />
<meta name="twitter:card" content="summary_large_image" />
```

Product pages should use `og:type = "product"` (currently `website` in `pages/products/[handle].vue`).

---

## 5. CANONICAL URLS

**Current state:** no page emits `<link rel="canonical">` by hand. `useLocaleHead({ addSeoAttributes: true })`
(see §6) is expected to add `rel="canonical"` and `og:url` when `i18n.baseUrl` is set (not verified in rendered HTML). It is set:
`layers/core/nuxt.config.ts` sets `baseUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://storeos.app"`.

**Set `NUXT_PUBLIC_SITE_URL` per deployment.** Every app extends the core layer, so all five apps otherwise
share the `https://storeos.app` base and emit canonicals pointing at it.

Do not hand-write canonicals in pages; the generated ones are locale-aware (`/en/...`, `/ar/...`, because
`strategy: "prefix"` — every route is locale-prefixed). Strip query strings (filters, pagination) only if
the generated canonical turns out to include them — verify in the rendered HTML before adding custom logic.

---

## 6. HREFLANG (i18n)

Locales (`layers/core/nuxt.config.ts`): `en` (`en-US`, default) and `ar` (`ar-SA`, RTL). Strategy: `prefix`.

All five `app.vue` files call `useLocaleHead({ addSeoAttributes: true })` and merge the result into
`useSeoPage(...)` (alias of `useHead`, `layers/core/composables/useSeoPage.ts`), together with `dir` and `lang`:

```ts
const i18nHead = useLocaleHead({ addSeoAttributes: true })
useSeoPage(computed(() => ({
  htmlAttrs: { ...(i18nHead.value?.htmlAttrs ?? {}), dir: ..., lang: locale.value },
  link: [...(i18nHead.value?.link ?? [])],
  meta: [...(i18nHead.value?.meta ?? [])],
})))
```

This should emit `hreflang` alternates plus canonical (installed `@nuxtjs/i18n` is 10.4.0). Whether an
`hreflang="x-default"` tag is included was not verified — check the rendered HTML and add one manually if missing.
Do not add a second copy per page.

---

## 7. ROBOTS

Robots are controlled at **two levels**: `public/robots.txt` per app, and a `robots` meta tag.

### Meta robots — current state

| App | Global default (`nuxt.config.ts`) | `app.vue` override | Page-level |
| --- | --- | --- | --- |
| storefront | `index, follow` | `noindex, nofollow` on `/cart`, `/checkout`, `/account*`, `/auth*`, `/order-status*` (locale prefix stripped first); else `index, follow` | search → `noindex, follow`; product/collection → `noindex, nofollow` when not found |
| landing | `noindex, nofollow` ⚠ | `index, follow` on every page | — |
| merchant-dashboard | `noindex, nofollow` | `index, follow` unless the path contains `/dashboard` or `/auth/add-first-product` | pages set their own; see §13 |
| store-builder | `noindex, nofollow` | `noindex, nofollow` | all pages `noindex, nofollow` |
| admin | `index, follow` ⚠ | none | every `/platform/*` page and `/auth` set `noindex, nofollow`; `/status` sets `index, follow`; `/`, `/terms`, `/privacy` rely on the global default |

⚠ landing's global `noindex` is overridden by `app.vue`'s `index, follow`, so the config value is dead and
misleading. ⚠ admin's global `index, follow` means any new `/platform/*` page that forgets `robots` is
indexable — every platform page must set `noindex, nofollow` itself.

### robots.txt — current state

| App | File | Content |
| --- | --- | --- |
| root | `public/robots.txt` | allow all (`Disallow:` empty) |
| storefront | `apps/storefront/public/robots.txt` | `Disallow` `/{en,ar}/cart`, `/checkout`, `/account`, `/auth`, `/order-status`. **No `Sitemap:` line, no `Allow`** |
| landing, merchant-dashboard, store-builder | `public/robots.txt` | Identical: `Allow: /`, `/en/`, `/ar/`; `Disallow` `/{en,ar}/dashboard/` and `/{en,ar}/auth/add-first-product/`; `Sitemap: https://yourdomain.com/sitemap.xml` |
| admin | `apps/admin/public/robots.txt` | `Allow: /`; `Disallow` `/{en,ar}/cart`, `/checkout`, `/orders/` (leftover from the old storefront); `Sitemap: https://store.yourdomain.com/sitemap.xml` |

Known issues:

- `https://yourdomain.com/...` and `store.yourdomain.com` are placeholders; no sitemap exists (§8).
- store-builder's robots.txt allows crawling while every page is `noindex` — disallow `/` instead so
  crawlers don't spend budget on it. Likewise admin should `Disallow: /{en,ar}/platform/`.
- merchant-dashboard's robots.txt does not block `/{en,ar}/auth/` (sign-in / register), which are `noindex` by meta.
  Do not `Disallow` a page you want `noindex` honoured on — crawlers must fetch it to see the tag.

---

## 8. SITEMAP

**Current state: not implemented.** `@nuxtjs/sitemap` is not installed in any app and no `sitemap` config
exists. The `Sitemap:` lines in robots.txt point at URLs that don't exist.

**Target** — install in the apps that have public pages (storefront, landing):

```bash
pnpm add @nuxtjs/sitemap --filter @storeos/storefront
pnpm add @nuxtjs/sitemap --filter @storeos/landing
```

Dependencies belong in the app package they are used by (Nuxt modules shared by all apps go in `layers/core`).
Storefront product/collection/page slugs come from mock data today (`apps/storefront/data`); a sitemap
needs a source for `products/[handle]`, `collections/[handle]`, `pages/[slug]` URLs once a backend exists.
Exclude every `noindex` route.

---

## 9. STRUCTURED DATA (JSON-LD)

**Current state:** one implementation — `apps/storefront/pages/products/[handle].vue` emits a schema.org
`Product` with `name`, `description`, `sku` (first variant), `category`, `aggregateRating`
(`rating`, `reviews`) and an `Offer` (`priceCurrency: 'EGP'`, `price`, `availability` from stock).
It omits `image` and `offers.url`. Nothing else emits JSON-LD.

**Target:** add `image` and `offers.url` to the product schema; add `Organization` + `WebSite` on the landing
and storefront home, and `BreadcrumbList` on product/collection pages (the pages already compute `crumbs`).

```ts
useHead(computed(() => ({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: 'StoreOS', url: '<site url>' }),
  }],
})))
```

---

## 10. PAGE-LEVEL CHECKLIST

Every public page must have all of these before launch:

- [ ] Unique title via `useSeoMeta({ title })`
- [ ] `description` (120–155 chars), unique
- [ ] `ogTitle`, `ogDescription` (and `ogImage` once the images exist)
- [ ] Canonical + hreflang present in rendered HTML (generated by `useLocaleHead`; check `NUXT_PUBLIC_SITE_URL`)
- [ ] `robots` explicitly `noindex, nofollow` on auth, checkout, cart, account, order-status, dashboard, builder, platform pages
- [ ] Structured data where applicable (product, organization, breadcrumb)
- [ ] Arabic strings added to `ar.json` alongside `en.json`

---

## 11. NUXT IMPLEMENTATION GUIDE

Two helpers exist; follow whichever the surrounding file uses:

- `useSeoMeta({...})` — Nuxt built-in. Use for title, description, robots, og/twitter fields.
  Values may be getters for reactivity: `title: () => t('shop.seo.homeTitle')`.
- `useSeoPage(...)` — thin alias of `useHead` (`layers/core/composables/useSeoPage.ts`). Used in `app.vue`
  files, the theme plugin, and in merchant-dashboard pages as `useSeoPage({ titleTemplate: () => '...' })`.

```ts
// storefront public page
const { t } = useI18n()
useSeoMeta({
  title: () => t('shop.seo.homeTitle'),
  description: () => t('shop.seo.homeDesc'),
  ogTitle: () => t('shop.seo.homeTitle'),
  ogDescription: () => t('shop.seo.homeDesc'),
})

// private page (any app)
useSeoMeta({ title: 'Orders', robots: 'noindex, nofollow' })

// i18n-aware dynamic page with not-found fallback (products/[handle].vue)
useSeoMeta({
  title: () => (product.value ? loc(product.value.title) : t('shop.product.notFoundTitle')),
  robots: () => (product.value ? 'index, follow' : 'noindex, nofollow'),
})
```

Global defaults live in each app's `nuxt.config.ts` under `app.head`. Shared head config (i18n, `baseUrl`)
lives in `layers/core/nuxt.config.ts` — change it there, not per app.

`apps/storefront/app.vue` is the reference for per-route robots logic.

---

## 12. PERFORMANCE (CORE WEB VITALS)

SEO rankings are tied to Core Web Vitals.

- **Measurement:** `@vercel/speed-insights` is registered as a Nuxt module in `layers/core/nuxt.config.ts`
  (dependency in `layers/core/package.json`), so all five apps pick it up. Verify in the Vercel dashboard that
  data actually arrives — the module is added but not otherwise configured.
- **LCP** < 2.5s: use `<NuxtImg>`/`loading="eager"` for hero images. *(Guideline; `@nuxt/image` is not
  currently a dependency, so plain `<img>` with explicit `loading` is what's available.)*
- **CLS** = 0: set explicit `width`/`height` on images.
- **INP** < 200ms: defer non-critical JS; page transitions are `out-in` with 0.4s `page-*` classes
  (`layers/ui/assets/css/transitions.css`), which delay content — keep this in mind for LCP.
- **Fonts:** IBM Plex is loaded via a render-blocking `@import url(fonts.googleapis.com…)` in
  `layers/ui/assets/css/main.css`. Self-hosting or `<link rel="preconnect">` would improve LCP.
- **SSR** is Nuxt's default and is on in all apps.

---

## 13. NOINDEX PAGES (current vs. required)

These must always carry `robots: 'noindex, nofollow'`:

| App | Route | Status in code |
| --- | --- | --- |
| merchant-dashboard | `/dashboard/*` | ✅ via `app.vue` (path contains `/dashboard`); `/dashboard` index also sets it |
| merchant-dashboard | `/auth/add-first-product/*` | ✅ via `app.vue` |
| merchant-dashboard | `/auth` (sign in), `/auth/register` | ✅ page-level `noindex, nofollow` |
| merchant-dashboard | `/` | ⚠ page sets `noindex, nofollow`, while `app.vue` sets `index, follow` for this path — both tags are emitted; verify which wins in the rendered HTML |
| store-builder | all routes (`/`, `/builder/*`) | ✅ global + `app.vue` + pages |
| storefront | `/cart`, `/checkout`, `/checkout/success`, `/account/*`, `/auth/*`, `/order-status/*` | ✅ via `app.vue` and page-level |
| storefront | `/search` | ✅ `noindex, follow` |
| admin | `/platform/*`, `/auth` | ✅ page-level (every `pages/platform/*` page incl. login) |

Public / indexable by design: storefront home, `/collections`, `/collections/[handle]`, `/products/[handle]`,
`/pages/[slug]`; all landing pages; admin `/status` (explicit), `/terms`, `/privacy`.

---

## 14. KNOWN ISSUES (to fix)

1. `og:type` value `merchantsite` is invalid (landing, merchant-dashboard, admin configs).
2. `/og-default.jpg` and `/og-dashboard.jpg` are referenced but absent from every `public/` folder.
3. `apps/admin/nuxt.config.ts` carries the storefront's shopper-facing head defaults (title "Shop Online",
   `| StoreOS Store`, shipping-offer description, `robots: index, follow`) — wrong for an operator console.
   Admin `/`, `/terms`, `/privacy` therefore inherit them.
4. `apps/admin/public/robots.txt` still lists storefront paths (`/cart`, `/checkout`, `/orders/`) and a placeholder sitemap.
5. `apps/landing/nuxt.config.ts` has a dead `robots: noindex, nofollow` default and title `Landing`.
6. No sitemap anywhere; all `Sitemap:` lines are placeholders (`yourdomain.com`).
7. `i18n.baseUrl` falls back to `https://storeos.app` for every app unless `NUXT_PUBLIC_SITE_URL` is set per deployment.
8. `apps/admin/pages/status/index.vue:98` comment cites `rules/seo.md`; that file moved to `docs/seo.md`.
   `CLAUDE.md` also still links `rules/seo.md` and `rules/design.md` (and the `.mdc` files).
9. `docs/storeos-seo.mdc` says "Full spec in `/seo.md`" — path no longer matches.
