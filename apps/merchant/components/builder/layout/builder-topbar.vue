<template>
  <div
    class="z-40 flex h-[52px] w-full shrink-0 items-center border-b border-border-subtle bg-bg-base px-4"
  >
    <header
      class="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 md:gap-4"
    >
      <!-- Left -->
      <div class="flex min-w-0 items-center gap-2 md:gap-4">
        <component
          :is="UiButton"
          variant="none"
          type="button"
          class-name="shrink-0 p-2 bg-bg-primary border border-border-subtle rounded-md text-tx-secondary hover:text-tx-primary lg:hidden"
          title="Open menu"
          @click="$emit('toggle-sidebar')"
        >
          <Icon name="ph:list-bold" class="text-xl" />
        </component>

        <nuxt-link-locale
          to="/"
          class="flex min-w-0 shrink-0 items-center gap-2.5 md:gap-3"
        >
          <div
            class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand text-white"
          >
            <Icon name="ph:storefront-bold" class="text-xl" />
          </div>
          <div class="min-w-0">
            <h1 class="text-lg font-bold leading-none text-tx-primary">
              Store<span class="text-brand">OS</span>
            </h1>
            <p
              class="mt-1 text-[9px] font-semibold tracking-[0.2em] text-tx-secondary"
            >
              Global Merchant
            </p>
          </div>
        </nuxt-link-locale>

        <!-- <nuxt-link-locale
          to="/dashboard"
          class="hidden md:flex items-center gap-1.5 text-xs text-tx-secondary hover:text-tx-primary transition-colors ms-1 px-2.5 py-1 rounded-md border border-border-subtle hover:bg-bg-elevated"
        >
          <Icon name="ph:arrow-left-bold" class="rtl:rotate-180 text-xs" />
          <span>Dashboard</span>
        </nuxt-link-locale> -->
      </div>

      <!-- Center: unsaved / trial badge -->
      <div class="flex items-center justify-center gap-3 px-2">
        <div
          v-if="store.isDirty"
          class="flex items-center justify-center gap-2"
        >
          <span
            class="size-1.5 shrink-0 animate-pulse rounded-full bg-[#f97316] shadow-[0_0_8px_rgba(249,115,22,0.55)]"
            aria-hidden="true"
          />
          <span class="text-[9px] font-black tracking-[0.35em] text-[#f97316]">
            Unsaved changes
          </span>
        </div>

        <!-- Free Trial Limited Access Badge -->
        <div
          v-if="isTrialMode"
          class="flex items-center gap-2"
        >
          <span
            class="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-400"
          >
            <Icon name="ph:sparkle-fill" class="size-3 text-amber-400" />
            <span>Free Trial · Limited Access</span>
          </span>
          <LazyVButton
            variant="none"
            type="button"
            className="hidden sm:inline-flex items-center gap-1 rounded-md bg-brand/15 hover:bg-brand/25 border border-brand/30 px-2.5 py-0.5 text-[10px] font-black text-brand transition-colors"
            @click="planGateOpen = true"
          >
            <Icon name="ph:crown-simple-bold" class="size-3" />
            <span>Upgrade</span>
          </LazyVButton>
        </div>
      </div>

      <!-- Right -->
      <div class="flex min-w-0 items-center justify-end gap-2 sm:gap-3">
        <lazy-device-toggle v-model="store.device" />
        
        <LazyThemeToggle />

        <component
          :is="UiButton"
          variant="none"
          type="button"
          class-name="flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold text-tx-secondary transition-colors hover:bg-bg-elevated hover:text-tx-primary sm:px-3"
          @click="switchLocale"
        >
          <Icon name="ph:globe-bold" class="size-4 shrink-0" />
          <span>{{ localeLabel }}</span>
        </component>

        <component
          :is="UiButton"
          variant="primary"
          type="button"
          class-name="shrink-0 px-4 py-1.5 text-[10px] font-black tracking-[0.12em] shadow-[0_0_14px_rgba(99,102,241,0.35)] sm:px-5 sm:text-[11px] sm:tracking-[0.1em]"
          @click="handlePublishClick"
        >
          Publish
        </component>
      </div>
    </header>

    <component :is="UiOverlay" :show="showLocaleOverlay" />
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n();
const store = useBuilderStore();

const { publishOpen, planGateOpen } = useBuilderModals();
const { hasFeature } = useAuth();

const isTrialMode = computed(() => !hasFeature("builder"));

const handlePublishClick = () => {
  if (isTrialMode.value) {
    planGateOpen.value = true;
  } else {
    publishOpen.value = true;
  }
};

defineEmits<{
  "toggle-sidebar": [];
}>();

const UiButton = resolveComponent("VButton");
const UiOverlay = resolveComponent("VOverlay");
const switchLocalePath = useSwitchLocalePath();

const isEnglish = computed(() => locale.value === "en");
const localeLabel = computed(() => (isEnglish.value ? "ع" : "EN"));

const showLocaleOverlay = ref(false);

const switchLocale = async () => {
  const target = isEnglish.value ? "ar" : "en";
  showLocaleOverlay.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2500));
  await navigateTo(switchLocalePath(target));
  setTimeout(() => {
    showLocaleOverlay.value = false;
  }, 200);
};
</script>