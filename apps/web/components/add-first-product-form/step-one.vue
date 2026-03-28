<template>
  <div>
    <div class="flex items-center justify-center p-6 text-tx-primary">
      <!-- Main Card -->
      <div class="w-full max-w-2xl bg-bg-primary border border-border-subtle rounded-2xl p-5 shadow-2xl">
        <!-- Progress Bar -->
        <div class="mb-8">
          <VProgressBar :progress="progress" :height="8" color="blue" trackVariant="slate" :showHeader="true"
            :headerLeft="`Step ${step} of ${totalSteps}`" :headerRight="`${Math.round(progress)}%`" :showLabel="false"
            :shadow="false" />
        </div>

        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold mb-3">Add your first product</h1>
          <p class="text-tx-secondary text-sm leading-relaxed">
            Start building your inventory by adding your first item. You can
            always edit this later.
          </p>
        </div>

        <!-- Form -->
        <VFormWrapper @submit.prevent>
          <!-- Product Name -->
          <VInput v-model="productName" label="Product name" placeholder="e.g. Minimalist Wireless Headphones"
            inputClass="bg-bg-elevated border-border-default rounded-md px-3 py-2 focus:border-brand transition-colors placeholder:text-tx-muted" />

          <!-- Price & Stock Row -->
          <div class="grid grid-cols-2 gap-4">
            <VInput v-model="price" label="Price" placeholder="0.00"
              inputClass="bg-bg-elevated border-border-default rounded-md ps-9 pe-3 py-2 focus:border-brand transition-colors placeholder:text-tx-muted">
              <template #prefix>
                <span class="absolute start-3 top-1/2 -translate-y-1/2 text-tx-muted text-sm">$</span>
              </template>
            </VInput>

            <VInput v-model="stock" type="number" label="Stock quantity" placeholder="0"
              inputClass="bg-bg-elevated border-border-default rounded-md px-3 py-2 focus:border-brand transition-colors placeholder:text-tx-muted" />
          </div>

          <!-- Photo Upload Area -->
          <VFileUpload label="Product photos" accept="image/png, image/jpeg, image/webp" @click="handleUpload" />

          <!-- Footer Actions -->
          <div class="flex items-center gap-4 pt-4">
            <VButton className="flex-1" label="Next" icon="ph:arrow-end-bold" iconPosition="right"
              @click="emit('next')" />

            <VButton variant="secondary" className="flex-1" label="Skip for now" @click="emit('skip')" />
          </div>
        </VFormWrapper>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  progress: { type: Number, default: 33 },
  step: { type: Number, default: 1 },
  totalSteps: { type: Number, default: 3 },
});

const emit = defineEmits<{ next: []; skip: [] }>();

const productName = ref("");
const price = ref("");
const stock = ref(0);

const handleUpload = () => {
  console.log("Upload clicked");
};
</script>

<style scoped></style>
