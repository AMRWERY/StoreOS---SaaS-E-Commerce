<template>
  <header
    class="sticky top-0 z-40 bg-bg-base/90 backdrop-blur border-b border-border-subtle"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-2 sm:gap-4 lg:gap-8"
    >
      <button
        type="button"
        class="lg:hidden w-10 h-10 -ms-2 flex items-center justify-center text-tx-primary"
        :aria-label="t('shop.header.menu')"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        <Icon :name="menuOpen ? 'lucide:x' : 'lucide:menu'" class="w-5 h-5" />
      </button>

      <nuxt-link-locale to="/" class="flex items-center gap-2 shrink-0">
        <img
          src="/gif/storeose-logo-storefront.gif"
          alt="StoreOS"
          class="h-8 sm:h-12 w-auto object-contain"
          width="117"
          height="40"
        />
      </nuxt-link-locale>

      <nav
        class="hidden lg:flex items-center gap-7 flex-1"
        :aria-label="t('shop.header.mainNav')"
      >
        <nuxt-link-locale
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="text-sm text-tx-secondary hover:text-tx-primary transition-colors duration-200"
          >{{ t(l.label) }}</nuxt-link-locale
        >
      </nav>

      <div class="flex items-center gap-0.5 sm:gap-1 ms-auto lg:ms-0">
        <form
          class="hidden md:flex items-center relative"
          role="search"
          @submit.prevent="submitSearch"
        >
          <Icon
            name="lucide:search"
            class="w-4 h-4 text-tx-muted absolute start-3.5 pointer-events-none"
          />
          <input
            v-model="query"
            type="search"
            :placeholder="t('shop.header.searchPlaceholder')"
            :aria-label="t('shop.header.search')"
            class="w-56 bg-bg-primary border border-border-default focus:border-brand rounded-full ps-10 pe-4 py-2 text-sm text-tx-primary placeholder:text-tx-muted outline-none transition-colors duration-200"
          />
        </form>
        <nuxt-link-locale
          to="/search"
          class="md:hidden w-10 h-10 flex items-center justify-center text-tx-primary"
          :aria-label="t('shop.header.search')"
        >
          <Icon name="lucide:search" class="w-5 h-5" />
        </nuxt-link-locale>
        <LazyThemeToggle />
        <LazyVLocaleSwitch />
        <nuxt-link-locale
          :to="account.isAuthenticated ? '/account' : '/auth/login'"
          class="hidden sm:flex w-10 h-10 items-center justify-center text-tx-primary hover:text-brand transition-colors duration-200"
          :aria-label="t('shop.header.account')"
        >
          <Icon name="lucide:user" class="w-5 h-5" />
        </nuxt-link-locale>
        <button
          type="button"
          class="relative w-10 h-10 flex items-center justify-center text-tx-primary hover:text-brand transition-colors duration-200"
          :aria-label="t('shop.header.openCart', { count: cart.count })"
          @click="cart.drawerOpen = true"
        >
          <Icon name="lucide:shopping-bag" class="w-5 h-5" />
          <span
            v-if="cart.count"
            class="absolute top-0.5 end-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-white text-[10px] font-mono font-semibold flex items-center justify-center"
            >{{ cart.count }}</span
          >
        </button>
      </div>
    </div>

    <Transition name="fade">
      <nav
        v-if="menuOpen"
        class="lg:hidden border-t border-border-subtle bg-bg-base px-4 py-4 space-y-1"
        :aria-label="t('shop.header.mainNav')"
      >
        <nuxt-link-locale
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="block rounded-xl px-3 py-3 text-sm text-tx-primary hover:bg-bg-elevated"
          @click="menuOpen = false"
          >{{ t(l.label) }}</nuxt-link-locale
        >
        <nuxt-link-locale
          to="/order-status"
          class="block rounded-xl px-3 py-3 text-sm text-tx-primary hover:bg-bg-elevated"
          @click="menuOpen = false"
          >{{ t("shop.header.trackOrder") }}</nuxt-link-locale
        >
        <nuxt-link-locale
          :to="account.isAuthenticated ? '/account' : '/auth/login'"
          class="block sm:hidden rounded-xl px-3 py-3 text-sm text-tx-primary hover:bg-bg-elevated"
          @click="menuOpen = false"
          >{{ t("shop.header.account") }}</nuxt-link-locale
        >
      </nav>
    </Transition>
  </header>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const cart = useCartStore();
const account = useShopAccountStore();
const menuOpen = ref(false);
const query = ref("");

const links = [
  { to: "/collections/all", label: "shop.header.shopAll" },
  { to: "/collections/new-arrivals", label: "shop.header.newArrivals" },
  { to: "/collections", label: "shop.header.collections" },
  { to: "/pages/about", label: "shop.header.about" },
];

function submitSearch() {
  router.push(
    localePath({ path: "/search", query: { q: query.value.trim() } }),
  );
}

watch(
  () => useRoute().fullPath,
  () => {
    menuOpen.value = false;
  },
);
</script>