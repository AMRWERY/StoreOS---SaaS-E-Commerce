import type { CspDomains, CustomCodeFinding, CustomCodeMode } from '@/types/trust'

export const useTrustCustomCodeStore = defineStore('trustCustomCode', () => {
  const allowCustomHtml = ref(true)
  const mode = ref<CustomCodeMode>('sanitized')
  const allowInlineStyles = ref(true)
  const allowFrames = ref(false)
  const domains = ref<CspDomains>({
    script: ['https://www.googletagmanager.com', 'https://connect.facebook.net'],
    style: ['https://fonts.googleapis.com'],
    frame: ['https://www.youtube.com'],
  })

  const storefrontOrigin = ref('https://mystore.storeos.app')
  const dashboardOrigin = ref('https://app.storeos.com')

  const findings = ref<CustomCodeFinding[]>([
    { id: 'f1', page: '/home', section: 'Custom HTML #1', finding: 'inline_script', severity: 'high', action: 'stripped' },
    { id: 'f2', page: '/about', section: 'Custom HTML #2', finding: 'external_script', severity: 'medium', action: 'review' },
    { id: 'f3', page: '/contact', section: 'Map embed', finding: 'iframe', severity: 'low', action: 'sandboxed' },
    { id: 'f4', page: '/home', section: 'Promo banner', finding: 'inline_handler', severity: 'high', action: 'stripped' },
    { id: 'f5', page: '/faq', section: 'Custom CSS', finding: 'style_only', severity: 'low', action: 'allowed' },
  ])

  const csp = computed(() => {
    const join = (list: string[]) => list.join(' ')
    const parts = [
      `default-src 'self'`,
      mode.value === 'disabled' ? `script-src 'self'` : `script-src 'self' ${join(domains.value.script)}`.trim(),
      `style-src 'self'${allowInlineStyles.value ? ` 'unsafe-inline'` : ''} ${join(domains.value.style)}`.trim(),
      allowFrames.value ? `frame-src ${join(domains.value.frame)}`.trim() : `frame-src 'none'`,
      `object-src 'none'`,
      `base-uri 'self'`,
      `frame-ancestors 'self'`,
    ]
    return parts.join(';\n')
  })

  function addDomain(kind: keyof CspDomains, value: string) {
    const v = value.trim()
    if (!v || domains.value[kind].includes(v)) return
    domains.value[kind].push(v)
  }
  function removeDomain(kind: keyof CspDomains, value: string) {
    domains.value[kind] = domains.value[kind].filter((d) => d !== value)
  }

  return {
    allowCustomHtml, mode, allowInlineStyles, allowFrames, domains,
    storefrontOrigin, dashboardOrigin, findings, csp, addDomain, removeDomain,
  }
})
