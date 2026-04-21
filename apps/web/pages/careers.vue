<template>
  <div class="bg-bg-base min-h-screen text-tx-primary pb-32">
    <!-- Hero Section -->
    <section class="relative pt-32 pb-40 px-6 overflow-hidden border-b border-border-subtle">
      <!-- Premium CSS Background -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-[#08080C]"></div>
        <div class="absolute top-0 start-0 w-[900px] h-[900px] bg-blue-600/10 blur-[130px] rounded-full -ms-96 -mt-96">
        </div>
        <div class="absolute bottom-0 end-0 w-[500px] h-[500px] bg-brand/5 blur-[100px] rounded-full -me-24 -mb-24">
        </div>
        <div class="absolute inset-0 opacity-[0.02]"
          style="background-image: url('https://www.transparenttextures.com/patterns/carbon-fibre.png');"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10 text-center">
        <p class="text-[10px] font-black tracking-[0.4em] text-info mb-6 uppercase">Careers at StoreOS</p>
        <h1 class="text-5xl md:text-7xl font-bold leading-tight mb-8">
          Build the infrastructure<br />
          <span class="text-tx-secondary">of global commerce.</span>
        </h1>
        <p class="text-lg md:text-xl text-tx-secondary max-w-2xl mx-auto leading-relaxed mb-12">
          We're looking for ambitious thinkers to help us solve the most complex
          challenges in data, scale, and operational efficiency.
        </p>
        <VButton variant="none"
          className="bg-white text-black py-4 px-10 rounded-xl font-bold text-sm shadow-2xl hover:bg-white/90 transition-all">
          View Openings</VButton>
      </div>
    </section>

    <!-- Values / Why StoreOS -->
    <section class="py-32 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Why StoreOS?</h2>
          <p class="text-tx-secondary">We build for high-growth merchants, and we grow together.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="b in benefits" :key="b.title"
            class="p-8 rounded-3xl bg-bg-elevated border border-border-subtle hover:border-info/30 transition-all group">
            <div
              class="w-12 h-12 rounded-xl bg-info-dim flex items-center justify-center text-info mb-6 transition-transform group-hover:scale-110">
              <Icon :name="b.icon" class="text-2xl" />
            </div>
            <h3 class="text-lg font-bold mb-4">{{ b.title }}</h3>
            <p class="text-tx-secondary text-sm leading-relaxed">{{ b.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Open Positions -->
    <section class="py-32 px-6 bg-bg-primary/30" id="openings">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-3xl font-bold">Open Positions</h2>
          <div class="hidden md:flex gap-4">
            <span class="text-xs font-bold text-info px-4 py-2 rounded-full bg-info-dim">REMOTE-FIRST</span>
            <span class="text-xs font-bold text-tx-muted px-4 py-2">ALL DEPARTMENTS</span>
          </div>
        </div>

        <div class="space-y-4">
          <div v-for="job in jobs" :key="job.title"
            class="group p-8 rounded-2xl border border-border-subtle bg-bg-base hover:bg-bg-elevated hover:border-info/20 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <span
                  class="text-[9px] font-black text-info border border-info/30 px-2 py-0.5 rounded uppercase tracking-widest">{{
                    job.dept }}</span>
                <span class="text-[9px] font-black text-tx-muted uppercase tracking-widest">{{ job.type }}</span>
              </div>
              <h3 class="text-xl font-bold group-hover:text-info transition-colors">{{ job.title }}</h3>
            </div>
            <div class="flex items-center gap-6">
              <span class="text-sm text-tx-secondary flex items-center gap-2">
                <Icon name="ph:map-pin-fill" class="text-tx-muted" />
                {{ job.location }}
              </span>
              <Icon name="ph:caret-right-bold"
                class="text-tx-muted group-hover:text-info group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>

        <div
          class="mt-16 p-12 rounded-3xl bg-gradient-to-br from-bg-elevated to-bg-base border border-border-subtle text-center">
          <h3 class="text-xl font-bold mb-4">Don't see your role?</h3>
          <p class="text-tx-secondary mb-8 text-sm">We're always looking for talented people. Send us an open
            application.</p>
          <VButton variant="none"
            className="bg-bg-primary text-tx-primary border border-border-default py-3 px-8 rounded-xl font-bold text-sm hover:border-tx-primary transition-all">
            Submit Open Application</VButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: "Careers — Help Us Build the Future of Commerce",
  description: "Join the StoreOS team. We're looking for ambitious people to build the next generation of commerce infrastructure.",
  ogTitle: "StoreOS Careers — Work With Us",
  ogDescription: "High impact, remote-first, and building the future of global brands.",
})

const benefits = [
  { title: 'Remote-First Culture', desc: 'Work from anywhere in the world. We believe the best talent is global.', icon: 'ph:globe-stand-fill' },
  { title: 'Equity & Growth', desc: 'Own a piece of what you build. We offer competitive equity packages for all team members.', icon: 'ph:chart-line-up-fill' },
  { title: 'Learning Budget', desc: 'We invest in your growth with a yearly stipend for courses, books, and conferences.', icon: 'ph:graduation-cap-fill' },
  { title: 'Premium Hardware', desc: 'We provide you with the best tools to do your best work—from the latest MacBooks to ergonomic chairs.', icon: 'ph:desktop-fill' },
  { title: 'Flexible Time Off', desc: 'We trust our team. Take the time you need to recharge and stay creative.', icon: 'ph:calendar-heart-fill' },
  { title: 'Health & Wellness', desc: 'Comprehensive health coverage and wellness stipends for your physical and mental well-being.', icon: 'ph:heartbeat-fill' },
]

const jobs = [
  { title: 'Senior Backend Engineer', dept: 'ENGINEERING', type: 'FULL-TIME', location: 'Remote (Worldwide)' },
  { title: 'Product Designer (UX/UI)', dept: 'DESIGN', type: 'FULL-TIME', location: 'Remote (Worldwide)' },
  { title: 'Solutions Architect', dept: 'SALES', type: 'FULL-TIME', location: 'Remote (Europe/Dubai)' },
  { title: 'Head of Infrastructure', dept: 'OPS', type: 'FULL-TIME', location: 'Remote (Worldwide)' },
]
</script>