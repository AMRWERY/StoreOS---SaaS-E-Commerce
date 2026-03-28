<template>
  <!-- Mobile Sidebar Backdrop -->
  <Transition name="fade">
    <div v-if="isOpen" @click="$emit('close')" class="fixed inset-0 bg-bg-overlay backdrop-blur-sm z-40 lg:hidden"></div>
  </Transition>

  <!-- Sidebar -->
  <aside
    class="fixed lg:sticky top-0 start-0 w-[220px] h-screen bg-bg-primary border-e border-border-subtle flex flex-col p-6 shrink-0 z-50 transition-all duration-300"
    :class="isOpen
      ? 'translate-x-0'
      : 'ltr:-translate-x-full rtl:translate-x-full ltr:lg:translate-x-0 rtl:lg:translate-x-0'
      ">
    <div class="flex items-center gap-2 mb-10">
      <div class="w-8 h-8 bg-brand rounded-lg flex items-center justify-center text-white">
        <Icon name="ph:storefront-bold" class="text-xl" />
      </div>
      <div class="flex-1">
        <h1 class="font-bold text-lg leading-none text-tx-primary text-start">
          Store<span class="text-brand">OS</span>
        </h1>
        <p class="text-[9px] text-tx-muted tracking-[0.6px] font-semibold mt-1 text-start">
          Global Merchant
        </p>
      </div>
      <!-- Mobile Close Button -->
      <VButton @click="$emit('close')" variant="none" className="lg:hidden text-tx-secondary hover:text-tx-primary p-1">
        <Icon name="ph:x-bold" class="text-xl" />
      </VButton>
    </div>

    <nav class="flex-1 space-y-2 overflow-y-auto hide-scrollbar">
      <div v-for="item in navItems" :key="item.name">
        <!-- Main Nav Item -->
        <VButton v-if="!item.children" :to="item.to" variant="none"
          className="w-full flex items-center justify-start gap-2 px-3 py-1.5 rounded-md transition-all font-medium text-[12px] group"
          :class="item.active
            ? 'bg-brand-dim text-brand'
            : 'text-tx-secondary hover:text-tx-primary hover:bg-bg-elevated'
            ">
          <Icon :name="item.icon" class="text-lg" />
          <span class="truncate">{{ item.name }}</span>
        </VButton>

        <!-- Nav Item with Children -->
        <div v-else class="space-y-1">
          <button @click="toggleExpand(item.name)"
            class="w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-md transition-all font-medium text-[12px] group"
            :class="item.active
              ? 'bg-brand-dim text-brand'
              : expandedItems.includes(item.name)
                ? 'text-brand'
                : 'text-tx-secondary hover:text-tx-primary hover:bg-bg-elevated'
              ">
            <div class="flex items-center gap-2">
              <Icon :name="item.icon" class="text-lg" />
              <span class="truncate">{{ item.name }}</span>
            </div>
            <Icon name="ph:caret-down-bold" class="text-[10px] transition-transform duration-300"
              :class="expandedItems.includes(item.name) ? 'rotate-180' : ''" />
          </button>

          <!-- Sub Nav Items -->
          <div v-if="expandedItems.includes(item.name)" class="ms-10 space-y-1 border-s border-border-subtle ps-2">
            <nuxt-link-locale v-for="subItem in item.children" :key="subItem.name" :to="subItem.to"
              class="block py-2 px-3 text-xs rounded-md transition-all" :class="route.path.includes(subItem.to)
                ? 'text-brand bg-brand-dim font-semibold'
                : 'text-tx-muted hover:text-tx-secondary hover:bg-bg-elevated'
                ">
              {{ subItem.name }}
            </nuxt-link-locale>
          </div>
        </div>
      </div>
    </nav>

    <div class="mt-auto pt-6 space-y-2 border-t border-border-subtle">
      <VButton variant="none"
        className="text-[10px] font-semibold text-brand tracking-[0.6px] px-3 hover:underline block text-start">
        Upgrade
      </VButton>
      <VButton variant="none" to="/dashboard/user-profile"
        className="w-full flex items-center gap-2 px-3 py-1.5 transition-all group rounded-md text-[12px] font-medium" :class="route.path.includes('/dashboard/user-profile')
          ? 'bg-brand-dim text-brand'
          : 'text-tx-secondary hover:text-tx-primary'
          ">
        <Icon name="ph:user-circle" class="text-xl" />
        <span class="truncate">User Profile</span>
      </VButton>
      <!-- Logout Button -->
      <VButton to="/auth/login" variant="none"
        className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-red-500/60 hover:text-red-500 transition-colors group">
        <Icon name="ph:sign-out-bold" class="text-xl" />
        <span class="truncate font-bold">Logout</span>
      </VButton>
    </div>
  </aside>
</template>

<script lang="ts" setup>
defineProps<{
  isOpen: boolean;
}>();

defineEmits(["close"]);

const route = useRoute();

const expandedItems = ref<string[]>([]);

onMounted(() => {
  navItems.value.forEach((item) => {
    if (item.active && item.children && !expandedItems.value.includes(item.name)) {
      expandedItems.value.push(item.name)
    }
  })
});

const toggleExpand = (name: string) => {
  if (expandedItems.value.includes(name)) {
    expandedItems.value = expandedItems.value.filter((i) => i !== name);
  } else {
    expandedItems.value.push(name);
  }
};

const navItems = computed(() => [
  {
    name: "Dashboard",
    icon: "ph:grid-four-fill",
    active: route.path.endsWith("/dashboard"),
    to: "/dashboard",
  },
  {
    name: "Orders",
    icon: "ph:shopping-cart-fill",
    active: route.path.includes("/dashboard/orders"),
    to: "/dashboard/orders",
  },
  {
    name: "Products",
    icon: "ph:package-fill",
    active: route.path.includes("/dashboard/products"),
    to: "/dashboard/products",
  },
  {
    name: "Inventory",
    icon: "ph:stack-fill",
    active: route.path.includes("/dashboard/inventory"),
    to: "/dashboard/inventory",
  },
  {
    name: "Customers",
    icon: "ph:users-fill",
    active: route.path.includes("/dashboard/customers"),
    to: "/dashboard/customers",
  },
  {
    name: "Analytics",
    icon: "ph:chart-bar-fill",
    active: route.path.includes("/dashboard/analytics"),
    to: "/dashboard/analytics",
  },
  {
    name: "Coupons",
    icon: "ph:ticket-fill",
    active: route.path.includes("/dashboard/coupons"),
    to: "/dashboard/coupons",
  },
  {
    name: "Settings",
    icon: "ph:gear-six-fill",
    active: route.path.includes("/dashboard/settings"),
    children: [
      { name: "Store Information", to: "/dashboard/settings/store-info" },
      {
        name: "Staff & Permissions",
        to: "/dashboard/settings/staff-and-permissions",
      },
      { name: "Payment Gateways", to: "/dashboard/settings/payment-gateways" },
      {
        name: "Shipping & Logistics",
        to: "/dashboard/settings/shipping-logistics",
      },
      {
        name: "Notification Center",
        to: "/dashboard/settings/notification-center",
      },
      { name: "Billing & Plan", to: "/dashboard/settings/billing-and-plan" },
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
