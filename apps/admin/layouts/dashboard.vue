<template>
    <div>
        <div class="min-h-screen bg-bg-base text-tx-primary flex overflow-hidden lg:overflow-visible">
            <!-- Sidebar Component -->
            <sidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

            <!-- Main Content Area -->
            <main class="flex-1 h-screen overflow-y-auto transition-all duration-300 flex flex-col hide-scrollbar">
                <!-- Trial / Plan Banner -->
                <trial-banner v-if="showBanner" />

                <!-- Dashboard Header -->
                <Header @toggle-sidebar="isSidebarOpen = true" />

                <div class="p-6 md:p-8 lg:p-10 pt-0">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>

<script lang="ts" setup>
const isSidebarOpen = ref(false);

const route = useRoute();
watch(() => route.fullPath, () => {
    isSidebarOpen.value = false;
});

const { isTrial, isPaid } = useAuth();
const showBanner = computed(() => isTrial.value || !isPaid.value);
</script>