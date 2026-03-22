export default defineNuxtConfig({
  router: {
    options: {
      scrollBehavior(_to, _from, savedPosition) {
        if (savedPosition) return savedPosition
        if (_to.hash) return { el: _to.hash, behavior: "smooth" }
        return { top: 0, left: 0, behavior: "smooth" }
      },
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/icon",
    "@vueuse/nuxt",
    "@vee-validate/nuxt",
    "@nuxtjs/i18n",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  i18n: {
    strategy: "prefix",
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "ar", name: "العربية", file: "ar.json", dir: "rtl" },
    ],
    lazy: true,
    langDir: "./locales/",
  },
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
})
