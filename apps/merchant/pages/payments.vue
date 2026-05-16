<template>
  <div class="bg-bg-base min-h-screen">
    <!-- Hero Section -->
    <section class="relative pt-32 pb-24 px-6 overflow-hidden border-b border-border-subtle">
      <!-- Background Abstract -->
      <div class="absolute inset-0 z-0">
        <img src="/img/payments-hero.png" alt="Payments Background" class="w-full h-full object-cover opacity-30" />
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-bg-base/60 to-bg-base"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="max-w-3xl">
          <p class="text-[10px] font-black tracking-[0.4em] text-success mb-6 uppercase">Payments & Checkout</p>
          <h1 class="text-5xl md:text-7xl font-bold leading-tight mb-8">
            Convert visitors into<br />
            <span class="text-tx-secondary text-success/80">loyal customers.</span>
          </h1>
          <p class="text-lg md:text-xl text-tx-secondary leading-relaxed mb-10">
            Accept payments globally with a single integration. StoreOS provides a conversion-optimized checkout
            experience that supports local and international payment methods out of the box.
          </p>
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <LazyVButton variant="none"
              className="bg-success hover:bg-success/90 text-black flex items-center justify-center gap-2 rounded-md font-bold text-sm py-4 px-8 shadow-lg shadow-success/20 transition-all active:scale-[0.98]">
              Start Accepting Payments</LazyVButton>
            <LazyVButton variant="outline" size="lg">Contact Sales</LazyVButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Supported Gateways -->
    <section class="py-24 px-6 border-b border-border-subtle">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
          <div class="flex-1">
            <h2 class="text-3xl font-bold mb-4">One platform, all your gateways.</h2>
            <p class="text-tx-secondary leading-relaxed">
              Whether you're selling locally or expanding globally, StoreOS connects you with the most reliable payment
              providers in the industry.
            </p>
          </div>
          <div class="flex-1 grid grid-cols-3 gap-6">
            <div v-for="g in gateways" :key="g.name"
              class="flex flex-col items-center gap-3 p-6 rounded-2xl bg-bg-primary border border-border-subtle hover:border-success/30 transition-all group">
              <div :class="['w-12 h-12 rounded-xl flex items-center justify-center text-2xl', g.bg]">
                <Icon :name="g.icon" :class="g.color" />
              </div>
              <span
                class="text-[10px] font-bold text-tx-muted group-hover:text-tx-primary transition-colors tracking-widest uppercase">{{
                  g.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="py-32 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="f in features" :key="f.title"
            class="p-8 rounded-3xl bg-bg-elevated border border-border-subtle hover:border-success/20 transition-all group">
            <div
              class="w-12 h-12 rounded-xl bg-success-dim flex items-center justify-center text-success mb-6 group-hover:scale-110 transition-transform">
              <Icon :name="f.icon" class="text-2xl" />
            </div>
            <h3 class="text-xl font-bold mb-4">{{ f.title }}</h3>
            <p class="text-tx-secondary text-sm leading-relaxed">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Visual Checkout Demo -->
    <section class="py-32 px-6 bg-bg-primary overflow-hidden">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
        <div class="flex-1">
          <h2 class="text-4xl font-bold mb-6">Designed for conversion.</h2>
          <p class="text-tx-secondary leading-relaxed mb-8">
            Our checkout experience is engineered for speed and simplicity.
            Reduce cart abandonment with one-click checkout, guest accounts, and localized payment UI.
          </p>
          <ul class="space-y-4">
            <li v-for="item in benefits" :key="item" class="flex items-center gap-3 text-sm text-tx-primary">
              <Icon name="ph:check-circle-fill" class="text-success" />
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="flex-1 relative">
          <!-- Checkout Mockup -->
          <div
            class="rounded-3xl border border-border-subtle bg-bg-base p-8 shadow-2xl shadow-black/40 max-w-md mx-auto">
            <div class="flex items-center justify-between mb-8">
              <h3 class="font-bold">Checkout</h3>
              <span class="text-xs text-tx-muted">$1,250.00</span>
            </div>
            <div class="space-y-4">
              <div class="p-4 rounded-xl border border-success bg-success/10 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <Icon name="ph:credit-card-fill" class="text-success text-xl" />
                  <span class="text-sm font-bold">Credit Card</span>
                </div>
                <Icon name="ph:caret-right-bold" class="text-[10px] text-success" />
              </div>
              <div
                class="p-4 rounded-xl border border-border-subtle hover:border-border-default flex items-center justify-between transition-colors">
                <div class="flex items-center gap-3">
                  <Icon name="ph:device-mobile-fill" class="text-tx-muted text-xl" />
                  <span class="text-sm font-bold">Mobile Wallet</span>
                </div>
              </div>
              <div
                class="p-4 rounded-xl border border-border-subtle hover:border-border-default flex items-center justify-between transition-colors">
                <div class="flex items-center gap-3">
                  <Icon name="ph:money-fill" class="text-tx-muted text-xl" />
                  <span class="text-sm font-bold">Cash on Delivery</span>
                </div>
              </div>
            </div>
            <LazyVButton variant="none"
              className="w-full mt-8 bg-success text-black font-extrabold py-4 rounded-xl shadow-lg shadow-success/10 transition-all active:scale-[0.98]">
              Pay Now</LazyVButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: "Payments — High Conversion Checkout",
  description: "Accept payments globally with StoreOS. Support Stripe, Paymob, Vodafone Cash, and more with our optimized checkout engine.",
  ogTitle: "StoreOS Payments — Secure & Fast",
  ogDescription: "The most reliable payment infrastructure for modern commerce.",
})

const gateways = [
  { name: 'Stripe', icon: 'ph:stripe-logo-fill', bg: 'bg-[#635bff]/10', color: 'text-[#635bff]' },
  { name: 'Paymob', icon: 'ph:bank-fill', bg: 'bg-emerald-500/10', color: 'text-emerald-400' },
  { name: 'Vodafone', icon: 'ph:device-mobile-fill', bg: 'bg-red-500/10', color: 'text-red-400' },
]

const features = [
  { title: 'Global Coverage', desc: 'Accept 135+ currencies and local payment methods tailored to your customers location.', icon: 'ph:globe-hemisphere-west-fill' },
  { title: 'Fraud Prevention', desc: 'Enterprise-grade security and machine learning to block fraudulent transactions before they happen.', icon: 'ph:shield-check-fill' },
  { title: 'Instant Payouts', desc: 'Get your money faster with our optimized settlement engine and direct bank integrations.', icon: 'ph:lightning-fill' },
]

const benefits = [
  'Mobile-first responsive design',
  'One-click checkout for repeat customers',
  'Automatic tax calculation',
  'Guest checkout by default',
  'Localized payment methods support',
]
</script>