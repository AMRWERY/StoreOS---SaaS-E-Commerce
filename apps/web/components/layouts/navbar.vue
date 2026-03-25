<template>
  <div>
    <nav class="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-8">
          <nuxt-link-locale to="/" class="flex items-center gap-3">
            <div class="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white shrink-0">
              <Icon name="ph:storefront-bold" class="text-xl" />
            </div>
            <div>
              <h1 class="font-bold text-lg leading-none text-white">StoreOS</h1>
              <p class="text-[9px] text-gray-500 tracking-[0.2em] font-black mt-1">Global Merchant</p>
            </div>
          </nuxt-link-locale>

          <div class="hidden md:flex gap-6 text-sm text-gray-400">
            <nuxt-link-locale to="" class="hover:text-white transition">Features</nuxt-link-locale>
            <nuxt-link-locale to="" class="hover:text-white transition">Pricing</nuxt-link-locale>
            <nuxt-link-locale to="" class="hover:text-white transition">Integrations</nuxt-link-locale>
            <nuxt-link-locale to="" class="hover:text-white transition">Demo</nuxt-link-locale>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <!-- Locale toggle -->
          <VButton type="button" :aria-label="`Switch to ${locale === 'en' ? 'Arabic' : 'English'}`"
            @click="switchLocale" variant="none"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
            <Icon name="lucide:globe" class="w-4 h-4 shrink-0" />
            <span class="text-xs font-semibold">{{ localeLabel }}</span>
          </VButton>

          <nuxt-link-locale to="/auth/login" class="text-sm font-medium text-gray-300 hover:text-white transition">
            Sign In
          </nuxt-link-locale>
          <nuxt-link-locale to="/auth/register"
            class="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-semibold transition">
            Start Free Trial
          </nuxt-link-locale>
        </div>
      </div>
    </nav>
    <VOverlay :show="showOverlay" />
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const isEnglish = computed(() => locale.value === "en");
const localeLabel = computed(() => isEnglish.value ? "ع" : "EN");

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