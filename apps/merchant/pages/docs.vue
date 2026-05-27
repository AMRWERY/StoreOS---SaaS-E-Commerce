<template>
  <div class="bg-bg-base min-h-screen text-tx-primary pb-32">
    <!-- Header -->
    <header class="pt-32 pb-20 px-6 border-b border-border-subtle bg-bg-primary/50 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent pointer-events-none" />
      <div class="max-w-5xl mx-auto relative z-10">
        <p class="text-[10px] font-black tracking-[0.4em] text-brand mb-6 uppercase">Documentation</p>
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Everything you need<br />to run your store.</h1>
        <p class="text-tx-secondary text-lg max-w-2xl leading-relaxed">
          Guides, API references, and integration docs — all in one place.
        </p>
        <div class="mt-8 relative max-w-lg">
          <Icon name="ph:magnifying-glass-bold" class="absolute start-4 top-1/2 -translate-y-1/2 text-tx-muted" />
          <input v-model="search" type="text" placeholder="Search documentation..."
            class="w-full bg-bg-elevated border border-border-subtle rounded-xl ps-10 pe-4 py-3 text-sm outline-none focus:border-brand/40 transition-colors" />
          <kbd class="absolute end-4 top-1/2 -translate-y-1/2 text-[10px] text-tx-muted font-mono bg-bg-base border border-border-subtle px-1.5 py-0.5 rounded">⌘K</kbd>
        </div>
      </div>
    </header>

    <!-- Quick start cards -->
    <section class="py-16 px-6 border-b border-border-subtle">
      <div class="max-w-5xl mx-auto">
        <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted mb-6 uppercase">Quick Start</p>
        <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="qs in quickStart" :key="qs.title"
            class="bg-bg-primary border border-border-subtle rounded-2xl p-5 hover:border-brand/30 transition-all group cursor-pointer">
            <div class="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center mb-4">
              <Icon :name="qs.icon" class="text-brand text-lg" />
            </div>
            <p class="font-bold text-sm mb-1 group-hover:text-brand transition-colors">{{ qs.title }}</p>
            <p class="text-xs text-tx-muted">{{ qs.time }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main docs grid -->
    <section class="py-16 px-6">
      <div class="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        <!-- Sidebar navigation -->
        <aside class="space-y-6">
          <div v-for="group in docGroups" :key="group.title">
            <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted uppercase mb-3">{{ group.title }}</p>
            <ul class="space-y-1">
              <li v-for="item in group.items" :key="item.label">
                <button @click="activeDoc = item.id"
                  class="w-full text-start px-3 py-2 rounded-lg text-sm transition-all"
                  :class="activeDoc === item.id
                    ? 'bg-brand/10 text-brand font-semibold'
                    : 'text-tx-secondary hover:text-tx-primary hover:bg-bg-elevated'">
                  {{ item.label }}
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Content -->
        <div class="md:col-span-2 bg-bg-primary border border-border-subtle rounded-2xl p-8">
          <template v-for="doc in allDocs" :key="doc.id">
            <div v-if="activeDoc === doc.id">
              <h2 class="text-xl font-bold mb-2">{{ doc.title }}</h2>
              <p class="text-xs text-tx-muted mb-6">Last updated {{ doc.updated }}</p>
              <div class="prose prose-sm max-w-none space-y-4 text-tx-secondary text-sm leading-relaxed">
                <p v-for="(para, i) in doc.content" :key="i">{{ para }}</p>
              </div>
              <div class="mt-8 pt-6 border-t border-border-subtle flex items-center justify-between">
                <button class="text-sm text-tx-muted hover:text-tx-primary transition-colors flex items-center gap-1">
                  <Icon name="ph:pencil-bold" class="text-xs" />
                  Edit this page
                </button>
                <div class="flex items-center gap-2 text-xs text-tx-muted">
                  Was this helpful?
                  <button class="p-1 hover:text-brand transition-colors"><Icon name="ph:thumbs-up-bold" /></button>
                  <button class="p-1 hover:text-red-400 transition-colors"><Icon name="ph:thumbs-down-bold" /></button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({ title: 'Documentation — StoreOS', description: 'Guides, API references, and integration docs for StoreOS merchants.' })

const search = ref('')
const activeDoc = ref('getting-started')

const quickStart = [
  { title: 'Set up your store', icon: 'ph:storefront-bold', time: '5 min' },
  { title: 'Add your first product', icon: 'ph:package-bold', time: '3 min' },
  { title: 'Connect a payment gateway', icon: 'ph:credit-card-bold', time: '10 min' },
  { title: 'Go live', icon: 'ph:rocket-launch-bold', time: '2 min' },
]

const docGroups = [
  {
    title: 'Getting Started',
    items: [
      { id: 'getting-started', label: 'Introduction' },
      { id: 'store-setup', label: 'Store Setup' },
      { id: 'team-members', label: 'Team & Permissions' },
    ],
  },
  {
    title: 'Products & Inventory',
    items: [
      { id: 'products', label: 'Adding Products' },
      { id: 'inventory', label: 'Inventory Management' },
      { id: 'variants', label: 'Variants & Options' },
    ],
  },
  {
    title: 'Orders & Fulfillment',
    items: [
      { id: 'orders', label: 'Processing Orders' },
      { id: 'shipping', label: 'Shipping Setup' },
      { id: 'returns', label: 'Returns & Refunds' },
    ],
  },
  {
    title: 'Developer',
    items: [
      { id: 'api', label: 'REST API' },
      { id: 'webhooks', label: 'Webhooks' },
    ],
  },
]

const allDocs = [
  {
    id: 'getting-started',
    title: 'Introduction to StoreOS',
    updated: 'May 15, 2026',
    content: [
      'StoreOS is a unified commerce operating system that gives merchants a single platform to manage their entire online business — from product catalog and inventory, to orders, analytics, and store design.',
      'This documentation covers everything you need to set up, configure, and grow your store on StoreOS. Whether you\'re just getting started or integrating advanced features, you\'ll find detailed guides and references here.',
      'If you have a question that isn\'t answered here, visit our Help Center or reach out to support at support@storeos.io.',
    ],
  },
  {
    id: 'store-setup',
    title: 'Setting Up Your Store',
    updated: 'May 10, 2026',
    content: [
      'After completing the onboarding flow, your store is created with sensible defaults. You can customize your store name, currency, timezone, and other core settings from the Settings → Store Information page.',
      'Upload your logo, set your store\'s primary language, and configure your business address for invoices and tax purposes.',
      'We recommend completing your payment gateway setup and adding at least one shipping zone before going live.',
    ],
  },
  {
    id: 'products',
    title: 'Adding Products',
    updated: 'May 18, 2026',
    content: [
      'Navigate to Products → Add Product to create your first listing. Fill in the product name, description, and upload images. StoreOS supports up to 50 images per product.',
      'Set your price, SKU, and stock quantity. If your product has variants (size, color, etc.), use the Variants tab to configure each combination individually.',
      'Products can be saved as drafts and published when ready. Scheduled publishing is available on Growth and Enterprise plans.',
    ],
  },
  {
    id: 'orders',
    title: 'Processing Orders',
    updated: 'May 22, 2026',
    content: [
      'New orders appear in the Orders section automatically. Each order has a status: Pending, Confirmed, Fulfilled, or Cancelled.',
      'To fulfill an order, open it and click Fulfill. You\'ll be prompted to enter a tracking number if you\'re using a manual shipping process, or the shipment will be created automatically if you\'ve connected a shipping carrier.',
      'You can issue partial refunds, full refunds, and create return labels directly from the order detail page.',
    ],
  },
  {
    id: 'api',
    title: 'REST API',
    updated: 'May 20, 2026',
    content: [
      'The StoreOS API follows REST conventions and returns JSON responses. All requests must be authenticated using a Bearer token obtained from Settings → Developer → API Keys.',
      'Base URL: https://api.storeos.io/v1. Rate limits are 1,000 requests/minute on Growth plans and unlimited on Enterprise.',
      'Full OpenAPI specification is available at https://api.storeos.io/v1/openapi.json. We maintain client libraries for Node.js, Python, and PHP.',
    ],
  },
  {
    id: 'team-members', title: 'Team & Permissions', updated: 'May 12, 2026',
    content: ['Invite team members from Settings → Staff & Permissions. Assign roles (Admin, Manager, Support) or create custom roles with granular permissions per resource type.'],
  },
  {
    id: 'inventory', title: 'Inventory Management', updated: 'May 14, 2026',
    content: ['Track stock levels per product and variant. Set low-stock alerts to get notified before items sell out. Bulk import inventory via CSV from the Inventory page.'],
  },
  {
    id: 'variants', title: 'Variants & Options', updated: 'May 16, 2026',
    content: ['Add option groups (e.g. Size, Color) to your products. Each combination generates a variant with its own price, SKU, and stock count.'],
  },
  {
    id: 'shipping', title: 'Shipping Setup', updated: 'May 11, 2026',
    content: ['Create shipping zones in Settings → Shipping & Logistics. Assign flat rates or carrier-calculated rates per zone. Connect Aramex, DHL, or Bosta for automatic label generation.'],
  },
  {
    id: 'returns', title: 'Returns & Refunds', updated: 'May 9, 2026',
    content: ['Process returns from the order detail page. Choose to restock items automatically or manually. Issue refunds to the original payment method with one click.'],
  },
  {
    id: 'webhooks', title: 'Webhooks', updated: 'May 21, 2026',
    content: ['Register webhook endpoints in Settings → Developer → Webhooks. Subscribe to events like order.created, product.updated, and inventory.low. All payloads are signed with HMAC-SHA256.'],
  },
]
</script>
