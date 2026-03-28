<template>
  <div>
    <nav class="fixed top-0 w-full z-50 border-b border-border-subtle bg-bg-base/80 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-12 md:px-24 h-16 flex items-center justify-between">
        <div class="flex items-center gap-8">
          <nuxt-link-locale to="/" class="flex items-center gap-3">
            <div class="w-9 h-9 bg-brand rounded-lg flex items-center justify-center text-white shrink-0">
              <Icon name="ph:storefront-bold" class="text-xl" />
            </div>
            <div>
              <h1 class="font-bold text-lg leading-none text-tx-primary">Store<span class="text-brand">OS</span></h1>
              <p class="text-[9px] text-tx-secondary tracking-[0.2em] font-semibold mt-1">Global Merchant</p>
            </div>
          </nuxt-link-locale>

          <div class="hidden md:flex items-center gap-10 h-full">
            <nuxt-link-locale v-for="link in navLinks" :key="link.path" :to="link.path" v-slot="{ isActive }">
              <div class="relative h-full flex items-center group cursor-pointer">
                <span :class="[isActive ? 'text-brand' : 'text-tx-secondary group-hover:text-brand']"
                  class="text-sm font-bold transition-all tracking-tight">
                  {{ link.label }}
                </span>
                <!-- Start-Aligned Pill Indicator -->
                <div v-if="isActive"
                  class="absolute -bottom-[3px] start-0 w-8 h-1 bg-brand rounded-full shadow-[0_0_12px_rgba(var(--brand-rgb),0.4)]">
                </div>
              </div>
            </nuxt-link-locale>
          </div>
        </div>

        <div class="flex items-center gap-5 text-tx-muted">
          <!-- Locale Switcher -->
          <button @click="switchLocale"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-tx-secondary hover:text-tx-primary hover:bg-bg-elevated transition-colors text-xs font-semibold">
            <Icon name="ph:globe-bold" class="text-sm shrink-0" />
            <span>{{ localeLabel }}</span>
          </button>

          <notifications />

          <!-- User -->
          <Icon v-if="isAuthenticated" name="ph:user-bold" @click="logout"
            class="w-[18px] h-[18px] cursor-pointer hover:text-tx-primary transition-colors hover:text-brand" />

          <cart />

          <nuxt-link-locale v-if="!isAuthenticated" to="/auth/login"
            class="text-sm font-medium text-tx-secondary hover:text-tx-primary transition">
            Sign In
          </nuxt-link-locale>
        </div>
      </div>
    </nav>

    <!-- Switch Locale Overlay -->
    <VOverlay :show="showOverlay" />
  </div>
</template>

<script lang="ts" setup>
const { isAuthenticated, logout } = useAuth();
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const isEnglish = computed(() => locale.value === "en");
const localeLabel = computed(() => (isEnglish.value ? "ع" : "EN"));

const showOverlay = ref(false);

const switchLocale = async () => {
  const target = isEnglish.value ? "ar" : "en";
  showOverlay.value = true;
  // High-fidelity transition delay synchronized with dashboard
  await new Promise((resolve) => setTimeout(resolve, 2500));
  await navigateTo(switchLocalePath(target));
  setTimeout(() => {
    showOverlay.value = false;
  }, 200);
};

const navLinks = [
  { label: 'Shop All', path: '/products' },
  { label: 'New Arrivals', path: '/new-arrivals' },
  { label: 'Collections', path: '/collections' },
  { label: 'Editorial', path: '/editorial' },
];
</script>