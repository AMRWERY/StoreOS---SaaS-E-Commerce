<template>
  <section id="pricing" class="py-32 px-6 border-t border-border-subtle">
    <div class="max-w-7xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-16">
        <p class="text-[10px] font-black tracking-[0.3em] text-brand mb-4">PRICING</p>
        <h2 class="text-4xl md:text-5xl font-bold mb-5">
          Simple, transparent pricing.
        </h2>
        <p class="text-tx-secondary mb-10">Scale from your first sale to your first million — no surprises.</p>

        <!-- Billing Toggle -->
        <div class="inline-flex items-center gap-4 bg-bg-primary border border-border-subtle rounded-2xl p-1.5">
          <button
            @click="billing = 'monthly'"
            :class="['px-5 py-2 rounded-xl text-xs font-bold transition-all', billing === 'monthly' ? 'bg-bg-elevated text-tx-primary shadow' : 'text-tx-muted hover:text-tx-secondary']"
          >
            Monthly
          </button>
          <button
            @click="billing = 'annual'"
            :class="['relative px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2', billing === 'annual' ? 'bg-bg-elevated text-tx-primary shadow' : 'text-tx-muted hover:text-tx-secondary']"
          >
            Annual
            <span class="bg-success/20 text-success text-[9px] font-black px-1.5 py-0.5 rounded tracking-widest">SAVE 20%</span>
          </button>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="grid md:grid-cols-3 gap-6 mb-20">
        <div
          v-for="tier in tiers"
          :key="tier.name"
          :class="[
            'relative p-8 rounded-3xl border flex flex-col transition-all duration-300',
            tier.popular
              ? 'bg-bg-primary border-brand/40 shadow-2xl shadow-brand/10 scale-[1.02]'
              : 'bg-bg-elevated/30 border-border-subtle hover:border-border-default'
          ]"
        >
          <!-- Popular Badge -->
          <div v-if="tier.popular" class="absolute -top-4 start-1/2 -translate-x-1/2">
            <span class="bg-brand text-white text-[9px] font-black tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-brand/30">
              MOST POPULAR
            </span>
          </div>

          <!-- Tier Header -->
          <div class="mb-8">
            <div :class="['w-10 h-10 rounded-xl flex items-center justify-center mb-4', tier.iconBg]">
              <Icon :name="tier.icon" :class="['text-xl', tier.iconColor]" />
            </div>
            <h3 class="text-xl font-bold mb-1">{{ tier.name }}</h3>
            <p class="text-sm text-tx-muted">{{ tier.tagline }}</p>
          </div>

          <!-- Price -->
          <div class="mb-8">
            <div class="flex items-end gap-1">
              <span class="text-4xl font-bold">
                ${{ billing === 'annual' ? tier.annualPrice : tier.monthlyPrice }}
              </span>
              <span class="text-tx-muted mb-1.5">/month</span>
            </div>
            <p v-if="billing === 'annual'" class="text-xs text-success font-bold mt-1">
              Billed annually · Save ${{ (tier.monthlyPrice - tier.annualPrice) * 12 }}/year
            </p>
            <p v-else class="text-xs text-tx-muted mt-1">Billed monthly</p>
          </div>

          <!-- CTA -->
          <VButton
            variant="none"
            to="/auth/register"
            :className="[
              'w-full py-3.5 rounded-xl font-bold text-sm transition-all mb-8',
              tier.popular
                ? 'bg-brand hover:bg-brand-hover text-white shadow-lg shadow-brand/20'
                : 'bg-bg-elevated hover:bg-white/10 border border-border-default text-tx-primary'
            ]"
          >
            {{ tier.cta }}
          </VButton>

          <!-- Features List -->
          <div class="space-y-1 flex-1">
            <div v-for="group in tier.featureGroups" :key="group.label" class="mb-5">
              <p class="text-[9px] font-black text-tx-muted tracking-[0.2em] mb-3">{{ group.label }}</p>
              <div v-for="feat in group.items" :key="feat.label" class="flex items-start gap-3 py-1.5">
                <Icon
                  :name="feat.included ? 'ph:check-circle-fill' : 'ph:minus-circle-fill'"
                  :class="['text-base shrink-0 mt-0.5', feat.included ? 'text-success' : 'text-tx-muted']"
                />
                <span :class="['text-xs leading-relaxed', feat.included ? 'text-tx-secondary' : 'text-tx-muted line-through']">
                  {{ feat.label }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature Comparison Table -->
      <div class="bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden mb-20">
        <div class="p-6 border-b border-border-subtle">
          <h3 class="font-bold">Full Feature Comparison</h3>
          <p class="text-xs text-tx-muted mt-1">See exactly what's included in each plan</p>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-border-subtle">
                <th class="text-start px-6 py-4 text-xs font-bold text-tx-muted w-1/2">Feature</th>
                <th v-for="tier in tiers" :key="tier.name" class="px-6 py-4 text-center text-xs font-bold" :class="tier.popular ? 'text-brand' : 'text-tx-secondary'">
                  {{ tier.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in comparisonRows" :key="row.feature" :class="['border-b border-border-subtle/50 hover:bg-bg-elevated/30 transition-colors', i % 2 === 0 ? '' : 'bg-bg-elevated/10']">
                <td class="px-6 py-3.5 text-xs font-medium text-tx-secondary">{{ row.feature }}</td>
                <td v-for="(val, j) in row.values" :key="j" class="px-6 py-3.5 text-center">
                  <Icon v-if="val === true" name="ph:check-bold" class="text-success mx-auto" />
                  <Icon v-else-if="val === false" name="ph:minus-bold" class="text-tx-muted mx-auto" />
                  <span v-else class="text-xs font-bold text-tx-secondary">{{ val }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Trust & FAQ strip -->
      <div class="grid md:grid-cols-2 gap-12 items-start">
        <!-- Trust signals -->
        <div>
          <h3 class="text-xl font-bold mb-6">Everything you need, nothing you don't.</h3>
          <div class="space-y-4">
            <div v-for="trust in trustItems" :key="trust.title" class="flex items-start gap-4">
              <div class="w-9 h-9 rounded-xl bg-brand-dim flex items-center justify-center shrink-0">
                <Icon :name="trust.icon" class="text-brand text-base" />
              </div>
              <div>
                <p class="text-sm font-bold">{{ trust.title }}</p>
                <p class="text-xs text-tx-muted mt-0.5">{{ trust.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ -->
        <div class="space-y-3">
          <h3 class="text-xl font-bold mb-6">Common questions.</h3>
          <div
            v-for="faq in faqs"
            :key="faq.q"
            class="border border-border-subtle rounded-xl overflow-hidden"
          >
            <button
              @click="faq.open = !faq.open"
              class="w-full flex items-center justify-between px-5 py-4 text-sm font-bold text-start hover:bg-bg-elevated/30 transition-colors"
            >
              {{ faq.q }}
              <Icon :name="faq.open ? 'ph:minus-bold' : 'ph:plus-bold'" class="text-tx-muted shrink-0 ms-4" />
            </button>
            <Transition name="faq-slide">
              <div v-if="faq.open" class="px-5 pb-4 text-xs text-tx-secondary leading-relaxed border-t border-border-subtle/50 pt-3">
                {{ faq.a }}
              </div>
            </Transition>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script lang="ts" setup>
const billing = ref<'monthly' | 'annual'>('monthly')

const tiers = [
  {
    name: 'Starter',
    tagline: 'Perfect for first-time merchants',
    monthlyPrice: 19,
    annualPrice: 15,
    icon: 'ph:rocket-launch-fill',
    iconBg: 'bg-bg-elevated',
    iconColor: 'text-tx-secondary',
    popular: false,
    cta: 'Start Free Trial',
    featureGroups: [
      {
        label: 'ORDERS & PRODUCTS',
        items: [
          { label: 'Up to 1,000 orders / month', included: true },
          { label: 'Up to 500 SKUs', included: true },
          { label: 'Bulk order actions', included: false },
        ]
      },
      {
        label: 'TEAM & ACCESS',
        items: [
          { label: '3 team members', included: true },
          { label: 'Role-based permissions', included: false },
          { label: 'Staff activity log', included: false },
        ]
      },
      {
        label: 'ANALYTICS',
        items: [
          { label: 'Basic revenue dashboard', included: true },
          { label: 'Advanced analytics & LTV', included: false },
        ]
      },
    ]
  },
  {
    name: 'Growth',
    tagline: 'For scaling brands & teams',
    monthlyPrice: 49,
    annualPrice: 39,
    icon: 'ph:chart-line-up-fill',
    iconBg: 'bg-brand-dim',
    iconColor: 'text-brand',
    popular: true,
    cta: 'Start Free Trial',
    featureGroups: [
      {
        label: 'ORDERS & PRODUCTS',
        items: [
          { label: 'Unlimited orders', included: true },
          { label: 'Unlimited SKUs', included: true },
          { label: 'Bulk order actions', included: true },
        ]
      },
      {
        label: 'TEAM & ACCESS',
        items: [
          { label: '10 team members', included: true },
          { label: 'Role-based permissions', included: true },
          { label: 'Staff activity log', included: true },
        ]
      },
      {
        label: 'ANALYTICS',
        items: [
          { label: 'Advanced analytics & LTV', included: true },
          { label: 'Multi-warehouse support', included: true },
        ]
      },
    ]
  },
  {
    name: 'Enterprise',
    tagline: 'For high-volume operations',
    monthlyPrice: 99,
    annualPrice: 79,
    icon: 'ph:buildings-fill',
    iconBg: 'bg-info-dim',
    iconColor: 'text-info',
    popular: false,
    cta: 'Contact Sales',
    featureGroups: [
      {
        label: 'ORDERS & PRODUCTS',
        items: [
          { label: 'Unlimited orders', included: true },
          { label: 'Unlimited SKUs', included: true },
          { label: 'Priority fulfilment queue', included: true },
        ]
      },
      {
        label: 'TEAM & ACCESS',
        items: [
          { label: 'Unlimited team members', included: true },
          { label: 'Custom role builder', included: true },
          { label: 'Dedicated account manager', included: true },
        ]
      },
      {
        label: 'PLATFORM',
        items: [
          { label: 'Full API access', included: true },
          { label: 'Custom integrations', included: true },
        ]
      },
    ]
  },
]

const comparisonRows = [
  { feature: 'Monthly Orders', values: ['1,000', 'Unlimited', 'Unlimited'] },
  { feature: 'Products / SKUs', values: ['500', 'Unlimited', 'Unlimited'] },
  { feature: 'Team Members', values: ['3', '10', 'Unlimited'] },
  { feature: 'Analytics Dashboard', values: ['Basic', 'Advanced', 'Advanced + API'] },
  { feature: 'Multi-Warehouse', values: [false, true, true] },
  { feature: 'Customer CRM', values: [true, true, true] },
  { feature: 'Coupon Builder', values: [false, true, true] },
  { feature: 'API Access', values: [false, false, true] },
  { feature: 'Store Builder', values: [false, true, true] },
  { feature: 'Dedicated Support', values: ['Email', 'Priority', 'Account Manager'] },
]

const trustItems = [
  { icon: 'ph:shield-check-fill', title: 'No credit card required', desc: 'Start your 14-day free trial instantly — no payment info needed.' },
  { icon: 'ph:arrows-counter-clockwise-fill', title: 'Cancel anytime', desc: 'No lock-in contracts. Downgrade or cancel with one click, any time.' },
  { icon: 'ph:lock-key-fill', title: 'Your data, always yours', desc: 'Full data export in CSV at any time. We never hold your data hostage.' },
  { icon: 'ph:headset-fill', title: 'Onboarding support included', desc: 'Every plan includes a guided onboarding session with our team.' },
]

const faqs = reactive([
  { q: 'Can I switch plans later?', a: 'Yes. You can upgrade or downgrade your plan at any time from your billing settings. Changes take effect immediately and are prorated.', open: false },
  { q: 'What happens after my trial ends?', a: 'Your store stays active but you will be prompted to select a plan. You will never lose your data — we give you a 7-day grace period.', open: false },
  { q: 'Do you support Arabic and RTL?', a: 'Yes. StoreOS supports both English and Arabic with full RTL layout. You can switch languages instantly from any settings page.', open: false },
  { q: 'Is there a discount for annual billing?', a: 'Yes — switching to annual saves you 20% across all plans. The discount is applied immediately.', open: false },
])
</script>

<style scoped>
.faq-slide-enter-active,
.faq-slide-leave-active {
  transition: max-height 0.25s ease, opacity 0.2s ease;
  max-height: 200px;
  overflow: hidden;
}
.faq-slide-enter-from,
.faq-slide-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
