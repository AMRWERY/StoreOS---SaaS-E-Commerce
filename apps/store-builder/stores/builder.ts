import type { DeviceMode, MediaItem, PanelMode, VersionMeta } from '@/types/builder'
import { idbDel, idbGet, idbSet } from '@/composables/useBuilderStorage'
import { buildTemplateSections } from '@/data/page-templates'
import { localeDir, type StoreLocale } from '@/data/localize'
import type { FooterStyle, NavbarStyle } from '@/data/chrome-styles'
import {
  DEFAULT_ANNOUNCEMENT,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_THEME,
  type Announcement,
  type SiteSettings,
  type SiteTheme,
} from '@/data/site-theme'
import type { PageSection, StorePage, StorePageType } from '@/types/sections'

export const useBuilderStore = defineStore('builder', () => {
  // ── pages ────────────────────────────────────────────────────────
  const pages = ref<StorePage[]>([])
  /** Sections keyed by page ID — the persistent source of truth. */
  const sectionsMap = ref<Record<string, PageSection[]>>({})
  const currentPageId = ref<string | null>(null)

  // ── store languages ──────────────────────────────────────────────
  /** Languages the storefront is published in. One entry = single-language store. */
  const locales = ref<StoreLocale[]>(['en'])
  const defaultLocale = ref<StoreLocale>('en')
  /** Language currently being edited / previewed. */
  const contentLocale = ref<StoreLocale>('en')
  const isMultiLocale = computed(() => locales.value.length > 1)
  const direction = computed(() => localeDir(contentLocale.value))

  const setLocales = (next: StoreLocale[], def: StoreLocale) => {
    const list = next.length ? [...new Set(next)] : [def]
    if (!list.includes(def)) list.unshift(def)
    locales.value = list
    defaultLocale.value = def
    if (!list.includes(contentLocale.value)) contentLocale.value = def
    isDirty.value = true
  }

  const setContentLocale = (code: StoreLocale) => {
    if (locales.value.includes(code)) contentLocale.value = code
  }

  // ── theme, announcement bar, brand & site settings ───────────────
  const theme = ref<SiteTheme>({ ...DEFAULT_THEME })
  const announcement = ref<Announcement>({ ...DEFAULT_ANNOUNCEMENT })
  const siteSettings = ref<SiteSettings>(JSON.parse(JSON.stringify(DEFAULT_SITE_SETTINGS)))

  const setTheme = (patch: Partial<SiteTheme>) => {
    theme.value = { ...theme.value, ...patch }
    isDirty.value = true
  }
  const setAnnouncement = (patch: Partial<Announcement>) => {
    announcement.value = { ...announcement.value, ...patch }
    isDirty.value = true
  }
  const setSiteSettings = (patch: Partial<SiteSettings>) => {
    siteSettings.value = { ...siteSettings.value, ...patch }
    isDirty.value = true
  }
  const setSocial = (key: keyof SiteSettings['social'], value: string) => {
    siteSettings.value = { ...siteSettings.value, social: { ...siteSettings.value.social, [key]: value } }
    isDirty.value = true
  }

  // ── global admin settings (not per-page) ────────────────────
  const storeName = ref('LUXE')
  /** Website name per language (multi-language stores). Falls back to `storeName`. */
  const storeNameI18n = ref<Partial<Record<StoreLocale, string>>>({})
  /** Name shown in the language currently being edited / previewed. */
  const displayName = computed(() =>
    contentLocale.value === defaultLocale.value
      ? storeName.value
      : storeNameI18n.value[contentLocale.value] || storeName.value,
  )

  const setStoreName = (value: string) => {
    if (contentLocale.value === defaultLocale.value) storeName.value = value
    else storeNameI18n.value = { ...storeNameI18n.value, [contentLocale.value]: value }
    isDirty.value = true
  }
  const navbarStyle = ref<NavbarStyle>('classic')
  const footerStyle = ref<FooterStyle>('columns')

  type Bag<T> = Partial<Record<StoreLocale, T>>
  interface NavLink { label: string; href: string; i18n?: Bag<{ label?: string }> }
  interface FooterLink { label: string; href: string; i18n?: Bag<{ label?: string }> }
  interface FooterColumn { title: string; i18n?: Bag<{ title?: string }>; links: FooterLink[] }

  const isDefaultLocale = computed(() => contentLocale.value === defaultLocale.value)

  const navLinks = ref<NavLink[]>([
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/collection' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ])

  /** Nav links with the language being edited / previewed applied. */
  const localNavLinks = computed(() =>
    navLinks.value.map(l => ({
      ...l,
      label: isDefaultLocale.value ? l.label : (l.i18n?.[contentLocale.value]?.label || l.label),
    })),
  )

  const addNavLink = () => {
    navLinks.value.push({ label: 'New link', href: '/' })
    isDirty.value = true
  }

  const removeNavLink = (index: number) => {
    navLinks.value.splice(index, 1)
    isDirty.value = true
  }

  const updateNavLink = (index: number, field: 'label' | 'href', value: string) => {
    const link = navLinks.value[index]
    if (!link) return
    if (field === 'label' && !isDefaultLocale.value)
      link.i18n = { ...link.i18n, [contentLocale.value]: { label: value } }
    else link[field] = value
    isDirty.value = true
  }

  // ── footer ───────────────────────────────────────────────────────
  const footerTagline = ref('Premium products for your lifestyle.')
  const footerCopyright = ref(`© ${new Date().getFullYear()} My Store. All rights reserved.`)
  const footerTextI18n = ref<Bag<{ tagline?: string; copyright?: string }>>({})
  const footerShowSocial = ref(true)
  const footerColumns = ref<FooterColumn[]>([
    {
      title: 'Shop',
      links: [
        { label: 'All Products', href: '/collection' },
        { label: 'New Arrivals', href: '/collection' },
        { label: 'Sale', href: '/collection' },
      ],
    },
    {
      title: 'Help',
      links: [
        { label: 'FAQ', href: '/faq' },
        { label: 'Shipping', href: '/policies' },
        { label: 'Returns', href: '/policies' },
        { label: 'Track order', href: '/track-order' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ])

  const localFooterColumns = computed(() =>
    footerColumns.value.map(col => ({
      ...col,
      title: isDefaultLocale.value ? col.title : (col.i18n?.[contentLocale.value]?.title || col.title),
      links: col.links.map(l => ({
        ...l,
        label: isDefaultLocale.value ? l.label : (l.i18n?.[contentLocale.value]?.label || l.label),
      })),
    })),
  )
  const localTagline = computed(() =>
    isDefaultLocale.value ? footerTagline.value : (footerTextI18n.value[contentLocale.value]?.tagline || footerTagline.value),
  )
  const localCopyright = computed(() =>
    isDefaultLocale.value ? footerCopyright.value : (footerTextI18n.value[contentLocale.value]?.copyright || footerCopyright.value),
  )

  const setFooterTagline = (value: string) => {
    if (isDefaultLocale.value) footerTagline.value = value
    else footerTextI18n.value = { ...footerTextI18n.value, [contentLocale.value]: { ...footerTextI18n.value[contentLocale.value], tagline: value } }
    isDirty.value = true
  }

  const setFooterCopyright = (value: string) => {
    if (isDefaultLocale.value) footerCopyright.value = value
    else footerTextI18n.value = { ...footerTextI18n.value, [contentLocale.value]: { ...footerTextI18n.value[contentLocale.value], copyright: value } }
    isDirty.value = true
  }

  const addFooterColumn = () => {
    footerColumns.value.push({ title: 'New column', links: [] })
    isDirty.value = true
  }

  const removeFooterColumn = (colIdx: number) => {
    footerColumns.value.splice(colIdx, 1)
    isDirty.value = true
  }

  const updateFooterColumn = (colIdx: number, title: string) => {
    const col = footerColumns.value[colIdx]
    if (!col) return
    if (!isDefaultLocale.value) col.i18n = { ...col.i18n, [contentLocale.value]: { title } }
    else col.title = title
    isDirty.value = true
  }

  const addFooterLink = (colIdx: number) => {
    footerColumns.value[colIdx]?.links.push({ label: 'New link', href: '/' })
    isDirty.value = true
  }

  const removeFooterLink = (colIdx: number, linkIdx: number) => {
    footerColumns.value[colIdx]?.links.splice(linkIdx, 1)
    isDirty.value = true
  }

  const updateFooterLink = (colIdx: number, linkIdx: number, field: 'label' | 'href', value: string) => {
    const link = footerColumns.value[colIdx]?.links[linkIdx]
    if (!link) return
    if (field === 'label' && !isDefaultLocale.value)
      link.i18n = { ...link.i18n, [contentLocale.value]: { label: value } }
    else link[field] = value
    isDirty.value = true
  }

  // ── announcement + maintenance text (translatable) ───────────────
  const localAnnouncementText = computed(() =>
    isDefaultLocale.value
      ? announcement.value.text
      : (announcement.value.textI18n?.[contentLocale.value] || announcement.value.text),
  )
  const setAnnouncementText = (value: string) => {
    if (isDefaultLocale.value) setAnnouncement({ text: value })
    else setAnnouncement({ textI18n: { ...announcement.value.textI18n, [contentLocale.value]: value } })
  }
  const localMaintenanceMessage = computed(() =>
    isDefaultLocale.value
      ? siteSettings.value.maintenanceMessage
      : (siteSettings.value.maintenanceMessageI18n?.[contentLocale.value] || siteSettings.value.maintenanceMessage),
  )
  const setMaintenanceMessage = (value: string) => {
    if (isDefaultLocale.value) setSiteSettings({ maintenanceMessage: value })
    else setSiteSettings({ maintenanceMessageI18n: { ...siteSettings.value.maintenanceMessageI18n, [contentLocale.value]: value } })
  }

  // ── page text (translatable) ─────────────────────────────────────
  type PageTextKey = 'title' | 'nav_label' | 'seo_title' | 'seo_desc'
  /** A page's text in the language being edited / previewed. */
  const pageText = (page: StorePage, key: PageTextKey): string => {
    const base = (page[key] ?? '') as string
    return isDefaultLocale.value ? base : (page.i18n?.[contentLocale.value]?.[key] || base)
  }
  const setPageText = (pageId: string, key: PageTextKey, value: string) => {
    const page = pages.value.find(p => p.id === pageId)
    if (!page) return
    if (isDefaultLocale.value) (page as unknown as Record<string, unknown>)[key] = value
    else page.i18n = { ...page.i18n, [contentLocale.value]: { ...page.i18n?.[contentLocale.value], [key]: value } }
    isDirty.value = true
  }

  // ── media library ────────────────────────────────────────────────
  const media = ref<MediaItem[]>([])
  const addMedia = (items: { name: string; url: string; size: number }[]) => {
    const added = items.map(i => ({ ...i, id: `med_${crypto.randomUUID().slice(0, 8)}`, addedAt: Date.now() }))
    media.value = [...added, ...media.value]
    isDirty.value = true
    return added
  }
  const removeMedia = (id: string) => {
    media.value = media.value.filter(m => m.id !== id)
    isDirty.value = true
  }
  const renameMedia = (id: string, name: string) => {
    const m = media.value.find(x => x.id === id)
    if (m) { m.name = name; isDirty.value = true }
  }

  // ── clipboard (copy / paste sections, also across pages) ─────────
  const clipboard = ref<PageSection[]>([])

  const versions = ref<VersionMeta[]>([])

  // ── working state (for the active page) ──────────────────────────
  const sections = ref<PageSection[]>([])
  const selectedId = ref<string | null>(null)
  const hoveredId = ref<string | null>(null)
  const device = ref<DeviceMode>('desktop')
  const panelMode = ref<PanelMode>('empty')
  const isDirty = ref(false)
  const isSaving = ref(false)
  const history = ref<PageSection[][]>([])
  const historyIndex = ref(-1)

  // ── computed ─────────────────────────────────────────────────────
  const currentPage = computed(() => pages.value.find(p => p.id === currentPageId.value) ?? null)
  const selectedSection = computed(() => sections.value.find(s => s.id === selectedId.value) ?? null)
  const canUndo = computed(() => historyIndex.value > 0)
  const canRedo = computed(() => historyIndex.value < history.value.length - 1)

  // ── internal helpers ─────────────────────────────────────────────
  const _clone = <T,>(val: T): T => {
    return JSON.parse(JSON.stringify(val)) as T
  }

  /** Persist the working `sections` array back to `sectionsMap`. */
  const _flush = () => {
    if (currentPageId.value) {
      sectionsMap.value[currentPageId.value] = _clone(sections.value)
    }
  }

  const reorderSortOrder = () => {
    sections.value.forEach((s, i) => { s.sort_order = i })
  }

  // ── page management ───────────────────────────────────────────────

  /**
   * Called on builder mount. Finds the page with the given slug and
   * loads it. If no pages exist yet, bootstraps the initial demo page.
   */
  const loadPageBySlug = (slug: string) => {
    if (currentPage.value?.slug === slug) return
    const page = pages.value.find(p => p.slug === slug)
    if (page) { switchPage(page.id); return }
    if (pages.value.length === 0) { bootstrapInitial(); return }
    // Slug not found but we have other pages — stay put
  }

  /**
   * Switch the active page. Flushes the current working sections to
   * the map first, then loads the new page's sections.
   */
  const switchPage = (pageId: string) => {
    if (pageId === currentPageId.value) return
    _flush()
    currentPageId.value = pageId
    sections.value = _clone(sectionsMap.value[pageId] ?? [])
    selectedId.value = null
    panelMode.value = 'empty'
    isDirty.value = false
    history.value = [_clone(sections.value)]
    historyIndex.value = 0
  }

  /**
   * Create a new page with an empty section list, switch to it, and
   * return the new page object (so the caller can navigate to its slug).
   */
  const createPage = (data: { title: string; slug: string; type: StorePageType; template?: string }): StorePage => {
    _flush()
    const storeId = currentPage.value?.store_id ?? 'demo-store'
    const newPage: StorePage = {
      id: `page_${crypto.randomUUID().slice(0, 8)}`,
      store_id: storeId,
      type: data.type,
      slug: data.slug,
      title: data.title,
      seo_title: null,
      seo_desc: null,
      is_published: false,
      is_system: false,
      show_in_nav: true,
      nav_label: data.title,
      nav_order: pages.value.length,
    }
    pages.value.push(newPage)
    const seeded = data.template ? buildTemplateSections(data.template, newPage.id, storeId) : []
    sectionsMap.value[newPage.id] = seeded
    currentPageId.value = newPage.id
    sections.value = _clone(seeded)
    selectedId.value = null
    panelMode.value = 'empty'
    isDirty.value = false
    history.value = [_clone(seeded)]
    historyIndex.value = 0
    return newPage
  }

  /**
   * Delete a page and its sections. Cannot delete the last remaining page.
   * Returns the page that becomes active after deletion (for navigation).
   */
  const deletePage = (pageId: string): StorePage | undefined => {
    const idx = pages.value.findIndex(p => p.id === pageId)
    if (idx < 0 || pages.value.length <= 1) return undefined

    const nextPage = pages.value[idx + 1] ?? pages.value[idx - 1]
    pages.value.splice(idx, 1)
    delete sectionsMap.value[pageId]

    if (currentPageId.value === pageId && nextPage) {
      currentPageId.value = nextPage.id
      sections.value = _clone(sectionsMap.value[nextPage.id] ?? [])
      selectedId.value = null
      panelMode.value = 'empty'
      isDirty.value = false
      history.value = [_clone(sections.value)]
      historyIndex.value = 0
    }
    return nextPage
  }

  /** Seed the initial home page the very first time the builder opens. */
  const bootstrapInitial = () => {
    if (pages.value.length > 0) return
    const storeId = 'demo-store'
    const pageId = 'page_home'

    pages.value = [
      {
        id: pageId,
        store_id: storeId,
        type: 'home',
        slug: 'home',
        title: 'Home',
        seo_title: 'Welcome',
        seo_desc: null,
        is_published: false,
        is_system: true,
        show_in_nav: true,
        nav_label: 'Home',
        nav_order: 0,
      },
      {
        id: 'page_checkout',
        store_id: storeId,
        type: 'checkout',
        slug: 'checkout',
        title: 'Checkout',
        seo_title: null,
        seo_desc: null,
        is_published: false,
        is_system: true,
        show_in_nav: false,
        nav_label: null,
        nav_order: 1,
      },
      {
        id: 'page_order_confirmed',
        store_id: storeId,
        type: 'order_confirmed',
        slug: 'order-confirmed',
        title: 'Order Confirmed',
        seo_title: null,
        seo_desc: null,
        is_published: false,
        is_system: true,
        show_in_nav: false,
        nav_label: null,
        nav_order: 2,
      },
      ...([
        ['page_product', 'product', 'product', 'Product', 'product-page'],
        ['page_collection', 'category', 'collection', 'Collection', 'collection-page'],
        ['page_cart', 'cart', 'cart', 'Cart', 'cart-page'],
        ['page_search', 'search', 'search', 'Search', 'search-page'],
        ['page_track', 'track', 'track-order', 'Track order', 'track-page'],
        ['page_about', 'page', 'about', 'About', 'about-page'],
        ['page_contact', 'page', 'contact', 'Contact', 'contact-page'],
        ['page_faq', 'page', 'faq', 'FAQ', 'faq-page'],
        ['page_policies', 'page', 'policies', 'Shipping & returns', 'policies-page'],
      ] as const).map(([id, type, slug, title], i): StorePage => ({
        id,
        store_id: storeId,
        type,
        slug,
        title,
        seo_title: null,
        seo_desc: null,
        is_published: false,
        is_system: type !== 'page',
        show_in_nav: false,
        nav_label: null,
        nav_order: 3 + i,
      })),
    ]

    for (const [id, template] of [
      ['page_product', 'product-page'],
      ['page_collection', 'collection-page'],
      ['page_cart', 'cart-page'],
      ['page_search', 'search-page'],
      ['page_track', 'track-page'],
      ['page_about', 'about-page'],
      ['page_contact', 'contact-page'],
      ['page_faq', 'faq-page'],
      ['page_policies', 'policies-page'],
    ] as const) {
      sectionsMap.value[id] = buildTemplateSections(template, id, storeId)
    }

    sectionsMap.value[pageId] = [
      {
        id: 'sec_hero',
        page_id: pageId,
        store_id: storeId,
        type: 'hero_banner',
        settings: {
          headline: 'Redefining Minimalist Design.',
          subheadline: 'Discover a curated collection of artisanal furniture designed for the modern sanctuary.',
          buttonText: 'Shop Collection',
        },
        sort_order: 0,
        is_hidden: false,
      },
      {
        id: 'sec_products',
        page_id: pageId,
        store_id: storeId,
        type: 'products_grid',
        settings: { heading: 'Curated Favorites', columns: 3, limit: 8 },
        sort_order: 1,
        is_hidden: false,
      },
    ]

    currentPageId.value = pageId
    sections.value = _clone(sectionsMap.value[pageId])
    history.value = [_clone(sections.value)]
    historyIndex.value = 0
  }

  /** @deprecated use bootstrapInitial */
  const bootstrapDemo = bootstrapInitial

  // ── selection ────────────────────────────────────────────────────

  const selectSection = (id: string | null) => {
    selectedId.value = id
    panelMode.value = id ? 'section-settings' : 'empty'
  }

  const setPanelMode = (mode: PanelMode) => {
    panelMode.value = mode
  }

  // ── section settings ─────────────────────────────────────────────

  const updateSectionSettings = (id: string, patch: Record<string, unknown>) => {
    const section = sections.value.find(s => s.id === id)
    if (section) {
      section.settings = { ...section.settings, ...patch }
      isDirty.value = true
    }
  }

  // ── section CRUD ─────────────────────────────────────────────────

  const appendSection = (section: PageSection) => {
    sections.value.push(section)
    reorderSortOrder()
    selectSection(section.id)
    isDirty.value = true
    pushHistory()
  }

  /** Insert after the given section (or at the end when `afterId` is missing/unknown). */
  const insertSection = (section: PageSection, afterId?: string | null) => {
    const idx = afterId ? sections.value.findIndex(s => s.id === afterId) : -1
    if (idx < 0) sections.value.push(section)
    else sections.value.splice(idx + 1, 0, section)
    reorderSortOrder()
    selectSection(section.id)
    isDirty.value = true
    pushHistory()
  }

  /**
   * Commit a new section order coming from drag & drop (reorder, or a block dropped in
   * from the library). Selects a newly added section; one undoable step.
   */
  const commitSections = (next: PageSection[]) => {
    const known = new Set(sections.value.map(s => s.id))
    const added = next.find(s => !known.has(s.id))
    sections.value = next
    reorderSortOrder()
    if (added) selectSection(added.id)
    isDirty.value = true
    pushHistory()
  }

  /** Replace the current page's sections in one undoable step (page templates). */
  const setSections = (next: PageSection[]) => {
    sections.value = next
    reorderSortOrder()
    selectedId.value = null
    panelMode.value = 'empty'
    isDirty.value = true
    pushHistory()
  }

  const removeSection = (id: string) => {
    const idx = sections.value.findIndex(s => s.id === id)
    if (idx < 0) return
    sections.value.splice(idx, 1)
    reorderSortOrder()
    if (selectedId.value === id) {
      selectedId.value = sections.value[idx]?.id ?? sections.value[idx - 1]?.id ?? null
      panelMode.value = selectedId.value ? 'section-settings' : 'empty'
    }
    isDirty.value = true
    pushHistory()
  }

  const duplicateSection = (id: string) => {
    const idx = sections.value.findIndex(s => s.id === id)
    if (idx < 0) return
    const copy = _clone(sections.value[idx])
    copy.id = `sec_${crypto.randomUUID().slice(0, 8)}`
    sections.value.splice(idx + 1, 0, copy)
    reorderSortOrder()
    selectSection(copy.id)
    isDirty.value = true
    pushHistory()
  }

  const copySection = (id: string) => {
    const s = sections.value.find(x => x.id === id)
    if (s) clipboard.value = [_clone(s)]
  }

  /** Paste the copied section(s) after `afterId` (default: the selected section, else the end). */
  const pasteSection = (afterId?: string | null) => {
    const page = currentPage.value
    if (!page || !clipboard.value.length) return
    let anchor = afterId ?? selectedId.value
    for (const src of clipboard.value) {
      const copy = _clone(src)
      copy.id = `sec_${crypto.randomUUID().slice(0, 8)}`
      copy.page_id = page.id
      copy.store_id = page.store_id
      insertSection(copy, anchor)
      anchor = copy.id
    }
  }

  const toggleSectionHidden = (id: string) => {
    const s = sections.value.find(x => x.id === id)
    if (s) {
      s.is_hidden = !s.is_hidden
      isDirty.value = true
      pushHistory()
    }
  }

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const idx = sections.value.findIndex(s => s.id === id)
    if (direction === 'up' && idx > 0) {
      ;[sections.value[idx - 1], sections.value[idx]] = [sections.value[idx], sections.value[idx - 1]]
    }
    if (direction === 'down' && idx >= 0 && idx < sections.value.length - 1) {
      ;[sections.value[idx], sections.value[idx + 1]] = [sections.value[idx + 1], sections.value[idx]]
    }
    reorderSortOrder()
    isDirty.value = true
    pushHistory()
  }

  /** Sections of any page (the working copy for the page being edited, the saved copy for others). */
  const sectionsFor = (pageId: string): PageSection[] => {
    return pageId === currentPageId.value ? sections.value : (sectionsMap.value[pageId] ?? [])
  }

  // ── history ──────────────────────────────────────────────────────

  // ── hydration ────────────────────────────────────────────────────

  /**
   * Restore full builder state from localStorage (called by the preview page
   * when it opens in a new tab where the Pinia store is empty).
   * Returns true if state was found and applied.
   */
  /** Everything that makes up the store design — used by publish, export and import. */
  const snapshot = () => {
    _flush()
    return {
      version: 1,
      pages: pages.value,
      sectionsMap: sectionsMap.value,
      storeName: storeName.value,
      storeNameI18n: storeNameI18n.value,
      locales: locales.value,
      defaultLocale: defaultLocale.value,
      navbarStyle: navbarStyle.value,
      footerStyle: footerStyle.value,
      navLinks: navLinks.value,
      footerTagline: footerTagline.value,
      footerCopyright: footerCopyright.value,
      footerShowSocial: footerShowSocial.value,
      footerColumns: footerColumns.value,
      footerTextI18n: footerTextI18n.value,
      media: media.value,
      theme: theme.value,
      announcement: announcement.value,
      siteSettings: siteSettings.value,
    }
  }

  /** Load a snapshot (from storage or an imported file). Returns false when it isn't a valid design. */
  const applySnapshot = (state: Record<string, unknown>): boolean => {
    if (!Array.isArray(state.pages) || typeof state.sectionsMap !== 'object' || !state.sectionsMap) return false
    pages.value = state.pages as typeof pages.value
    sectionsMap.value = state.sectionsMap as typeof sectionsMap.value
    storeName.value = (state.storeName as string) ?? 'LUXE'
    storeNameI18n.value = (state.storeNameI18n as typeof storeNameI18n.value) ?? {}
    locales.value = (state.locales as StoreLocale[] | undefined)?.length ? (state.locales as StoreLocale[]) : ['en']
    defaultLocale.value = (state.defaultLocale as StoreLocale | undefined) ?? locales.value[0]
    contentLocale.value = defaultLocale.value
    navbarStyle.value = (state.navbarStyle as typeof navbarStyle.value) ?? 'classic'
    footerStyle.value = (state.footerStyle as typeof footerStyle.value) ?? 'columns'
    navLinks.value = (state.navLinks as typeof navLinks.value) ?? []
    footerTagline.value = (state.footerTagline as string) ?? ''
    footerCopyright.value = (state.footerCopyright as string) ?? ''
    footerShowSocial.value = (state.footerShowSocial as boolean) ?? true
    footerColumns.value = (state.footerColumns as typeof footerColumns.value) ?? []
    footerTextI18n.value = (state.footerTextI18n as typeof footerTextI18n.value) ?? {}
    media.value = (state.media as MediaItem[] | undefined) ?? []
    theme.value = { ...DEFAULT_THEME, ...(state.theme as Partial<SiteTheme> | undefined) }
    announcement.value = { ...DEFAULT_ANNOUNCEMENT, ...(state.announcement as Partial<Announcement> | undefined) }
    siteSettings.value = {
      ...JSON.parse(JSON.stringify(DEFAULT_SITE_SETTINGS)),
      ...(state.siteSettings as Partial<SiteSettings> | undefined),
    }
    const firstPage = pages.value[0]
    if (firstPage) {
      currentPageId.value = firstPage.id
      sections.value = _clone(sectionsMap.value[firstPage.id] ?? [])
      selectedId.value = null
      history.value = [_clone(sections.value)]
      historyIndex.value = 0
    }
    return true
  }

  // ── persistence: draft autosave, published copy, version history ───

  const plain = <T>(v: T): T => JSON.parse(JSON.stringify(v)) as T

  const lastDraftAt = ref<number | null>(null)
  let draftTimer: ReturnType<typeof setTimeout> | undefined
  let autosaveStarted = false
  let initialized = false

  const writeDraft = async () => {
    await idbSet('draft', plain(snapshot()))
    lastDraftAt.value = Date.now()
  }

  /** Debounced draft write — called whenever any part of the design changes. */
  const scheduleDraft = () => {
    if (!initialized) return
    clearTimeout(draftTimer)
    draftTimer = setTimeout(() => { void writeDraft() }, 1200)
  }

  const startAutosave = () => {
    if (autosaveStarted || typeof window === 'undefined') return
    autosaveStarted = true
    watch(
      () => [
        sections.value, pages.value, navLinks.value, footerColumns.value, footerTagline.value,
        footerCopyright.value, footerTextI18n.value, footerShowSocial.value, theme.value,
        announcement.value, siteSettings.value, storeName.value, storeNameI18n.value,
        navbarStyle.value, footerStyle.value, locales.value, defaultLocale.value, media.value,
      ],
      scheduleDraft,
      { deep: true },
    )
  }

  /** Open the builder: restore the autosaved draft (first time only), then show the requested page. */
  const initBuilder = async (slug: string) => {
    if (!initialized) {
      const draft = await idbGet<Record<string, unknown>>('draft')
      if (draft && applySnapshot(draft)) isDirty.value = false
      initialized = true
      startAutosave()
      void loadVersions()
    }
    loadPageBySlug(slug)
  }

  /** Throw away the autosaved draft and start again from the starter store. */
  const resetDesign = async () => {
    clearTimeout(draftTimer)
    await idbDel('draft')
    window.location.reload()
  }

  const loadVersions = async () => {
    versions.value = (await idbGet<VersionMeta[]>('versions-index')) ?? []
  }

  /** Save the current design as a restorable version (keeps the newest 30). */
  const saveVersion = async (label: string, kind: VersionMeta['kind'] = 'manual') => {
    const snap = plain(snapshot())
    const meta: VersionMeta = {
      id: `v_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`,
      createdAt: Date.now(),
      label,
      kind,
      pages: snap.pages.length,
      sections: Object.values(snap.sectionsMap).reduce((n, list) => n + list.length, 0),
    }
    await idbSet(`version:${meta.id}`, snap)
    const next = [meta, ...versions.value]
    const evicted = next.slice(30)
    versions.value = next.slice(0, 30)
    await idbSet('versions-index', plain(versions.value))
    await Promise.all(evicted.map(v => idbDel(`version:${v.id}`)))
    return meta
  }

  /** Restore a saved version. The current design is saved first as "Before restore". */
  const restoreVersion = async (id: string): Promise<boolean> => {
    const snap = await idbGet<Record<string, unknown>>(`version:${id}`)
    if (!snap) return false
    await saveVersion('Before restore', 'auto')
    const ok = applySnapshot(snap)
    if (ok) {
      isDirty.value = true
      scheduleDraft()
    }
    return ok
  }

  const deleteVersion = async (id: string) => {
    versions.value = versions.value.filter(v => v.id !== id)
    await idbSet('versions-index', plain(versions.value))
    await idbDel(`version:${id}`)
  }

  const renameVersion = async (id: string, label: string) => {
    const v = versions.value.find(x => x.id === id)
    if (!v) return
    v.label = label
    await idbSet('versions-index', plain(versions.value))
  }

  /** Save the current design for the preview tab (does not publish). */
  const preparePreview = async () => {
    await idbSet('preview', plain(snapshot()))
  }

  /** Load the design for the preview tab: the latest preview copy, else the last published one. */
  const hydrateFromStorage = async (): Promise<boolean> => {
    const state = (await idbGet<Record<string, unknown>>('preview')) ?? (await idbGet<Record<string, unknown>>('published'))
    return state ? applySnapshot(state) : false
  }

  /** Download the whole design as a JSON backup. */
  const exportDesign = () => {
    const blob = new Blob([JSON.stringify(snapshot(), null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${storeName.value.replace(/[^a-z0-9]+/gi, '-').toLowerCase() || 'store'}-design.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  /** Replace the design with a previously exported file. */
  const importDesign = async (file: File): Promise<boolean> => {
    try {
      const ok = applySnapshot(JSON.parse(await file.text()) as Record<string, unknown>)
      if (ok) isDirty.value = true
      return ok
    } catch {
      return false
    }
  }

  // ── publish ──────────────────────────────────────────────────────

  /**
   * Flush current working sections, mark all pages as published, persist to
   * localStorage, and return the admin preview URL to open in a new tab.
   */
  const publish = async (): Promise<string> => {
    isSaving.value = true
    _flush()
    pages.value.forEach(p => { p.is_published = true })
    isDirty.value = false

    // The preview tab reads this copy; every publish is also kept as a restorable version.
    await idbSet('published', plain(snapshot()))
    await preparePreview()
    await saveVersion(`Published ${new Date().toLocaleString()}`, 'publish')
    await writeDraft()

    // Simulate async save round-trip for UX feedback
    await new Promise(resolve => setTimeout(resolve, 800))
    isSaving.value = false

    // Return the dedicated preview page URL
    return '/builder/preview'
  }

  const pushHistory = () => {
    history.value = history.value.slice(0, historyIndex.value + 1)
    history.value.push(_clone(sections.value))
    historyIndex.value = history.value.length - 1
  }

  const undo = () => {
    if (!canUndo.value) return
    historyIndex.value--
    sections.value = _clone(history.value[historyIndex.value])
    isDirty.value = true
  }

  const redo = () => {
    if (!canRedo.value) return
    historyIndex.value++
    sections.value = _clone(history.value[historyIndex.value])
    isDirty.value = true
  }

  /**
   * Quick-save the current section/page settings without publishing.
   * Flushes working state and clears the dirty flag.
   */
  const saveSettings = async (): Promise<void> => {
    isSaving.value = true
    _flush()
    isDirty.value = false
    await new Promise((resolve) => setTimeout(resolve, 400))
    isSaving.value = false
  }

  return {
    pages,
    locales,
    defaultLocale,
    contentLocale,
    isMultiLocale,
    direction,
    setLocales,
    setContentLocale,
    storeName,
    storeNameI18n,
    displayName,
    setStoreName,
    navbarStyle,
    footerStyle,
    navLinks,
    addNavLink,
    removeNavLink,
    updateNavLink,
    footerTagline,
    footerCopyright,
    footerShowSocial,
    footerColumns,
    addFooterColumn,
    removeFooterColumn,
    updateFooterColumn,
    addFooterLink,
    removeFooterLink,
    updateFooterLink,
    currentPageId,
    currentPage,
    sections,
    selectedId,
    hoveredId,
    device,
    panelMode,
    isDirty,
    isSaving,
    selectedSection,
    canUndo,
    canRedo,
    loadPageBySlug,
    switchPage,
    createPage,
    deletePage,
    bootstrapInitial,
    bootstrapDemo,
    selectSection,
    updateSectionSettings,
    setPanelMode,
    appendSection,
    insertSection,
    setSections,
    commitSections,
    removeSection,
    duplicateSection,
    toggleSectionHidden,
    moveSection,
    pushHistory,
    undo,
    redo,
    reorderSortOrder,
    publish,
    saveSettings,
    hydrateFromStorage,
    initBuilder,
    sectionsFor,
    preparePreview,
    resetDesign,
    lastDraftAt,
    versions,
    loadVersions,
    saveVersion,
    restoreVersion,
    deleteVersion,
    renameVersion,
    media,
    addMedia,
    removeMedia,
    renameMedia,
    clipboard,
    copySection,
    pasteSection,
    isDefaultLocale,
    localNavLinks,
    localFooterColumns,
    localTagline,
    localCopyright,
    footerTextI18n,
    setFooterTagline,
    setFooterCopyright,
    localAnnouncementText,
    setAnnouncementText,
    localMaintenanceMessage,
    setMaintenanceMessage,
    pageText,
    setPageText,
    snapshot,
    applySnapshot,
    exportDesign,
    importDesign,
    theme,
    announcement,
    siteSettings,
    setTheme,
    setAnnouncement,
    setSiteSettings,
    setSocial,
  }
})
