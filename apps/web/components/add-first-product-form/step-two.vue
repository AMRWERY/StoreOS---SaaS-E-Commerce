<template>
  <div class="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-white">

    <!-- Main Card -->
    <div class="w-full max-w-[560px] bg-[#0c0c0e] border border-white/5 rounded-3xl p-10 md:p-12 shadow-2xl">

      <!-- Progress Bar -->
      <div class="mb-10">
        <VProgressBar :progress="progress" :height="8" color="blue" trackVariant="slate" :showHeader="true"
          :headerLeft="`Step ${step} of ${totalSteps}`" :headerRight="`${Math.round(progress)}%`" :showLabel="false"
          :shadow="false" />
      </div>

      <!-- Heading -->
      <div class="mb-10">
        <h1 class="text-3xl font-bold mb-3 tracking-tight">Let's set up your store</h1>
        <p class="text-gray-500 text-sm">Tell us a bit about your business to get started.</p>
      </div>

      <!-- Form -->
      <VFormWrapper @submit="handleContinue" class="space-y-7">
        <!-- Store Name -->
        <VInput v-model="storeName" label="Store name"
          inputClass="bg-black border-white/10 rounded-xl px-5 py-4 focus:border-indigo-500/50 transition-colors" />

        <!-- Store Logo Upload -->
        <VFileUpload label="Store logo" icon="ph:cloud-arrow-up-fill" iconClass="text-indigo-500 text-3xl"
          iconWrapperClass="mb-3 group-hover:scale-110 transition-transform"
          wrapperClass="border-2 border-dashed border-indigo-500/20 rounded-2xl p-8 flex flex-col items-center justify-center bg-indigo-500/[0.02] hover:bg-indigo-500/[0.04] transition-all cursor-pointer group"
          accept="image/png, image/jpeg, image/svg+xml">
          <p class="text-sm font-medium mb-1">
            Drag and drop or <span class="text-indigo-500 hover:underline">browse</span>
          </p>
          <p class="text-[11px] text-gray-600 font-bold tracking-tight">PNG, JPG or SVG (Max. 2MB)</p>
        </VFileUpload>

        <!-- Store Description -->
        <div class="space-y-2.5">
          <label class="text-[11px] font-bold text-gray-400 tracking-wider">Store description</label>
          <textarea v-model="description" rows="4" placeholder="Describe what you sell..."
            class="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors resize-none placeholder:text-gray-800"></textarea>
        </div>

        <!-- Country & Currency -->
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2.5">
            <label class="text-[11px] font-bold text-gray-400 tracking-wider">Country</label>
            <div class="relative">
              <select v-model="country"
                class="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm appearance-none focus:outline-none focus:border-indigo-500/50 cursor-pointer">
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
              </select>
              <Icon name="ph:caret-down-bold"
                class="absolute end-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
          <div class="space-y-2.5">
            <label class="text-[11px] font-bold text-gray-400 tracking-wider">Currency</label>
            <div class="relative">
              <select v-model="currency"
                class="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm appearance-none focus:outline-none focus:border-indigo-500/50 cursor-pointer">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
              <Icon name="ph:caret-down-bold"
                class="absolute end-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <VButton type="submit" className="w-full mt-4" label="Continue" icon="ph:arrow-end-bold" iconPosition="right" />
      </VFormWrapper>
    </div>

    <!-- Help Footer -->
    <div class="mt-8 flex items-center gap-2 text-xs text-gray-600">
      <Icon name="ph:question-fill" class="text-sm" />
      <span>Need help with your setup?</span>
      <a href="#" class="text-indigo-400 font-bold hover:underline">Contact support</a>
    </div>

  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  progress: {
    type: Number,
    default: 0,
  },
  step: {
    type: Number,
    default: 2,
  },
  totalSteps: {
    type: Number,
    default: 3,
  },
});

const emit = defineEmits<{ next: []; prev: [] }>();

const storeName = ref('My Awesome Shop')
const description = ref('')
const country = ref('United States')
const currency = ref('USD ($)')

const handleContinue = () => {
  emit('next')
}
</script>

<style scoped></style>