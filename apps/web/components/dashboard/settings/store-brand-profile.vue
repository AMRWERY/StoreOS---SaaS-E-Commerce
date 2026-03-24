<template>
  <div>
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div class="lg:col-span-4">
        <h3 class="font-bold text-lg mb-2">Brand Profile</h3>
        <p class="text-xs text-gray-500 leading-relaxed">Update your public store name and branding assets used across
          the platform.</p>
      </div>
      <div class="lg:col-span-8 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <VInput v-model="modelValue.name" label="Store Name" placeholder="Enter store name" />
          <VInput v-model="modelValue.legalName" label="Legal Name (Optional)" placeholder="LLC Name" />
        </div>

        <div class="space-y-2">
          <label class="text-[10px] font-bold text-gray-500 tracking-wider">Store Description</label>
          <textarea v-model="modelValue.description" rows="4"
            class="w-full bg-[#161618] border border-white/5 rounded-lg px-4 py-3 text-sm focus:border-orange-500/50 hover:border-white/10 outline-none transition-all duration-200 resize-none"></textarea>
        </div>

        <VFileUpload label="Store Logo" title="Store Logo" subtitle="Square SVG or PNG, at least 512x512px. Max 2MB."
          icon="ph:image-square-bold" />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: any
}>();
</script>