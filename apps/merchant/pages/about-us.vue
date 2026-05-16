<template>
  <div class="bg-bg-base min-h-screen text-tx-primary pb-24">
    <!-- Hero Section -->
    <section class="relative pt-32 pb-24 px-6 overflow-hidden border-b border-border-subtle">
      <!-- Premium CSS Background -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-bg-base"></div>
        <div class="absolute top-0 end-0 w-[800px] h-[800px] bg-brand/10 blur-[120px] rounded-full -me-96 -mt-96">
        </div>
        <div class="absolute bottom-0 start-0 w-[600px] h-[600px] bg-success/5 blur-[100px] rounded-full -ms-44 -mb-44">
        </div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10 text-center">
        <p class="text-[10px] font-black tracking-[0.4em] text-brand mb-6 uppercase">Our Mission</p>
        <h1 class="text-5xl md:text-7xl font-bold leading-tight mb-8">
          The operating system for<br />
          <span class="text-tx-secondary">the future of commerce.</span>
        </h1>
        <p class="text-lg md:text-xl text-tx-secondary max-w-2xl mx-auto leading-relaxed">
          StoreOS was founded on a simple premise: building a global brand shouldn't
          require a massive engineering team. We're building the infrastructure that
          democratizes high-end commerce technology.
        </p>
      </div>
    </section>

    <!-- Our Story -->
    <section class="py-32 px-6">
      <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div class="relative">
          <div
            class="aspect-square rounded-[3rem] bg-gradient-to-br from-bg-elevated to-bg-base border border-border-subtle p-12 flex items-center justify-center overflow-hidden group">
            <div class="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
              <div class="absolute inset-0"
                style="background-image: radial-gradient(circle, #50506A 1px, transparent 1px); background-size: 30px 30px;">
              </div>
            </div>
            <Icon name="ph:rocket-launch-fill" class="text-9xl text-brand drop-shadow-2xl animate-float" />
          </div>
          <!-- Floating Stats badge -->
          <div class="absolute -bottom-8 -end-8 p-10 rounded-3xl bg-white text-black shadow-2xl">
            <div class="text-4xl font-black mb-1">2026</div>
            <div class="text-xs font-bold opacity-60">FOUNDED</div>
          </div>
        </div>

        <div>
          <h2 class="text-4xl font-bold mb-8">Born out of the need for speed and scale.</h2>
          <div class="space-y-6 text-tx-secondary leading-relaxed">
            <p>
              In a world where commerce is increasingly complex, merchants are often trapped between simple tools they
              outgrow
              and enterprise systems that are too slow to move.
            </p>
            <p>
              StoreOS is the middle ground. We provide the power of an enterprise ERP with the speed and
              flexibility of a modern SaaS. Our platform is built by commerce experts, for commerce experts.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-8 mt-12">
            <div v-for="stat in stats" :key="stat.label">
              <div class="text-3xl font-bold text-tx-primary mb-2">{{ stat.value }}</div>
              <div class="text-[10px] font-black text-tx-muted uppercase tracking-widest">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-32 px-6 bg-bg-primary/50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20">
          <h2 class="text-4xl font-bold mb-4">Values that drive us.</h2>
          <p class="text-tx-secondary">The principles we live by every single day.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="v in values" :key="v.title"
            class="p-10 rounded-[2.5rem] bg-bg-elevated border border-border-subtle group hover:border-brand/30 transition-all">
            <div
              class="w-14 h-14 rounded-2xl bg-brand-dim flex items-center justify-center text-brand mb-8 group-hover:scale-110 transition-transform">
              <Icon :name="v.icon" class="text-3xl" />
            </div>
            <h3 class="text-xl font-bold mb-4">{{ v.title }}</h3>
            <p class="text-tx-secondary text-sm leading-relaxed">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-32 px-6">
      <div
        class="max-w-4xl mx-auto p-16 rounded-[3rem] border border-border-subtle text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-bg-elevated to-bg-base -z-10"></div>
        <h2 class="text-3xl font-bold mb-6">Join our journey.</h2>
        <p class="text-tx-secondary mb-10 max-w-lg mx-auto">
          We're always looking for ambitious people to help us build the next generation of commerce infrastructure.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <LazyVButton variant="none"
            className="bg-brand text-white py-4 px-10 rounded-xl font-bold text-sm shadow-xl shadow-brand/20">View Open
            Positions</LazyVButton>
          <LazyVButton variant="none" className="text-tx-secondary hover:text-tx-primary font-bold">Contact Our Team
          </LazyVButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: "About Us — The Story Behind StoreOS",
  description: "Learn more about StoreOS, our mission to democratize commerce technology, and the team building the future of global brands.",
  ogTitle: "StoreOS — About Our Mission",
  ogDescription: "Democratizing high-end commerce technology for every ambitious brand.",
})

const stats = [
  { label: 'MERCHANTS', value: '5K+' },
  { label: 'TRANS. VOLUME', value: '$850M+' },
  { label: 'GLOBAL TEAM', value: '120+' },
  { label: 'UPTIME', value: '99.99%' },
]

const values = [
  { title: 'Infrastructural Thinking', desc: 'We build for the long term. Our tools are resilient, scalable, and mission-critical.', icon: 'ph:hard-drive-fill' },
  { title: 'Merchant First', desc: 'Every feature starts with a real problem faced by a real merchant.', icon: 'ph:heart-fill' },
  { title: 'Radical Transparency', desc: 'We are open about our roadmap, our successes, and even our failures.', icon: 'ph:eye-fill' },
]
</script>

<style scoped>
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>