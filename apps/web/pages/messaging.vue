<template>
  <div class="bg-bg-base min-h-screen text-tx-primary">
    <!-- Hero Section -->
    <section class="relative pt-32 pb-24 px-6 overflow-hidden border-b border-border-subtle">
      <!-- Sophisticated CSS Background (Since Image quota exhausted) -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-bg-base"></div>
        <!-- Mesh Gradient -->
        <div
          class="absolute top-0 end-0 w-[800px] h-[800px] bg-teal-500/10 blur-[120px] rounded-full -me-96 -mt-96 animate-pulse">
        </div>
        <div
          class="absolute bottom-0 start-0 w-[600px] h-[600px] bg-blue-500/10 blur-[100px] rounded-full -ms-44 -mb-44">
        </div>
        <!-- Grid/Wave Lines -->
        <div class="absolute inset-0 opacity-[0.03] pointer-events-none"
          style="background-image: radial-gradient(circle, #50506A 1px, transparent 1px); background-size: 40px 40px;">
        </div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="max-w-3xl">
          <p class="text-[10px] font-black tracking-[0.4em] text-teal-400 mb-6 uppercase">Customer Engagement</p>
          <h1 class="text-5xl md:text-7xl font-bold leading-tight mb-8 text-white">
            Stay connected with<br />
            <span class="text-tx-secondary text-teal-400/80">every customer.</span>
          </h1>
          <p class="text-lg md:text-xl text-tx-secondary leading-relaxed mb-10">
            Communicate with your customers on the platforms they love. From automated WhatsApp
            order updates to personalized email campaigns, StoreOS keeps the conversation going.
          </p>
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <VButton size="lg" shadow className="bg-teal-500 hover:bg-teal-600 text-white">Start Engagement</VButton>
            <VButton variant="outline" size="lg">Watch Demo</VButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Communication Hub -->
    <section class="py-24 px-6 border-b border-border-subtle">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20">
          <h2 class="text-3xl font-bold mb-4">Unified communication hub.</h2>
          <p class="text-tx-secondary max-w-2xl mx-auto">
            Manage all your transactional and marketing messages from one place.
            Highly reliable, 99.9% delivery rate guaranteed.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="ch in channels" :key="ch.name"
            class="p-8 rounded-2xl bg-bg-primary border border-border-subtle hover:border-teal-500/30 transition-all group text-center">
            <div
              :class="['w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 transition-transform group-hover:scale-110', ch.bg]">
              <Icon :name="ch.icon" :class="ch.color" />
            </div>
            <h3 class="font-bold text-sm mb-1 group-hover:text-teal-400 transition-colors">{{ ch.name }}</h3>
            <span class="text-[9px] font-black text-tx-muted uppercase tracking-widest">{{ ch.useCase }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Automation & Engagement Features -->
    <section class="py-32 px-6 overflow-hidden">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <div class="flex-1 order-2 lg:order-1">
          <!-- Chat Balloon Mockup -->
          <div class="space-y-6 relative">
            <div v-for="(msg, i) in messages" :key="i"
              class="p-6 rounded-3xl border border-border-subtle bg-bg-elevated shadow-xl transition-all duration-500 hover:-translate-y-1 block"
              :style="`margin-left: ${i % 2 === 0 ? '0' : '3rem'}; max-width: 80%;`">
              <div class="flex items-center gap-2 mb-2">
                <Icon :name="msg.icon" :class="['text-sm', msg.color]" />
                <span class="text-[9px] font-bold text-tx-muted uppercase tracking-widest">{{ msg.channel }}</span>
                <span class="text-[9px] text-tx-muted ms-auto font-mono">NOW</span>
              </div>
              <p class="text-xs leading-relaxed text-tx-primary font-medium">{{ msg.text }}</p>
            </div>
            <!-- Decorative circle -->
            <div
              class="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-teal-500/10 rounded-full -z-10">
            </div>
          </div>
        </div>

        <div class="flex-1 order-1 lg:order-2">
          <p class="text-[10px] font-black tracking-[0.3em] text-teal-400 mb-4 uppercase">Automation</p>
          <h2 class="text-4xl font-bold mb-6 text-white">Automate the conversation.</h2>
          <p class="text-tx-secondary leading-relaxed mb-10">
            Never miss an opportunity to engage. Our automated triggers send the right message
            at the right time — whether it's an order confirmation or a win-back campaign.
          </p>

          <div class="grid gap-8">
            <div v-for="f in features" :key="f.title" class="flex gap-6 group">
              <div
                class="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-all">
                <Icon :name="f.icon" class="text-2xl" />
              </div>
              <div>
                <h3 class="font-bold mb-2">{{ f.title }}</h3>
                <p class="text-sm text-tx-secondary leading-relaxed">{{ f.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Messaging CTA -->
    <section class="py-32 px-6">
      <div
        class="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-br from-teal-500 to-blue-600 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-teal-500/20">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-8 relative z-10">
          Start engaging better.
        </h2>
        <p class="text-lg text-white/90 mb-12 max-w-xl mx-auto relative z-10">
          Join 500+ merchants who have improved their customer retention by 40% using StoreOS messaging tools.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <VButton variant="none"
            className="bg-white text-teal-600 hover:bg-white/90 flex items-center justify-center gap-2 rounded-xl font-bold text-sm transition-all duration-200 py-4 px-8 shadow-xl">
            Request API Access</VButton>
          <VButton variant="none" size="lg" className="text-white hover:text-white/80 font-bold">Talk to Support
          </VButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: "Messaging — Automated Customer Engagement",
  description: "Engage your customers on WhatsApp, Email, & SMS. Automate your order updates and marketing campaigns with StoreOS.",
  ogTitle: "StoreOS Messaging — Direct & Automated",
  ogDescription: "The engagement layer for modern merchants.",
})

const channels = [
  { name: 'WhatsApp', icon: 'ph:whatsapp-logo-fill', bg: 'bg-[#25D366]/10', color: 'text-[#25D366]', useUseCase: 'ORDER UPDATES' },
  { name: 'Email', icon: 'ph:envelope-fill', bg: 'bg-brand-dim', color: 'text-brand', useUseCase: 'MARKETING' },
  { name: 'SMS', icon: 'ph:chat-fill', bg: 'bg-info-dim', color: 'text-info', useUseCase: 'ALERTS' },
  { name: 'Slack', icon: 'ph:slack-logo-fill', bg: 'bg-purple-500/10', color: 'text-purple-400', useUseCase: 'TEAM NOTIFS' },
]

const features = [
  { title: 'Transactional Automation', desc: 'Automatically send order confirmations, shipping updates, and delivery notifications.', icon: 'ph:lightning-fill' },
  { title: 'Retention Campaigns', desc: 'Win back customers who havent purchased in a while with personalized omnichannel flows.', icon: 'ph:arrows-clockwise-fill' },
  { title: 'Abandonment Recovery', desc: 'Recover lost revenue by sending automated reminders to customers with items in their carts.', icon: 'ph:shopping-cart-fill' },
]

const messages = [
  { channel: 'WhatsApp', icon: 'ph:whatsapp-logo-fill', color: 'text-[#25D366]', text: 'Hi Sarah! Your order #9825 has been shipped. Track it here: storeos.app/tr/9825' },
  { channel: 'Email', icon: 'ph:envelope-fill', color: 'text-brand', text: 'Hey Marcus, seen something you like? Use code WELCOME10 for 10% off your cart.' },
  { channel: 'SMS', icon: 'ph:chat-fill', color: 'text-info', text: 'Low stock alert: your Pro-X Headsets are down to 3 units. Restock now at your dashboard.' },
]
</script>