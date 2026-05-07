<template>
  <div class="bg-bg-base min-h-screen text-tx-primary">
    <!-- Hero Section -->
    <section class="relative pt-32 pb-24 px-6 overflow-hidden border-b border-border-subtle">
      <!-- Background Abstract -->
      <div class="absolute inset-0 z-0">
        <img src="/img/marketing-hero.png" alt="Marketing Background" class="w-full h-full object-cover opacity-30" />
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-bg-base/60 to-bg-base"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="max-w-3xl">
          <p class="text-[10px] font-black tracking-[0.4em] text-purple mb-6 uppercase">Growth & Marketing</p>
          <h1 class="text-5xl md:text-7xl font-bold leading-tight mb-8 text-white">
            Grow faster with<br />
            <span class="text-tx-secondary text-purple/80">data-driven marketing.</span>
          </h1>
          <p class="text-lg md:text-xl text-tx-secondary leading-relaxed mb-10">
            Stop guessing and start growing. StoreOS provides deep integration with the world's most
            powerful marketing platforms, giving you a unified view of your ROI and customer behavior.
          </p>
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <LazyVButton size="lg" shadow className="bg-purple hover:bg-purple/90 text-white">Supercharge Your Growth
            </LazyVButton>
            <LazyVButton variant="outline" size="lg">Explore Analytics</LazyVButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Marketing Stack -->
    <section class="py-24 px-6 border-b border-border-subtle">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
          <div class="flex-1">
            <h2 class="text-3xl font-bold mb-4">Your entire marketing stack, unified.</h2>
            <p class="text-tx-secondary leading-relaxed">
              Native pixel integrations and server-side tracking ensure 100% data accuracy for all your advertising
              campaigns.
            </p>
          </div>
          <div class="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="m in tools" :key="m.name"
              class="p-6 rounded-2xl bg-bg-primary border border-border-subtle hover:border-purple/30 transition-all group flex flex-col items-center gap-3">
              <div
                :class="['w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-transform group-hover:scale-110', m.bg]">
                <Icon :name="m.icon" :class="m.color" />
              </div>
              <span
                class="text-[10px] font-bold text-tx-muted group-hover:text-tx-primary tracking-widest uppercase transition-colors">{{
                  m.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ROI & Analytics Features -->
    <section class="py-32 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="f in features" :key="f.title"
            class="p-8 rounded-3xl bg-bg-elevated border border-border-subtle hover:border-purple/20 transition-all group">
            <div
              class="w-12 h-12 rounded-xl bg-purple-dim flex items-center justify-center text-purple mb-6 group-hover:bg-purple group-hover:text-white transition-all">
              <Icon :name="f.icon" class="text-2xl" />
            </div>
            <h3 class="text-xl font-bold mb-4">{{ f.title }}</h3>
            <p class="text-tx-secondary text-sm leading-relaxed">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Growth Dashboard Preview -->
    <section class="py-32 px-6 bg-bg-primary overflow-hidden">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <div class="flex-1">
          <p class="text-[10px] font-black tracking-[0.3em] text-purple mb-4 uppercase">Analytics</p>
          <h2 class="text-4xl font-bold mb-6 text-white">Understand your true ROI.</h2>
          <p class="text-tx-secondary leading-relaxed mb-8">
            Our unified marketing dashboard pulls data from all your channels, giving you a clear picture of
            customer acquisition cost (CAC), lifetime value (LTV), and real-time campaign performance.
          </p>
          <div class="grid grid-cols-2 gap-6">
            <div v-for="stat in stats" :key="stat.label" class="p-4 rounded-xl border border-border-subtle bg-bg-base">
              <div class="text-2xl font-bold text-purple mb-1">{{ stat.value }}</div>
              <div class="text-[9px] font-black text-tx-muted uppercase tracking-widest">{{ stat.label }}</div>
            </div>
          </div>
        </div>
        <div class="flex-1 relative">
          <!-- Data Visualization Mockup -->
          <div class="rounded-3xl border border-border-subtle bg-bg-base p-8 shadow-2xl relative overflow-hidden">
            <div class="flex items-center justify-between mb-8">
              <h3 class="font-bold text-sm">Campaign Performance</h3>
              <div class="flex gap-2">
                <div class="w-20 h-6 rounded bg-bg-elevated"></div>
                <div class="w-20 h-6 rounded bg-purple-dim border border-purple/20"></div>
              </div>
            </div>

            <!-- Floating chart bars -->
            <div class="flex items-end gap-2 h-40 mb-4">
              <div v-for="h in [40, 65, 45, 80, 55, 95, 70]" :key="h"
                class="flex-1 bg-purple/20 rounded-t-lg group relative hover:bg-purple/50 transition-all"
                :style="`height: ${h}%`">
                <div
                  class="absolute -top-8 start-1/2 -translate-x-1/2 bg-purple text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  +{{ h }}%
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border-subtle">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-brand-dim flex items-center justify-center text-brand">
                  <Icon name="ph:meta-logo-fill" />
                </div>
                <div>
                  <div class="text-xs font-bold">Meta Ads</div>
                  <div class="text-[9px] text-success font-bold">ROAS 4.2x</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-orange-dim flex items-center justify-center text-orange">
                  <Icon name="ph:tiktok-logo-fill" />
                </div>
                <div>
                  <div class="text-xs font-bold">TikTok Ads</div>
                  <div class="text-[9px] text-success font-bold">ROAS 3.8x</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: "Marketing & Growth — Data-Driven Commerce",
  description: "Scale your e-commerce business with StoreOS and our powerful marketing integrations. Meta Pixel, TikTok, Klaviyo, and more.",
  ogTitle: "StoreOS Marketing — Built for Growth",
  ogDescription: "The growth engine for modern merchants.",
})

const tools = [
  { name: 'Meta Ads', icon: 'ph:meta-logo-fill', bg: 'bg-[#0668E1]/10', color: 'text-[#0668E1]' },
  { name: 'TikTok', icon: 'ph:tiktok-logo-fill', bg: 'bg-bg-primary', color: 'text-[#00f2ea]' },
  { name: 'GA4', icon: 'ph:google-logo-fill', bg: 'bg-orange-500/10', color: 'text-orange-400' },
  { name: 'Klaviyo', icon: 'ph:paper-plane-right-fill', bg: 'bg-success-dim', color: 'text-success' },
]

const features = [
  { title: 'Server-Side Tracking', desc: 'Bypass ad blockers and iOS privacy restrictions with high-accuracy server-side event tracking.', icon: 'ph:shield-check-fill' },
  { title: 'Real-time ROI', desc: 'See instantly which channels are driving sales and optimize your ad spend on the fly.', icon: 'ph:chart-line-up-fill' },
  { title: 'Audience Syncing', desc: 'Automatically sync your customer segments to Meta and TikTok for highly targeted remarketing.', icon: 'ph:users-three-fill' },
]

const stats = [
  { label: 'AVG GROWTH', value: '+142%' },
  { label: 'ACCURACY', value: '100%' },
  { label: 'CHANNELS', value: '12+' },
  { label: 'REVENUE SYNC', value: 'REAL-TIME' },
]
</script>