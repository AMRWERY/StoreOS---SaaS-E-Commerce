<template>
  <div>
    <nav class="fixed top-0 w-full z-50 border-b border-border-subtle bg-bg-base/80 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-8">
          <nuxt-link-locale to="/" class="flex items-center gap-3">
            <div class="w-9 h-9 bg-brand rounded-lg flex items-center justify-center text-white shrink-0">
              <Icon name="ph:storefront-bold" class="text-xl" />
            </div>
            <div>
              <h1 class="font-bold text-lg leading-none text-tx-primary">
                Store<span class="text-brand">OS</span>
              </h1>
              <p class="text-[9px] text-tx-secondary tracking-[0.2em] font-semibold mt-1">
                Global Merchant
              </p>
            </div>
          </nuxt-link-locale>

          <div class="hidden md:flex items-center gap-6 text-sm text-tx-secondary">
            <button @click="scrollTo('features')" class="hover:text-tx-primary transition">
              {{ t("nav.features") }}
            </button>
            <button @click="scrollTo('integrations')" class="hover:text-tx-primary transition">
              {{ t("nav.integrations") }}
            </button>
            <button @click="scrollTo('pricing')" class="hover:text-tx-primary transition">
              {{ t("nav.pricing") }}
            </button>

            <nuxt-link-locale to="/dashboard"
              class="flex items-center gap-1.5 hover:text-tx-primary transition">
              {{ t("nav.dashboard") }}
            </nuxt-link-locale>
            <nuxt-link-locale to="/dashboard/builder"
              class="flex items-center gap-1.5 hover:text-tx-primary transition">
              {{ t("nav.storeBuilder") }}
            </nuxt-link-locale>
            <div class="w-px h-4 bg-border-subtle"></div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <LazyThemeToggle />
          <!-- Locale toggle -->
          <LazyVButton type="button" :aria-label="`Switch to ${locale === 'en' ? 'Arabic' : 'English'}`"
            @click="switchLocale" variant="none"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-tx-secondary hover:text-tx-primary hover:bg-bg-elevated transition-colors">
            <Icon name="lucide:globe" class="w-4 h-4 shrink-0" />
            <span class="text-xs font-semibold">{{ localeLabel }}</span>
          </LazyVButton>

          <nuxt-link-locale to="/auth/login"
            class="text-sm font-medium text-tx-secondary hover:text-tx-primary transition">
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

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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