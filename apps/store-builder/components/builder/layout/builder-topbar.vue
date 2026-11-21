<template>
  <div
    class="z-40 flex h-[52px] w-full shrink-0 items-center border-b border-border-subtle bg-bg-base px-2.5 sm:px-4"
  >
    <header
      class="flex w-full items-center justify-between gap-2 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-4"
    >
      <!-- Left -->
      <div class="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2.5 md:gap-4">
        <component
          :is="UiButton"
          variant="none"
          type="button"
          class-name="shrink-0 p-1.5 sm:p-2 bg-bg-primary border border-border-subtle rounded-md text-tx-secondary hover:text-tx-primary lg:hidden"
          title="Open menu"
          aria-label="Open menu"
          @click="$emit('toggle-sidebar')"
        >
          <Icon name="ph:list-bold" class="text-lg sm:text-xl" />
        </component>

        <nuxt-link-locale
          to="/"
          class="flex min-w-0 shrink-0 items-center gap-2"
        >
          <img
            src="/gif/storeose-logo.gif"
            alt="storeose-logo"
            class="h-8 sm:h-9 md:h-11 w-auto max-w-full object-contain"
            width="117"
            height="40"
          />
        </nuxt-link-locale>
      </div>

      <!-- Center: unsaved / trial badge (hidden on small mobile to avoid colliding with notch/actions) -->
      <div class="hidden min-[640px]:flex items-center justify-center gap-2 sm:gap-3 px-1 sm:px-2 min-w-0">
        <div
          v-if="store.isDirty"
          class="flex items-center justify-center gap-1.5 sm:gap-2"
          title="You have unsaved changes"
        >
          <span
            class="size-1.5 shrink-0 animate-pulse rounded-full bg-[#f97316] shadow-[0_0_8px_rgba(249,115,22,0.55)]"
            aria-hidden="true"
          />
          <span class="text-[9px] font-black tracking-[0.2em] sm:tracking-[0.35em] text-[#f97316] whitespace-nowrap">
            <span class="hidden md:inline">Unsaved changes</span>
            <span class="md:hidden">Unsaved</span>
          </span>
        </div>

        <!-- Free Trial Limited Access Badge -->
        <div v-if="isTrialMode" class="flex items-center gap-1.5 sm:gap-2">
          <span
            class="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-amber-400 whitespace-nowrap"
          >
            <Icon name="ph:sparkle-fill" class="size-3 text-amber-400 shrink-0" />
            <span class="hidden md:inline">Free Trial · Limited Access</span>
            <span class="md:hidden">Free Trial</span>
          </span>
          <LazyVButton
            variant="none"
            type="button"
            className="hidden sm:inline-flex items-center gap-1 rounded-md bg-brand/15 hover:bg-brand/25 border border-brand/30 px-2 py-0.5 text-[9px] sm:text-[10px] font-black text-brand transition-colors whitespace-nowrap"
            @click="planGateOpen = true"
          >
            <Icon name="ph:crown-simple-bold" class="size-3" />
            <span>Upgrade</span>
          </LazyVButton>
        </div>
      </div>

      <!-- Right: Action Controls -->
      <div class="flex min-w-0 items-center justify-end gap-1.5 sm:gap-2 md:gap-3 shrink-0">
        <!-- Undo / Redo controls -->
        <div data-tour="undo-redo" class="shrink-0">
          <lazy-history-controls />
        </div>

        <!-- Device viewport toggle (tablet / desktop only, on mobile inside more menu) -->
        <div data-tour="device-toggle" class="hidden md:flex shrink-0">
          <lazy-device-toggle v-model="store.device" />
        </div>

        <!-- Store locale control (languages) -->
        <div data-tour="languages" class="hidden lg:flex shrink-0">
          <lazy-store-locale-control />
        </div>

        <!-- Topbar actions (version history, tour, preview store) -->
        <lazy-topbar-actions class="hidden xl:flex shrink-0" />

        <!-- Theme Toggle -->
        <LazyVThemeToggle class="hidden lg:flex shrink-0" />

        <!-- App Language Switcher -->
        <component
          :is="UiButton"
          variant="none"
          type="button"
          class-name="hidden sm:flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-tx-secondary transition-colors hover:bg-bg-elevated hover:text-tx-primary sm:px-2.5 sm:py-1.5"
          @click="switchLocale"
        >
          <Icon name="ph:globe-bold" class="size-4 shrink-0" />
          <span>{{ localeLabel }}</span>
        </component>

        <!-- More Options Menu (visible on screens < xl where secondary controls are collapsed) -->
        <div class="relative xl:hidden shrink-0">
          <button
            type="button"
            class="flex size-8 items-center justify-center rounded-md border border-border-subtle bg-bg-primary text-tx-secondary transition-colors hover:bg-bg-elevated hover:text-tx-primary"
            :class="mobileMenuOpen ? 'border-brand text-brand bg-bg-elevated' : ''"
            title="More options"
            aria-label="More options"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <Icon name="ph:dots-three-vertical-bold" class="text-base" />
          </button>

          <!-- Dropdown Popover -->
          <Transition name="dropdown">
            <div
              v-if="mobileMenuOpen"
              class="absolute end-0 top-full mt-2 z-50 w-64 sm:w-72 rounded-xl border border-border-subtle bg-bg-primary p-2.5 shadow-2xl space-y-2 text-tx-primary"
            >
              <!-- Device toggle for mobile screen -->
              <div class="md:hidden border-b border-border-subtle pb-2">
                <div class="mb-1.5 px-1 text-[10px] font-bold tracking-wider text-tx-muted uppercase">
                  Preview Mode
                </div>
                <lazy-device-toggle v-model="store.device" class="w-full justify-around" />
              </div>

              <!-- Store Language for mobile/tablet screen -->
              <div class="lg:hidden border-b border-border-subtle pb-2">
                <div class="mb-1.5 px-1 text-[10px] font-bold tracking-wider text-tx-muted uppercase">
                  Store Content Language
                </div>
                <div class="flex items-center justify-between gap-2 px-1">
                  <!-- Multi-locale switcher -->
                  <div
                    v-if="store.isMultiLocale"
                    class="flex items-center rounded-md border border-border-subtle bg-bg-elevated p-0.5"
                  >
                    <button
                      v-for="code in store.locales"
                      :key="code"
                      type="button"
                      class="rounded px-2 py-1 text-[10px] font-black tracking-wider transition-colors"
                      :class="store.contentLocale === code ? 'bg-brand text-white' : 'text-tx-secondary'"
                      @click="store.setContentLocale(code)"
                    >
                      {{ code.toUpperCase() }}
                    </button>
                  </div>
                  <button
                    type="button"
                    class="flex items-center gap-1 text-xs font-medium text-tx-secondary hover:text-tx-primary"
                    @click="openLocaleSettings"
                  >
                    <Icon name="ph:gear-bold" class="size-3.5" />
                    <span>Settings</span>
                  </button>
                </div>
              </div>

              <!-- Action links -->
              <div class="space-y-0.5">
                <!-- Preview Store -->
                <button
                  type="button"
                  class="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold text-tx-secondary hover:bg-bg-elevated hover:text-tx-primary transition-colors disabled:opacity-50"
                  :disabled="openingPreview"
                  @click="handlePreviewClick"
                >
                  <span class="flex items-center gap-2">
                    <Icon
                      :name="openingPreview ? 'ph:spinner-gap-bold' : 'ph:arrow-square-out-bold'"
                      :class="openingPreview ? 'animate-spin' : ''"
                      class="size-4 text-brand"
                    />
                    <span>Preview store in new tab</span>
                  </span>
                  <Icon name="ph:caret-right-bold" class="size-3 text-tx-muted rtl:rotate-180" />
                </button>

                <!-- Version History -->
                <button
                  type="button"
                  class="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold text-tx-secondary hover:bg-bg-elevated hover:text-tx-primary transition-colors"
                  @click="openVersions"
                >
                  <span class="flex items-center gap-2">
                    <Icon name="ph:clock-counter-clockwise-bold" class="size-4 text-tx-secondary" />
                    <span>Version History</span>
                  </span>
                  <Icon name="ph:caret-right-bold" class="size-3 text-tx-muted rtl:rotate-180" />
                </button>

                <!-- Take a Tour -->
                <button
                  type="button"
                  class="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold text-tx-secondary hover:bg-bg-elevated hover:text-tx-primary transition-colors"
                  @click="handleTourClick"
                >
                  <span class="flex items-center gap-2">
                    <Icon name="ph:question-bold" class="size-4 text-tx-secondary" />
                    <span>Builder Tour & Guide</span>
                  </span>
                  <Icon name="ph:caret-right-bold" class="size-3 text-tx-muted rtl:rotate-180" />
                </button>
              </div>

              <!-- Quick toggles: Theme & App Language -->
              <div class="border-t border-border-subtle pt-2 flex items-center justify-between px-1">
                <span class="text-[11px] font-semibold text-tx-muted">Appearance & Lang</span>
                <div class="flex items-center gap-2">
                  <LazyVThemeToggle />
                  <button
                    type="button"
                    class="flex items-center gap-1 rounded-md border border-border-subtle bg-bg-elevated px-2 py-1 text-xs font-bold text-tx-primary hover:border-brand/40 transition-colors"
                    @click="switchLocale"
                  >
                    <Icon name="ph:globe-bold" class="size-3.5 shrink-0" />
                    <span>{{ localeLabel }}</span>
                  </button>
                </div>
              </div>

              <!-- Status for small screens (< 640px) -->
              <div
                v-if="store.isDirty || isTrialMode"
                class="border-t border-border-subtle pt-2 space-y-1.5 min-[640px]:hidden"
              >
                <div v-if="store.isDirty" class="flex items-center gap-1.5 px-1 text-[11px] font-bold text-[#f97316]">
                  <span class="size-1.5 rounded-full bg-[#f97316] animate-pulse" />
                  <span>Unsaved changes</span>
                </div>
                <div v-if="isTrialMode" class="flex items-center justify-between rounded-lg bg-amber-500/10 border border-amber-500/30 p-2">
                  <span class="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                    <Icon name="ph:sparkle-fill" class="size-3 shrink-0" />
                    Free Trial Mode
                  </span>
                  <button
                    type="button"
                    class="text-[10px] font-black text-brand bg-brand/15 hover:bg-brand/25 px-2 py-0.5 rounded transition-colors"
                    @click="openUpgrade"
                  >
                    Upgrade
                  </button>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Click outside backdrop -->
          <div
            v-if="mobileMenuOpen"
            class="fixed inset-0 z-40 bg-transparent"
            @click="mobileMenuOpen = false"
          />
        </div>

        <!-- Primary Action: Publish -->
        <component
          :is="UiButton"
          variant="primary"
          type="button"
          data-tour="publish-btn"
          class-name="shrink-0 px-3 py-1.5 sm:px-4 md:px-5 text-[10px] sm:text-[11px] font-black tracking-[0.1em] shadow-[0_0_14px_rgba(99,102,241,0.35)] active:scale-[0.98]"
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

const { publishOpen, planGateOpen, versionsOpen, localeSettingsOpen } =
  useBuilderModals();
const { hasFeature } = useAuth();
const { start: startTour } = useTour();
const localePath = useLocalePath();
const route = useRoute();

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
const mobileMenuOpen = ref(false);
const openingPreview = ref(false);

watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false;
  },
);

const openVersions = () => {
  mobileMenuOpen.value = false;
  versionsOpen.value = true;
};

const openLocaleSettings = () => {
  mobileMenuOpen.value = false;
  localeSettingsOpen.value = true;
};

const openUpgrade = () => {
  mobileMenuOpen.value = false;
  planGateOpen.value = true;
};

const handleTourClick = () => {
  mobileMenuOpen.value = false;
  startTour();
};

const handlePreviewClick = async () => {
  mobileMenuOpen.value = false;
  const tab = window.open("about:blank", "_blank");
  openingPreview.value = true;
  await store.preparePreview();
  const slug = store.currentPage?.slug ?? "home";
  const url = `${localePath("/builder/preview")}?page=${encodeURIComponent(slug)}`;
  if (tab) tab.location.href = url;
  else window.open(url, "_blank");
  openingPreview.value = false;
};

const switchLocale = async () => {
  mobileMenuOpen.value = false;
  const target = isEnglish.value ? "ar" : "en";
  showLocaleOverlay.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2500));
  await navigateTo(switchLocalePath(target));
  setTimeout(() => {
    showLocaleOverlay.value = false;
  }, 200);
};
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease-out;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.97);
}
</style>