import type { DeviceMode, PanelMode } from '@/types/builder'
import { buildTemplateSections } from '@/data/page-templates'
import { localeDir, type StoreLocale } from '@/data/localize'
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

  function setLocales(next: StoreLocale[], def: StoreLocale) {
    const list = next.length ? [...new Set(next)] : [def]
    if (!list.includes(def)) list.unshift(def)
    locales.value = list
    defaultLocale.value = def
    if (!list.includes(contentLocale.value)) contentLocale.value = def
    isDirty.value = true
  }

  function setContentLocale(code: StoreLocale) {
    if (locales.value.includes(code)) contentLocale.value = code
  }

  // ── global admin settings (not per-page) ────────────────────
  const storeName = ref('LUXE')
  const navbarStyle = ref<'classic' | 'centered' | 'dark' | 'minimal'>('classic')
  const footerStyle = ref<'columns' | 'centered' | 'newsletter' | 'minimal'>('columns')
  const navLinks = ref<Array<{ label: string; href: string }>>([
    { label: 'Collection', href: '/collection' },
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
  ])

  function addNavLink() {
    navLinks.value.push({ label: 'New link', href: '/' })
    isDirty.value = true
  }

  function removeNavLink(index: number) {
    navLinks.value.splice(index, 1)
    isDirty.value = true
  }

  function updateNavLink(index: number, field: 'label' | 'href', value: string) {
    if (navLinks.value[index]) {
      navLinks.value[index][field] = value
      isDirty.value = true
    }
  }

  // ── footer ───────────────────────────────────────────────────────
  const footerTagline = ref('Premium products for your lifestyle.')
  const footerCopyright = ref(`© ${new Date().getFullYear()} My Store. All rights reserved.`)
  const footerShowSocial = ref(true)
  const footerColumns = ref([
    {
      title: 'Shop',
      links: [
        { label: 'All Products', href: '/shop' },
        { label: 'New Arrivals', href: '/new' },
        { label: 'Sale', href: '/sale' },
      ],
    },
    {
      title: 'Help',
      links: [
        { label: 'FAQ', href: '/faq' },
        { label: 'Shipping', href: '/shipping' },
        { label: 'Returns', href: '/returns' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '' },
      ],
    },
  ])

  function addFooterColumn() {
    footerColumns.value.push({ title: 'New column', links: [] })
    isDirty.value = true
  }

  function removeFooterColumn(colIdx: number) {
    footerColumns.value.splice(colIdx, 1)
    isDirty.value = true
  }

  function updateFooterColumn(colIdx: number, title: string) {
    if (footerColumns.value[colIdx]) {
      footerColumns.value[colIdx].title = title
      isDirty.value = true
    }
  }

  function addFooterLink(colIdx: number) {
    footerColumns.value[colIdx]?.links.push({ label: 'New link', href: '/' })
    isDirty.value = true
  }

  function removeFooterLink(colIdx: number, linkIdx: number) {
    footerColumns.value[colIdx]?.links.splice(linkIdx, 1)
    isDirty.value = true
  }

  function updateFooterLink(colIdx: number, linkIdx: number, field: 'label' | 'href', value: string) {
    const link = footerColumns.value[colIdx]?.links[linkIdx]
    if (link) {
      link[field] = value
      isDirty.value = true
    }
  }

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
  function _clone<T>(val: T): T {
    return JSON.parse(JSON.stringify(val)) as T
  }

  /** Persist the working `sections` array back to `sectionsMap`. */
  function _flush() {
    if (currentPageId.value) {
      sectionsMap.value[currentPageId.value] = _clone(sections.value)
    }
  }

  function reorderSortOrder() {
    sections.value.forEach((s, i) => { s.sort_order = i })
  }

  // ── page management ───────────────────────────────────────────────

  /**
   * Called on builder mount. Finds the page with the given slug and
   * loads it. If no pages exist yet, bootstraps the initial demo page.
   */
  function loadPageBySlug(slug: string) {
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
  function switchPage(pageId: string) {
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
  function createPage(data: { title: string; slug: string; type: StorePageType; template?: string }): StorePage {
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
  function deletePage(pageId: string): StorePage | undefined {
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
  function bootstrapInitial() {
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
      ] as const).map(([id, type, slug, title], i): StorePage => ({
        id,
        store_id: storeId,
        type,
        slug,
        title,
        seo_title: null,
        seo_desc: null,
        is_published: false,
        is_system: true,
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

  function selectSection(id: string | null) {
    selectedId.value = id
    panelMode.value = id ? 'section-settings' : 'empty'
  }

  function setPanelMode(mode: PanelMode) {
    panelMode.value = mode
  }

  // ── section settings ─────────────────────────────────────────────

  function updateSectionSettings(id: string, patch: Record<string, unknown>) {
    const section = sections.value.find(s => s.id === id)
    if (section) {
      section.settings = { ...section.settings, ...patch }
      isDirty.value = true
    }
  }

  // ── section CRUD ─────────────────────────────────────────────────

  function appendSection(section: PageSection) {
    sections.value.push(section)
    reorderSortOrder()
    selectSection(section.id)
    isDirty.value = true
    pushHistory()
  }

  /** Insert after the given section (or at the end when `afterId` is missing/unknown). */
  function insertSection(section: PageSection, afterId?: string | null) {
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
  function commitSections(next: PageSection[]) {
    const known = new Set(sections.value.map(s => s.id))
    const added = next.find(s => !known.has(s.id))
    sections.value = next
    reorderSortOrder()
    if (added) selectSection(added.id)
    isDirty.value = true
    pushHistory()
  }

  /** Replace the current page's sections in one undoable step (page templates). */
  function setSections(next: PageSection[]) {
    sections.value = next
    reorderSortOrder()
    selectedId.value = null
    panelMode.value = 'empty'
    isDirty.value = true
    pushHistory()
  }

  function removeSection(id: string) {
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

  function duplicateSection(id: string) {
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

  function toggleSectionHidden(id: string) {
    const s = sections.value.find(x => x.id === id)
    if (s) {
      s.is_hidden = !s.is_hidden
      isDirty.value = true
      pushHistory()
    }
  }

  function moveSection(id: string, direction: 'up' | 'down') {
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

  // ── history ──────────────────────────────────────────────────────

  // ── hydration ────────────────────────────────────────────────────

  /**
   * Restore full builder state from localStorage (called by the preview page
   * when it opens in a new tab where the Pinia store is empty).
   * Returns true if state was found and applied.
   */
  function hydrateFromStorage(): boolean {
    try {
      const raw = localStorage.getItem('storeos_builder_state')
      if (!raw) return false
      const state = JSON.parse(raw) as Record<string, unknown>
      pages.value = (state.pages as typeof pages.value) ?? []
      sectionsMap.value = (state.sectionsMap as typeof sectionsMap.value) ?? {}
      storeName.value = (state.storeName as string) ?? 'LUXE'
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
      const firstPage = pages.value[0]
      if (firstPage) {
        currentPageId.value = firstPage.id
        sections.value = _clone(sectionsMap.value[firstPage.id] ?? [])
      }
      return true
    } catch {
      return false
    }
  }

  // ── publish ──────────────────────────────────────────────────────

  /**
   * Flush current working sections, mark all pages as published, persist to
   * localStorage, and return the admin preview URL to open in a new tab.
   */
  async function publish(): Promise<string> {
    isSaving.value = true
    _flush()
    pages.value.forEach(p => { p.is_published = true })
    isDirty.value = false

    // Persist the entire builder state to localStorage so a full page reload
    // (e.g. the new tab) can hydrate from it if needed in the future.
    try {
      localStorage.setItem('storeos_builder_state', JSON.stringify({
        pages: pages.value,
        sectionsMap: sectionsMap.value,
        storeName: storeName.value,
        locales: locales.value,
        defaultLocale: defaultLocale.value,
        navbarStyle: navbarStyle.value,
        footerStyle: footerStyle.value,
        navLinks: navLinks.value,
        footerTagline: footerTagline.value,
        footerCopyright: footerCopyright.value,
        footerShowSocial: footerShowSocial.value,
        footerColumns: footerColumns.value,
      }))
    } catch (_) { /* storage quota exceeded — fail silently */ }

    // Simulate async save round-trip for UX feedback
    await new Promise(resolve => setTimeout(resolve, 800))
    isSaving.value = false

    // Return the dedicated preview page URL
    return '/builder/preview'
  }

  function pushHistory() {
    history.value = history.value.slice(0, historyIndex.value + 1)
    history.value.push(_clone(sections.value))
    historyIndex.value = history.value.length - 1
  }

  function undo() {
    if (!canUndo.value) return
    historyIndex.value--
    sections.value = _clone(history.value[historyIndex.value])
    isDirty.value = true
  }

  function redo() {
    if (!canRedo.value) return
    historyIndex.value++
    sections.value = _clone(history.value[historyIndex.value])
    isDirty.value = true
  }

  /**
   * Quick-save the current section/page settings without publishing.
   * Flushes working state and clears the dirty flag.
   */
  async function saveSettings(): Promise<void> {
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
  }
})
