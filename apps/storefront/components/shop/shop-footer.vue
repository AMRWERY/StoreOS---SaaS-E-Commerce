<template>
  <footer class="mt-24 border-t border-border-subtle bg-bg-primary">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div class="space-y-4">
        <img
          src="/gif/storeose-logo-storefront.gif"
          alt="StoreOS"
          class="h-8 sm:h-12 w-auto object-contain"
          width="117"
          height="40"
        />
        <p class="text-sm text-tx-secondary max-w-xs">
          {{ t("shop.footer.tagline") }}
        </p>
        <div class="flex items-center gap-2 text-xs text-tx-muted">
          <Icon name="lucide:banknote" class="w-4 h-4" />{{
            t("shop.footer.cod")
          }}
        </div>
      </div>
      <div v-for="col in columns" :key="col.title" class="space-y-4">
        <h3
          class="text-xs font-semibold tracking-widest uppercase text-tx-muted"
        >
          {{ t(col.title) }}
        </h3>
        <ul class="space-y-2.5">
          <li v-for="l in col.links" :key="l.to">
            <nuxt-link-locale
              :to="l.to"
              class="text-sm text-tx-secondary hover:text-tx-primary transition-colors duration-200"
              >{{ t(l.label) }}</nuxt-link-locale
            >
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const locales = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
] as const;
const switchLocalePath = useSwitchLocalePath();

const columns = [
  {
    title: "shop.footer.shop",
    links: [
      { to: "/collections/all", label: "shop.header.shopAll" },
      { to: "/collections/new-arrivals", label: "shop.header.newArrivals" },
      { to: "/collections/best-sellers", label: "shop.footer.bestSellers" },
    ],
  },
  {
    title: "shop.footer.help",
    links: [
      { to: "/order-status", label: "shop.header.trackOrder" },
      { to: "/pages/shipping", label: "shop.footer.shippingPolicy" },
      { to: "/pages/returns", label: "shop.footer.returnsPolicy" },
    ],
  },
  {
    title: "shop.footer.company",
    links: [
      { to: "/pages/about", label: "shop.header.about" },
      { to: "/pages/privacy", label: "shop.footer.privacy" },
      { to: "/account", label: "shop.header.account" },
    ],
  },
];
</script>
