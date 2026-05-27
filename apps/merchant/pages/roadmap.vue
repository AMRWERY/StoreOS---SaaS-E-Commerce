<template>
  <div class="bg-bg-base min-h-screen text-tx-primary pb-32">
    <!-- Header -->
    <header class="pt-32 pb-20 px-6 border-b border-border-subtle bg-bg-primary/50 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent pointer-events-none" />
      <div class="max-w-5xl mx-auto relative z-10">
        <p class="text-[10px] font-black tracking-[0.4em] text-brand mb-6 uppercase">Product Roadmap</p>
        <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">What's coming<br />to StoreOS.</h1>
        <p class="text-tx-secondary text-lg max-w-2xl leading-relaxed">
          A live view of our product direction. We ship fast and keep this updated as priorities evolve.
        </p>
      </div>
    </header>

    <!-- Filter tabs -->
    <div class="sticky top-0 z-10 bg-bg-base/90 backdrop-blur border-b border-border-subtle px-6 py-4">
      <div class="max-w-5xl mx-auto flex items-center gap-2 overflow-x-auto hide-scrollbar">
        <button v-for="tab in tabs" :key="tab.id"
          @click="activeTab = tab.id"
          class="px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border"
          :class="activeTab === tab.id
            ? 'bg-brand text-white border-brand'
            : 'border-border-subtle text-tx-secondary hover:text-tx-primary hover:border-border-default'">
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Timeline -->
    <section class="py-16 px-6">
      <div class="max-w-5xl mx-auto space-y-6">
        <template v-for="phase in filteredPhases" :key="phase.quarter">
          <div class="bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden">
            <!-- Phase header -->
            <div class="flex items-center justify-between px-8 py-5 border-b border-border-subtle"
              :class="`bg-${phase.color}/5`">
              <div class="flex items-center gap-4">
                <div class="w-2 h-2 rounded-full" :class="`bg-${phase.color}`" />
                <h3 class="font-bold">{{ phase.quarter }}</h3>
              </div>
              <span class="text-[10px] font-black tracking-widest px-3 py-1 rounded-full border"
                :class="phase.status === 'Now' ? 'bg-brand/10 text-brand border-brand/20' : phase.status === 'Next' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'border-border-subtle text-tx-muted'">
                {{ phase.status }}
              </span>
            </div>
            <!-- Items -->
            <div class="divide-y divide-border-subtle">
              <div v-for="item in phase.items" :key="item.title" class="px-8 py-5 flex items-start gap-5">
                <div class="mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                  :class="item.done ? 'bg-green-500/15' : 'bg-bg-elevated border border-border-subtle'">
                  <Icon :name="item.done ? 'ph:check-bold' : 'ph:clock-bold'"
                    class="text-xs"
                    :class="item.done ? 'text-green-400' : 'text-tx-muted'" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3 mb-1">
                    <p class="font-semibold text-sm" :class="item.done ? 'line-through text-tx-muted' : ''">{{ item.title }}</p>
                    <span v-if="item.tag" class="text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full"
                      :class="item.tag === 'Core' ? 'bg-brand/10 text-brand' : item.tag === 'Builder' ? 'bg-purple-500/10 text-purple-400' : 'bg-bg-elevated text-tx-muted'">
                      {{ item.tag }}
                    </span>
                  </div>
                  <p class="text-xs text-tx-muted leading-relaxed">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({ title: 'Roadmap — StoreOS', description: 'See what features are coming to StoreOS.' })

const activeTab = ref('all')

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'now', label: 'Now' },
  { id: 'next', label: 'Next' },
  { id: 'later', label: 'Later' },
]

const phases = [
  {
    quarter: 'Q2 2026 — Current Sprint',
    status: 'Now',
    color: 'brand',
    filter: 'now',
    items: [
      { title: 'Multi-currency checkout', description: 'Accept payments in 30+ currencies with automatic conversion.', tag: 'Core', done: true },
      { title: 'AI product descriptions', description: 'Generate SEO-ready product copy from a single image upload.', tag: 'Core', done: true },
      { title: 'Store builder v2', description: 'Redesigned drag-and-drop builder with real-time collaboration.', tag: 'Builder', done: false },
      { title: 'Inventory forecasting', description: 'Predict stockouts before they happen using order velocity data.', tag: 'Core', done: false },
    ],
  },
  {
    quarter: 'Q3 2026 — Up Next',
    status: 'Next',
    color: 'orange-500',
    filter: 'next',
    items: [
      { title: 'Abandoned cart recovery', description: 'Automated email + SMS sequences for lost carts.', tag: 'Core', done: false },
      { title: 'Custom domain mapping', description: 'Connect any domain to your StoreOS storefront in one click.', tag: 'Builder', done: false },
      { title: 'Team permissions v2', description: 'Granular role management down to individual resource types.', tag: 'Core', done: false },
      { title: 'Native POS integration', description: 'Sync your physical point-of-sale with your online inventory.', tag: 'Core', done: false },
    ],
  },
  {
    quarter: 'Q4 2026 — Later',
    status: 'Later',
    color: 'tx-muted',
    filter: 'later',
    items: [
      { title: 'Headless API tier', description: 'Fully documented REST + GraphQL API for custom storefronts.', tag: 'Core', done: false },
      { title: 'Subscription products', description: 'First-class support for recurring billing and subscription boxes.', tag: 'Core', done: false },
      { title: 'Mobile merchant app', description: 'Manage orders, inventory and analytics from your phone.', tag: 'Core', done: false },
      { title: 'Marketplace channel', description: 'List products directly on Amazon, Noon, and regional marketplaces.', tag: 'Core', done: false },
    ],
  },
]

const filteredPhases = computed(() =>
  activeTab.value === 'all' ? phases : phases.filter((p) => p.filter === activeTab.value)
)
</script>
