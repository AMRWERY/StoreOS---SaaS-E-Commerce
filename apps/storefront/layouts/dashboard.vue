<template>
  <div class="min-h-screen bg-bg-base text-tx-primary flex overflow-hidden lg:overflow-visible">
    <builder-sidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

    <main class="flex-1 min-h-screen lg:h-screen overflow-y-auto flex flex-col hide-scrollbar">
      <builder-dashboard-header @toggle-sidebar="isSidebarOpen = true" />

      <div class="flex-1 p-6 md:p-8 lg:p-10 pt-2">
        <slot />
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
const isSidebarOpen = ref(false)
const route = useRoute()

watch(() => route.fullPath, () => {
  isSidebarOpen.value = false
})
</script>
