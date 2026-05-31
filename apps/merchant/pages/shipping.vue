<template>
  <div class="bg-bg-base min-h-screen text-tx-primary pb-32">
    <!-- Header -->
    <header class="pt-32 pb-24 px-6 border-b border-border-subtle bg-bg-primary/50 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent pointer-events-none" />
      <div class="absolute -top-40 -end-40 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
      <div class="max-w-5xl mx-auto relative z-10">
        <div class="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 rounded-full px-4 py-1.5 mb-8">
          <Icon name="ph:truck-bold" class="text-brand text-sm" />
          <span class="text-[10px] font-black tracking-[0.3em] text-brand uppercase">Shipping & Logistics</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Ship faster.<br />
          <span class="text-tx-secondary">Stress less.</span>
        </h1>
        <p class="text-tx-secondary text-lg max-w-2xl leading-relaxed mb-10">
          Connect 10+ carriers, auto-generate labels, calculate live rates at checkout, and manage returns — all from
          one unified shipping dashboard.
        </p>
        <div class="flex flex-wrap gap-4">
          <LazyVButton to="/auth/register" label="Start shipping free" icon="ph:arrow-right-bold"
            className="px-7 py-3.5 rounded-xl shadow-lg shadow-brand/20" />
          <LazyVButton to="/integrations" label="View all carriers" variant="secondary"
            className="px-7 py-3.5 rounded-xl" />
        </div>
      </div>
    </header>

    <!-- Stats -->
    <section class="py-16 px-6 border-b border-border-subtle bg-bg-primary/30">
      <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        <LazyVStatCard v-for="stat in stats" :key="stat.label" :label="stat.label" :value="stat.value"
          :icon-name="stat.icon" :trend="stat.trend" trend-color="text-success" />
      </div>
    </section>

    <!-- Carriers -->
    <section class="py-24 px-6 border-b border-border-subtle">
      <div class="max-w-5xl mx-auto">
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted mb-4 uppercase">Carriers</p>
            <h2 class="text-3xl font-bold mb-5">Every major carrier, ready out of the box</h2>
            <p class="text-tx-secondary leading-relaxed mb-8">
              Connect Aramex, DHL, Bosta, J&T, ShipBob, and more in minutes. Automatic rate fetching, label printing,
              and tracking — no developer required.
            </p>
            <div class="space-y-3">
              <div v-for="carrier in carriers" :key="carrier.name"
                class="flex items-center gap-4 p-4 bg-bg-primary border border-border-subtle rounded-xl hover:border-brand/30 transition-all">
                <div class="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center text-xl shrink-0">
                  {{ carrier.emoji }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-bold text-sm">{{ carrier.name }}</p>
                  <p class="text-xs text-tx-muted">{{ carrier.coverage }}</p>
                </div>
                <span v-if="carrier.popular"
                  class="text-[9px] font-black tracking-wider text-brand bg-brand/10 px-2 py-0.5 rounded-full">POPULAR</span>
              </div>
            </div>
          </div>
          <!-- Mock dashboard panel -->
          <div class="bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
            <div class="h-10 bg-bg-elevated border-b border-border-subtle flex items-center px-4 gap-2">
              <div class="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-green-500/40"></div>
              <span class="text-[10px] text-tx-muted ms-3 font-mono">Shipping Dashboard</span>
            </div>
            <div class="p-5 space-y-3">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold">Pending Labels</span>
                <span class="text-[10px] font-black text-brand bg-brand/10 px-2 py-0.5 rounded-full">7 orders</span>
              </div>
              <div v-for="shipment in mockShipments" :key="shipment.id"
                class="flex items-center gap-3 p-3 bg-bg-elevated rounded-xl border border-border-subtle">
                <div class="text-base">{{ shipment.carrier }}</div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold">{{ shipment.id }}</p>
                  <p class="text-[10px] text-tx-muted">{{ shipment.destination }}</p>
                </div>
                <span class="text-[9px] font-black px-2 py-0.5 rounded-md"
                  :class="shipment.status === 'Label Ready' ? 'bg-success-dim text-success' : shipment.status === 'In Transit' ? 'bg-info-dim text-info' : 'bg-warning-dim text-warning'">
                  {{ shipment.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features grid -->
    <section class="py-24 px-6 border-b border-border-subtle bg-bg-primary/20">
      <div class="max-w-5xl mx-auto">
        <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted mb-4 uppercase text-center">Core Features</p>
        <h2 class="text-3xl font-bold mb-16 text-center">Everything your logistics team needs</h2>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div v-for="feature in features" :key="feature.title"
            class="bg-bg-primary border border-border-subtle rounded-2xl p-7 hover:border-brand/30 transition-all group">
            <div
              class="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center mb-5 group-hover:bg-brand group-hover:scale-105 transition-all duration-300">
              <Icon :name="feature.icon" class="text-brand text-xl group-hover:text-white transition-colors" />
            </div>
            <h3 class="font-bold mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-tx-secondary leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Shipping zones -->
    <section class="py-24 px-6 border-b border-border-subtle">
      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <!-- Zone rules panel -->
        <div
          class="bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden shadow-xl shadow-black/10 order-2 md:order-1">
          <div class="px-6 py-4 border-b border-border-subtle">
            <span class="text-xs font-bold">Shipping Zones</span>
          </div>
          <div class="p-4 space-y-3">
            <div v-for="zone in mockZones" :key="zone.name"
              class="flex items-center gap-4 p-4 bg-bg-elevated rounded-xl border border-border-subtle">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm" :class="zone.color">
                <Icon name="ph:map-pin-bold" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold">{{ zone.name }}</p>
                <p class="text-[10px] text-tx-muted">{{ zone.rate }}</p>
              </div>
              <span class="text-[9px] font-bold text-success">{{ zone.orders }} orders</span>
            </div>
            <div
              class="flex items-center gap-2 p-3 border border-dashed border-border-subtle rounded-xl cursor-pointer hover:border-brand/40 transition-all text-center justify-center">
              <Icon name="ph:plus-bold" class="text-tx-muted text-sm" />
              <span class="text-xs text-tx-muted">Add new zone</span>
            </div>
          </div>
        </div>
        <div class="order-1 md:order-2">
          <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted mb-4 uppercase">Zones & Rates</p>
          <h2 class="text-3xl font-bold mb-5">Build shipping rules that match your business</h2>
          <p class="text-tx-secondary leading-relaxed mb-6">
            Create unlimited shipping zones with custom rules — flat rates, weight-based pricing, free shipping
            thresholds, and carrier-calculated rates. Changes go live instantly.
          </p>
          <ul class="space-y-3">
            <li v-for="point in zonePoints" :key="point" class="flex items-center gap-3 text-sm text-tx-secondary">
              <Icon name="ph:check-circle-fill" class="text-brand shrink-0" />
              {{ point }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Tracking & Returns -->
    <section class="py-24 px-6 border-b border-border-subtle bg-bg-primary/20">
      <div class="max-w-5xl mx-auto">
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Tracking card -->
          <div class="bg-bg-primary border border-border-subtle rounded-2xl p-8">
            <div class="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-6">
              <Icon name="ph:map-trifold-bold" class="text-brand text-2xl" />
            </div>
            <h3 class="text-xl font-bold mb-3">Live order tracking</h3>
            <p class="text-sm text-tx-secondary leading-relaxed mb-6">
              Customers get a branded tracking page with real-time status updates. No more "where's my order?" tickets.
            </p>
            <div class="space-y-3">
              <div v-for="event in trackingEvents" :key="event.label" class="flex items-center gap-4">
                <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  :class="event.active ? 'bg-brand text-white' : 'bg-bg-elevated border border-border-subtle text-tx-muted'">
                  <Icon :name="event.icon" class="text-xs" />
                </div>
                <div class="flex-1">
                  <p class="text-xs font-bold" :class="event.active ? 'text-tx-primary' : 'text-tx-muted'">{{
                    event.label }}</p>
                  <p class="text-[10px] text-tx-muted">{{ event.time }}</p>
                </div>
                <div v-if="event.active" class="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></div>
              </div>
            </div>
          </div>

          <!-- Returns card -->
          <div class="bg-bg-primary border border-border-subtle rounded-2xl p-8">
            <div class="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6">
              <Icon name="ph:arrow-counter-clockwise-bold" class="text-orange-400 text-2xl" />
            </div>
            <h3 class="text-xl font-bold mb-3">Returns, handled</h3>
            <p class="text-sm text-tx-secondary leading-relaxed mb-6">
              Issue return labels, process refunds, and restock inventory — all from the order detail page with a single
              click.
            </p>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="metric in returnMetrics" :key="metric.label"
                class="bg-bg-elevated border border-border-subtle rounded-xl p-4 text-center">
                <p class="text-xl font-black mb-0.5" :class="metric.color">{{ metric.value }}</p>
                <p class="text-[10px] text-tx-muted font-medium">{{ metric.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 px-6">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to streamline your shipping?</h2>
        <p class="text-tx-secondary mb-10">Set up in minutes. Your first 500 labels are free.</p>
        <LazyVButton to="/auth/register" label="Get started free" icon="ph:arrow-right-bold"
          className="px-8 py-4 rounded-xl shadow-lg shadow-brand/20" />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const stats = [
  { value: '10+', label: 'Carriers integrated', icon: 'ph:truck-bold', trend: 'Regional & global' },
  { value: '<2s', label: 'Rate calculation', icon: 'ph:lightning-bold', trend: 'Live at checkout' },
  { value: '1-click', label: 'Label generation', icon: 'ph:printer-bold', trend: 'Bulk supported' },
  { value: '99.8%', label: 'Tracking accuracy', icon: 'ph:map-pin-bold', trend: 'Real-time' },
]

const carriers = [
  { emoji: '📦', name: 'Aramex', coverage: 'MENA · Same-day & next-day', popular: true },
  { emoji: '🟡', name: 'DHL Express', coverage: 'International · 220+ countries', popular: true },
  { emoji: '🚀', name: 'Bosta', coverage: 'Egypt & KSA · Last-mile', popular: true },
  { emoji: '🔴', name: 'J&T Express', coverage: 'GCC & Southeast Asia', popular: false },
  { emoji: '🏭', name: 'ShipBob', coverage: 'Outsourced fulfillment', popular: false },
]

const mockShipments = [
  { id: '#SO-9831', carrier: '📦', destination: 'Cairo, Egypt', status: 'Label Ready' },
  { id: '#SO-9830', carrier: '🟡', destination: 'Dubai, UAE', status: 'In Transit' },
  { id: '#SO-9829', carrier: '🚀', destination: 'Riyadh, KSA', status: 'Pending' },
  { id: '#SO-9828', carrier: '📦', destination: 'Alexandria, Egypt', status: 'Label Ready' },
]

const features = [
  { icon: 'ph:barcode-bold', title: 'Auto label generation', description: 'Print single or bulk shipping labels in one click. Supports A4, thermal, and PDF formats.' },
  { icon: 'ph:calculator-bold', title: 'Live rate calculation', description: 'Show real carrier rates at checkout — let customers choose their preferred speed and cost.' },
  { icon: 'ph:map-pin-area-bold', title: 'Shipping zones', description: 'Create unlimited zones with flat rates, weight tiers, free thresholds, or carrier-calculated pricing.' },
  { icon: 'ph:map-trifold-bold', title: 'Branded tracking pages', description: 'A custom tracking page with your logo, colors, and real-time shipment status updates.' },
  { icon: 'ph:arrow-counter-clockwise-bold', title: 'Returns management', description: 'Generate return labels, process refunds, and restock inventory from the order page.' },
  { icon: 'ph:bell-ringing-bold', title: 'Delivery notifications', description: 'Automated SMS and email alerts at every shipping milestone — dispatched, in transit, delivered.' },
]

const mockZones = [
  { name: 'Greater Cairo', rate: 'EGP 25 flat · Free over EGP 300', orders: '3,240', color: 'bg-brand/10 text-brand' },
  { name: 'Alexandria', rate: 'EGP 35 flat · Free over EGP 400', orders: '980', color: 'bg-info-dim text-info' },
  { name: 'International (GCC)', rate: 'Carrier-calculated · DHL', orders: '412', color: 'bg-success-dim text-success' },
  { name: 'Rest of Egypt', rate: 'EGP 50 flat · Free over EGP 500', orders: '1,102', color: 'bg-warning-dim text-warning' },
]

const zonePoints = [
  'Set free shipping thresholds per zone',
  'Weight and dimension-based pricing',
  'Multiple rates per zone (economy vs express)',
  'Blacklist specific postal codes',
  'Instant publish — no deployment needed',
]

const trackingEvents = [
  { icon: 'ph:check-bold', label: 'Order confirmed', time: 'May 30, 9:14 AM', active: false },
  { icon: 'ph:package-bold', label: 'Package picked up by Aramex', time: 'May 30, 2:30 PM', active: false },
  { icon: 'ph:truck-bold', label: 'In transit — Alexandria hub', time: 'May 31, 6:00 AM', active: true },
  { icon: 'ph:house-bold', label: 'Out for delivery', time: 'Estimated today', active: false },
]

const returnMetrics = [
  { value: '96%', label: 'Refunds processed same-day', color: 'text-success' },
  { value: '1-click', label: 'Return label generation', color: 'text-brand' },
  { value: 'Auto', label: 'Inventory restocking', color: 'text-info' },
  { value: 'Zero', label: 'Manual data entry needed', color: 'text-tx-primary' },
]

useSeoMeta({
  title: 'Shipping & Logistics',
  description: 'Connect 10+ carriers, auto-generate labels, calculate live rates at checkout, and manage returns from one unified shipping dashboard.',
})
</script>