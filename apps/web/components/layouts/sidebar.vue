<template>
  <!-- Mobile Sidebar Backdrop -->
  <Transition name="fade">
    <div v-if="isOpen" @click="$emit('close')" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden">
    </div>
  </Transition>

  <!-- Sidebar -->
  <aside
    class="fixed lg:sticky top-0 start-0 w-64 h-screen bg-[#0c0c0e] border-e border-white/5 flex flex-col p-6 shrink-0 z-50 transition-all duration-300"
    :class="isOpen ? 'translate-x-0' : 'ltr:-translate-x-full rtl:translate-x-full ltr:lg:translate-x-0 rtl:lg:translate-x-0'">
    <div class="flex items-center gap-2 mb-10">
      <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
        <icon name="ph:storefront-bold" class="text-xl" />
      </div>
      <div class="flex-1">
        <h1 class="font-bold text-lg leading-none text-white text-start">StoreOS</h1>
        <p class="text-[9px] text-gray-500 tracking-[0.2em] font-black mt-1 text-start">Global Merchant</p>
      </div>
      <!-- Mobile Close Button -->
      <VButton @click="$emit('close')" variant="none" className="lg:hidden text-gray-500 hover:text-white p-1">
        <icon name="ph:x-bold" class="text-xl" />
      </VButton>
    </div>

    <nav class="flex-1 space-y-2 overflow-y-auto hide-scrollbar">
      <VButton v-for="item in navItems" :key="item.name" :to="item.to" variant="none"
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm group"
        :class="item.active ? 'bg-indigo-500/10 text-indigo-500 shadow-sm' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'">
        <icon :name="item.icon" class="text-lg" />
        <span class="truncate">{{ item.name }}</span>
      </VButton>
    </nav>

    <div class="mt-auto pt-6 space-y-2 border-t border-white/5">
      <VButton variant="none"
        className="text-[10px] font-black text-indigo-400 tracking-widest px-4 hover:underline block text-start">
        Upgrade
      </VButton>
      <VButton variant="none"
        className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-white transition-colors group">
        <icon name="ph:user-circle" class="text-xl" />
        <span class="text-sm truncate">User Profile</span>
      </VButton>
      <!-- Logout Button -->
      <VButton to="/auth/login" variant="none"
        className="w-full flex items-center gap-3 px-4 py-3 text-red-500/60 hover:text-red-500 transition-colors group">
        <icon name="ph:sign-out-bold" class="text-xl" />
        <span class="text-sm truncate font-bold">Logout</span>
      </VButton>
    </div>
  </aside>
</template>

<script lang="ts" setup>
defineProps<{
  isOpen: boolean;
}>();

defineEmits(['close']);

const route = useRoute();
const localePath = useLocalePath();

const navItems = computed(() => [
  { name: 'Dashboard', icon: 'ph:grid-four-fill', active: route.path.endsWith('/dashboard'), to: localePath('/dashboard') },
  { name: 'Orders', icon: 'ph:shopping-cart-fill', active: route.path.includes('/dashboard/orders'), to: localePath('/dashboard/orders') },
  { name: 'Products', icon: 'ph:package-fill', active: route.path.includes('/dashboard/products'), to: localePath('/dashboard/products') },
  { name: 'Inventory', icon: 'ph:stack-fill', active: route.path.includes('/dashboard/inventory'), to: localePath('/dashboard/inventory') },
  { name: 'Customers', icon: 'ph:users-fill', active: route.path.includes('/dashboard/customers'), to: localePath('/dashboard/customers') },
  { name: 'Analytics', icon: 'ph:chart-bar-fill', active: route.path.includes('/dashboard/analytics'), to: localePath('/dashboard/analytics') },
  { name: 'Coupons', icon: 'ph:ticket-fill', active: route.path.includes('/dashboard/coupons'), to: localePath('/dashboard/coupons') },
  { name: 'Settings', icon: 'ph:gear-six-fill', active: route.path.includes('/dashboard/settings'), to: localePath('/dashboard/settings') },
])
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