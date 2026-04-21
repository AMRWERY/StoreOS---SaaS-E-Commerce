<template>
  <div class="bg-bg-base min-h-screen text-tx-primary pb-32">
    <!-- Hero Section -->
    <section class="relative pt-32 pb-24 px-6 overflow-hidden border-b border-border-subtle">
      <!-- Premium CSS Background -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-[#0A0A0F]"></div>
        <div class="absolute top-0 end-0 w-[800px] h-[800px] bg-teal-500/10 blur-[120px] rounded-full -me-96 -mt-96">
        </div>
        <div class="absolute bottom-0 start-0 w-[500px] h-[500px] bg-brand/5 blur-[100px] rounded-full -ms-44 -mb-44">
        </div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10 text-center">
        <p class="text-[10px] font-black tracking-[0.4em] text-teal-400 mb-6 uppercase">Get in touch</p>
        <h1 class="text-5xl md:text-7xl font-bold leading-tight mb-8">
          How can we<br />
          <span class="text-tx-secondary">help your business?</span>
        </h1>
        <p class="text-lg md:text-xl text-tx-secondary max-w-2xl mx-auto leading-relaxed">
          From technical support to enterprise partnerships, our team is
          ready to help you scale your global commerce operations.
        </p>
      </div>
    </section>

    <!-- Contact Form & Info -->
    <section class="py-32 px-6">
      <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
        <!-- Info Panel -->
        <div class="space-y-12">
          <div>
            <h2 class="text-3xl font-bold mb-8">Talk to our team.</h2>
            <div class="grid gap-6">
              <div v-for="c in contactMethods" :key="c.title"
                class="p-8 rounded-3xl bg-bg-elevated border border-border-subtle group hover:border-teal-500/30 transition-all">
                <div class="flex items-start gap-6">
                  <div
                    class="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-all">
                    <Icon :name="c.icon" class="text-2xl" />
                  </div>
                  <div>
                    <h3 class="font-bold mb-1">{{ c.title }}</h3>
                    <p class="text-sm text-tx-secondary leading-relaxed mb-4">{{ c.desc }}</p>
                    <a :href="c.link"
                      class="text-xs font-black text-teal-400 uppercase tracking-widest hover:text-white transition-colors">
                      {{ c.action }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Locations -->
          <div>
            <h3 class="text-xl font-bold mb-6">Our Offices</h3>
            <div class="grid grid-cols-2 gap-8">
              <div v-for="loc in locations" :key="loc.city">
                <div class="text-[10px] font-black text-tx-muted uppercase tracking-[0.2em] mb-2">{{ loc.region }}</div>
                <div class="text-lg font-bold mb-2">{{ loc.city }}</div>
                <p class="text-xs text-tx-secondary leading-relaxed">{{ loc.address }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Panel -->
        <div class="relative">
          <div
            class="p-10 md:p-16 rounded-[3rem] bg-bg-elevated border border-border-subtle shadow-2xl relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent pointer-events-none"></div>
            <form @submit.prevent class="space-y-6 relative z-10">
              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-tx-muted uppercase tracking-widest ms-1">First Name</label>
                  <input type="text" placeholder="John"
                    class="w-full bg-bg-primary border border-border-default rounded-xl px-4 py-3 text-sm focus:border-teal-500 outline-none transition-all" />
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-tx-muted uppercase tracking-widest ms-1">Last Name</label>
                  <input type="text" placeholder="Doe"
                    class="w-full bg-bg-primary border border-border-default rounded-xl px-4 py-3 text-sm focus:border-teal-500 outline-none transition-all" />
                </div>
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-tx-muted uppercase tracking-widest ms-1">Work Email</label>
                <input type="email" placeholder="john@company.com"
                  class="w-full bg-bg-primary border border-border-default rounded-xl px-4 py-3 text-sm focus:border-teal-500 outline-none transition-all" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-tx-muted uppercase tracking-widest ms-1">Subject</label>
                <select
                  class="w-full bg-bg-primary border border-border-default rounded-xl px-4 py-3 text-sm focus:border-teal-500 outline-none transition-all appearance-none cursor-pointer">
                  <option>Sales Inquiry</option>
                  <option>Technical Support</option>
                  <option>Partnerships</option>
                  <option>Media & Press</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-tx-muted uppercase tracking-widest ms-1">Message</label>
                <textarea rows="5" placeholder="Tell us about your needs..."
                  class="w-full bg-bg-primary border border-border-default rounded-xl px-4 py-3 text-sm focus:border-teal-500 outline-none transition-all resize-none"></textarea>
              </div>
              <VButton variant="none"
                className="w-full bg-teal-500 text-white font-bold py-4 rounded-xl shadow-xl shadow-teal-500/20 active:scale-[0.98] transition-all">
                Send Message</VButton>
              <p class="text-[10px] text-center text-tx-muted">By clicking send, you agree to our <nuxt-link-locale
                  to="/privacy" class="text-teal-400 hover:underline">Privacy Policy</nuxt-link-locale>.</p>
            </form>
          </div>

          <!-- Glass Badge -->
          <div
            class="hidden md:block absolute -top-8 -end-8 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl animate-float">
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full bg-success"></div>
              <span class="text-[10px] font-black uppercase text-white tracking-widest">Available Now</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: "Contact Us — Talk to the StoreOS Team",
  description: "Have questions about StoreOS? Reach out to our team for sales, support, or partnership inquiries.",
  ogTitle: "StoreOS Contact — We're here to help",
  ogDescription: "Direct support and partnership channels for the modern operational layer.",
})

const contactMethods = [
  { title: 'Customer Support', desc: 'Need help with your dashboard? Our support team is available 24/7.', icon: 'ph:chat-circle-dots-fill', action: 'Join Live Chat', link: '#' },
  { title: 'Sales Inquiry', desc: 'Looking for an enterprise plan? Talk to our growth specialists.', icon: 'ph:briefcase-fill', action: 'Contact Sales', link: '#' },
  { title: 'Media & Press', desc: 'For press inquiries and brand assets, reach out to our media team.', icon: 'ph:megaphone-fill', action: 'Email Press', link: 'mailto:press@storeos.app' },
]

const locations = [
  { region: 'MIDDLE EAST', city: 'Cairo, EG', address: 'B2, New Cairo, Business District.' },
  { region: 'GCC', city: 'Dubai, UAE', address: 'DIFC, Innovation Hub.' },
]
</script>

<style scoped>
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}
</style>