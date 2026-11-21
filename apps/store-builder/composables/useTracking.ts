/**
 * Analytics + custom scripts for the published site.
 * Nothing loads until the visitor accepts cookies (when the consent banner is enabled).
 */
interface ScriptTag { key: string; src?: string; async?: boolean; innerHTML?: string }

export const useTracking = () => {
  const store = useBuilderStore()
  const consent = useState<'unknown' | 'granted' | 'denied'>('site-consent', () => 'unknown')

  const KEY = 'storeos_site_consent'

  onMounted(() => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved === 'granted' || saved === 'denied') consent.value = saved
    }
    catch { /* storage blocked — banner just shows every time */ }
  })

  const setConsent = (value: 'granted' | 'denied') => {
    consent.value = value
    try { localStorage.setItem(KEY, value) } catch { /* ignore */ }
  }

  const gaId = computed(() => (/^(G|AW|UA)-[A-Z0-9-]{4,}$/i.test(store.siteSettings.gaId.trim()) ? store.siteSettings.gaId.trim() : ''))
  const pixelId = computed(() => (/^\d{5,20}$/.test(store.siteSettings.pixelId.trim()) ? store.siteSettings.pixelId.trim() : ''))
  const custom = computed(() => store.siteSettings.headScripts.trim())

  const hasTracking = computed(() => !!(gaId.value || pixelId.value || custom.value))
  const showBanner = computed(() => store.siteSettings.cookieBanner && hasTracking.value && consent.value === 'unknown')
  const active = computed(() => hasTracking.value && (!store.siteSettings.cookieBanner || consent.value === 'granted'))

  const scripts = computed<ScriptTag[]>(() => {
      if (!active.value) return []
      const scripts: ScriptTag[] = []
      if (gaId.value) {
        scripts.push({ src: `https://www.googletagmanager.com/gtag/js?id=${gaId.value}`, async: true, key: 'ga-src' })
        scripts.push({
          key: 'ga-init',
          innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId.value}');`,
        })
      }
      if (pixelId.value) {
        scripts.push({
          key: 'fb-pixel',
          innerHTML: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId.value}');fbq('track','PageView');`,
        })
      }
      if (custom.value) scripts.push({ key: 'custom-head', innerHTML: custom.value })
      return scripts
  })

  // The tag list is plain data (validated ids / merchant code); unhead's element type is stricter than needed.
  useHead(() => ({ script: scripts.value as never }))

  return { consent, setConsent, showBanner, active, hasTracking }
}
