export default defineNuxtConfig({
  extends: ["@storeos/ui", "@storeos/core"],
  compatibilityDate: "2025-07-15",
  vite: {
    build: {
      sourcemap: false,
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  icon: {
    serverBundle: 'remote',
  },
  app: {
    head: {
      titleTemplate: '%s | StoreOS Store',
      title: 'Shop Online',
      meta: [
        { name: 'description', content: 'Shop the latest collection. Free shipping on orders over $50. New arrivals every week.' },
        { property: 'og:site_name', content: 'StoreOS Store' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/og-default.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'robots', content: 'index, follow' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
});
