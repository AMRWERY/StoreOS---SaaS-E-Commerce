<template>
  <div
    class="min-h-screen bg-bg-base flex flex-col items-center justify-center p-6 text-tx-primary"
  >
    <!-- Main Card -->
    <div
      class="w-full max-w-[560px] bg-bg-primary border border-border-subtle rounded-2xl p-5 shadow-2xl"
    >
      <!-- Progress Bar -->
      <div class="mb-10">
        <LazyVProgressBar
          :progress="progress"
          :height="8"
          color="blue"
          trackVariant="slate"
          :showHeader="true"
          :headerLeft="`Step ${step} of ${totalSteps}`"
          :headerRight="`${Math.round(progress)}%`"
          :showLabel="false"
          :shadow="false"
        />
      </div>

      <!-- Heading -->
      <div class="mb-10">
        <h1 class="text-3xl font-bold mb-3 tracking-tight">
          Let's set up your store
        </h1>
        <p class="text-tx-secondary text-sm">
          Tell us a bit about your business to get started.
        </p>
      </div>

      <!-- Form -->
      <LazyVFormWrapper @submit="handleContinue" class="space-y-7">
        <!-- Store Name -->
        <LazyVInput
          v-model="storeName"
          label="Store name"
          inputClass="bg-bg-elevated border-border-default rounded-md px-3 py-2 focus:border-brand transition-colors"
        />

        <!-- Store Logo Upload -->
        <LazyVDropdownMenu
          label="Store logo"
          icon="ph:cloud-arrow-up-fill"
          iconClass="text-brand text-3xl"
          iconWrapperClass="mb-3 group-hover:scale-110 transition-transform"
          wrapperClass="border-2 border-dashed border-brand/20 rounded-xl p-5 flex flex-col items-center justify-center bg-brand/[0.02] hover:bg-brand/[0.04] transition-all cursor-pointer group"
          accept="image/png, image/jpeg, image/svg+xml"
        >
          <p class="text-sm font-medium mb-1">
            Drag and drop or
            <span class="text-brand hover:underline">browse</span>
          </p>
          <p class="text-[11px] text-tx-muted font-bold tracking-tight">
            PNG, JPG or SVG (Max. 2MB)
          </p>
        </LazyVDropdownMenu>

        <!-- Store Description -->
        <div class="space-y-2.5">
          <label class="text-[11px] font-bold text-tx-secondary tracking-wider"
            >Store description</label
          >
          <textarea
            v-model="description"
            rows="4"
            placeholder="Describe what you sell..."
            class="w-full bg-bg-elevated border border-border-default rounded-md px-3 py-2 text-[12px] text-tx-primary focus:outline-none focus:border-brand transition-colors resize-none placeholder:text-tx-muted"
          ></textarea>
        </div>

        <!-- Country & Currency -->
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2.5">
            <label
              class="text-[11px] font-bold text-tx-secondary tracking-wider"
              >Country</label
            >
            <div class="relative">
              <select
                v-model="country"
                class="w-full bg-bg-elevated border border-border-default rounded-md px-3 py-2 text-[12px] text-tx-primary appearance-none focus:outline-none focus:border-brand cursor-pointer"
              >
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
              </select>
              <Icon
                name="ph:caret-down-bold"
                class="absolute end-3 top-1/2 -translate-y-1/2 text-tx-secondary pointer-events-none"
              />
            </div>
          </div>
          <div class="space-y-2.5">
            <label
              class="text-[11px] font-bold text-tx-secondary tracking-wider"
              >Currency</label
            >
            <div class="relative">
              <select
                v-model="currency"
                class="w-full bg-bg-elevated border border-border-default rounded-md px-3 py-2 text-[12px] text-tx-primary appearance-none focus:outline-none focus:border-brand cursor-pointer"
              >
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
              <Icon
                name="ph:caret-down-bold"
                class="absolute end-3 top-1/2 -translate-y-1/2 text-tx-secondary pointer-events-none"
              />
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <LazyVButton
          type="submit"
          className="w-full mt-4"
          label="Continue"
          icon="ph:arrow-end-bold"
          iconPosition="right"
        />
      </LazyVFormWrapper>
    </div>

    <!-- Help Footer -->
    <div class="mt-8 flex items-center gap-2 text-xs text-tx-muted">
      <Icon name="ph:question-fill" class="text-sm" />
      <span>Need help with your setup?</span>
      <nuxt-link-locale to="" class="text-brand font-bold hover:underline"
        >Contact support</nuxt-link-locale
      >
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

const storeName = ref("My Awesome Shop");
const description = ref("");
const country = ref("United States");
const currency = ref("USD ($)");

const handleContinue = () => {
  emit("next");
};
</script>