<template>
  <div>
    <div class="min-h-screen text-[#e1e1e1] pb-32 selection:bg-indigo-500/30">
      <VBreadcrumb :items="[
        { label: 'System', to: '/dashboard/settings' },
        { label: 'Configuration' },
        { label: 'Store Information', active: true }
      ]" class="max-w-6xl mx-auto mb-4" />
      <header class="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Store Information</h1>
          <p class="text-sm text-gray-500 mt-2">Manage your brand identity, contact details, and localization settings.</p>
        </div>
        <div class="flex items-center gap-3">
          <VButton variant="ghost" size="none" className="px-6 py-2.5 text-xs font-bold text-gray-400 hover:text-white transition-colors">
            Discard
          </VButton>

          <VButton @click="handleSave" className="px-8 py-3">
            Save Changes
          </VButton>
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
const storeData = ref({
  name: 'Hyperlink Aesthetics',
  legalName: '',
  description: 'Premium curation of archival techwear and kinetic accessories. Shipping worldwide from Tokyo.',
  systemUrl: 'storeos.app/hyperlink-aesthetics',
  customDomain: '',
  supportEmail: 'ops@hyperlink.com',
  phone: '+81 03-1234-5678',
  address: 'Shibuya Scramble Square, 1-24-12 Shibuya',
  city: 'Tokyo',
  state: 'Shibuya-ku',
  zip: '150-0002',
  country: 'Japan',
  currency: 'JPY (¥) - Japanese Yen',
  timezone: '(GMT+09:00) Tokyo',
  unitSystem: 'Metric', // 'Metric' | 'Imperial'
  language: 'English (International)'
})

const handleSave = () => {
  console.log('Saving settings...', storeData.value)
}

definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Settings - Store Info',
});
</script>