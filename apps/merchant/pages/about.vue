<template>
  <div class="bg-bg-base min-h-screen text-tx-primary pb-32">
    <!-- Header -->
    <header class="pt-32 pb-20 px-6 border-b border-border-subtle bg-bg-primary/50 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent pointer-events-none" />
      <div class="max-w-5xl mx-auto relative z-10">
        <p class="text-[10px] font-black tracking-[0.4em] text-brand mb-6 uppercase">About StoreOS</p>
        <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Built for merchants<br />who mean business.
        </h1>
        <p class="text-tx-secondary text-lg max-w-2xl leading-relaxed">
          StoreOS is the modern operating system for commerce — a single platform that replaces the patchwork of tools
          most merchants juggle every day.
        </p>
      </div>
    </header>

    <!-- Mission -->
    <section class="py-24 px-6 border-b border-border-subtle">
      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted mb-4 uppercase">Our Mission</p>
          <h2 class="text-3xl font-bold mb-6">Commerce infrastructure for everyone</h2>
          <p class="text-tx-secondary leading-relaxed mb-4">
            We believe that building and running a store online should be fast, intuitive, and powerful — regardless of
            the size of your team or your technical background.
          </p>
          <p class="text-tx-secondary leading-relaxed">
            StoreOS unifies your store management, analytics, builder, logistics, and team tools into one cohesive
            system. Less context switching, more selling.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <LazyVStatCard v-for="stat in stats" :key="stat.label" :label="stat.label" :value="stat.value"
            :icon-name="stat.icon" />
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-24 px-6 border-b border-border-subtle bg-bg-primary/30">
      <div class="max-w-5xl mx-auto">
        <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted mb-4 uppercase text-center">What drives us</p>
        <h2 class="text-3xl font-bold mb-16 text-center">Our core values</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="value in values" :key="value.title"
            class="bg-bg-primary border border-border-subtle rounded-2xl p-8">
            <div class="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center mb-5">
              <Icon :name="value.icon" class="text-brand text-xl" />
            </div>
            <h3 class="font-bold mb-3">{{ value.title }}</h3>
            <p class="text-sm text-tx-secondary leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="py-24 px-6 border-b border-border-subtle">
      <div class="max-w-5xl mx-auto">
        <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted mb-4 uppercase">The team</p>
        <h2 class="text-3xl font-bold mb-4">Built by people who've run stores</h2>
        <p class="text-tx-secondary max-w-2xl mb-16 leading-relaxed">
          Our founding team comes from e-commerce operations, logistics, and developer tooling. We understand the pain
          because we've lived it.
        </p>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div v-for="member in team" :key="member.name"
            class="bg-bg-primary border border-border-subtle rounded-2xl p-6 flex items-center gap-4">
            <div
              class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand/20 to-brand/5 flex items-center justify-center shrink-0">
              <span class="text-brand font-black text-sm">{{ member.initials }}</span>
            </div>
            <div>
              <p class="font-bold text-sm">{{ member.name }}</p>
              <p class="text-xs text-tx-muted">{{ member.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 px-6">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to upgrade your operations?</h2>
        <p class="text-tx-secondary mb-10">Start your 14-day free trial. No credit card required.</p>
        <LazyVButton to="/" label="Get started free" icon="ph:arrow-right-bold"
          className="px-8 py-4 rounded-xl shadow-lg shadow-brand/20" />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const stats = [
  { value: '12K+', label: 'Stores powered', icon: 'ph:storefront-bold' },
  { value: '99.9%', label: 'Uptime SLA', icon: 'ph:activity-bold' },
  { value: '42', label: 'Team members', icon: 'ph:users-bold' },
  { value: '2023', label: 'Founded', icon: 'ph:calendar-bold' },
]

const values = [
  {
    icon: 'ph:lightning-bold',
    title: 'Speed first',
    description: 'Every feature is designed to reduce the time between decision and action for merchants.',
  },
  {
    icon: 'ph:lock-bold',
    title: 'Merchant trust',
    description: 'Your data belongs to you. We never sell it, share it, or use it to train models.',
  },
  {
    icon: 'ph:puzzle-piece-bold',
    title: 'Composable by design',
    description: 'Use just what you need. Each module is independent and only gets in your way if you invite it in.',
  },
]

const team = [
  { name: 'Adam Karim', role: 'CEO & Co-founder', initials: 'AK' },
  { name: 'Sara Nour', role: 'CTO & Co-founder', initials: 'SN' },
  { name: 'Youssef Ali', role: 'Head of Product', initials: 'YA' },
  { name: 'Lena Volkov', role: 'Head of Engineering', initials: 'LV' },
  { name: 'Omar Siddiqui', role: 'Head of Design', initials: 'OS' },
  { name: 'Priya Mehta', role: 'Head of Growth', initials: 'PM' },
]

useSeoMeta({
  title: 'About Us',
  description: 'Learn about the team and mission behind StoreOS.'
})
</script>