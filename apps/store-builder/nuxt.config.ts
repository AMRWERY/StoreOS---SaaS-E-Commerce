export default defineNuxtConfig({
  extends: ["@storeos/ui", "@storeos/core"],
  compatibilityDate: "2025-07-15",
  vite: {
    build: {
      sourcemap: false,
    },
    plugins: [
      {
        name: 'fix-vue-default-import',
        generateBundle(_opts, bundle) {
          for (const chunk of Object.values(bundle)) {
            if (
              chunk.type === 'chunk' &&
              typeof chunk.code === 'string' &&
              chunk.code.includes('Vue__default')
            ) {
              chunk.code = chunk.code
                .replace(/import Vue__default,\s*(\{)/g, 'import $1')
                .replace(/var vue = Vue__default\b/g, 'var vue = Vue')
            }
          }
        },
      } as any,
    ],
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
      titleTemplate: '%s',
      title: 'StoreOS Store Builder',
      meta: [
        { name: 'description', content: 'StoreOS Store Builder — design and publish your storefront.' },
        { property: 'og:site_name', content: 'StoreOS' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    },
  },
});
