<template>
  <div class="bg-bg-base min-h-screen text-tx-primary">
    <!-- Hero Section -->
    <section class="relative pt-32 pb-24 px-6 overflow-hidden border-b border-border-subtle">
      <!-- Background Abstract -->
      <div class="absolute inset-0 z-0">
        <img src="/img/shipping-hero.png" alt="Shipping Background" class="w-full h-full object-cover opacity-30" />
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-bg-base/50 to-bg-base"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="max-w-3xl">
          <p class="text-[10px] font-black tracking-[0.4em] text-info mb-6 uppercase">Logistics & Fulfillment</p>
          <h1 class="text-5xl md:text-7xl font-bold leading-tight mb-8">
            Shipping that scales<br />
            <span class="text-tx-secondary text-info/80">with your ambition.</span>
          </h1>
          <p class="text-lg md:text-xl text-tx-secondary leading-relaxed mb-10">
            From last-mile delivery to international freight. StoreOS automates your logistics
            so you can focus on selling. Connect with world-class carriers in minutes.
          </p>
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <VButton size="lg" shadow className="bg-info hover:bg-info/90 text-white">Automate Your Shipping</VButton>
            <VButton variant="outline" size="lg">View Carrier Rates</VButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Logistics Network -->
    <section class="py-24 px-6 border-b border-border-subtle bg-bg-primary/50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4">Direct integration with leading carriers.</h2>
          <p class="text-tx-secondary max-w-2xl mx-auto">
            Generate labels, track shipments, and manage returns without ever leaving your dashboard.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="c in carriers" :key="c.name"
            class="p-8 rounded-2xl bg-bg-primary border border-border-subtle hover:border-info/30 transition-all group text-center">
            <div
              :class="['w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 transition-transform group-hover:scale-110', c.bg]">
              <Icon :name="c.icon" :class="c.color" />
            </div>
            <h3 class="font-bold text-sm mb-1 group-hover:text-info transition-colors">{{ c.name }}</h3>
            <span class="text-[9px] font-black text-tx-muted uppercase tracking-widest">{{ c.type }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Fulfillment Features -->
    <section class="py-32 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p class="text-[10px] font-black tracking-[0.3em] text-info mb-4 uppercase">Automation</p>
            <h2 class="text-4xl font-bold mb-6">Smart routing for faster delivery.</h2>
            <p class="text-tx-secondary leading-relaxed mb-10">
              Our intelligent routing engine automatically assigns orders to the best warehouse and carrier
              based on customer location, inventory levels, and shipping costs.
            </p>

            <div class="space-y-8">
              <div v-for="f in features" :key="f.title" class="flex gap-6">
                <div class="w-12 h-12 rounded-xl bg-info-dim flex items-center justify-center text-info shrink-0">
                  <Icon :name="f.icon" class="text-2xl" />
                </div>
                <div>
                  <h3 class="font-bold mb-2">{{ f.title }}</h3>
                  <p class="text-sm text-tx-secondary leading-relaxed">{{ f.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Feature Visualization -->
          <div class="relative">
            <div
              class="rounded-3xl border border-border-subtle bg-bg-elevated p-8 shadow-2xl relative overflow-hidden group">
              <div class="flex items-center justify-between mb-8">
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 rounded-full bg-info"></div>
                  <span class="text-xs font-bold uppercase tracking-widest">Active Routing</span>
                </div>
                <span class="text-[10px] text-tx-muted font-bold">LATEST UPDATES</span>
              </div>

              <!-- Simulated map/routing nodes -->
              <div class="space-y-4">
                <div v-for="node in nodes" :key="node.id"
                  class="p-4 rounded-xl bg-bg-base border border-border-subtle flex items-center justify-between group-hover:border-info/20 transition-colors">
                  <div class="flex items-center gap-4">
                    <div class="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center">
                      <Icon name="ph:package-fill" class="text-info text-lg" />
                    </div>
                    <div>
                      <div class="text-xs font-bold">{{ node.id }}</div>
                      <div class="text-[10px] text-tx-muted">{{ node.dest }}</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-[9px] font-black px-2 py-0.5 rounded bg-info-dim text-info">{{ node.carrier
                      }}</span>
                    <Icon name="ph:dots-three-bold" class="text-tx-muted" />
                  </div>
                </div>
              </div>
              <!-- Blur effect -->
              <div class="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-bg-elevated to-transparent"></div>
            </div>
            <!-- Floating badge -->
            <div class="absolute -bottom-6 -end-6 p-6 rounded-2xl bg-white text-black shadow-2xl animate-bounce">
              <div class="flex items-center gap-3">
                <Icon name="ph:lightning-fill" class="text-brand text-2xl" />
                <div>
                  <div class="text-xs font-black leading-none">80% FASTER</div>
                  <div class="text-[10px] font-bold opacity-60">Avg. Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Scalable Infrastructure -->
    <section class="py-32 px-6 bg-info">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-8">Ready to ship better?</h2>
        <p class="text-lg text-white/80 mb-12 max-w-xl mx-auto">
          Join the merchants who have reduced their fulfillment costs by 30% using StoreOS.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <VButton variant="none"
            className="bg-white text-teal-600 hover:bg-white/90 flex items-center justify-center gap-2 rounded-xl font-bold text-sm transition-all duration-200 py-4 px-8 shadow-xl">
            Get Started Now</VButton>
          <VButton variant="none" size="lg" className="text-white hover:text-white/80">Connect with Logistics</VButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: "Shipping — Automated Logistics Infrastructure",
  description: "Connect with Aramex, DHL, Bosta, and more. automate your fulfillment with StoreOS's smart routing engine.",
  ogTitle: "StoreOS Shipping — Fast & Reliable",
  ogDescription: "The operational layer for high-growth logistics.",
})

const carriers = [
  { name: 'Aramex', icon: 'ph:package-fill', bg: 'bg-orange-500/10', color: 'text-orange-400', type: 'EXPRESS' },
  { name: 'J&T Express', icon: 'ph:lightning-fill', bg: 'bg-red-500/10', color: 'text-red-400', type: 'LAST MILE' },
  { name: 'DHL', icon: 'ph:airplane-tilt-fill', bg: 'bg-yellow-500/10', color: 'text-yellow-400', type: 'GLOBAL' },
  { name: 'Bosta', icon: 'ph:motorcycle-fill', bg: 'bg-brand-dim', color: 'text-brand', type: 'SAME DAY' },
]

const features = [
  { title: 'Automated Label Printing', desc: 'Generate and print shipping labels in bulk for any carrier with one click.', icon: 'ph:printer-fill' },
  { title: 'Real-time Tracking', desc: 'Sync tracking numbers automatically and notify customers via SMS or WhatsApp.', icon: 'ph:crosshair-fill' },
  { title: 'Multi-Warehouse Routing', desc: 'Fulfill orders from the warehouse closest to your customer automatically.', icon: 'ph:buildings-fill' },
  { title: 'Returns Management', desc: 'A dedicated portal for customers to initiate and track their own returns.', icon: 'ph:arrows-left-right-fill' },
]

const nodes = [
  { id: '#SHP-4402', dest: 'Sheikh Zayed, Cairo', carrier: 'BOSTA' },
  { id: '#SHP-4401', dest: 'Alexandria, Egypt', carrier: 'ARAMEX' },
  { id: '#SHP-4400', dest: 'Dubai, UAE', carrier: 'DHL' },
]
</script>