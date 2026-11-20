import type { StorePage } from '@/types/sections'

/**
 * Navigation inside the published preview: turns a link href (`/collection`, `/products/x`, `/`)
 * into one of the merchant's pages, and keeps the current page in the URL (?page=slug).
 */
export function useSitePreview() {
  const store = useBuilderStore()
  const route = useRoute()
  const router = useRouter()

  const slug = useState<string>('preview-slug', () => String(route.query.page ?? 'home'))

  const page = computed(() => store.pages.find(p => p.slug === slug.value) ?? null)

  const ALIASES: Record<string, StorePage['type']> = {
    shop: 'category',
    collection: 'category',
    collections: 'category',
    products: 'category',
    product: 'product',
    cart: 'cart',
    search: 'search',
    checkout: 'checkout',
    track: 'track',
    'order-confirmed': 'order_confirmed',
  }

  /** The page a link points at, or null when none matches (→ 404). */
  function resolve(href: string): StorePage | null {
    const path = href
      .split('#')[0]!.split('?')[0]!
      .replace(/^https?:\/\/[^/]+/i, '')
      .toLowerCase()
    const parts = path.split('/').filter(Boolean)
    if (parts[0] === 'en' || parts[0] === 'ar') parts.shift()
    const first = parts[0] ?? ''

    if (!first) return store.pages.find(p => p.type === 'home') ?? null
    const bySlug = store.pages.find(p => p.slug === first)
    if (bySlug) return bySlug

    // /products/<handle> and /collections/<handle> open the product / collection template.
    let type = ALIASES[first]
    if (first === 'products' && parts[1]) type = 'product'
    return type ? (store.pages.find(p => p.type === type) ?? null) : null
  }

  function go(target: string) {
    slug.value = target
    if (import.meta.client) {
      window.scrollTo({ top: 0 })
      void router.replace({ query: { ...route.query, page: target } })
    }
  }

  /** Follow a link; unknown destinations show the preview's "page not found". */
  function navigate(href: string) {
    const found = resolve(href)
    go(found ? found.slug : '__404__')
  }

  return { slug, page, resolve, navigate, go }
}
