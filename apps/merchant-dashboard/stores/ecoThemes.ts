import type { EcoTheme, EcoThemeVersion } from '@/types/ecosystem'

export const useEcoThemesStore = defineStore('ecoThemes', () => {
  const themes = ref<EcoTheme[]>([
    { id: 'minimal', name: 'Minimal', status: 'published', gradient: 'from-brand-dim to-bg-elevated', icon: 'ph:square-bold', rtl: false, publishedAt: '2026-11-08 14:20' },
    { id: 'boutique', name: 'Boutique', status: 'installed', gradient: 'from-warning-dim to-bg-elevated', icon: 'ph:storefront-bold', rtl: false, publishedAt: null },
    { id: 'electronics', name: 'Electronics', status: 'starter', gradient: 'from-info-dim to-bg-elevated', icon: 'ph:cpu-bold', rtl: false, publishedAt: null },
    { id: 'fashion-rtl', name: 'Fashion RTL', status: 'starter', gradient: 'from-danger-dim to-bg-elevated', icon: 'ph:t-shirt-bold', rtl: true, publishedAt: null },
  ])

  const versions = ref<EcoThemeVersion[]>([
    { id: 'v7', version: 'v1.7', author: 'Amr Wery', note: 'Updated hero banner and footer links', date: '2026-11-08 14:20', status: 'published' },
    { id: 'v8', version: 'v1.8', author: 'Nour Adel', note: 'Ramadan promo strip (work in progress)', date: '2026-11-11 09:45', status: 'draft' },
    { id: 'v6', version: 'v1.6', author: 'Amr Wery', note: 'Product grid spacing fix', date: '2026-10-29 17:05', status: 'previous' },
    { id: 'v5', version: 'v1.5', author: 'Sara Mostafa', note: 'New checkout trust badges', date: '2026-10-14 11:30', status: 'previous' },
    { id: 'v4', version: 'v1.4', author: 'Amr Wery', note: 'Initial theme setup', date: '2026-09-30 10:00', status: 'previous' },
  ])

  const published = computed(() => themes.value.find((x) => x.status === 'published') ?? null)
  const installed = computed(() => themes.value.filter((x) => x.status === 'installed'))
  const starters = computed(() => themes.value.filter((x) => x.status === 'starter'))

  function install(id: string) {
    const th = themes.value.find((x) => x.id === id)
    if (th && th.status === 'starter') th.status = 'installed'
  }
  function activate(id: string) {
    const th = themes.value.find((x) => x.id === id)
    if (!th || th.status !== 'installed') return
    const cur = published.value
    if (cur) cur.status = 'installed'
    th.status = 'published'
    th.publishedAt = '2026-11-12 10:00'
  }
  function restore(id: string) {
    const cur = versions.value.find((v) => v.status === 'published')
    const target = versions.value.find((v) => v.id === id)
    if (!target || target.status === 'published') return
    if (cur) cur.status = 'previous'
    target.status = 'published'
  }

  return { themes, versions, published, installed, starters, install, activate, restore }
})
