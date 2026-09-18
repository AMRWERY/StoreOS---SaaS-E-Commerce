<template>
  <div>
    <div
      class="min-h-screen bg-bg-base text-tx-primary flex overflow-hidden lg:overflow-visible"
    >
      <!-- Sidebar Component -->
      <sidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

      <!-- Main Content Area -->
      <main
        class="flex-1 h-screen overflow-y-auto transition-all duration-300 flex flex-col hide-scrollbar"
      >
        <!-- Signed-out preview banner, else Trial / Plan Banner -->
        <lazy-guest-banner v-if="isGuest" />

        <lazy-trial-banner v-else-if="showBanner" />

        <!-- Dashboard Header -->
        <Header @toggle-sidebar="isSidebarOpen = true" />

        <div class="p-6 md:p-8 lg:p-10 pt-0">
          <slot />
        </div>
      </main>
    </div>

    <!-- Sign-in gate for locked features in preview mode -->
    <lazy-auth-required-dialog />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { isGuest, isTrial, isPaid } = useAuth();

// Sidebar Toggle State
const isSidebarOpen = ref(false);

watch(
  () => route.fullPath,
  () => {
    isSidebarOpen.value = false;
  },
);

const showBanner = computed(() => isTrial.value || !isPaid.value);
</script>