# StoreOS — SEO Strategy
> Single source of truth for all SEO decisions across both apps.
> Reference this file when adding or editing any page.

---

## 1. APP-LEVEL STRATEGY

| App | Audience | Indexing strategy |
|-----|----------|-------------------|
| **Storefront** (`apps/storefront`) | Public shoppers | **Full index** — every page is SEO-critical |
| **Merchant Dashboard** (`apps/web`) | Auth-protected staff | **Selective index** — only landing + auth pages; all `/dashboard/*` routes must be `noindex` |

---

## 2. TITLE PATTERN

```
Storefront:   {Page Title} | {Store Name}
              e.g. "Running Shoes — Nike Air Max | My Store"

Dashboard:    {Page Name} — StoreOS
              e.g. "Orders — StoreOS"

Auth pages:   Sign In — StoreOS
              Register — StoreOS
```

### Nuxt `titleSeparator` convention
Set `titleTemplate` globally to append the brand:
```ts
// nuxt.config.ts
app: {
  head: {
    titleTemplate: '%s | StoreOS',  // storefront
    titleTemplate: '%s — StoreOS',  // dashboard
  }
}
```
Each page then calls `useSeoMeta({ title: 'Page Name' })`.

---

## 3. META DESCRIPTION

- **Length**: 120–155 characters
- **Include**: main keyword, value proposition, CTA where natural
- **No duplication**: every page must have a unique description

| Page | Example description |
|------|---------------------|
| Storefront home | "Shop the latest collection at [Store Name]. Free shipping on orders over $50. Discover new arrivals every week." |
| Product page | "{Product Name} — {short spec}. {price}. {availability}. Ships in 2–3 days." |
| Products list | "Browse {count}+ products. Filter by category, price, and more. Fast shipping worldwide." |
| Cart | "Review your cart and checkout securely. Multiple payment options available." |
| Checkout | No index — exclude from sitemap |
| Dashboard landing | "StoreOS — The all-in-one merchant dashboard for modern e-commerce. Manage orders, products, and analytics." |
| Auth (login) | No significant description needed — noindex |

---

## 4. OPEN GRAPH & TWITTER CARDS

Every public page must emit:
```html
<meta property="og:type"        content="website" />
<meta property="og:site_name"   content="[Store Name]" />
<meta property="og:title"       content="[Same as <title>]" />
<meta property="og:description" content="[Same as meta description]" />
<meta property="og:image"       content="[Absolute URL 1200×630 jpg/webp]" />
<meta property="og:url"         content="[Canonical URL]" />
<meta name="twitter:card"       content="summary_large_image" />
<meta name="twitter:title"      content="[Same as og:title]" />
<meta name="twitter:description" content="[Same as og:description]" />
<meta name="twitter:image"      content="[Same as og:image]" />
```

Product pages additionally emit `og:type = "product"` with price/availability.

Default OG image: `/og-default.jpg` (1200×630) — place in `apps/storefront/public/`.

---

## 5. CANONICAL URLS

Every page must emit a canonical `<link>` to prevent duplicate content from:
- i18n locale prefixes (e.g. `/en/products` vs `/ar/products`)
- Query strings (filters, pagination)

```ts
// In each page
const { locale } = useI18n()
const route = useRoute()
const canonical = `https://yourdomain.com/${locale.value}${route.path.replace(`/${locale.value}`, '')}`
useHead({ link: [{ rel: 'canonical', href: canonical }] })
```

For i18n, always treat the EN version as canonical and emit hreflang alternates.

---

## 6. HREFLANG (i18n)

Use `@nuxtjs/i18n`'s built-in `useLocaleHead()` composable — it generates all
`<link rel="alternate" hreflang="...">` tags automatically based on your locale config.

```ts
// app.vue or layouts
const i18nHead = useLocaleHead({ addSeoAttributes: true })
useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
}))
```

Always include `hreflang="x-default"` pointing to the default locale URL.

---

## 7. ROBOTS.TXT

### Storefront (`apps/storefront/public/robots.txt`)
```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### Dashboard (`apps/web/public/robots.txt`)
```
User-agent: *
Allow: /
Allow: /en/
Allow: /ar/
Allow: /en/auth/
Allow: /ar/auth/
Disallow: /en/dashboard/
Disallow: /ar/dashboard/
Disallow: /en/onboarding/
Disallow: /ar/onboarding/

Sitemap: https://dashboard.yourdomain.com/sitemap.xml
```

---

## 8. SITEMAP

Install `@nuxtjs/sitemap` in the storefront:
```bash
pnpm add @nuxtjs/sitemap --filter @storeos/storefront
```

```ts
// apps/storefront/nuxt.config.ts
modules: ['@nuxtjs/sitemap'],
sitemap: {
  hostname: 'https://yourdomain.com',
  // Dynamic product routes are auto-discovered via Nuxt routes
  // For dynamic [slug] pages, provide a routes hook to inject real slugs
}
```

Static pages automatically included. Product pages need a data source to generate URLs.

---

## 9. STRUCTURED DATA (JSON-LD)

### Product page
```ts
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.images,
      sku: product.sku,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'USD',
        availability: product.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        url: canonicalUrl,
      },
    })
  }]
})
```

### Storefront home — BreadcrumbList + Organization
```ts
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Store Name',
      url: 'https://yourdomain.com',
      logo: 'https://yourdomain.com/logo.png',
    })
  }]
})
```

---

## 10. PAGE-LEVEL CHECKLIST

Every page must have all of these before launch:

- [ ] Unique `<title>` via `useSeoMeta({ title: '...' })`
- [ ] `meta name="description"` (120–155 chars)
- [ ] `og:title`, `og:description`, `og:image`, `og:url`
- [ ] `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- [ ] `link rel="canonical"`
- [ ] `noindex` on auth, checkout, order-detail, dashboard pages
- [ ] Structured data where applicable (product, org, breadcrumb)
- [ ] `hreflang` on all public pages (via `useLocaleHead`)

---

## 11. NUXT IMPLEMENTATION GUIDE

### Composable pattern (use in every page)

```ts
// Storefront public page
useSeoMeta({
  title: 'Page Title',
  description: 'Page description 120–155 chars.',
  ogTitle: 'Page Title',
  ogDescription: 'Page description.',
  ogImage: 'https://yourdomain.com/og-default.jpg',
  ogUrl: 'https://yourdomain.com/en/page-path',
  ogType: 'website',
  ogSiteName: 'Store Name',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Page Title',
  twitterDescription: 'Page description.',
  twitterImage: 'https://yourdomain.com/og-default.jpg',
})

// Dashboard auth page
useSeoMeta({ title: 'Sign In', robots: 'index, follow' })

// Dashboard protected page
useSeoMeta({ title: 'Orders', robots: 'noindex, nofollow' })
```

### Global defaults in `nuxt.config.ts`

```ts
app: {
  head: {
    titleTemplate: '%s | Store Name',
    meta: [
      { name: 'description', content: 'Default fallback description.' },
      { property: 'og:site_name', content: 'Store Name' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://yourdomain.com/og-default.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }
}
```

---

## 12. PERFORMANCE (CORE WEB VITALS)

SEO rankings are tied to CWV. Ensure:
- **LCP** < 2.5s: Use `<NuxtImg>` with `loading="eager"` for hero images
- **CLS** = 0: Set explicit `width`/`height` on all images
- **INP** < 200ms: Defer non-critical JS
- **TTFB**: Enable Nuxt SSR (already configured); use edge CDN

---

## 13. NOINDEX PAGES (complete list)

These pages must ALWAYS have `robots: 'noindex, nofollow'`:

| App | Route |
|-----|-------|
| web | `/dashboard/*` (all dashboard routes) |
| web | `/onboarding/*` |
| web | `/auth/login` |
| web | `/auth/register` |
| storefront | `/checkout` |
| storefront | `/orders/:id` |
| storefront | `/cart` |
