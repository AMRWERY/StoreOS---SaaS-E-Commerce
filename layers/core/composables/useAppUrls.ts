/**
 * Cross-app links (landing ↔ merchant-dashboard ↔ store-builder). The apps are separate
 * deployments, so these are absolute URLs; base URLs come from runtimeConfig and the
 * current locale is carried over so an Arabic visitor stays on /ar.
 */
export function useAppUrls() {
  const { public: cfg } = useRuntimeConfig()
  const { locale } = useI18n()

  const build = (base: unknown, path: string, query?: Record<string, string | undefined>) => {
    const url = `${String(base).replace(/\/$/, '')}/${locale.value}${path}`
    const params = new URLSearchParams()
    for (const [k, v] of Object.entries(query ?? {})) if (v) params.set(k, v)
    const qs = params.toString()
    return qs ? `${url}?${qs}` : url
  }

  return {
    /** Merchant dashboard, e.g. dashboardUrl('/auth/register', { plan: 'growth' }) */
    dashboardUrl: (path = '/auth', query?: Record<string, string | undefined>) =>
      build(cfg.dashboardUrl, path, query),
    /** Store builder, e.g. builderUrl() → /{locale}/builder/home */
    builderUrl: (path = '/builder/home', query?: Record<string, string | undefined>) =>
      build(cfg.builderUrl, path, query),
  }
}
