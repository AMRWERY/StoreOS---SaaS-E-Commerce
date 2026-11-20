import { RADIUS_TO_CORNERS, googleFontsHref, isDarkColor, themeStyleVars } from '@/data/site-theme'

/**
 * Binds the merchant's theme to the storefront root element:
 * `<div v-bind="siteRootAttrs">` — plus loads the chosen Google Fonts and favicon.
 */
export function useSiteStyle() {
  const store = useBuilderStore()

  const siteRootAttrs = computed(() => ({
    class: 'sb-site',
    style: themeStyleVars(store.theme),
    'data-theme-corners': RADIUS_TO_CORNERS[store.theme.radius],
    'data-theme-mode': isDarkColor(store.theme.background) ? 'dark' : 'light',
    'data-theme-buttons': store.theme.buttonStyle === 'default' ? undefined : store.theme.buttonStyle,
  }))

  useHead({
    link: () => {
      const links: Record<string, string>[] = []
      const fonts = googleFontsHref([store.theme.headingFont, store.theme.bodyFont])
      if (fonts) {
        links.push({ rel: 'preconnect', href: 'https://fonts.googleapis.com' })
        links.push({ rel: 'stylesheet', href: fonts })
      }
      return links
    },
  })

  return { siteRootAttrs }
}
