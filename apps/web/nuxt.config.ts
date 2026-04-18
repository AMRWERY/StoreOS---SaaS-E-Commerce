export default defineNuxtConfig({
  extends: ["@storeos/ui", "@storeos/core"],
  compatibilityDate: "2025-07-15",
  vite: {
    build: {
      sourcemap: false,
    },
  },
  nitro: {
    storage: {
      data: { driver: 'memory' },
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  icon: {
    serverBundle: 'local',
  },
  app: {
    head: {
      titleTemplate: '%s — StoreOS',
      title: 'Merchant Dashboard',
      meta: [
        { name: 'description', content: 'StoreOS — The all-in-one merchant dashboard. Manage orders, products, customers, and analytics in one place.' },
        { property: 'og:site_name', content: 'StoreOS' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/og-dashboard.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    },
  },
});
