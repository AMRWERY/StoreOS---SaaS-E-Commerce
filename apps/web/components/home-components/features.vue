<template>
  <div>
    <section class="py-24 px-6 border-t border-white/5">
      <div class="max-w-7xl mx-auto">
        <!-- Section 1: Dashboard Features -->
        <div class="mb-32">
          <h2 class="text-3xl md:text-4xl font-bold mb-12 max-w-md leading-tight">
            Built for operations, not just storefronts.
          </h2>

          <div class="grid lg:grid-cols-2 gap-16 items-start">
            <div class="space-y-4">
              <VButton v-for="f in features" :key="f.id" @click="activeTab = f.id" variant="none" :className="[
                'w-full text-start p-6 rounded-2xl transition-all duration-300 border',
                activeTab === f.id ? 'bg-indigo-600/10 border-indigo-500/30' : 'bg-transparent border-transparent opacity-50 hover:opacity-80'
              ]">
                <h3 class="font-bold text-lg mb-2">{{ f.title }}</h3>
                <p class="text-sm text-gray-400 leading-relaxed">{{ f.desc }}</p>
              </VButton>
            </div>

            <!-- Interactive Dashboard Mockup -->
            <div
              class="bg-indigo-950/20 border border-white/5 rounded-3xl p-6 aspect-square lg:aspect-auto h-full min-h-[400px]">
              <div class="flex gap-4 mb-8">
                <div class="h-2 w-12 bg-white/10 rounded-full"></div>
                <div class="h-2 w-12 bg-white/10 rounded-full"></div>
              </div>
              <!-- Kanban Mockup Visual -->
              <div class="grid grid-cols-3 gap-4">
                <div v-for="i in 3" :key="i" class="space-y-3">
                  <div class="h-1.5 w-1/2 bg-white/5 rounded mb-4"></div>
                  <div v-for="j in 2" :key="j" class="bg-white/5 border border-white/10 h-24 rounded-xl p-3">
                    <div class="h-1.5 w-3/4 bg-white/10 rounded mb-2"></div>
                    <div class="h-1 w-1/2 bg-white/5 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Integrations -->
        <div class="text-center mb-32">
          <h2 class="text-3xl font-bold mb-12">Connects with everything you use</h2>
          <div class="flex flex-wrap justify-center gap-4">
            <div v-for="brand in integrations" :key="brand.name"
              class="bg-white/[0.03] border border-white/5 px-8 py-6 rounded-2xl min-w-[140px] hover:bg-white/[0.05] transition-colors">
              <div class="font-bold text-lg mb-1">{{ brand.name }}</div>
              <div class="text-[10px] tracking-widest text-gray-500">{{ brand.sub }}</div>
            </div>
          </div>
        </div>

        <!-- Section 3: Go Live Steps -->
        <div class="text-center">
          <h2 class="text-4xl font-bold mb-16">Go live in under 10 minutes</h2>
          <div class="grid md:grid-cols-3 gap-12 relative">
            <!-- Connector line for desktop -->
            <div class="hidden md:block absolute top-12 start-0 w-full h-px bg-white/5 -z-10"></div>

            <div v-for="step in steps" :key="step.id" class="flex flex-col items-center">
              <div
                class="w-24 h-24 rounded-full bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-2xl font-bold text-indigo-400 mb-8 backdrop-blur-sm">
                {{ step.id }}
              </div>
              <h3 class="text-xl font-bold mb-4">{{ step.title }}</h3>
              <p class="text-gray-400 text-sm leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const activeTab = ref('orders')

const features = [
  { id: 'orders', title: 'Orders (Kanban)', desc: 'Visualize your order flow from "New" to "Shipped" with automated status updates.' },
  { id: 'inventory', title: 'Inventory', desc: 'Low-stock alerts, bulk imports, and multi-warehouse support.' },
  { id: 'crm', title: 'Customers (CRM)', desc: 'Every interaction, every order, every complaint in one unified profile.' },
  { id: 'analytics', title: 'Analytics', desc: 'Real-time revenue, LTV, and profit tracking with drill-down reports.' }
]

const integrations = [
  { name: 'Stripe', sub: 'Payments' },
  { name: 'Aramex', sub: 'Shipping' },
  { name: 'Paymob', sub: 'Local Pay' },
  { name: 'WA', sub: 'WhatsApp' },
  { name: 'Vodafone', sub: 'Cash' },
  { name: 'J&T', sub: 'Logistics' }
]

const steps = [
  { id: '01', title: 'Set up your workspace', desc: 'Connect your domain, configure your taxes, and choose your preferred local shipping partners.' },
  { id: '02', title: 'Add your products', desc: 'Sync from Instagram, upload via CSV, or connect your existing Excel sheets in one-click.' },
  { id: '03', title: 'Manage & Grow', desc: 'Automate your order workflows and use real-time data to restock what actually sells.' }
]
</script>