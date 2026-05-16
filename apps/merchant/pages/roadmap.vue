<template>
  <div class="bg-bg-base min-h-screen">
    <!-- Hero Section -->
    <section class="relative pt-32 pb-24 px-6 overflow-hidden border-b border-border-subtle">
      <!-- Background Abstract -->
      <div class="absolute inset-0 z-0">
        <img src="/img/roadmap-hero.png" alt="Roadmap Background" class="w-full h-full object-cover opacity-30" />
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-bg-base/60 to-bg-base"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10 text-center">
        <p class="text-[10px] font-black tracking-[0.4em] text-brand mb-6 uppercase">Future & Vision</p>
        <h1 class="text-5xl md:text-6xl font-bold leading-tight mb-8">
          The roadmap to the<br />
          <span class="text-tx-secondary">future of commerce.</span>
        </h1>
        <p class="text-lg text-tx-secondary max-w-2xl mx-auto leading-relaxed">
          We're building the infrastructure that powers the next generation of global brands.
          See what we've shipped, what's in flight, and where we're headed next.
        </p>
      </div>
    </section>

    <!-- Roadmap Explorer -->
    <section class="py-20 px-6 overflow-x-auto hide-scrollbar">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-start min-w-[1000px] md:min-w-0">

        <!-- Column: Launched -->
        <div class="flex-1 space-y-6">
          <div class="flex items-center gap-3 px-2">
            <div class="w-2 h-2 rounded-full bg-success"></div>
            <h2 class="text-sm font-black tracking-widest text-tx-primary uppercase">Launched</h2>
            <span class="text-[10px] text-tx-muted font-bold ms-auto">RECENT WINS</span>
          </div>

          <div class="space-y-4">
            <div v-for="item in roadmap.launched" :key="item.title"
              class="group p-5 rounded-2xl bg-bg-primary border border-border-subtle hover:border-success/30 transition-all duration-300 shadow-lg shadow-black/20">
              <div class="flex items-center gap-2 mb-3">
                <span v-for="tag in item.tags" :key="tag"
                  class="text-[8px] font-black px-2 py-0.5 rounded bg-success-dim text-success tracking-widest">{{ tag
                  }}</span>
              </div>
              <h3 class="text-sm font-bold mb-2 group-hover:text-success transition-colors">{{ item.title }}</h3>
              <p class="text-xs text-tx-secondary leading-relaxed">{{ item.desc }}</p>
              <div class="mt-4 pt-4 border-t border-border-subtle flex items-center gap-2 opacity-50">
                <Icon name="ph:check-circle-fill" class="text-success text-xs" />
                <span class="text-[9px] font-bold text-tx-muted uppercase">Shipped Q1 2026</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Column: In Progress -->
        <div class="flex-1 space-y-6">
          <div class="flex items-center gap-3 px-2">
            <div class="w-2 h-2 rounded-full bg-brand animate-pulse"></div>
            <h2 class="text-sm font-black tracking-widest text-tx-primary uppercase">In Progress</h2>
            <span class="text-[10px] text-tx-muted font-bold ms-auto">DEVELOPING</span>
          </div>

          <div class="space-y-4">
            <div v-for="item in roadmap.inProgress" :key="item.title"
              class="group p-5 rounded-2xl bg-bg-elevated border border-brand/20 hover:border-brand transition-all duration-300 shadow-xl shadow-brand/5">
              <div class="flex items-center gap-2 mb-3">
                <span v-for="tag in item.tags" :key="tag"
                  class="text-[8px] font-black px-2 py-0.5 rounded bg-brand-dim text-brand tracking-widest">{{ tag
                  }}</span>
              </div>
              <h3 class="text-sm font-bold mb-2 group-hover:text-brand transition-colors">{{ item.title }}</h3>
              <p class="text-xs text-tx-secondary leading-relaxed">{{ item.desc }}</p>
              <div class="mt-4 pt-4 border-t border-border-subtle flex items-center justify-between">
                <div class="w-2/3 h-1 bg-bg-base rounded-full overflow-hidden">
                  <div class="h-full bg-brand" :style="`width: ${item.progress}%`"></div>
                </div>
                <span class="text-[9px] font-bold text-brand uppercase">{{ item.progress }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Column: Planned -->
        <div class="flex-1 space-y-6">
          <div class="flex items-center gap-3 px-2">
            <div class="w-2 h-2 rounded-full bg-warning"></div>
            <h2 class="text-sm font-black tracking-widest text-tx-primary uppercase">Planned</h2>
            <span class="text-[10px] text-tx-muted font-bold ms-auto">Q3 - Q4</span>
          </div>

          <div class="space-y-4">
            <div v-for="item in roadmap.planned" :key="item.title"
              class="group p-5 rounded-2xl bg-bg-primary border border-border-subtle hover:border-warning/30 transition-all duration-300">
              <div class="flex items-center gap-2 mb-3">
                <span v-for="tag in item.tags" :key="tag"
                  class="text-[8px] font-black px-2 py-0.5 rounded bg-warning-dim text-warning tracking-widest">{{ tag
                  }}</span>
              </div>
              <h3 class="text-sm font-bold mb-2 transition-colors group-hover:text-tx-primary">{{ item.title }}</h3>
              <p class="text-xs text-tx-muted leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Column: Future -->
        <div class="flex-1 space-y-6">
          <div class="flex items-center gap-3 px-2">
            <div class="w-2 h-2 rounded-full bg-tx-muted"></div>
            <h2 class="text-sm font-black tracking-widest text-tx-muted uppercase">Future</h2>
            <span class="text-[10px] text-tx-muted font-bold ms-auto">EXPLORING</span>
          </div>

          <div class="space-y-4">
            <div v-for="item in roadmap.future" :key="item.title"
              class="group p-5 rounded-2xl border border-dashed border-border-subtle hover:border-border-default transition-all duration-300">
              <h3 class="text-sm font-bold text-tx-secondary mb-2">{{ item.title }}</h3>
              <p class="text-xs text-tx-muted leading-relaxed italic">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom Request -->
    <section class="py-32 px-6">
      <div
        class="max-w-4xl mx-auto p-12 rounded-[2.5rem] bg-gradient-to-br from-bg-elevated to-bg-base border border-border-subtle text-center">
        <Icon name="ph:shooting-star-fill" class="text-5xl text-brand mb-6" />
        <h2 class="text-3xl font-bold mb-4">Have an idea for StoreOS?</h2>
        <p class="text-tx-secondary mb-10 max-w-lg mx-auto">
          We prioritize our roadmap based on community feedback. If you need a specific integration or feature, let us
          know.
        </p>
        <div class="flex items-center justify-center gap-4">
          <LazyVButton size="lg" shadow>Submit Feature Request</LazyVButton>
          <LazyVButton variant="none" className="text-tx-secondary hover:text-tx-primary font-bold">Browse Feedback
            Board
          </LazyVButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: "Roadmap — The Vision for StoreOS",
  description: "Follow the development of StoreOS. See current progress, recently launched features, and our future roadmap for mission-critical commerce infrastructure.",
  ogTitle: "StoreOS Roadmap — Built for the Future",
  ogDescription: "See what's next for StoreOS. Real-time updates on our platform vision and upcoming features.",
  ogType: "website",
})

const roadmap = {
  launched: [
    { title: 'Multi-Warehouse Inventory', desc: 'Sync and track stock across multiple physical locations with automatic routing.', tags: ['CORE', 'INVENTORY'] },
    { title: 'GraphQL API v1', desc: 'Powerful, type-safe API for custom storefronts and deep integrations.', tags: ['DEV', 'API'] },
    { title: 'Advanced Team Roles', desc: 'Granular permissions for staff members across all modules.', tags: ['SEC', 'ADMIN'] },
  ],
  inProgress: [
    { title: 'Workflow Automations', desc: 'Visual builder for complex task automation (IF condition THEN action).', tags: ['BETA', 'OPS'], progress: 65 },
    { title: 'StoreOS Mobile App', desc: 'Manage orders and inventory on the go with real-time push notifications.', tags: ['iOS', 'ANDROID'], progress: 40 },
    { title: 'Paymob Integration', desc: 'Localized payment support for Middle Eastern merchants.', tags: ['PAYMENTS'], progress: 85 },
  ],
  planned: [
    { title: 'POS Integration', desc: 'Seamlessly connect your physical stores with your online inventory and orders.', tags: ['OMNICHANNEL'] },
    { title: 'AI Inventory Forecaster', desc: 'Predict stock-outs and demand spikes using historical data and ML.', tags: ['INTELLIGENCE'] },
    { title: 'Bosta Same-Day Shipping', desc: 'Native integration with Bosta for ultra-fast localized delivery.', tags: ['LOGISTICS'] },
  ],
  future: [
    { title: 'Headless SDK v2', desc: 'React and Vue ready-made components for ultra-fast custom stores.' },
    { title: 'Global Tax Engine', desc: 'Automatic cross-border tax calculation and compliance filing.' },
    { title: 'Marketplace Sync', desc: 'Native syncing with Amazon, Noon, and eBay catalogues.' },
  ],
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>