<template>
  <div class="bg-bg-base min-h-screen text-tx-primary pb-32">
    <!-- Hero Section -->
    <section class="relative pt-32 pb-40 px-6 overflow-hidden border-b border-border-subtle">
      <!-- Premium CSS Background -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-[#08080C]"></div>
        <!-- Animated Waves (Abstract) -->
        <div class="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-brand/10 rounded-full animate-ping opacity-20"></div>
        <div class="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-info/10 rounded-full animate-ping opacity-20" style="animation-delay: 1s"></div>
        <div class="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-success/10 rounded-full animate-pulse opacity-20"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10 text-center">
        <p class="text-[10px] font-black tracking-[0.4em] text-brand mb-6 uppercase">The StoreOS Ecosystem</p>
        <h1 class="text-5xl md:text-7xl font-bold leading-tight mb-8">
          A community of<br />
          <span class="text-tx-secondary">pioneers and builders.</span>
        </h1>
        <p class="text-lg md:text-xl text-tx-secondary max-w-2xl mx-auto leading-relaxed mb-12">
          Join thousands of merchants, developers, and commerce experts sharing knowledge and shaping the future of global scale.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
           <VButton variant="none" className="bg-[#5865F2] text-white py-4 px-10 rounded-xl font-bold text-sm shadow-xl shadow-[#5865F2]/20 hover:bg-[#4752C4] transition-all flex items-center gap-3">
              <Icon name="ph:discord-logo-fill" class="text-xl" />
              Join Discord
           </VButton>
           <VButton variant="none" className="bg-[#4A154B] text-white py-4 px-10 rounded-xl font-bold text-sm shadow-xl shadow-[#4A154B]/20 hover:bg-[#3A113B] transition-all flex items-center gap-3">
              <Icon name="ph:slack-logo-fill" class="text-xl" />
              Join Slack
           </VButton>
        </div>
      </div>
    </section>

    <!-- Why Join? -->
    <section class="py-32 px-6">
       <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-3 gap-12">
             <div v-for="b in benefits" :key="b.title" class="text-center group">
                <div class="w-20 h-20 rounded-[2rem] bg-bg-elevated border border-border-subtle mx-auto flex items-center justify-center text-brand mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                   <Icon :name="b.icon" class="text-4xl" />
                </div>
                <h3 class="text-xl font-bold mb-4">{{ b.title }}</h3>
                <p class="text-sm text-tx-secondary leading-relaxed">{{ b.desc }}</p>
             </div>
          </div>
       </div>
    </section>

    <!-- Professional Network -->
    <section class="py-32 px-6 bg-bg-primary/50 relative overflow-hidden">
       <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div class="flex-1">
             <p class="text-[10px] font-black tracking-[0.3em] text-brand mb-4 uppercase">Networking</p>
             <h2 class="text-4xl font-bold mb-6">Connect with the 1%.</h2>
             <p class="text-tx-secondary leading-relaxed mb-10">
                Our community isn't just about support—it's about growth. Network with founders of 8 and 9-figure brands, 
                top-tier developers, and commerce strategists who are pushing the boundaries of what's possible.
             </p>
             <ul class="space-y-6">
                <li v-for="item in items" :key="item.title" class="flex items-start gap-4">
                   <div class="w-6 h-6 rounded-full bg-brand-dim flex items-center justify-center text-brand shrink-0">
                      <Icon name="ph:check-bold" class="text-[10px]" />
                   </div>
                   <div>
                      <span class="font-bold block mb-1">{{ item.title }}</span>
                      <span class="text-xs text-tx-secondary leading-relaxed">{{ item.desc }}</span>
                   </div>
                </li>
             </ul>
          </div>
          <div class="flex-1 relative">
             <div class="aspect-square rounded-[3rem] bg-bg-base border border-border-subtle p-12 relative overflow-hidden group">
                <div class="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent"></div>
                <!-- Simulated avatars grid -->
                <div class="grid grid-cols-4 gap-4 opacity-50 group-hover:opacity-80 transition-all duration-700">
                   <div v-for="i in 16" :key="i" class="aspect-square rounded-2xl bg-bg-elevated border border-border-subtle flex items-center justify-center">
                      <Icon name="ph:user-fill" class="text-tx-muted/20" />
                   </div>
                </div>
                <div class="absolute inset-0 flex items-center justify-center">
                   <div class="p-8 rounded-3xl bg-white text-black shadow-2xl text-center animate-bounce">
                      <div class="text-2xl font-black mb-1">12K+</div>
                      <div class="text-[10px] font-bold opacity-60">MEMBERS</div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>

    <!-- Global Events -->
    <section class="py-32 px-6">
       <div class="max-w-4xl mx-auto p-16 rounded-[3rem] border border-border-subtle bg-bg-elevated text-center relative overflow-hidden group">
          <div class="absolute top-0 end-0 p-8">
             <Icon name="ph:calendar-bold" class="text-6xl text-brand/10 group-hover:rotate-12 transition-transform" />
          </div>
          <h2 class="text-3xl font-bold mb-6">Expert-led Webinars.</h2>
          <p class="text-tx-secondary mb-10">
             Weekly deep-dives into operational efficiency, marketing strategy, and technical scaling with the experts who built StoreOS.
          </p>
          <VButton variant="none" className="bg-bg-primary text-tx-primary border border-border-default py-4 px-10 rounded-xl font-bold text-sm hover:border-tx-primary transition-all">Browse Event Calendar</VButton>
       </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: "Community Hub — Join the StoreOS Pioneers",
  description: "Connect with thousands of commerce experts. Join our Discord, Slack, and community events to grow your global brand.",
  ogTitle: "StoreOS Community — Builders & Leaders",
  ogDescription: "The professional network for the next era of commerce.",
})

const benefits = [
  { title: 'Peer Networking', desc: 'Connect with other high-growth founders and shares strategies.', icon: 'ph:users-three-fill' },
  { title: 'Early Access', desc: 'Get beta access to new StoreOS modules and features before anyone else.', icon: 'ph:lightning-fill' },
  { title: 'Exclusive Content', desc: 'Access community-only guides, templates, and expert benchmarks.', icon: 'ph:lock-key-fill' },
]

const items = [
  { title: 'High-Level Strategy', desc: 'Discuss multi-region scaling and logistics optimization with peers.' },
  { title: 'Developer Support', desc: 'Direct access to StoreOS engineers for technical advice.' },
  { title: 'Founder Circles', desc: 'Invite-only groups for established 8-figure merchants.' },
]
</script>