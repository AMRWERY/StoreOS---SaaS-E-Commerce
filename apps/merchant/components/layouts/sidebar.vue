<template>
  <!-- Mobile Sidebar Backdrop -->
  <Transition name="fade">
    <div
      v-if="isOpen"
      @click="$emit('close')"
      class="fixed inset-0 bg-bg-overlay backdrop-blur-sm z-40 lg:hidden"
    />
  </Transition>

  <!-- Sidebar -->
  <aside
    class="fixed lg:sticky top-0 start-0 w-[220px] h-screen bg-bg-primary border-e border-border-subtle flex flex-col p-6 shrink-0 z-50 transition-all duration-300"
    :class="
      isOpen
        ? 'translate-x-0'
        : 'ltr:-translate-x-full rtl:translate-x-full ltr:lg:translate-x-0 rtl:lg:translate-x-0'
    "
  >
    <div class="flex items-center gap-2 mb-10">
      <div
        class="w-8 h-8 bg-brand rounded-lg flex items-center justify-center text-white"
      >
        <Icon name="ph:storefront-bold" class="text-xl" />
      </div>
      <div class="flex-1">
        <h1 class="font-bold text-lg leading-none text-tx-primary text-start">
          Store<span class="text-brand">OS</span>
        </h1>
        <p
          class="text-[9px] text-tx-muted tracking-[0.6px] font-semibold mt-1 text-start"
        >
          Global Merchant
        </p>
      </div>
      <LazyVButton
        @click="$emit('close')"
        variant="none"
        className="lg:hidden text-tx-secondary hover:text-tx-primary p-1"
      >
        <Icon name="ph:x-bold" class="text-xl" />
      </LazyVButton>
    </div>

    <nav class="flex-1 space-y-2 overflow-y-auto hide-scrollbar">
      <div v-for="item in navItems" :key="item.name">
        <!-- Regular nav item -->
        <LazyVButton
          v-if="!item.children"
          :to="item.locked ? undefined : item.to"
          variant="none"
          @click="item.locked ? handleLockedClick(item.feature) : undefined"
          className="w-full flex items-center justify-start gap-2 px-3 py-1.5 rounded-md transition-all font-medium text-[12px] group"
          :class="
            item.active
              ? 'bg-brand-dim text-brand'
              : item.locked
                ? 'text-tx-muted cursor-pointer hover:bg-bg-elevated'
                : 'text-tx-secondary hover:text-tx-primary hover:bg-bg-elevated'
          "
        >
          <Icon
            :name="item.icon"
            class="text-lg"
            :class="item.locked ? 'opacity-40' : ''"
          />
          <span
            class="truncate flex-1"
            :class="item.locked ? 'opacity-50' : ''"
            >{{ item.name }}</span
          >
          <Icon
            v-if="item.locked"
            name="lucide:lock"
            class="w-3 h-3 text-tx-muted opacity-60 shrink-0"
          />
        </LazyVButton>

        <!-- Nav item with children -->
        <div v-else class="space-y-1">
          <button
            @click="
              item.locked ? handleLockedClick(item.feature) : toggleExpand(item.name)
            "
            class="w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-md transition-all font-medium text-[12px] group"
            :class="
              item.active
                ? 'bg-brand-dim text-brand'
                : item.locked
                  ? 'text-tx-muted hover:bg-bg-elevated'
                  : expandedItems.includes(item.name)
                    ? 'text-brand'
                    : 'text-tx-secondary hover:text-tx-primary hover:bg-bg-elevated'
            "
          >
            <div class="flex items-center gap-2">
              <Icon
                :name="item.icon"
                class="text-lg"
                :class="item.locked ? 'opacity-40' : ''"
              />
              <span class="truncate" :class="item.locked ? 'opacity-50' : ''">{{
                item.name
              }}</span>
            </div>
            <Icon
              v-if="item.locked"
              name="lucide:lock"
              class="w-3 h-3 text-tx-muted opacity-60 shrink-0"
            />
            <Icon
              v-else
              name="ph:caret-down-bold"
              class="text-[10px] transition-transform duration-300"
              :class="expandedItems.includes(item.name) ? 'rotate-180' : ''"
            />
          </button>

          <div
            v-if="!item.locked && expandedItems.includes(item.name)"
            class="ms-10 space-y-1 border-s border-border-subtle ps-2"
          >
            <nuxt-link-locale
              v-for="subItem in item.children"
              :key="subItem.name"
              :to="subItem.to"
              class="block py-2 px-3 text-xs rounded-md transition-all"
              :class="
                route.path.includes(subItem.to)
                  ? 'text-brand bg-brand-dim font-semibold'
                  : 'text-tx-muted hover:text-tx-secondary hover:bg-bg-elevated'
              "
            >
              {{ subItem.name }}
            </nuxt-link-locale>
          </div>
        </div>
      </div>
    </nav>

    <div class="mt-auto pt-6 space-y-2 border-t border-border-subtle">
      <!-- Preview nudge: sign up to keep the store you build -->
      <nuxt-link-locale
        v-if="isGuest"
        to="/auth/register"
        class="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-dim border border-brand/20 hover:bg-brand/15 transition-all"
      >
        <Icon name="lucide:sparkles" class="w-3.5 h-3.5 text-brand shrink-0" />
        <div class="flex-1 min-w-0">
          <p class="text-[10px] font-black text-brand tracking-wider">
            {{ t("auth.guest.createAccount") }}
          </p>
          <p class="text-[9px] text-brand/60 font-medium">
            {{ t("auth.guest.sidebarHint") }}
          </p>
        </div>
      </nuxt-link-locale>

      <!-- Upgrade nudge for non-paid users -->
      <nuxt-link-locale
        v-else-if="!isPaid"
        to="/dashboard/settings/billing-and-plan"
        class="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/15 transition-all"
      >
        <Icon
          name="lucide:arrow-up-circle"
          class="w-3.5 h-3.5 text-orange-400 shrink-0"
        />
        <div class="flex-1 min-w-0">
          <p class="text-[10px] font-black text-orange-400 tracking-wider">
            {{ t("nav.upgrade") }}
          </p>
          <p
            v-if="isTrial && trialDaysLeft > 0"
            class="text-[9px] text-orange-400/60 font-medium"
          >
            {{ trialDaysLeft }}d left in trial
          </p>
        </div>
      </nuxt-link-locale>

      <LazyVButton
        variant="none"
        :to="hasFeature('profile') ? '/dashboard/user-profile' : undefined"
        @click="hasFeature('profile') ? undefined : handleLockedClick('profile')"
        className="w-full flex items-center gap-2 px-3 py-1.5 transition-all group rounded-md text-[12px] font-medium"
        :class="
          route.path.includes('/dashboard/user-profile')
            ? 'bg-brand-dim text-brand'
            : hasFeature('profile')
              ? 'text-tx-secondary hover:text-tx-primary'
              : 'text-tx-muted hover:bg-bg-elevated'
        "
      >
        <Icon
          name="ph:user-circle"
          class="text-xl"
          :class="hasFeature('profile') ? '' : 'opacity-40'"
        />
        <span
          class="truncate flex-1 text-start"
          :class="hasFeature('profile') ? '' : 'opacity-50'"
          >{{ t("nav.userProfile") }}</span
        >
        <Icon
          v-if="!hasFeature('profile')"
          name="lucide:lock"
          class="w-3 h-3 text-tx-muted opacity-60 shrink-0"
        />
      </LazyVButton>

      <LazyVButton
        @click="handleExitPreview"
        v-if="isGuest"
        variant="none"
        className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-tx-secondary hover:text-tx-primary transition-colors group"
      >
        <Icon name="lucide:log-out" class="text-xl" />
        <span class="truncate font-bold">{{ t("auth.guest.exitPreview") }}</span>
      </LazyVButton>

      <LazyVButton
        v-else
        @click="handleLogout"
        variant="none"
        className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-red-500/60 hover:text-red-500 transition-colors group"
      >
        <Icon name="ph:sign-out-bold" class="text-xl" />
        <span class="truncate font-bold">{{ t("nav.logout") }}</span>
      </LazyVButton>
    </div>
  </aside>
</template>

<script lang="ts" setup>
defineProps<{ isOpen: boolean }>();
defineEmits(["close"]);

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();
const { hasFeature, isGuest, isTrial, isPaid, trialDaysLeft, logout, exitGuestPreview } =
  useAuth();
const { openGate } = useAuthGate();

/**
 * Preview visitors need an account, paying visitors need a bigger plan —
 * same lock icon, two different asks.
 */
const handleLockedClick = (feature?: string) => {
  if (isGuest.value) {
    openGate(feature);
    return;
  }
  navigateTo(localePath("/dashboard/settings/billing-and-plan"));
};

const handleLogout = () => {
  logout();
  navigateTo(localePath("/auth/login"));
};

const handleExitPreview = () => {
  exitGuestPreview();
  navigateTo(localePath("/auth/login"));
};

const expandedItems = ref<string[]>([]);

onMounted(() => {
  navItems.value.forEach((item) => {
    if (
      item.active &&
      item.children &&
      !expandedItems.value.includes(item.name)
    ) {
      expandedItems.value.push(item.name);
    }
  });
});

const toggleExpand = (name: string) => {
  expandedItems.value = expandedItems.value.includes(name)
    ? expandedItems.value.filter((i) => i !== name)
    : [...expandedItems.value, name];
};

const navItems = computed(() => [
  {
    name: t("nav.dashboard"),
    icon: "ph:grid-four-fill",
    active: route.path.endsWith("/dashboard"),
    to: "/dashboard",
    feature: "dashboard",
    locked: !hasFeature("dashboard"),
  },
  {
    name: t("nav.orders"),
    icon: "ph:shopping-cart-fill",
    active: route.path.includes("/dashboard/orders"),
    to: "/dashboard/orders",
    feature: "orders",
    locked: !hasFeature("orders"),
  },
  {
    name: t("nav.products"),
    icon: "ph:package-fill",
    active: route.path.includes("/dashboard/products"),
    to: "/dashboard/products",
    feature: "products",
    locked: !hasFeature("products"),
  },
  {
    name: t("nav.inventory"),
    icon: "ph:stack-fill",
    active: route.path.includes("/dashboard/inventory"),
    to: "/dashboard/inventory",
    feature: "inventory",
    locked: !hasFeature("inventory"),
  },
  {
    name: t("nav.customers"),
    icon: "ph:users-fill",
    active: route.path.includes("/dashboard/customers"),
    to: "/dashboard/customers",
    feature: "customers",
    locked: !hasFeature("customers"),
  },
  {
    name: t("nav.analytics"),
    icon: "ph:chart-bar-fill",
    active: route.path.includes("/dashboard/analytics"),
    to: "/dashboard/analytics",
    feature: "analytics",
    locked: !hasFeature("analytics"),
  },
  {
    name: t("nav.coupons"),
    icon: "ph:ticket-fill",
    active: route.path.includes("/dashboard/coupons"),
    to: "/dashboard/coupons",
    feature: "coupons",
    locked: !hasFeature("coupons"),
  },
  {
    name: t("nav.admin.storeBuilder"),
    icon: "ph:paint-brush-fill",
    active: route.path.includes("/dashboard/builder"),
    to: "/dashboard/builder",
    feature: "builder",
    locked: !hasFeature("builder"),
  },
  {
    name: t("nav.settings"),
    icon: "ph:gear-six-fill",
    active: route.path.includes("/dashboard/settings"),
    feature: "settings",
    locked: !hasFeature("settings"),
    children: [
      { name: t("nav.storeInformation"), to: "/dashboard/settings/store-info" },
      {
        name: t("nav.staffAndPermissions"),
        to: "/dashboard/settings/staff-and-permissions",
      },
      {
        name: t("nav.paymentGateways"),
        to: "/dashboard/settings/payment-gateways",
      },
      {
        name: t("nav.shippingLogistics"),
        to: "/dashboard/settings/shipping-logistics",
      },
      {
        name: t("nav.notificationCenter"),
        to: "/dashboard/settings/notification-center",
      },
      {
        name: t("nav.billingAndPlan"),
        to: "/dashboard/settings/billing-and-plan",
      },
    ],
  },
]);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
