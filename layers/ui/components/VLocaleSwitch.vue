<template>
  <div class="contents">
    <LazyVButton
      type="button"
      variant="none"
      :aria-label="t('nav.switchLanguage')"
      :title="t('nav.switchLanguage')"
      :disabled="showOverlay"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-bg-elevated hover:bg-bg-elevated border border-border-subtle transition-colors text-tx-secondary hover:text-tx-primary text-xs font-bold"
      @click="switchLocale"
    >
      <ClientOnly>
        <Icon name="ph:globe-bold" class="text-base shrink-0" />
      </ClientOnly>
      <span>{{ localeLabel }}</span>
    </LazyVButton>

    <LazyVOverlay :show="showOverlay" />
  </div>
</template>

<script lang="ts" setup>
// Shared locale toggle (same look + full-screen overlay as the merchant dashboard header),
// used by the admin console and the storefront so every app switches language the same way.
const router = useRouter();
const { t, locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const isEnglish = computed(() => locale.value === "en");
const localeLabel = computed(() => (isEnglish.value ? "ع" : "EN"));

const showOverlay = ref(false);

const switchLocale = async () => {
  const target = isEnglish.value ? "ar" : "en";
  showOverlay.value = true;

  // Let the overlay animation play before navigating (matches the merchant header).
  await new Promise((resolve) => setTimeout(resolve, 2500));

  await router.push(switchLocalePath(target));

  // Hide the overlay after navigation.
  setTimeout(() => {
    showOverlay.value = false;
  }, 200);
};
</script>
