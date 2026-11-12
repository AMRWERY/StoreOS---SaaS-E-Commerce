<template>
  <!-- Mobile Sidebar Backdrop -->
  <Transition name="fade">
    <div
      v-if="isOpen"
      @click="$emit('close')"
      class="overlay-backdrop z-40 lg:hidden"
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
      <img
        src="/gif/storeose-logo.gif"
        alt="storeose-logo"
        class="h-12 w-auto"
        width="117"
        height="40"
      />

      <LazyVButton
        @click="$emit('close')"
        variant="none"
        className="lg:hidden text-tx-secondary hover:text-tx-primary p-1"
      >
        <Icon name="ph:x-bold" class="text-xl" />
      </LazyVButton>
    </div>

    <store-switcher class="mb-4" />

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
          <LazyVButton
            @click="
              item.locked
                ? handleLockedClick(item.feature)
                : toggleExpand(item.name)
            "
            variant="none"
            className="w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-md transition-all font-medium text-[12px] group"
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
          </LazyVButton>

          <div
            v-if="!item.locked && expandedItems.includes(item.name)"
            class="ms-10 space-y-1 border-s border-border-subtle ps-2"
          >
            <template v-for="subItem in item.children" :key="subItem.name">
              <!-- Locked child: ask instead of navigate -->
              <LazyVButton
                v-if="subItem.feature && !hasFeature(subItem.feature)"
                type="button"
                @click="handleLockedClick(subItem.feature)"
                variant="none"
                className="w-full flex items-center gap-2 py-2 px-3 text-xs rounded-md transition-all text-tx-muted hover:bg-bg-elevated"
              >
                <span class="truncate flex-1 text-start opacity-50">{{
                  subItem.name
                }}</span>
                <Icon
                  name="lucide:lock"
                  class="w-3 h-3 text-tx-muted opacity-60 shrink-0"
                />
              </LazyVButton>

              <nuxt-link-locale
                v-else
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
            </template>
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
        class="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 hover:bg-accent/15 transition-all"
      >
        <Icon
          name="lucide:arrow-up-circle"
          class="w-3.5 h-3.5 text-accent shrink-0"
        />
        <div class="flex-1 min-w-0">
          <p class="text-[10px] font-black text-accent tracking-wider">
            {{ t("nav.upgrade") }}
          </p>
          <p
            v-if="isTrial && trialDaysLeft > 0"
            class="text-[9px] text-accent/60 font-medium"
          >
            {{ t("nav.trialDaysLeft", { n: trialDaysLeft }) }}
          </p>
        </div>
      </nuxt-link-locale>

      <LazyVButton
        variant="none"
        :to="hasFeature('profile') ? '/dashboard/user-profile' : undefined"
        @click="
          hasFeature('profile') ? undefined : handleLockedClick('profile')
        "
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
        <span class="truncate font-bold">{{
          t("auth.guest.exitPreview")
        }}</span>
      </LazyVButton>

      <LazyVButton
        v-else
        @click="handleLogout"
        variant="none"
        className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-danger/60 hover:text-danger transition-colors group"
      >
        <Icon name="ph:sign-out-bold" class="text-xl" />
        <span class="truncate font-bold">{{ t("nav.logout") }}</span>
      </LazyVButton>
    </div>
  </aside>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();

const {
  hasFeature,
  isGuest,
  isTrial,
  isPaid,
  trialDaysLeft,
  logout,
  exitGuestPreview,
} = useAuth();
const { openGate } = useAuthGate();

defineProps<{ isOpen: boolean }>();

defineEmits(["close"]);

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
  navigateTo(localePath("/auth"));
};

const handleExitPreview = () => {
  exitGuestPreview();
  navigateTo(localePath("/auth"));
};

const expandedItems = ref<string[]>([]);

onMounted(() => {
  // Only the group that contains the active route opens on mount.
  const activeGroup = navItems.value.find(
    (item) => item.active && item.children,
  );
  if (activeGroup && !expandedItems.value.includes(activeGroup.name)) {
    expandedItems.value.push(activeGroup.name);
  }
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
    name: t("nav.admin.store_builder"),
    icon: "ph:paint-brush-fill",
    active: route.path.includes("/dashboard/builder"),
    to: "/dashboard/builder",
    feature: "builder",
    locked: !hasFeature("builder"),
  },
  {
    name: t("nav.operations"),
    icon: "ph:briefcase-fill",
    active: [
      "/dashboard/collections",
      "/dashboard/products/variants",
      "/dashboard/orders/drafts",
      "/dashboard/orders/abandoned",
      "/dashboard/returns",
      "/dashboard/gift-cards",
      "/dashboard/cod",
      "/dashboard/customers/segments",
      "/dashboard/coupons/automatic",
      "/dashboard/products/import-export",
      "/dashboard/inventory/purchase-orders",
      "/dashboard/inventory/suppliers",
      "/dashboard/inventory/transfers",
      "/dashboard/navigation",
      "/dashboard/files",
      "/dashboard/translations",
      "/dashboard/activity",
      "/dashboard/automation",
      "/dashboard/support",
    ].some((p) => route.path.includes(p)),
    feature: "orders",
    locked: !hasFeature("orders"),
    children: [
      {
        name: t("nav.collections"),
        to: "/dashboard/collections",
        feature: "products",
      },
      {
        name: t("nav.productVariants"),
        to: "/dashboard/products/variants",
        feature: "products",
      },
      {
        name: t("nav.draftOrders"),
        to: "/dashboard/orders/drafts",
        feature: "orders",
      },
      {
        name: t("nav.abandonedCheckouts"),
        to: "/dashboard/orders/abandoned",
        feature: "orders",
      },
      {
        name: t("nav.returns"),
        to: "/dashboard/returns",
        feature: "orders",
      },
      {
        name: t("nav.codOperations"),
        to: "/dashboard/cod",
        feature: "orders",
      },
      {
        name: t("nav.giftCards"),
        to: "/dashboard/gift-cards",
        feature: "coupons",
      },
      {
        name: t("nav.customerSegments"),
        to: "/dashboard/customers/segments",
        feature: "customers",
      },
      {
        name: t("nav.autoDiscounts"),
        to: "/dashboard/coupons/automatic",
        feature: "coupons",
      },
      {
        name: t("nav.importExport"),
        to: "/dashboard/products/import-export",
        feature: "products",
      },
      {
        name: t("nav.purchaseOrders"),
        to: "/dashboard/inventory/purchase-orders",
        feature: "inventory",
      },
      {
        name: t("nav.suppliers"),
        to: "/dashboard/inventory/suppliers",
        feature: "inventory",
      },
      {
        name: t("nav.transfers"),
        to: "/dashboard/inventory/transfers",
        feature: "inventory",
      },
      {
        name: t("nav.navigation"),
        to: "/dashboard/navigation",
        feature: "settings",
      },
      {
        name: t("nav.files"),
        to: "/dashboard/files",
        feature: "products",
      },
      {
        name: t("nav.translations"),
        to: "/dashboard/translations",
        feature: "settings",
      },
      {
        name: t("nav.automation"),
        to: "/dashboard/automation",
        feature: "orders",
      },
      {
        name: t("nav.activityLog"),
        to: "/dashboard/activity",
        feature: "settings",
      },
      {
        name: t("nav.helpSupport"),
        to: "/dashboard/support",
        feature: "dashboard",
      },
    ],
  },
  {
    name: t("nav.fulfillmentGroup"),
    icon: "ph:truck-fill",
    active: [
      "/dashboard/orders/fulfillment",
      "/dashboard/orders/packing-slips",
      "/dashboard/orders/exchanges",
      "/dashboard/orders/tracking",
    ].some((p) => route.path.includes(p)),
    feature: "orders",
    locked: !hasFeature("orders"),
    children: [
      { name: t("nav.fulfillment"), to: "/dashboard/orders/fulfillment", feature: "orders" },
      { name: t("nav.packingSlips"), to: "/dashboard/orders/packing-slips", feature: "orders" },
      { name: t("nav.exchanges"), to: "/dashboard/orders/exchanges", feature: "orders" },
      { name: t("nav.shipmentTracking"), to: "/dashboard/orders/tracking", feature: "orders" },
    ],
  },
  {
    name: t("nav.marketingGroup"),
    icon: "ph:megaphone-fill",
    active: [
      "/dashboard/campaigns",
      "/dashboard/loyalty",
      "/dashboard/bundles",
      "/dashboard/affiliates",
      "/dashboard/reviews",
    ].some((p) => route.path.includes(p)),
    feature: "coupons",
    locked: !hasFeature("coupons"),
    children: [
      { name: t("nav.campaigns"), to: "/dashboard/campaigns", feature: "coupons" },
      { name: t("nav.loyalty"), to: "/dashboard/loyalty", feature: "coupons" },
      { name: t("nav.bundles"), to: "/dashboard/bundles", feature: "coupons" },
      { name: t("nav.affiliates"), to: "/dashboard/affiliates", feature: "coupons" },
      { name: t("nav.reviews"), to: "/dashboard/reviews", feature: "coupons" },
    ],
  },
  {
    name: t("nav.insightsGroup"),
    icon: "ph:chart-line-up-fill",
    active: [
      "/dashboard/analytics/",
      "/dashboard/channels",
      "/dashboard/inbox",
      "/dashboard/finance",
    ].some((p) => route.path.includes(p)),
    feature: "analytics",
    locked: !hasFeature("analytics"),
    children: [
      { name: t("nav.funnel"), to: "/dashboard/analytics/funnel", feature: "analytics" },
      { name: t("nav.cohorts"), to: "/dashboard/analytics/cohorts", feature: "analytics" },
      { name: t("nav.attribution"), to: "/dashboard/analytics/attribution", feature: "analytics" },
      { name: t("nav.analyticsReports"), to: "/dashboard/analytics/reports", feature: "analytics" },
      { name: t("nav.salesChannels"), to: "/dashboard/channels", feature: "settings" },
      { name: t("nav.inbox"), to: "/dashboard/inbox", feature: "customers" },
      { name: t("nav.payouts"), to: "/dashboard/finance/payouts", feature: "payments" },
    ],
  },
  {
    name: t("nav.ecosystemGroup"),
    icon: "ph:rocket-fill",
    active: [
      "/dashboard/themes",
      "/dashboard/blog",
      "/dashboard/redirects",
      "/dashboard/import",
      "/dashboard/apps",
      "/dashboard/webhooks",
      "/dashboard/b2b",
      "/dashboard/pos",
    ].some((p) => route.path.includes(p)),
    feature: "builder",
    locked: !hasFeature("builder"),
    children: [
      { name: t("nav.themes"), to: "/dashboard/themes", feature: "builder" },
      { name: t("nav.blog"), to: "/dashboard/blog", feature: "builder" },
      { name: t("nav.redirects"), to: "/dashboard/redirects", feature: "settings" },
      { name: t("nav.importer"), to: "/dashboard/import", feature: "settings" },
      { name: t("nav.b2b"), to: "/dashboard/b2b/companies", feature: "customers" },
      { name: t("nav.pos"), to: "/dashboard/pos", feature: "orders" },
      { name: t("nav.apps"), to: "/dashboard/apps", feature: "api" },
      { name: t("nav.webhookLog"), to: "/dashboard/webhooks/deliveries", feature: "api" },
    ],
  },
  {
    name: t("nav.catalogToolsGroup"),
    icon: "ph:squares-four-fill",
    active: [
      "/dashboard/products/metafields",
      "/dashboard/products/bulk-editor",
      "/dashboard/products/scheduling",
      "/dashboard/products/digital",
      "/dashboard/products/subscriptions",
      "/dashboard/products/seo-audit",
      "/dashboard/inventory/preorders",
      "/dashboard/inventory/waitlist",
      "/dashboard/customers/credit",
      "/dashboard/customers/duplicates",
      "/dashboard/customers/tags",
      "/dashboard/customers/import-export",
    ].some((p) => route.path.includes(p)),
    feature: "products",
    locked: !hasFeature("products"),
    children: [
      { name: t("nav.metafields"), to: "/dashboard/products/metafields", feature: "products" },
      { name: t("nav.bulkEditor"), to: "/dashboard/products/bulk-editor", feature: "products" },
      { name: t("nav.scheduling"), to: "/dashboard/products/scheduling", feature: "products" },
      { name: t("nav.digitalProducts"), to: "/dashboard/products/digital", feature: "products" },
      { name: t("nav.subscriptions"), to: "/dashboard/products/subscriptions", feature: "products" },
      { name: t("nav.seoAudit"), to: "/dashboard/products/seo-audit", feature: "products" },
      { name: t("nav.preorders"), to: "/dashboard/inventory/preorders", feature: "inventory" },
      { name: t("nav.waitlist"), to: "/dashboard/inventory/waitlist", feature: "inventory" },
      { name: t("nav.storeCredit"), to: "/dashboard/customers/credit", feature: "customers" },
      { name: t("nav.duplicates"), to: "/dashboard/customers/duplicates", feature: "customers" },
      { name: t("nav.customerTags"), to: "/dashboard/customers/tags", feature: "customers" },
      { name: t("nav.customerImportExport"), to: "/dashboard/customers/import-export", feature: "customers" },
    ],
  },
  {
    name: t("nav.checkoutGroup"),
    icon: "ph:shopping-bag-open-fill",
    active: [
      "/dashboard/settings/checkout-offers",
      "/dashboard/settings/express-checkout",
      "/dashboard/settings/checkout-fields",
      "/dashboard/settings/flash-sale",
      "/dashboard/payment-links",
    ].some((p) => route.path.includes(p)),
    feature: "payments",
    locked: !hasFeature("payments"),
    children: [
      { name: t("nav.checkoutOffers"), to: "/dashboard/settings/checkout-offers", feature: "settings" },
      { name: t("nav.paymentLinks"), to: "/dashboard/payment-links", feature: "payments" },
      { name: t("nav.expressCheckout"), to: "/dashboard/settings/express-checkout", feature: "payments" },
      { name: t("nav.checkoutFields"), to: "/dashboard/settings/checkout-fields", feature: "settings" },
      { name: t("nav.flashSale"), to: "/dashboard/settings/flash-sale", feature: "settings" },
    ],
  },
  {
    name: t("nav.trustGroup"),
    icon: "ph:shield-check-fill",
    active: [
      "/dashboard/settings/kyc",
      "/dashboard/settings/email-domain",
      "/dashboard/settings/bot-protection",
      "/dashboard/settings/privacy",
      "/dashboard/settings/legal",
      "/dashboard/settings/custom-code",
    ].some((p) => route.path.includes(p)),
    feature: "settings",
    locked: !hasFeature("settings"),
    children: [
      { name: t("nav.trustKyc"), to: "/dashboard/settings/kyc", feature: "settings" },
      { name: t("nav.trustEmailDomain"), to: "/dashboard/settings/email-domain", feature: "settings" },
      { name: t("nav.trustBotProtection"), to: "/dashboard/settings/bot-protection", feature: "settings" },
      { name: t("nav.trustPrivacy"), to: "/dashboard/settings/privacy", feature: "settings" },
      { name: t("nav.trustLegal"), to: "/dashboard/settings/legal", feature: "settings" },
      { name: t("nav.trustCustomCode"), to: "/dashboard/settings/custom-code", feature: "settings" },
    ],
  },
  {
    name: t("nav.launchChecklist"),
    icon: "ph:rocket-launch-fill",
    active: route.path.includes("/dashboard/launch-checklist"),
    to: "/dashboard/launch-checklist",
    feature: "dashboard",
    locked: !hasFeature("dashboard"),
  },
  {
    name: t("nav.settings"),
    icon: "ph:gear-six-fill",
    active: route.path.includes("/dashboard/settings"),
    feature: "settings",
    locked: !hasFeature("settings"),
    children: [
      {
        name: t("nav.storeInformation"),
        to: "/dashboard/settings/store-info",
        feature: undefined,
      },
      {
        name: t("nav.staffAndPermissions"),
        to: "/dashboard/settings/staff-and-permissions",
        feature: "staff",
      },
      {
        name: t("nav.paymentGateways"),
        to: "/dashboard/settings/payment-gateways",
        feature: "payments",
      },
      {
        name: t("nav.shippingLogistics"),
        to: "/dashboard/settings/shipping-logistics",
        feature: "shipping",
      },
      {
        name: t("nav.notificationCenter"),
        to: "/dashboard/settings/notification-center",
        feature: "notifications",
      },
      {
        name: t("nav.apiAndWebhooks"),
        to: "/dashboard/settings/api-and-webhooks",
        feature: "api",
      },
      {
        name: t("nav.policies"),
        to: "/dashboard/settings/policies",
        feature: "settings",
      },
      {
        name: t("nav.taxes"),
        to: "/dashboard/settings/taxes",
        feature: "settings",
      },
      {
        name: t("nav.domains"),
        to: "/dashboard/settings/domains",
        feature: "settings",
      },
      {
        name: t("nav.checkoutSettings"),
        to: "/dashboard/settings/checkout",
        feature: "settings",
      },
      {
        name: t("nav.securityCenter"),
        to: "/dashboard/settings/security",
        feature: "settings",
      },
      {
        name: t("nav.whatsappBusiness"),
        to: "/dashboard/settings/whatsapp",
        feature: "notifications",
      },
      {
        name: t("nav.organization"),
        to: "/dashboard/settings/organization",
        feature: "settings",
      },
      {
        name: t("nav.billingInvoices"),
        to: "/dashboard/settings/billing-invoices",
        feature: "settings",
      },
      {
        name: t("nav.markets"),
        to: "/dashboard/settings/markets",
        feature: "settings",
      },
      {
        name: t("nav.billingAndPlan"),
        to: "/dashboard/settings/billing-and-plan",
        feature: undefined,
      },
    ],
  },
]);
</script>
