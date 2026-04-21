<template>
  <section id="pricing" class="py-32 px-6 border-t border-border-subtle scroll-mt-24">
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
          <button @click="billing = 'monthly'"
            :class="['px-5 py-2 rounded-xl text-xs font-bold transition-all', billing === 'monthly' ? 'bg-bg-elevated text-tx-primary shadow' : 'text-tx-muted hover:text-tx-secondary']">
            Monthly
          </button>
          <button @click="billing = 'annual'"
            :class="['relative px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2', billing === 'annual' ? 'bg-bg-elevated text-tx-primary shadow' : 'text-tx-muted hover:text-tx-secondary']">
            Annual
            <span class="bg-success/20 text-success text-[9px] font-black px-1.5 py-0.5 rounded tracking-widest">SAVE
              20%</span>
          </button>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
        <div v-for="tier in tiers" :key="tier.name" :class="[
          'relative p-8 rounded-3xl border flex flex-col transition-all duration-300',
          tier.popular
            ? 'bg-bg-primary border-brand/40 shadow-2xl shadow-brand/10 scale-[1.02]'
            : 'bg-bg-elevated/30 border-border-subtle hover:border-border-default'
        ]">
          <!-- Popular Badge -->
          <div v-if="tier.popular" class="absolute -top-4 start-1/2 -translate-x-1/2">
            <span
              class="bg-brand text-white text-[9px] font-black tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-brand/30">
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
                {{ tier.free ? 'Free' : `$${billing === 'annual' ? tier.annualPrice : tier.monthlyPrice}` }}
              </span>
              <span v-if="!tier.free" class="text-tx-muted mb-1.5">/month</span>
            </div>
            <p v-if="!tier.free && billing === 'annual'" class="text-xs text-success font-bold mt-1">
              Billed annually · Save ${{ (tier.monthlyPrice - tier.annualPrice) * 12 }}/year
            </p>
            <p v-else-if="!tier.free" class="text-xs text-tx-muted mt-1">Billed monthly</p>
            <p v-else class="text-xs text-success font-bold mt-1">Always free, no card needed</p>
          </div>

          <!-- CTA -->
          <VButton
            variant="none"
            :to="tier.trial ? undefined : tier.ctaRoute"
            @click="tier.trial ? openTrialModal(tier) : undefined"
            :className="`w-full py-3.5 rounded-xl font-bold text-sm transition-all mb-8 flex items-center justify-center ${
              tier.popular
                ? 'bg-brand hover:bg-brand-hover text-white shadow-lg shadow-brand/20'
                : tier.free
                  ? 'bg-success/15 hover:bg-success/25 border border-success/30 text-success'
                  : 'bg-bg-elevated hover:bg-white/10 border border-border-default text-tx-primary'
            }`"
          >
            {{ tier.cta }}
          </VButton>

          <!-- Features List -->
          <div class="space-y-1 flex-1">
            <div v-for="group in tier.featureGroups" :key="group.label" class="mb-5">
              <p class="text-[9px] font-black text-tx-muted tracking-[0.2em] mb-3">{{ group.label }}</p>
              <div v-for="feat in group.items" :key="feat.label" class="flex items-start gap-3 py-1.5">
                <Icon :name="feat.included ? 'ph:check-circle-fill' : 'ph:minus-circle-fill'"
                  :class="['text-base shrink-0 mt-0.5', feat.included ? 'text-success' : 'text-tx-muted']" />
                <span
                  :class="['text-xs leading-relaxed', feat.included ? 'text-tx-secondary' : 'text-tx-muted line-through']">
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
                <th v-for="tier in tiers" :key="tier.name" class="px-6 py-4 text-center text-xs font-bold"
                  :class="tier.popular ? 'text-brand' : 'text-tx-secondary'">
                  {{ tier.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in comparisonRows" :key="row.feature"
                :class="['border-b border-border-subtle/50 hover:bg-bg-elevated/30 transition-colors', i % 2 === 0 ? '' : 'bg-bg-elevated/10']">
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
          <div v-for="faq in faqs" :key="faq.q" class="border border-border-subtle rounded-xl overflow-hidden">
            <button @click="faq.open = !faq.open"
              class="w-full flex items-center justify-between px-5 py-4 text-sm font-bold text-start hover:bg-bg-elevated/30 transition-colors">
              {{ faq.q }}
              <Icon :name="faq.open ? 'ph:minus-bold' : 'ph:plus-bold'" class="text-tx-muted shrink-0 ms-4" />
            </button>
            <Transition name="faq-slide">
              <div v-if="faq.open"
                class="px-5 pb-4 text-xs text-tx-secondary leading-relaxed border-t border-border-subtle/50 pt-3">
                {{ faq.a }}
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Trial Modal -->
  <VDialog v-model="isTrialOpen" max-width="440px">
    <template #title>
      <div class="flex items-center gap-2">
        <span class="inline-flex w-2 h-2 rounded-full bg-brand animate-pulse"></span>
        {{ selectedTier?.free ? 'Create your free account' : 'Start your 14-day free trial' }}
      </div>
    </template>

    <div v-if="selectedTier" class="space-y-5">
      <!-- Plan recap -->
      <div class="flex items-center gap-4 p-4 rounded-2xl bg-bg-elevated border border-border-subtle">
        <div :class="['w-11 h-11 rounded-xl flex items-center justify-center shrink-0', selectedTier.iconBg]">
          <Icon :name="selectedTier.icon" :class="['text-xl', selectedTier.iconColor]" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-bold text-sm">{{ selectedTier.name }} Plan</p>
          <p class="text-xs text-tx-muted truncate">{{ selectedTier.tagline }}</p>
        </div>
        <div class="text-end shrink-0">
          <p class="font-bold text-sm">
            <template v-if="selectedTier.free">Free</template>
            <template v-else>${{ billing === 'annual' ? selectedTier.annualPrice : selectedTier.monthlyPrice }}<span class="text-tx-muted font-normal text-xs">/mo</span></template>
          </p>
          <p class="text-[11px] text-success font-bold">
            {{ selectedTier.free ? 'Always free' : '14 days free' }}
          </p>
        </div>
      </div>

      <!-- Email input -->
      <div>
        <label class="text-xs font-bold text-tx-secondary mb-2 block">Work email address</label>
        <input
          v-model="trialEmail"
          type="email"
          placeholder="you@yourstore.com"
          @keydown.enter="startTrial"
          class="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-tx-primary placeholder:text-tx-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all"
        />
        <p v-if="emailError" class="text-xs text-error mt-1.5 flex items-center gap-1">
          <Icon name="ph:warning-fill" class="text-sm shrink-0" />
          {{ emailError }}
        </p>
      </div>

      <!-- Submit -->
      <VButton
        variant="none"
        @click="startTrial"
        :className="`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
          selectedTier.free
            ? 'bg-success/15 hover:bg-success/25 border border-success/30 text-success shadow-success/10'
            : 'bg-brand hover:bg-brand-hover text-white shadow-brand/20'
        }`"
      >
        {{ selectedTier.free ? 'Create Free Account' : 'Start My Free Trial' }}
        <Icon name="ph:arrow-right-bold" class="text-base" />
      </VButton>

      <p class="text-center text-[11px] text-tx-muted">
        {{ selectedTier.free ? 'No credit card, no time limit · Free forever' : 'No credit card required · Cancel anytime · 14 days free' }}
      </p>
    </div>
  </VDialog>
</template>

<script lang="ts" setup>
const router = useRouter()
const billing = ref<'monthly' | 'annual'>('monthly')

type Tier = {
  name: string
  tagline: string
  monthlyPrice: number
  annualPrice: number
  icon: string
  iconBg: string
  iconColor: string
  popular: boolean
  free: boolean
  trial: boolean
  cta: string
  ctaRoute: string
  featureGroups: { label: string; items: { label: string; included: boolean }[] }[]
}

const isTrialOpen = ref(false)
const selectedTier = ref<Tier | null>(null)
const trialEmail = ref('')
const emailError = ref('')

const openTrialModal = (tier: Tier) => {
  selectedTier.value = tier
  trialEmail.value = ''
  emailError.value = ''
  isTrialOpen.value = true
}

const startTrial = () => {
  if (!trialEmail.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trialEmail.value)) {
    emailError.value = 'Please enter a valid email address'
    return
  }
  emailError.value = ''
  router.push({
    path: '/auth/register',
    query: {
      plan: selectedTier.value?.name.toLowerCase(),
      email: trialEmail.value,
      trial: 'true',
    },
  })
  isTrialOpen.value = false
}

const tiers = [
  {
    name: 'Free',
    tagline: 'For individuals just starting out',
    monthlyPrice: 0,
    annualPrice: 0,
    icon: 'ph:gift-fill',
    iconBg: 'bg-success-dim',
    iconColor: 'text-success',
    popular: false,
    free: true,
    trial: true,
    cta: 'Get Started Free',
    ctaRoute: '/auth/register',
    featureGroups: [
      {
        label: 'ORDERS & PRODUCTS',
        items: [
          { label: 'Up to 50 orders / month', included: true },
          { label: 'Up to 50 SKUs', included: true },
          { label: 'Bulk order actions', included: false },
        ]
      },
      {
        label: 'TEAM & ACCESS',
        items: [
          { label: '1 team member', included: true },
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
    name: 'Starter',
    tagline: 'Perfect for first-time merchants',
    monthlyPrice: 19,
    annualPrice: 15,
    icon: 'ph:rocket-launch-fill',
    iconBg: 'bg-bg-elevated',
    iconColor: 'text-tx-secondary',
    popular: false,
    free: false,
    trial: true,
    cta: 'Start Free Trial',
    ctaRoute: '/auth/register?plan=starter',
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
    free: false,
    trial: true,
    cta: 'Start Free Trial',
    ctaRoute: '/auth/register?plan=growth',
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
    free: false,
    trial: false,
    cta: 'Contact Sales',
    ctaRoute: '/auth/register?plan=enterprise',
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
  { feature: 'Monthly Orders', values: ['50', '1,000', 'Unlimited', 'Unlimited'] },
  { feature: 'Products / SKUs', values: ['50', '500', 'Unlimited', 'Unlimited'] },
  { feature: 'Team Members', values: ['1', '3', '10', 'Unlimited'] },
  { feature: 'Analytics Dashboard', values: ['Basic', 'Basic', 'Advanced', 'Advanced + API'] },
  { feature: 'Multi-Warehouse', values: [false, false, true, true] },
  { feature: 'Customer CRM', values: [false, true, true, true] },
  { feature: 'Coupon Builder', values: [false, false, true, true] },
  { feature: 'API Access', values: [false, false, false, true] },
  { feature: 'Store Builder', values: [false, false, true, true] },
  { feature: 'Dedicated Support', values: ['Community', 'Email', 'Priority', 'Account Manager'] },
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