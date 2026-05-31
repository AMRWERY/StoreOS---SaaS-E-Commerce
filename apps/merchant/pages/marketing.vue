<template>
  <div class="bg-bg-base min-h-screen text-tx-primary pb-32">
    <!-- Header -->
    <header class="pt-32 pb-24 px-6 border-b border-border-subtle bg-bg-primary/50 relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent pointer-events-none" />
      <div class="absolute -top-40 -end-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div class="max-w-5xl mx-auto relative z-10">
        <div
          class="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-8">
          <Icon name="ph:megaphone-bold" class="text-purple-400 text-sm" />
          <span class="text-[10px] font-black tracking-[0.3em] text-purple-400 uppercase">Marketing Suite</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Grow revenue.<br />
          <span class="text-tx-secondary">Not your workload.</span>
        </h1>
        <p class="text-tx-secondary text-lg max-w-2xl leading-relaxed mb-10">
          Email campaigns, discount engines, ad catalog sync, and customer segmentation — the complete marketing toolkit
          built for e-commerce merchants.
        </p>
        <div class="flex flex-wrap gap-4">
          <LazyVButton to="/auth/register" label="Launch your first campaign" icon="ph:arrow-right-bold"
            className="px-7 py-3.5 rounded-xl shadow-lg shadow-brand/20" />
          <LazyVButton to="/integrations" label="See integrations" variant="secondary"
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

    <!-- Email campaigns -->
    <section class="py-24 px-6 border-b border-border-subtle">
      <div class="max-w-5xl mx-auto">
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted mb-4 uppercase">Email & Automations</p>
            <h2 class="text-3xl font-bold mb-5">Email that sells while you sleep</h2>
            <p class="text-tx-secondary leading-relaxed mb-8">
              Build automated email sequences triggered by customer behavior — abandoned carts, post-purchase flows,
              re-engagement campaigns, and seasonal promotions.
            </p>
            <div class="space-y-3">
              <div v-for="flow in emailFlows" :key="flow.name"
                class="flex items-center gap-4 p-4 bg-bg-primary border border-border-subtle rounded-xl hover:border-purple-500/30 transition-all">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" :class="flow.bg">
                  <Icon :name="flow.icon" :class="flow.color" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-bold text-sm">{{ flow.name }}</p>
                  <p class="text-xs text-tx-muted">{{ flow.desc }}</p>
                </div>
                <div class="text-right shrink-0">
                  <p class="text-xs font-black" :class="flow.metricColor">{{ flow.metric }}</p>
                  <p class="text-[9px] text-tx-muted">avg. revenue</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Campaign preview -->
          <div class="bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
            <div class="h-10 bg-bg-elevated border-b border-border-subtle flex items-center justify-between px-4">
              <span class="text-[10px] text-tx-muted font-mono">Campaign Analytics</span>
              <span class="text-[9px] font-black text-success bg-success-dim px-2 py-0.5 rounded-full">LIVE</span>
            </div>
            <div class="p-5">
              <div class="grid grid-cols-2 gap-3 mb-4">
                <div v-for="kpi in campaignKpis" :key="kpi.label"
                  class="bg-bg-elevated border border-border-subtle rounded-xl p-3 text-center">
                  <p class="text-lg font-black" :class="kpi.color">{{ kpi.value }}</p>
                  <p class="text-[9px] text-tx-muted font-semibold tracking-wide">{{ kpi.label }}</p>
                </div>
              </div>
              <!-- Bar chart mock -->
              <div class="bg-bg-elevated border border-border-subtle rounded-xl p-4">
                <p class="text-[10px] font-bold text-tx-muted mb-3">Opens this week</p>
                <div class="flex items-end gap-1.5 h-16">
                  <div v-for="(bar, i) in [45, 60, 35, 80, 55, 90, 70]" :key="i"
                    class="flex-1 rounded-t-sm transition-all"
                    :class="i === 5 ? 'bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.4)]' : 'bg-purple-500/20'"
                    :style="`height: ${bar}%`" />
                </div>
                <div class="flex justify-between mt-1.5">
                  <span v-for="day in ['M', 'T', 'W', 'T', 'F', 'S', 'S']" :key="day"
                    class="text-[9px] text-tx-muted font-semibold flex-1 text-center">{{ day }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features grid -->
    <section class="py-24 px-6 border-b border-border-subtle bg-bg-primary/20">
      <div class="max-w-5xl mx-auto">
        <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted mb-4 uppercase text-center">Toolkit</p>
        <h2 class="text-3xl font-bold mb-16 text-center">Every growth tool in one place</h2>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div v-for="feature in features" :key="feature.title"
            class="bg-bg-primary border border-border-subtle rounded-2xl p-7 hover:border-purple-500/30 transition-all group">
            <div
              class="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-all duration-300">
              <Icon :name="feature.icon" class="text-purple-400 text-xl" />
            </div>
            <h3 class="font-bold mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-tx-secondary leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Discounts & Promotions -->
    <section class="py-24 px-6 border-b border-border-subtle">
      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted mb-4 uppercase">Promotions Engine</p>
          <h2 class="text-3xl font-bold mb-5">Discounts that don't require a developer</h2>
          <p class="text-tx-secondary leading-relaxed mb-6">
            Create percentage discounts, fixed amounts, buy-X-get-Y offers, free shipping rules, and flash sales — all
            configurable in the dashboard with scheduling built in.
          </p>
          <ul class="space-y-3">
            <li v-for="point in discountPoints" :key="point" class="flex items-center gap-3 text-sm text-tx-secondary">
              <Icon name="ph:check-circle-fill" class="text-purple-400 shrink-0" />
              {{ point }}
            </li>
          </ul>
        </div>
        <!-- Discount builder mock -->
        <div class="bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden shadow-xl shadow-black/10">
          <div class="px-6 py-4 border-b border-border-subtle">
            <span class="text-xs font-bold">New Promotion</span>
          </div>
          <div class="p-5 space-y-4">
            <div v-for="field in discountFields" :key="field.label" class="space-y-1.5">
              <p class="text-[10px] font-black text-tx-muted tracking-wider uppercase">{{ field.label }}</p>
              <div
                class="bg-bg-elevated border border-border-subtle rounded-lg px-3 py-2.5 flex items-center justify-between">
                <span class="text-xs font-semibold text-tx-primary">{{ field.value }}</span>
                <Icon v-if="field.hasChevron" name="ph:caret-down-bold" class="text-tx-muted text-xs" />
              </div>
            </div>
            <div class="pt-2 flex items-center gap-2">
              <div class="flex-1 bg-purple-500/10 border border-purple-500/20 rounded-lg px-3 py-2 text-center">
                <span class="text-[10px] font-black text-purple-400">PREVIEW: Save 20% on checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Integrations strip -->
    <section class="py-24 px-6 border-b border-border-subtle bg-bg-primary/20">
      <div class="max-w-5xl mx-auto">
        <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted mb-4 uppercase text-center">Integrations</p>
        <h2 class="text-2xl font-bold mb-12 text-center">Works with your existing marketing stack</h2>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div v-for="integration in marketingIntegrations" :key="integration.name"
            class="flex items-center gap-4 p-5 bg-bg-primary border border-border-subtle rounded-2xl hover:border-purple-500/30 transition-all">
            <div class="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center text-xl shrink-0">
              {{ integration.emoji }}
            </div>
            <div>
              <p class="font-bold text-sm">{{ integration.name }}</p>
              <p class="text-xs text-tx-muted">{{ integration.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 px-6">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Start growing your store today</h2>
        <p class="text-tx-secondary mb-10">Your first campaign is free. No credit card required.</p>
        <LazyVButton to="/auth/register" label="Launch a campaign" icon="ph:arrow-right-bold"
          className="px-8 py-4 rounded-xl shadow-lg shadow-brand/20" />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const stats = [
  { value: '3.4x', label: 'Avg. email ROI', icon: 'ph:chart-line-up-bold', trend: 'vs. industry avg' },
  { value: '42%', label: 'Cart recovery rate', icon: 'ph:shopping-cart-bold', trend: 'Abandoned cart flows' },
  { value: '60+', label: 'Email templates', icon: 'ph:envelope-bold', trend: 'Ready to use' },
  { value: '8', label: 'Ad channels synced', icon: 'ph:browsers-bold', trend: 'Meta, Google & more' },
]

const emailFlows = [
  { icon: 'ph:shopping-cart-bold', name: 'Abandoned Cart Recovery', desc: '1h, 6h, 24h sequence', metric: '+$4,200/mo', metricColor: 'text-success', bg: 'bg-brand/10', color: 'text-brand' },
  { icon: 'ph:gift-bold', name: 'Post-purchase Upsell', desc: 'Triggered after order confirmed', metric: '+$1,800/mo', metricColor: 'text-success', bg: 'bg-purple-500/10', color: 'text-purple-400' },
  { icon: 'ph:clock-clockwise-bold', name: 'Win-back Campaign', desc: 'For customers inactive 60+ days', metric: '+$940/mo', metricColor: 'text-success', bg: 'bg-orange-500/10', color: 'text-orange-400' },
]

const campaignKpis = [
  { value: '46.2%', label: 'OPEN RATE', color: 'text-brand' },
  { value: '12.8%', label: 'CLICK RATE', color: 'text-purple-400' },
  { value: '$8,340', label: 'ATTRIBUTED REV', color: 'text-success' },
  { value: '312', label: 'CONVERSIONS', color: 'text-info' },
]

const features = [
  { icon: 'ph:envelope-open-bold', title: 'Email campaigns', description: 'Drag-and-drop builder, segmentation, A/B testing, and detailed open/click analytics.' },
  { icon: 'ph:percent-bold', title: 'Discount engine', description: 'Percentage off, fixed amount, BOGO, free shipping — with scheduling and usage limits.' },
  { icon: 'ph:users-three-bold', title: 'Customer segmentation', description: 'Build audiences based on purchase history, lifetime value, location, and behavior.' },
  { icon: 'ph:meta-logo-bold', title: 'Ad catalog sync', description: 'Keep your Facebook and Instagram product catalog in sync automatically — no CSV uploads.' },
  { icon: 'ph:google-logo-bold', title: 'Google Shopping', description: 'Smart Shopping campaigns with automatic bidding and feed management from your dashboard.' },
  { icon: 'ph:share-network-bold', title: 'Referral programs', description: 'Launch a refer-a-friend program in minutes. Reward both referrer and referee automatically.' },
]

const discountPoints = [
  'Schedule campaigns with start and end dates',
  'Set per-customer and total usage limits',
  'Target specific products, collections, or minimum order values',
  'Stack or restrict multiple discounts on one order',
  'Auto-expire and report on discount performance',
]

const discountFields = [
  { label: 'Discount Type', value: 'Percentage — 20% off', hasChevron: true },
  { label: 'Applies To', value: 'All products', hasChevron: true },
  { label: 'Minimum Order', value: 'EGP 200', hasChevron: false },
  { label: 'Usage Limit', value: '500 uses · 1 per customer', hasChevron: false },
  { label: 'Schedule', value: 'Jun 1 → Jun 7, 2026', hasChevron: true },
]

const marketingIntegrations = [
  { emoji: '📧', name: 'Klaviyo', desc: 'Deep e-commerce email & SMS' },
  { emoji: '🐵', name: 'Mailchimp', desc: 'Email campaigns & automation' },
  { emoji: '📘', name: 'Meta Ads', desc: 'Facebook & Instagram catalog sync' },
  { emoji: '🔵', name: 'Google Ads', desc: 'Smart Shopping campaigns' },
  { emoji: '🎵', name: 'TikTok Shop', desc: 'Live stream & video commerce' },
  { emoji: '🎯', name: 'Referral Hero', desc: 'Refer-a-friend programs' },
]

useSeoMeta({
  title: 'Marketing Suite',
  description: 'Email campaigns, discount engines, ad catalog sync, and customer segmentation — the complete marketing toolkit for e-commerce merchants.',
})
</script>