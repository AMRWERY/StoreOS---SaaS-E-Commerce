<template>
  <div>
    <nav
      class="fixed top-0 w-full z-50 border-b border-border-subtle bg-bg-base/80 backdrop-blur-md"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
      >
        <div class="flex items-center gap-8">
          <nuxt-link-locale to="/" class="flex items-center gap-3">
            <img
              src="/gif/storeose-logo.gif"
              alt="storeose-logo"
              class="h-12 w-auto"
              width="117"
              height="40"
            />
          </nuxt-link-locale>

          <div
            class="hidden md:flex items-center gap-6 text-sm text-tx-secondary"
          >
            <LazyVButton
              @click="scrollTo('features')"
              variant="none"
              className="hover:text-tx-primary transition"
            >
              {{ t("nav.features") }}
            </LazyVButton>

            <LazyVButton
              @click="scrollTo('integrations')"
              variant="none"
              className="hover:text-tx-primary transition"
            >
              {{ t("nav.integrations") }}
            </LazyVButton>

            <LazyVButton
              @click="scrollTo('pricing')"
              variant="none"
              className="hover:text-tx-primary transition"
            >
              {{ t("nav.pricing") }}
            </LazyVButton>
          </div>
        </div>

        <div class="flex items-center gap-1 sm:gap-3">
          <LazyThemeToggle />

          <!-- Locale toggle -->
          <LazyVButton
            type="button"
            :aria-label="`Switch to ${locale === 'en' ? 'Arabic' : 'English'}`"
            @click="switchLocale"
            variant="none"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-tx-secondary hover:text-tx-primary hover:bg-bg-elevated transition-colors"
          >
            <Icon name="lucide:globe" class="w-4 h-4 shrink-0" />
            <span class="text-xs font-semibold">{{ localeLabel }}</span>
          </LazyVButton>

          <!-- Mobile menu toggle -->
          <button
            type="button"
            class="md:hidden p-2 rounded-md text-tx-secondary hover:text-tx-primary hover:bg-bg-elevated transition-colors"
            :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="isMenuOpen"
            aria-controls="mobile-nav"
            @click="isMenuOpen = !isMenuOpen"
          >
            <Icon
              :name="isMenuOpen ? 'ph:x-bold' : 'ph:list-bold'"
              class="w-5 h-5"
            />
          </button>
        </div>
      </div>

      <!-- Mobile menu panel -->
      <Transition name="mobile-nav">
        <div
          v-if="isMenuOpen"
          id="mobile-nav"
          class="md:hidden border-t border-border-subtle bg-bg-base/95 backdrop-blur-md px-4 py-3 flex flex-col"
        >
          <button
            v-for="item in navItems"
            :key="item.id"
            type="button"
            class="text-start px-3 py-3 rounded-md text-sm text-tx-secondary hover:text-tx-primary hover:bg-bg-elevated transition-colors"
            @click="onMobileNav(item.id)"
          >
            {{ item.label }}
          </button>
        </div>
      </Transition>
    </nav>

    <LazyVOverlay :show="showOverlay" />
  </div>
</template>

<script lang="ts" setup>
const { locale, t } = useI18n();
const route = useRoute();

const localePath = useLocalePath();

const isMenuOpen = ref(false);
const navItems = computed(() => [
  { id: "features", label: t("nav.features") },
  { id: "integrations", label: t("nav.integrations") },
  { id: "pricing", label: t("nav.pricing") },
]);

// Close the menu when navigating, and whenever the viewport grows to the desktop layout.
watch(() => route.fullPath, () => (isMenuOpen.value = false));
onMounted(() => {
  const mq = window.matchMedia("(min-width: 768px)");
  const onChange = () => mq.matches && (isMenuOpen.value = false);
  mq.addEventListener("change", onChange);
  onBeforeUnmount(() => mq.removeEventListener("change", onChange));
});

const isHome = () =>
  route.path.replace(/\/$/, "") === localePath("/").replace(/\/$/, "");

// Wait for the section to exist (the home page may still be mounting after navigation).
const waitForElement = async (id: string, timeout = 3000) => {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const el = document.getElementById(id);
    if (el) return el;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return null;
};

// On any non-home route (footer pages etc.), go to the home page first, then scroll.
const scrollTo = async (id: string) => {
  if (!isHome()) {
    await navigateTo(localePath("/"));
  }
  const el = await waitForElement(id);
  el?.scrollIntoView({ behavior: "smooth" });
};

const onMobileNav = async (id: string) => {
  isMenuOpen.value = false;
  await scrollTo(id);
};

const switchLocalePath = useSwitchLocalePath();

const isEnglish = computed(() => locale.value === "en");
const localeLabel = computed(() => (isEnglish.value ? "ع" : "EN"));

const showOverlay = ref(false);

const switchLocale = async () => {
  const newLocale = isEnglish.value ? "ar" : "en";
  showOverlay.value = true;
  // Wait for the overlay to fade in (increased to 2.5s per user request)
  await new Promise((resolve) => setTimeout(resolve, 2500));
  await navigateTo(switchLocalePath(newLocale));
  // Small delay after navigation/locale change
  setTimeout(() => {
    showOverlay.value = false;
  }, 200);
};
</script>

<style scoped>
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
