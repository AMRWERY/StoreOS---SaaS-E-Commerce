<template>
  <div>
    <div class="text-tx-primary flex flex-col items-center py-12 px-6 mt-12">
      <!-- Top Progress Header -->
      <div class="w-full max-w-3xl mb-8">
        <VProgressBar :progress="100" :height="8" color="blue" trackVariant="slate" :showHeader="true"
          headerLeft="Setup Complete" headerRight="100%" :showLabel="false" :shadow="false" />
      </div>

      <!-- Main Success Card -->
      <div class="w-full max-w-3xl bg-bg-primary border border-border-subtle rounded-2xl p-5 text-center mb-8">
        <!-- Success Icon -->
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/20 border border-brand/30 mb-8">
          <div
            class="w-10 h-10 rounded-full bg-brand flex items-center justify-center shadow-lg shadow-brand/40">
            <Icon name="ph:check-bold" class="text-white w-6 h-6" />
          </div>
        </div>

        <h1 class="text-3xl md:text-4xl font-bold mb-4">Your store is live!</h1>
        <p class="text-tx-secondary text-sm md:text-base mb-10 leading-relaxed max-w-md mx-auto">
          Congratulations! Your shop is now open for business at
          <span class="text-brand font-medium">{{ storeUrl }}</span>
        </p>

        <!-- URL Copy Field -->
        <div class="max-w-md mx-auto text-start mb-10">
          <label class="block text-[10px] font-bold text-tx-secondary tracking-widest mb-3">Store URL</label>
          <div class="flex gap-2">
            <div
              class="flex-1 bg-bg-elevated border border-border-default rounded-md px-3 py-2 text-[12px] text-tx-primary font-medium truncate">
              {{ storeUrl }}
            </div>
            <VButton @click="copyToClipboard" variant="none"
              className="bg-bg-elevated hover:bg-bg-elevated border border-border-default p-2 rounded-md transition-colors group">
              <Icon name="ph:copy-simple" class="w-5 h-5 text-tx-secondary group-hover:text-tx-primary transition-colors" />
            </VButton>
          </div>
        </div>

        <!-- Main CTA -->
        <VButton variant="none" to="/dashboard"
          className="w-full max-w-md mx-auto bg-brand hover:bg-brand-hover py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand/20 active:scale-[0.98]">
          Go to Dashboard
          <Icon name="ph:arrow-end-bold" class="w-4 h-4" />
        </VButton>
      </div>

      <!-- Quick Action Grid -->
      <div class="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <nuxt-link-locale :to="action.route || '/onboarding/add-first-product'" v-for="action in quickActions"
          :key="action.title"
          class="bg-bg-primary border border-border-subtle px-4 py-3.5 rounded-xl hover:border-border-default transition-colors group cursor-pointer">
          <div
            class="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
            <Icon :name="action.icon" class="w-5 h-5 text-brand" />
          </div>
          <h3 class="font-bold text-sm mb-2">{{ action.title }}</h3>
          <p class="text-xs text-tx-secondary leading-relaxed">{{ action.desc }}</p>
        </nuxt-link-locale>
      </div>

      <!-- Footer Help Link -->
      <div class="text-center">
        <p class="text-xs text-tx-muted mb-2">Need help setting up?</p>
        <nuxt-link-locale to="/"
          class="text-brand text-xs font-bold flex items-center justify-center gap-1.5 hover:underline">
          Visit our Help Center
          <Icon name="ph:arrow-square-out" class="w-3.5 h-3.5" />
        </nuxt-link-locale>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const storeUrl = ref("https://storeos.app/my-awesome-shop");

const copyToClipboard = () => {
  navigator.clipboard.writeText(storeUrl.value);
};

const quickActions = [
  {
    title: "Add products",
    desc: "Expand your catalog with more items.",
    icon: "ph:plus-square-duotone",
    route: "/onboarding/add-first-product",
  },
  {
    title: "Share store",
    desc: "Tell the world about your new shop.",
    icon: "ph:share-network-duotone",
  },
  {
    title: "View store",
    desc: "See how customers view your page.",
    icon: "ph:eye-duotone",
  },
];
</script>
