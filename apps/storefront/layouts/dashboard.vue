<template>
  <!-- Header spans full width; sidebar + page sit below (classic dashboard shell). -->
  <div
    class="flex min-h-screen flex-col overflow-hidden bg-bg-base text-tx-primary lg:h-screen lg:max-h-screen"
  >
    <builder-dashboard-header @toggle-sidebar="isSidebarOpen = true" />

    <div class="flex min-h-0 flex-1 overflow-hidden lg:overflow-visible">
      <builder-sidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

      <div class="hide-scrollbar flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
        <div
          class="flex min-h-0 flex-1 flex-col p-6 pt-4 md:px-8 md:pb-8 lg:px-10 lg:pb-10"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isSidebarOpen = ref(false)
const route = useRoute()

watch(() => route.fullPath, () => {
  isSidebarOpen.value = false
})
</script>
