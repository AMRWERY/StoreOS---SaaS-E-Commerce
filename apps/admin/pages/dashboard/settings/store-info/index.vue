<template>
  <div>
    <div class="min-h-screen text-tx-primary pb-32 selection:bg-indigo-500/30">
      <LazyVBreadcrumb class="max-w-6xl mx-auto mb-4" />

      <header class="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Store Information</h1>
          <p class="text-sm text-tx-secondary mt-2">Manage your brand identity, contact details, and localization
            settings.</p>
        </div>
        <div class="flex items-center gap-3">
          <LazyVButton variant="ghost" size="none"
            className="px-6 py-2.5 text-xs font-bold text-tx-secondary hover:text-tx-primary transition-colors">
            Discard
          </LazyVButton>

          <LazyVButton @click="saveSettings" className="px-8 py-3">
            Save Changes
          </LazyVButton>
        </div>
      </header>

      <div class="max-w-6xl mx-auto space-y-24">
        <store-brand-profile v-model="storeData" />

        <store-network-access v-model="storeData" />

        <store-contact-details v-model="storeData" />

        <store-localization v-model="storeData" />
      </div>

      <store-floating-action-bar />
    </div>
  </div>
</template>

<script lang="ts" setup>
const storeSettingsStore = useStoreSettingsStore()
const { storeData } = storeToRefs(storeSettingsStore)
const { saveSettings } = storeSettingsStore

definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Settings - Store Info',
});
</script>
