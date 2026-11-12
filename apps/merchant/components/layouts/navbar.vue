<template>
  <div>
    <nav
      class="fixed top-0 w-full z-50 border-b border-border-subtle bg-bg-base/80 backdrop-blur-md"
    >
      <div
        class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
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

            <nuxt-link-locale
              to="/dashboard"
              class="flex items-center gap-1.5 hover:text-tx-primary transition"
            >
              {{ t("nav.dashboard") }}
            </nuxt-link-locale>

            <LazyVButton
              variant="none"
              @click="handleBuilderPreview"
              className="flex items-center gap-1.5 hover:text-tx-primary transition"
            >
              <Icon name="ph:paint-brush-bold" class="text-sm" />
              {{ t("nav.admin.store_builder") }}
            </LazyVButton>
          </div>
        </div>

        <div class="flex items-center gap-3">
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

          <nuxt-link-locale
            to="/auth"
            class="text-sm font-medium text-tx-secondary hover:text-tx-primary transition"
          >
            {{ t("nav.signIn") }}
          </nuxt-link-locale>
        </div>
      </div>
    </nav>

    <LazyVOverlay :show="showOverlay" />
  </div>
</template>

<script lang="ts" setup>
const { locale, t } = useI18n();

const { register, isAuthenticated } = useAuth();
const localePath = useLocalePath();

const route = useRoute();

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

/**
 * Landing-page CTA: start a free trial session and navigate
 * directly to the store builder page with limited trial access.
 */
const handleBuilderPreview = async () => {
  if (!isAuthenticated.value) {
    register("trial");
  }
  await navigateTo(localePath("/dashboard/builder/home"));
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
