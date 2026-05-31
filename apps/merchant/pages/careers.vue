<template>
  <div class="bg-bg-base min-h-screen text-tx-primary pb-32">
    <!-- Header -->
    <header class="pt-32 pb-20 px-6 border-b border-border-subtle bg-bg-primary/50 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent pointer-events-none" />
      <div class="max-w-5xl mx-auto relative z-10">
        <p class="text-[10px] font-black tracking-[0.4em] text-brand mb-6 uppercase">Careers</p>
        <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">Build the future<br />of commerce.</h1>
        <p class="text-tx-secondary text-lg max-w-2xl leading-relaxed">
          We're a small, high-impact team. Every person here makes a visible difference. Remote-first, async-friendly, and obsessed with shipping.
        </p>
      </div>
    </header>

    <!-- Perks -->
    <section class="py-24 px-6 border-b border-border-subtle bg-bg-primary/30">
      <div class="max-w-5xl mx-auto">
        <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted mb-4 uppercase">Why join us</p>
        <h2 class="text-2xl font-bold mb-12">What we offer</h2>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div v-for="perk in perks" :key="perk.title" class="bg-bg-primary border border-border-subtle rounded-2xl p-6">
            <Icon :name="perk.icon" class="text-brand text-2xl mb-4" />
            <h3 class="font-bold mb-2 text-sm">{{ perk.title }}</h3>
            <p class="text-xs text-tx-muted leading-relaxed">{{ perk.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Open roles -->
    <section class="py-24 px-6">
      <div class="max-w-5xl mx-auto">
        <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted mb-4 uppercase">Open roles</p>
        <h2 class="text-2xl font-bold mb-12">We're hiring</h2>
        <div class="space-y-3">
          <div v-for="role in roles" :key="role.title"
            class="bg-bg-primary border border-border-subtle rounded-2xl px-6 py-5 flex items-center justify-between gap-4 hover:border-brand/30 transition-all group cursor-pointer">
            <div class="flex items-center gap-5">
              <div class="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                <Icon :name="role.icon" class="text-brand" />
              </div>
              <div>
                <p class="font-bold text-sm mb-1">{{ role.title }}</p>
                <div class="flex items-center gap-3">
                  <span class="text-[10px] text-tx-muted">{{ role.team }}</span>
                  <span class="text-[10px] text-tx-muted">·</span>
                  <span class="text-[10px] text-tx-muted">{{ role.location }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3 shrink-0">
              <span class="text-[10px] font-black tracking-wider px-3 py-1 rounded-full"
                :class="role.type === 'Full-time' ? 'bg-brand/10 text-brand' : 'bg-bg-elevated text-tx-muted'">
                {{ role.type }}
              </span>
              <Icon name="ph:arrow-right-bold" class="text-tx-muted group-hover:text-brand transition-colors" />
            </div>
          </div>
        </div>

        <!-- No role match -->
        <div class="mt-12 bg-bg-primary border border-border-subtle rounded-2xl p-8 text-center">
          <p class="font-bold mb-2">Don't see a perfect fit?</p>
          <p class="text-sm text-tx-secondary mb-6">Send us your CV anyway. We're always interested in exceptional people.</p>
          <LazyVButton to="mailto:careers@storeos.io" label="careers@storeos.io" icon="ph:envelope-bold" icon-position="left" className="px-6 py-3 rounded-xl" />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({ title: 'Careers — StoreOS', description: 'Join the StoreOS team and help build the future of commerce.' })

const perks = [
  { icon: 'ph:globe-bold', title: 'Remote-first', description: 'Work from anywhere. We hire globally and have no mandatory office days.' },
  { icon: 'ph:currency-dollar-bold', title: 'Competitive pay', description: 'Top-of-market salaries with equity participation for every full-time hire.' },
  { icon: 'ph:book-open-bold', title: 'Learning budget', description: '$2,000/year for courses, conferences, and books. No approval needed.' },
  { icon: 'ph:heartbeat-bold', title: 'Health coverage', description: 'Full medical, dental, and vision coverage for you and your dependents.' },
  { icon: 'ph:sun-bold', title: 'Flexible PTO', description: 'Unlimited vacation with a 15-day minimum we actually enforce.' },
  { icon: 'ph:devices-bold', title: 'Equipment stipend', description: '$3,000 equipment budget to set up the workspace that works for you.' },
]

const roles = [
  { title: 'Senior Frontend Engineer', team: 'Engineering', location: 'Remote', type: 'Full-time', icon: 'ph:code-bold' },
  { title: 'Product Designer', team: 'Design', location: 'Remote', type: 'Full-time', icon: 'ph:figma-logo-bold' },
  { title: 'Backend Engineer (Node.js)', team: 'Engineering', location: 'Remote', type: 'Full-time', icon: 'ph:database-bold' },
  { title: 'Growth Marketing Manager', team: 'Marketing', location: 'Remote', type: 'Full-time', icon: 'ph:chart-line-up-bold' },
  { title: 'Customer Success Manager', team: 'Operations', location: 'Remote', type: 'Full-time', icon: 'ph:headset-bold' },
  { title: 'Technical Writer', team: 'Documentation', location: 'Remote', type: 'Contract', icon: 'ph:pencil-line-bold' },
]
</script>
