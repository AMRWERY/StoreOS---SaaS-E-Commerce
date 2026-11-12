<template>
  <div>
    <div
      class="min-h-screen bg-bg-base text-tx-primary flex overflow-hidden lg:overflow-visible"
    >
      <!-- Mobile backdrop -->
      <Transition name="fade">
        <div
          v-if="isSidebarOpen"
          class="overlay-backdrop z-40 lg:hidden"
          @click="isSidebarOpen = false"
        ></div>
      </Transition>

      <!-- Sidebar -->
      <aside
        class="fixed lg:sticky top-0 start-0 z-50 flex h-screen w-[230px] shrink-0 flex-col border-e border-border-subtle bg-bg-primary p-4 transition-transform duration-300"
        :class="
          isSidebarOpen
            ? 'translate-x-0'
            : 'ltr:-translate-x-full rtl:translate-x-full ltr:lg:translate-x-0 rtl:lg:translate-x-0'
        "
      >
        <!-- The aside is a flex column, so a bare <img> gets stretched to the full sidebar
             width (distorted). Keep it in a fixed-height row and let the image size itself. -->
        <div class="mb-6 flex h-16 shrink-0 items-center">
          <img
            src="/gif/storeose-logo-admin.gif"
            alt="StoreOS"
            class="h-16 w-auto max-w-full object-contain"
            width="117"
            height="40"
          />
        </div>

        <nav class="flex-1 space-y-1 overflow-y-auto hide-scrollbar">
          <template v-for="item in navItems" :key="item.to">
          <p v-if="item.section" class="px-3 pb-1 pt-4 text-eyebrow">{{ item.section }}</p>
          <nuxt-link-locale
            :to="item.to"
            class="flex items-center gap-2 rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors"
            :class="
              isActive(item)
                ? 'bg-brand-dim text-brand'
                : 'text-tx-secondary hover:bg-bg-elevated hover:text-tx-primary'
            "
          >
            <Icon :name="item.icon" class="text-lg" />
            <span class="flex-1 truncate">{{ item.label }}</span>
            <span
              v-if="item.badge"
              class="rounded-full bg-danger-dim px-1.5 py-0.5 font-mono text-[9px] font-semibold text-danger"
              >{{ item.badge }}</span
            >
          </nuxt-link-locale>
          </template>
        </nav>

        <div class="mt-4 border-t border-border-subtle pt-4">
          <p class="px-3 text-[10px] text-tx-muted">
            {{ t("platform.legacyHint") }}
          </p>
        </div>
      </aside>

      <!-- Main -->
      <main
        ref="mainRef"
        class="flex h-screen flex-1 flex-col overflow-y-auto hide-scrollbar"
      >
        <header
          class="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border-subtle bg-bg-base/70 px-4 py-3 backdrop-blur-md md:px-8"
        >
          <div class="flex items-center gap-3">
            <button
              type="button"
              class="rounded-md p-1.5 text-tx-secondary hover:bg-bg-elevated hover:text-tx-primary lg:hidden"
              :aria-label="t('platform.topbar.openMenu')"
              @click="isSidebarOpen = true"
            >
              <Icon name="ph:list-bold" class="text-xl" />
            </button>
            <span
              class="inline-flex items-center gap-1 rounded-full bg-danger-dim px-2.5 py-1 text-[10px] font-semibold text-danger"
            >
              <Icon name="ph:shield-warning-bold" class="text-xs" />
              {{ t("platform.badge") }}
            </span>
            <span
              class="hidden rounded-full bg-bg-elevated px-2 py-0.5 font-mono text-[10px] font-semibold text-tx-secondary sm:inline"
            >
              {{ t("platform.topbar.env") }}
            </span>
          </div>

          <div class="flex items-center gap-3">
            <ThemeToggle />
            <LazyVLocaleSwitch />
            <div
              class="flex items-center gap-2 rounded-full border border-border-subtle bg-bg-primary p-1 sm:pe-3"
            >
              <span
                class="flex h-6 w-6 items-center justify-center rounded-full bg-brand-dim text-[10px] font-bold text-brand"
                >AM</span
              >
              <div class="hidden leading-tight sm:block">
                <p class="text-[11px] font-semibold">
                  {{ t("platform.topbar.operatorName") }}
                </p>
                <p class="text-[9px] text-tx-muted">
                  {{ t("platform.topbar.operatorRole") }}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div class="p-4 md:p-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const abuse = usePlatformAbuseStore();

const isSidebarOpen = ref(false);
const mainRef = ref<HTMLElement | null>(null);
useScrollTopOnNavigate(mainRef);

watch(
  () => route.fullPath,
  () => {
    isSidebarOpen.value = false;
  },
);

interface NavItem {
  to: string;
  icon: string;
  label: string;
  exact?: boolean;
  badge?: number;
  section?: string;
}

const openCases = computed(
  () =>
    abuse.cases.filter((c) => c.status === "open" || c.status === "escalated")
      .length,
);

const navItems = computed<NavItem[]>(() => [
  {
    to: "/platform",
    icon: "ph:squares-four",
    label: t("platform.nav.overview"),
    exact: true,
  },
  {
    to: "/platform/merchants",
    icon: "ph:storefront",
    label: t("platform.nav.merchants"),
  },
  { to: "/platform/plans", icon: "ph:stack", label: t("platform.nav.plans") },
  {
    to: "/platform/feature-flags",
    icon: "ph:flag",
    label: t("platform.nav.flags"),
  },
  {
    to: "/platform/kyc",
    icon: "ph:identification-card",
    label: t("platform.nav.kyc"),
    section: t("platform.nav.sections.trust"),
  },
  {
    to: "/platform/abuse",
    icon: "ph:warning-octagon",
    label: t("platform.nav.abuse"),
    badge: openCases.value || undefined,
  },
  {
    to: "/platform/impersonation",
    icon: "ph:key",
    label: t("platform.nav.impersonation"),
  },
  {
    to: "/platform/health",
    icon: "ph:heartbeat",
    label: t("platform.nav.health"),
    section: t("platform.nav.sections.operations"),
  },
  {
    to: "/platform/incidents",
    icon: "ph:siren",
    label: t("platform.nav.incidents"),
  },
  {
    to: "/platform/announcements",
    icon: "ph:megaphone",
    label: t("platform.nav.announcements"),
  },
  {
    to: "/platform/config",
    icon: "ph:sliders-horizontal",
    label: t("platform.nav.config"),
  },
  {
    to: "/platform/support",
    icon: "ph:lifebuoy",
    label: t("platform.nav.support"),
    section: t("platform.nav.sections.team"),
  },
  {
    to: "/platform/staff",
    icon: "ph:users-three",
    label: t("platform.nav.staff"),
  },
  {
    to: "/platform/developer-sandbox",
    icon: "ph:flask",
    label: t("platform.nav.sandbox"),
    section: t("platform.nav.sections.developers"),
  },
]);

const isActive = (item: NavItem) => {
  const target = localePath(item.to);
  const current = route.path.replace(/\/$/, "");
  return item.exact
    ? current === target
    : current === target || current.startsWith(`${target}/`);
};
</script>
