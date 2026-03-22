<template>
  <div>
    <section class="py-24 px-6 bg-[#080808]">
      <div class="max-w-7xl mx-auto text-center">
        <h2 class="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
        <p class="text-gray-400 mb-16">Scale from your first sale to your first million.</p>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="tier in tiers" :key="tier.name" :class="[
            'p-8 rounded-3xl border text-start flex flex-col transition-all duration-300',
            tier.popular ? 'bg-[#0f0f15] border-indigo-500/50 scale-105 shadow-2xl shadow-indigo-500/10' : 'bg-white/[0.02] border-white/5'
          ]">
            <div v-if="tier.popular" class="mb-4">
              <span class="bg-indigo-600 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full">Most
                Popular</span>
            </div>
            <h3 class="text-xl font-bold mb-2">{{ tier.name }}</h3>
            <div class="flex items-baseline gap-1 mb-6">
              <span class="text-4xl font-bold">${{ tier.price }}</span>
              <span class="text-gray-500">/month</span>
            </div>

            <ul class="space-y-4 mb-10 flex-1">
              <li v-for="feat in tier.features" :key="feat" class="flex items-center gap-3 text-sm text-gray-300">
                <icon name="lucide:check" class="w-4 h-4 text-indigo-500 shrink-0" />
                {{ feat }}
              </li>
            </ul>

            <VButton variant="none" :className="[
              'w-full py-4 rounded-xl font-bold transition',
              tier.popular ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-white/5 hover:bg-white/10 text-white'
            ]">
              {{ tier.cta }}
            </VButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const tiers = [
  {
    name: 'Starter',
    price: '19',
    features: ['Up to 1,000 orders/mo', '3 Team Members', 'Basic Integrations'],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Growth',
    price: '49',
    features: ['Unlimited orders', '10 Team Members', 'Advanced CRM & Analytics', 'Multi-warehouse support'],
    cta: 'Get Started',
    popular: true
  },
  {
    name: 'Enterprise',
    price: '99',
    features: ['Everything in Growth', 'Unlimited Team Members', 'API Access', 'Dedicated Account Manager'],
    cta: 'Contact Sales',
    popular: false
  }
]
</script>