<template>
  <div class="bg-bg-base min-h-screen text-tx-primary pb-32">
    <!-- Header -->
    <header class="pt-32 pb-20 px-6 border-b border-border-subtle bg-bg-primary/50 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent pointer-events-none" />
      <div class="max-w-5xl mx-auto relative z-10">
        <p class="text-[10px] font-black tracking-[0.4em] text-brand mb-6 uppercase">Integrations</p>
        <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">Connect your<br />entire stack.</h1>
        <p class="text-tx-secondary text-lg max-w-2xl leading-relaxed">
          StoreOS integrates with 60+ tools across payments, shipping, marketing, and messaging — so your existing workflows keep working.
        </p>
        <div class="mt-8 max-w-md">
          <LazyVSearchInput v-model="search" placeholder="Search integrations..." input-class="py-3 text-sm" />
        </div>
      </div>
    </header>

    <!-- Categories -->
    <div class="sticky top-0 z-10 bg-bg-base/90 backdrop-blur border-b border-border-subtle px-6 py-4">
      <div class="max-w-5xl mx-auto flex items-center gap-2 overflow-x-auto hide-scrollbar">
        <LazyVButton v-for="cat in categories" :key="cat.id"
          @click="activeCategory = cat.id"
          :label="cat.label"
          :icon="cat.icon"
          icon-position="left"
          variant="none"
          :className="`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${activeCategory === cat.id ? 'bg-brand text-white border-brand' : 'border-border-subtle text-tx-secondary hover:text-tx-primary'}`" />
      </div>
    </div>

    <!-- Integrations Grid -->
    <section class="py-16 px-6">
      <div class="max-w-5xl mx-auto">
        <template v-for="cat in visibleCategories" :key="cat.id">
          <div :id="cat.id" class="mb-16">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                <Icon :name="cat.icon" class="text-brand" />
              </div>
              <h2 class="text-xl font-bold">{{ cat.label }}</h2>
              <span class="text-xs text-tx-muted">{{ filteredIntegrations(cat.id).length }} integrations</span>
            </div>
            <div v-if="filteredIntegrations(cat.id).length" class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div v-for="item in filteredIntegrations(cat.id)" :key="item.name"
                class="bg-bg-primary border border-border-subtle rounded-2xl p-5 hover:border-brand/30 transition-all group cursor-pointer">
                <div class="flex items-start gap-4 mb-3">
                  <div class="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center shrink-0 text-lg">
                    {{ item.emoji }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-bold text-sm mb-0.5">{{ item.name }}</p>
                    <span v-if="item.popular" class="text-[9px] font-black tracking-wider text-brand bg-brand/10 px-2 py-0.5 rounded-full">POPULAR</span>
                  </div>
                </div>
                <p class="text-xs text-tx-muted leading-relaxed">{{ item.description }}</p>
              </div>
            </div>
            <p v-else class="text-sm text-tx-muted">No integrations match your search.</p>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({ title: 'Integrations — StoreOS', description: 'Connect StoreOS with 60+ tools across payments, shipping, marketing, and messaging.' })

const search = ref('')
const activeCategory = ref('all')

const categories = [
  { id: 'all', label: 'All', icon: 'ph:squares-four-bold' },
  { id: 'payments', label: 'Payments', icon: 'ph:credit-card-bold' },
  { id: 'shipping', label: 'Shipping', icon: 'ph:truck-bold' },
  { id: 'marketing', label: 'Marketing', icon: 'ph:megaphone-bold' },
  { id: 'messaging', label: 'Messaging', icon: 'ph:chat-circle-bold' },
]

const integrations = [
  // Payments
  { category: 'payments', name: 'Stripe', emoji: '💳', popular: true, description: 'Accept card payments globally with industry-leading fraud protection.' },
  { category: 'payments', name: 'PayPal', emoji: '🅿️', popular: true, description: 'Let customers pay with their PayPal balance or linked cards.' },
  { category: 'payments', name: 'Paymob', emoji: '💰', popular: true, description: 'MENA-first payment gateway with mobile wallet support.' },
  { category: 'payments', name: 'Fawry', emoji: '🏪', popular: false, description: 'Egypt\'s largest payment network, cash and card.' },
  { category: 'payments', name: 'Tamara', emoji: '🔄', popular: false, description: 'Buy now, pay later for MENA markets.' },
  { category: 'payments', name: 'Apple Pay', emoji: '🍎', popular: true, description: 'One-tap checkout on Apple devices.' },
  // Shipping
  { category: 'shipping', name: 'Aramex', emoji: '📦', popular: true, description: 'Regional courier with same-day and next-day delivery options.' },
  { category: 'shipping', name: 'DHL', emoji: '🟡', popular: true, description: 'International shipping with real-time tracking.' },
  { category: 'shipping', name: 'Bosta', emoji: '🚀', popular: true, description: 'Egypt & Saudi Arabia last-mile delivery, integrated tracking.' },
  { category: 'shipping', name: 'J&T Express', emoji: '🔴', popular: false, description: 'Affordable shipping across GCC and Southeast Asia.' },
  { category: 'shipping', name: 'ShipBob', emoji: '🏭', popular: false, description: 'Outsourced fulfillment with warehouse network.' },
  { category: 'shipping', name: 'EasyPost', emoji: '📮', popular: false, description: 'Multi-carrier label generation and rate comparison.' },
  // Marketing
  { category: 'marketing', name: 'Mailchimp', emoji: '🐵', popular: true, description: 'Email marketing automation with campaign analytics.' },
  { category: 'marketing', name: 'Klaviyo', emoji: '📧', popular: true, description: 'E-commerce focused email and SMS with deep segmentation.' },
  { category: 'marketing', name: 'Meta Ads', emoji: '📘', popular: true, description: 'Sync product catalog and run dynamic ads on Facebook & Instagram.' },
  { category: 'marketing', name: 'Google Ads', emoji: '🔵', popular: true, description: 'Smart Shopping campaigns with automatic bidding.' },
  { category: 'marketing', name: 'TikTok Shop', emoji: '🎵', popular: false, description: 'Sell directly through TikTok videos and live streams.' },
  { category: 'marketing', name: 'Referral Hero', emoji: '🎯', popular: false, description: 'Launch refer-a-friend programs in minutes.' },
  // Messaging
  { category: 'messaging', name: 'WhatsApp Business', emoji: '💬', popular: true, description: 'Send order confirmations and support messages via WhatsApp.' },
  { category: 'messaging', name: 'Twilio', emoji: '📱', popular: true, description: 'SMS notifications, OTP verification, and alerts.' },
  { category: 'messaging', name: 'Intercom', emoji: '🟣', popular: false, description: 'Live chat and automated support flows.' },
  { category: 'messaging', name: 'Zendesk', emoji: '🟢', popular: false, description: 'Full-featured customer support ticketing system.' },
  { category: 'messaging', name: 'Freshchat', emoji: '🌊', popular: false, description: 'Omnichannel messaging for support and sales teams.' },
  { category: 'messaging', name: 'Sendbird', emoji: '🐦', popular: false, description: 'In-app chat API for custom messaging experiences.' },
]

const filteredIntegrations = (categoryId: string) => {
  const base = categoryId === 'all' ? integrations : integrations.filter((i) => i.category === categoryId)
  if (!search.value.trim()) return base
  const q = search.value.toLowerCase()
  return base.filter((i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q))
}

const visibleCategories = computed(() => {
  if (activeCategory.value === 'all') return categories.filter((c) => c.id !== 'all')
  return categories.filter((c) => c.id === activeCategory.value)
})
</script>
