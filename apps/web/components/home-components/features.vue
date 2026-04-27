<template>
  <section
    id="features"
    class="py-32 px-6 border-t border-border-subtle overflow-hidden"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="mb-20 max-w-2xl">
        <p class="text-[10px] font-black tracking-[0.3em] text-brand mb-4">
          {{ t("home.features.sectionLabel") }}
        </p>
        <h2 class="text-4xl md:text-5xl font-bold leading-tight mb-6">
          {{ t("home.features.title") }}<br />
          <span class="text-tx-secondary">{{
            t("home.features.titleSecondary")
          }}</span>
        </h2>
        <p class="text-tx-secondary leading-relaxed">
          {{ t("home.features.subtitle") }}
        </p>
      </div>

      <!-- Interactive Feature Explorer -->
      <div class="grid lg:grid-cols-12 gap-6 items-start">
        <!-- Left: Feature Tabs -->
        <div class="lg:col-span-4 space-y-2">
          <button
            v-for="f in features"
            :key="f.id"
            @click="activeTab = f.id"
            :class="[
              'w-full text-start p-5 rounded-2xl transition-all duration-200 border group',
              activeTab === f.id
                ? 'bg-bg-primary border-brand/30 shadow-lg shadow-brand/5'
                : 'bg-transparent border-transparent hover:bg-bg-elevated hover:border-border-subtle',
            ]"
          >
            <div class="flex items-start gap-4">
              <div
                :class="[
                  'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all',
                  activeTab === f.id ? f.bg : 'bg-bg-elevated',
                ]"
              >
                <Icon
                  :name="f.icon"
                  :class="[
                    'text-xl',
                    activeTab === f.id ? f.color : 'text-tx-muted',
                  ]"
                />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <h3
                    :class="[
                      'font-bold text-sm transition-colors',
                      activeTab === f.id
                        ? 'text-tx-primary'
                        : 'text-tx-secondary group-hover:text-tx-primary',
                    ]"
                  >
                    {{ f.title }}
                  </h3>
                  <Icon
                    name="ph:arrow-right-bold"
                    :class="[
                      'text-xs transition-all',
                      activeTab === f.id
                        ? 'text-brand opacity-100'
                        : 'opacity-0 group-hover:opacity-50',
                    ]"
                  />
                </div>
                <p class="text-xs text-tx-muted mt-1 leading-relaxed">
                  {{ f.desc }}
                </p>
              </div>
            </div>
          </button>
        </div>

        <!-- Right: Feature Preview -->
        <div class="lg:col-span-8 relative">
          <div
            class="relative rounded-2xl border border-border-subtle bg-bg-base overflow-hidden shadow-2xl shadow-black/40"
          >
            <!-- Window chrome -->
            <div
              class="h-11 border-b border-border-subtle bg-bg-elevated flex items-center justify-between px-5"
            >
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-red-500/40"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                <div class="w-3 h-3 rounded-full bg-green-500/40"></div>
              </div>
              <div
                class="flex items-center gap-2 bg-bg-base/60 border border-border-subtle rounded-lg px-3 py-1"
              >
                <div class="w-2 h-2 rounded-full bg-brand/60"></div>
                <span class="text-[10px] text-tx-muted font-medium"
                  >storeos.app/dashboard</span
                >
              </div>
              <div class="w-16"></div>
            </div>

            <!-- Preview Content -->
            <div class="h-[440px] relative overflow-hidden">
              <Transition name="feature-fade" mode="out-in">
                <component :is="activePreview" :key="activeTab" />
              </Transition>
            </div>
          </div>

          <!-- Ambient Glow -->
          <div
            :class="[
              'absolute -inset-8 -z-10 blur-3xl opacity-10 rounded-full transition-all duration-500',
              activeFeature?.glowColor,
            ]"
          ></div>
        </div>
      </div>

      <!-- Stats Strip -->
      <div
        class="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border-subtle pt-16"
      >
        <div
          v-for="stat in platformStats"
          :key="stat.label"
          class="text-center group"
        >
          <div
            class="text-3xl md:text-4xl font-bold text-brand mb-2 group-hover:scale-105 transition-transform inline-block"
          >
            {{ stat.value }}
          </div>
          <p class="text-xs text-tx-muted font-semibold tracking-widest">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const activeTab = ref("orders");

const features = computed(() => [
  {
    id: "orders",
    title: t("home.features.orders.title"),
    desc: t("home.features.orders.desc"),
    icon: "ph:shopping-cart-fill",
    bg: "bg-brand-dim",
    color: "text-brand",
    glowColor: "bg-brand",
  },
  {
    id: "inventory",
    title: t("home.features.inventory.title"),
    desc: t("home.features.inventory.desc"),
    icon: "ph:stack-fill",
    bg: "bg-warning-dim",
    color: "text-warning",
    glowColor: "bg-yellow-500",
  },
  {
    id: "analytics",
    title: t("home.features.analytics.title"),
    desc: t("home.features.analytics.desc"),
    icon: "ph:chart-line-up-fill",
    bg: "bg-success-dim",
    color: "text-success",
    glowColor: "bg-emerald-500",
  },
  {
    id: "customers",
    title: t("home.features.customers.title"),
    desc: t("home.features.customers.desc"),
    icon: "ph:users-three-fill",
    bg: "bg-info-dim",
    color: "text-info",
    glowColor: "bg-sky-500",
  },
  {
    id: "settings",
    title: t("home.features.settings.title"),
    desc: t("home.features.settings.desc"),
    icon: "ph:gear-six-fill",
    bg: "bg-bg-elevated",
    color: "text-tx-secondary",
    glowColor: "bg-white",
  },
]);

const activeFeature = computed(() =>
  features.value.find((f) => f.id === activeTab.value)
);

const platformStats = computed(() => [
  { value: "500+", label: t("home.features.statsLive") },
  { value: "2.4M+", label: t("home.features.statsOrders") },
  { value: "99.9%", label: t("home.features.statsUptime") },
  { value: "<80ms", label: t("home.features.statsResponse") },
]);

// --- Preview Components ---
const OrdersPreview = defineComponent({
  setup() {
    const orders = [
      {
        id: "#SO-9825",
        customer: "Ethan Laurent",
        total: "$1,250",
        status: "NEW",
        bg: "bg-brand-dim",
        color: "text-brand",
      },
      {
        id: "#SO-9824",
        customer: "Marcus Kane",
        total: "$429",
        status: "SHIPPED",
        bg: "bg-status-purple-dim",
        color: "text-status-purple",
      },
      {
        id: "#SO-9823",
        customer: "Sarah Chen",
        total: "$2,190",
        status: "CONFIRMED",
        bg: "bg-info-dim",
        color: "text-info",
      },
      {
        id: "#SO-9822",
        customer: "Jordan Hayes",
        total: "$812",
        status: "DELIVERED",
        bg: "bg-success-dim",
        color: "text-success",
      },
      {
        id: "#SO-9821",
        customer: "Elena Rodriguez",
        total: "$340",
        status: "CANCELLED",
        bg: "bg-danger-dim",
        color: "text-danger",
      },
    ];
    return () =>
      h("div", { class: "flex h-full" }, [
        h(
          "div",
          {
            class:
              "w-48 border-e border-border-subtle bg-bg-base p-4 flex flex-col gap-1 shrink-0",
          },
          [
            h(
              "div",
              {
                class:
                  "text-[9px] font-black tracking-[0.2em] text-tx-muted mb-3 px-2",
              },
              "NAVIGATION"
            ),
            ...[
              "Dashboard",
              "Orders",
              "Products",
              "Inventory",
              "Customers",
            ].map((item, i) =>
              h(
                "div",
                {
                  class: `flex items-center gap-3 px-3 py-2 rounded-lg ${
                    i === 1 ? "bg-brand-dim text-brand" : "text-tx-muted"
                  }`,
                },
                [
                  h("div", {
                    class: "w-1.5 h-1.5 rounded-full bg-current opacity-60",
                  }),
                  h("span", { class: "text-xs font-semibold" }, item),
                ]
              )
            ),
          ]
        ),
        h("div", { class: "flex-1 p-5 overflow-hidden" }, [
          h("div", { class: "flex items-center justify-between mb-4" }, [
            h("h3", { class: "text-sm font-bold" }, "Orders"),
            h("div", { class: "flex gap-2" }, [
              h(
                "div",
                {
                  class:
                    "px-3 py-1 bg-bg-elevated rounded-lg text-[10px] font-bold text-tx-muted",
                },
                "Filter"
              ),
              h(
                "div",
                {
                  class:
                    "px-3 py-1 bg-brand rounded-lg text-[10px] font-bold text-white",
                },
                "+ New Order"
              ),
            ]),
          ]),
          h(
            "div",
            { class: "space-y-2" },
            orders.map((o) =>
              h(
                "div",
                {
                  class:
                    "flex items-center justify-between p-3 rounded-xl bg-bg-primary border border-border-subtle hover:border-border-default transition-all",
                },
                [
                  h(
                    "span",
                    { class: "text-xs font-bold text-tx-secondary w-20" },
                    o.id
                  ),
                  h(
                    "span",
                    { class: "text-xs font-semibold flex-1" },
                    o.customer
                  ),
                  h(
                    "span",
                    { class: "text-xs font-bold w-16 text-end" },
                    o.total
                  ),
                  h(
                    "span",
                    {
                      class: `text-[9px] font-black px-2 py-0.5 rounded-md tracking-widest ${o.bg} ${o.color}`,
                    },
                    o.status
                  ),
                ]
              )
            )
          ),
        ]),
      ]);
  },
});

const InventoryPreview = defineComponent({
  setup() {
    const items = [
      {
        name: "Pro-X Headset",
        sku: "PX-7702",
        current: 0,
        threshold: 10,
        status: "OUT",
        color: "text-danger bg-danger-dim",
      },
      {
        name: "Mechanical Deck V3",
        sku: "MD-V3",
        current: 3,
        threshold: 15,
        status: "LOW",
        color: "text-warning bg-warning-dim",
      },
      {
        name: "Flow Ergo Mouse",
        sku: "FE-MSE",
        current: 82,
        threshold: 20,
        status: "OK",
        color: "text-success bg-success-dim",
      },
      {
        name: "Horizon Display",
        sku: "HZ-SD",
        current: 4,
        threshold: 5,
        status: "LOW",
        color: "text-warning bg-warning-dim",
      },
    ];
    return () =>
      h("div", { class: "p-5 h-full" }, [
        h("div", { class: "flex items-center justify-between mb-5" }, [
          h("h3", { class: "text-sm font-bold" }, "Inventory"),
          h(
            "div",
            {
              class:
                "flex items-center gap-2 text-xs text-warning bg-warning-dim px-3 py-1.5 rounded-lg font-bold",
            },
            [
              h("div", {
                class: "w-1.5 h-1.5 bg-warning rounded-full animate-pulse",
              }),
              "3 Low Stock Alerts",
            ]
          ),
        ]),
        h(
          "div",
          { class: "grid grid-cols-3 gap-3 mb-5" },
          [
            { label: "Total SKUs", val: "1,240", color: "text-tx-primary" },
            { label: "Out of Stock", val: "3", color: "text-danger" },
            { label: "Low Stock", val: "8", color: "text-warning" },
          ].map((s) =>
            h(
              "div",
              {
                class:
                  "bg-bg-primary border border-border-subtle rounded-xl p-3 text-center",
              },
              [
                h("div", { class: `text-lg font-bold ${s.color}` }, s.val),
                h(
                  "div",
                  {
                    class:
                      "text-[9px] text-tx-muted font-semibold tracking-widest mt-0.5",
                  },
                  s.label
                ),
              ]
            )
          )
        ),
        h(
          "div",
          { class: "space-y-2" },
          items.map((item) =>
            h(
              "div",
              {
                class:
                  "flex items-center gap-3 p-3 rounded-xl bg-bg-primary border border-border-subtle",
              },
              [
                h("div", {
                  class:
                    "w-8 h-8 rounded-lg bg-bg-elevated border border-border-subtle shrink-0",
                }),
                h("div", { class: "flex-1 min-w-0" }, [
                  h("div", { class: "text-xs font-bold truncate" }, item.name),
                  h("div", { class: "text-[10px] text-tx-muted" }, item.sku),
                ]),
                h(
                  "div",
                  { class: "text-xs font-bold w-8 text-center" },
                  item.current
                ),
                h(
                  "span",
                  {
                    class: `text-[9px] font-black px-2 py-0.5 rounded tracking-widest ${item.color}`,
                  },
                  item.status
                ),
              ]
            )
          )
        ),
      ]);
  },
});

const AnalyticsPreview = defineComponent({
  setup() {
    const bars = [40, 65, 45, 80, 55, 95, 70, 85, 60, 90, 75, 100];
    return () =>
      h("div", { class: "p-5 h-full" }, [
        h(
          "div",
          { class: "grid grid-cols-3 gap-3 mb-5" },
          [
            { label: "REVENUE", val: "$42,340", trend: "+12.5%", up: true },
            { label: "ORDERS", val: "1,240", trend: "+8.2%", up: true },
            { label: "AVG ORDER", val: "$33.20", trend: "-2.1%", up: false },
          ].map((k) =>
            h(
              "div",
              {
                class:
                  "bg-bg-primary border border-border-subtle rounded-xl p-3",
              },
              [
                h(
                  "div",
                  {
                    class:
                      "text-[9px] font-black text-tx-muted tracking-widest mb-1",
                  },
                  k.label
                ),
                h("div", { class: "text-sm font-bold" }, k.val),
                h(
                  "div",
                  {
                    class: `text-[10px] font-bold ${
                      k.up ? "text-success" : "text-danger"
                    }`,
                  },
                  k.trend
                ),
              ]
            )
          )
        ),
        h(
          "div",
          { class: "bg-bg-primary border border-border-subtle rounded-xl p-4" },
          [
            h("div", { class: "flex items-center justify-between mb-4" }, [
              h(
                "span",
                { class: "text-xs font-bold" },
                "Revenue — Last 12 months"
              ),
              h("span", { class: "text-[10px] text-brand font-bold" }, "2026"),
            ]),
            h(
              "div",
              { class: "flex items-end gap-1.5 h-24" },
              bars.map((h_val, i) =>
                h("div", {
                  class: `flex-1 rounded-t-md transition-all ${
                    i === bars.length - 1
                      ? "bg-brand shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                      : "bg-brand/20 hover:bg-brand/40"
                  }`,
                  style: { height: `${h_val}%` },
                })
              )
            ),
            h(
              "div",
              { class: "flex justify-between mt-2" },
              ["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((m) =>
                h(
                  "span",
                  { class: "text-[9px] text-tx-muted font-semibold" },
                  m
                )
              )
            ),
          ]
        ),
      ]);
  },
});

const CustomersPreview = defineComponent({
  setup() {
    const customers = [
      {
        initials: "AR",
        bg: "bg-orange-500/20 text-orange-400",
        name: "Alex Rivera",
        orders: 42,
        spent: "$14,208",
        tag: "VIP",
      },
      {
        initials: "JH",
        bg: "bg-gray-500/20 text-tx-secondary",
        name: "Jordan Hayes",
        orders: 124,
        spent: "$32,110",
        tag: "WHOLESALE",
      },
      {
        initials: "SM",
        bg: "bg-indigo-500/20 text-indigo-400",
        name: "Sarah Miller",
        orders: 18,
        spent: "$5,432",
        tag: "REGULAR",
      },
    ];
    return () =>
      h("div", { class: "p-5 h-full" }, [
        h("div", { class: "flex items-center justify-between mb-5" }, [
          h("h3", { class: "text-sm font-bold" }, "Customers"),
          h(
            "div",
            { class: "text-[10px] text-tx-muted font-semibold" },
            "1,240 Total"
          ),
        ]),
        h(
          "div",
          { class: "grid grid-cols-3 gap-3 mb-5" },
          [
            { label: "AVG LTV", val: "$1,240", color: "text-brand" },
            { label: "CHURN RISK", val: "4.2%", color: "text-warning" },
            { label: "ACTIVE NOW", val: "84", color: "text-success" },
          ].map((s) =>
            h(
              "div",
              {
                class:
                  "bg-bg-primary border border-border-subtle rounded-xl p-3 text-center",
              },
              [
                h("div", { class: `text-base font-bold ${s.color}` }, s.val),
                h(
                  "div",
                  {
                    class:
                      "text-[9px] text-tx-muted font-semibold tracking-widest mt-0.5",
                  },
                  s.label
                ),
              ]
            )
          )
        ),
        h(
          "div",
          { class: "space-y-2" },
          customers.map((c) =>
            h(
              "div",
              {
                class:
                  "flex items-center gap-4 p-3 rounded-xl bg-bg-primary border border-border-subtle hover:border-border-default transition-all",
              },
              [
                h(
                  "div",
                  {
                    class: `w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${c.bg}`,
                  },
                  c.initials
                ),
                h("div", { class: "flex-1 min-w-0" }, [
                  h("div", { class: "text-xs font-bold" }, c.name),
                  h(
                    "div",
                    { class: "text-[10px] text-tx-muted" },
                    `${c.orders} orders · ${c.spent}`
                  ),
                ]),
                h(
                  "span",
                  {
                    class:
                      "text-[9px] font-black px-2 py-0.5 rounded bg-brand-dim text-brand tracking-widest",
                  },
                  c.tag
                ),
              ]
            )
          )
        ),
      ]);
  },
});

const SettingsPreview = defineComponent({
  setup() {
    const sections = [
      {
        icon: "ph:credit-card-fill",
        title: "Payment Gateways",
        sub: "Stripe, Paymob, Vodafone Cash",
        status: "3 Active",
      },
      {
        icon: "ph:truck-fill",
        title: "Shipping Zones",
        sub: "Cairo, Alex, Upper Egypt",
        status: "5 Zones",
      },
      {
        icon: "ph:users-fill",
        title: "Staff & Permissions",
        sub: "4 team members active",
        status: "All Roles Set",
      },
      {
        icon: "ph:bell-fill",
        title: "Notification Center",
        sub: "Email · SMS · Push",
        status: "Configured",
      },
    ];
    return () =>
      h("div", { class: "p-5 h-full" }, [
        h("div", { class: "mb-5" }, [
          h("h3", { class: "text-sm font-bold mb-1" }, "Store Settings"),
          h(
            "p",
            { class: "text-[11px] text-tx-muted" },
            "Everything in one place, always in sync."
          ),
        ]),
        h(
          "div",
          { class: "space-y-3" },
          sections.map((s) =>
            h(
              "div",
              {
                class:
                  "flex items-center gap-4 p-4 rounded-xl bg-bg-primary border border-border-subtle hover:border-border-default transition-all group",
              },
              [
                h(
                  "div",
                  {
                    class:
                      "w-9 h-9 rounded-xl bg-brand-dim flex items-center justify-center shrink-0",
                  },
                  [h("Icon", { name: s.icon, class: "text-brand text-lg" })]
                ),
                h("div", { class: "flex-1 min-w-0" }, [
                  h("div", { class: "text-xs font-bold" }, s.title),
                  h("div", { class: "text-[10px] text-tx-muted" }, s.sub),
                ]),
                h(
                  "span",
                  {
                    class: "text-[9px] font-black text-success tracking-widest",
                  },
                  s.status
                ),
              ]
            )
          )
        ),
      ]);
  },
});

const previews: Record<string, ReturnType<typeof defineComponent>> = {
  orders: OrdersPreview,
  inventory: InventoryPreview,
  analytics: AnalyticsPreview,
  customers: CustomersPreview,
  settings: SettingsPreview,
};

const activePreview = computed(() => previews[activeTab.value]);
</script>

<style scoped>
.feature-fade-enter-active,
.feature-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.feature-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.feature-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
