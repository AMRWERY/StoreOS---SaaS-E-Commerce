<template>
  <div class="bg-bg-base min-h-screen text-tx-primary pb-32">
    <!-- Header -->
    <header class="pt-32 pb-24 px-6 border-b border-border-subtle bg-bg-primary/50 relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent pointer-events-none" />
      <div class="absolute -top-40 -end-40 w-96 h-96 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
      <div class="max-w-5xl mx-auto relative z-10">
        <div
          class="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-8">
          <Icon name="ph:chats-bold" class="text-green-400 text-sm" />
          <span class="text-[10px] font-black tracking-[0.3em] text-green-400 uppercase">Messaging</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Talk to customers<br />
          <span class="text-tx-secondary">on every channel.</span>
        </h1>
        <p class="text-tx-secondary text-lg max-w-2xl leading-relaxed mb-10">
          WhatsApp order confirmations, SMS alerts, live chat, and automated sequences — manage all customer
          communication from a single inbox.
        </p>
        <div class="flex flex-wrap gap-4">
          <LazyVButton to="/auth/register" label="Connect your channels" icon="ph:arrow-right-bold"
            className="px-7 py-3.5 rounded-xl shadow-lg shadow-brand/20" />
          <LazyVButton to="/integrations" label="See all integrations" variant="secondary"
            className="px-7 py-3.5 rounded-xl" />
        </div>
      </div>
    </header>

    <!-- Stats -->
    <section class="py-16 px-6 border-b border-border-subtle bg-bg-primary/30">
      <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        <LazyVStatCard v-for="stat in stats" :key="stat.label" :label="stat.label" :value="stat.value"
          :icon-name="stat.icon" :trend="stat.trend" trend-color="text-success" />
      </div>
    </section>

    <!-- Channels overview -->
    <section class="py-24 px-6 border-b border-border-subtle">
      <div class="max-w-5xl mx-auto">
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted mb-4 uppercase">Channels</p>
            <h2 class="text-3xl font-bold mb-5">One inbox. Every channel.</h2>
            <p class="text-tx-secondary leading-relaxed mb-8">
              Customers reach you on WhatsApp, SMS, live chat, and email. StoreOS unifies all conversations into a
              single timeline so your team never loses context.
            </p>
            <div class="space-y-3">
              <div v-for="channel in channels" :key="channel.name"
                class="flex items-center gap-4 p-4 bg-bg-primary border border-border-subtle rounded-xl hover:border-green-500/30 transition-all">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                  :style="`background-color: ${channel.color}15`">
                  <Icon :name="channel.icon" :style="`color: ${channel.color}`" class="text-lg" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-bold text-sm">{{ channel.name }}</p>
                  <p class="text-xs text-tx-muted">{{ channel.desc }}</p>
                </div>
                <span class="text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full"
                  :class="channel.status === 'Connected' ? 'bg-success-dim text-success' : 'bg-bg-elevated text-tx-muted'">
                  {{ channel.status }}
                </span>
              </div>
            </div>
          </div>

          <!-- Inbox mock -->
          <div class="bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
            <div class="h-10 bg-bg-elevated border-b border-border-subtle flex items-center justify-between px-4">
              <span class="text-[10px] text-tx-muted font-mono">Unified Inbox</span>
              <span class="text-[9px] font-black text-brand bg-brand/10 px-2 py-0.5 rounded-full">4 unread</span>
            </div>
            <div class="flex h-64">
              <!-- Conversation list -->
              <div class="w-36 border-e border-border-subtle flex flex-col shrink-0">
                <div v-for="conv in mockConversations" :key="conv.name"
                  class="p-3 border-b border-border-subtle cursor-pointer transition-colors"
                  :class="conv.active ? 'bg-brand/5' : 'hover:bg-bg-elevated'">
                  <div class="flex items-center gap-2 mb-1">
                    <div class="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black shrink-0"
                      :class="conv.avatarClass">
                      {{ conv.initials }}
                    </div>
                    <span class="text-[10px] font-bold truncate">{{ conv.name }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Icon :name="conv.channelIcon" class="text-[8px]" :style="`color: ${conv.channelColor}`" />
                    <span class="text-[9px] text-tx-muted truncate">{{ conv.preview }}</span>
                  </div>
                </div>
              </div>
              <!-- Chat panel -->
              <div class="flex-1 flex flex-col">
                <div class="p-3 border-b border-border-subtle">
                  <p class="text-[10px] font-bold">Nour Ahmed</p>
                  <p class="text-[9px] text-tx-muted">WhatsApp · Order #SO-9831</p>
                </div>
                <div class="flex-1 p-3 space-y-2 overflow-hidden">
                  <div v-for="msg in mockMessages" :key="msg.text" class="flex"
                    :class="msg.outbound ? 'justify-end' : 'justify-start'">
                    <div class="max-w-[80%] px-2.5 py-1.5 rounded-xl text-[10px] leading-relaxed"
                      :class="msg.outbound ? 'bg-brand text-white rounded-br-none' : 'bg-bg-elevated border border-border-subtle rounded-bl-none'">
                      {{ msg.text }}
                    </div>
                  </div>
                </div>
                <div class="p-2 border-t border-border-subtle">
                  <div
                    class="bg-bg-elevated border border-border-subtle rounded-lg px-3 py-1.5 flex items-center gap-2">
                    <span class="text-[10px] text-tx-muted flex-1">Reply...</span>
                    <Icon name="ph:paper-plane-tilt-bold" class="text-brand text-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features grid -->
    <section class="py-24 px-6 border-b border-border-subtle bg-bg-primary/20">
      <div class="max-w-5xl mx-auto">
        <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted mb-4 uppercase text-center">Capabilities</p>
        <h2 class="text-3xl font-bold mb-16 text-center">Built for commerce conversations</h2>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div v-for="feature in features" :key="feature.title"
            class="bg-bg-primary border border-border-subtle rounded-2xl p-7 hover:border-green-500/30 transition-all group">
            <div
              class="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-all duration-300">
              <Icon :name="feature.icon" class="text-green-400 text-xl" />
            </div>
            <h3 class="font-bold mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-tx-secondary leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Automation sequences -->
    <section class="py-24 px-6 border-b border-border-subtle">
      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div>
          <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted mb-4 uppercase">Automations</p>
          <h2 class="text-3xl font-bold mb-5">Automated messages that feel personal</h2>
          <p class="text-tx-secondary leading-relaxed mb-6">
            Set up trigger-based message sequences once. StoreOS handles the sending — order confirmations, shipping
            updates, cart recovery, review requests — automatically.
          </p>
          <ul class="space-y-3">
            <li v-for="point in automationPoints" :key="point"
              class="flex items-center gap-3 text-sm text-tx-secondary">
              <Icon name="ph:check-circle-fill" class="text-green-400 shrink-0" />
              {{ point }}
            </li>
          </ul>
        </div>
        <!-- Sequence builder mock -->
        <div class="space-y-3">
          <p class="text-[10px] font-black text-tx-muted tracking-widest uppercase mb-4">Abandoned Cart Sequence</p>
          <div v-for="(step, i) in automationSteps" :key="step.label" class="relative">
            <div class="flex items-center gap-4 p-4 bg-bg-primary border border-border-subtle rounded-xl"
              :class="step.active ? 'border-green-500/40 bg-green-500/5' : ''">
              <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-black"
                :class="step.active ? 'bg-green-500 text-white' : 'bg-bg-elevated text-tx-muted border border-border-subtle'">
                {{ i + 1 }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold">{{ step.label }}</p>
                <p class="text-[10px] text-tx-muted">{{ step.desc }}</p>
              </div>
              <div class="text-right shrink-0">
                <p class="text-xs font-black text-success">{{ step.rate }}</p>
                <p class="text-[9px] text-tx-muted">{{ step.rateLabel }}</p>
              </div>
            </div>
            <div v-if="i < automationSteps.length - 1"
              class="absolute start-7 -bottom-3 w-px h-3 bg-border-subtle z-10" />
          </div>
        </div>
      </div>
    </section>

    <!-- Partner integrations -->
    <section class="py-24 px-6 border-b border-border-subtle bg-bg-primary/20">
      <div class="max-w-5xl mx-auto">
        <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted mb-4 uppercase text-center">Messaging Partners
        </p>
        <h2 class="text-2xl font-bold mb-12 text-center">Connect the tools your team already uses</h2>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div v-for="integration in messagingIntegrations" :key="integration.name"
            class="flex items-center gap-4 p-5 bg-bg-primary border border-border-subtle rounded-2xl hover:border-green-500/30 transition-all">
            <div class="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center text-xl shrink-0">
              {{ integration.emoji }}
            </div>
            <div>
              <p class="font-bold text-sm">{{ integration.name }}</p>
              <p class="text-xs text-tx-muted">{{ integration.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 px-6">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Start talking to your customers</h2>
        <p class="text-tx-secondary mb-10">Connect WhatsApp in 2 minutes. Free for 1,000 messages/month.</p>
        <LazyVButton to="/auth/register" label="Get started free" icon="ph:arrow-right-bold"
          className="px-8 py-4 rounded-xl shadow-lg shadow-brand/20" />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const stats = [
  { value: '98%', label: 'WhatsApp open rate', icon: 'ph:whatsapp-logo-bold', trend: 'vs. 20% email avg' },
  { value: '6', label: 'Channels in one inbox', icon: 'ph:chats-bold', trend: 'Unified timeline' },
  { value: '<1min', label: 'Avg. first response', icon: 'ph:clock-bold', trend: 'With automations on' },
  { value: '3.2x', label: 'Cart recovery lift', icon: 'ph:arrow-u-up-right-bold', trend: 'vs. email only' },
]

const channels = [
  { icon: 'ph:whatsapp-logo-bold', name: 'WhatsApp Business', desc: 'Order updates, support & cart recovery', color: '#25D366', status: 'Connected' },
  { icon: 'ph:device-mobile-bold', name: 'SMS via Twilio', desc: 'OTP, alerts & notifications', color: '#F22F46', status: 'Connected' },
  { icon: 'ph:chat-circle-dots-bold', name: 'Intercom Live Chat', desc: 'In-dashboard customer chat', color: '#1F8DED', status: 'Connected' },
  { icon: 'ph:headset-bold', name: 'Zendesk', desc: 'Support ticketing & SLA tracking', color: '#03363D', status: 'Available' },
  { icon: 'ph:envelope-bold', name: 'Email (transactional)', desc: 'Receipts, order updates, invoices', color: '#6366F1', status: 'Connected' },
]

const mockConversations = [
  { name: 'Nour Ahmed', initials: 'NA', avatarClass: 'bg-green-500/20 text-green-400', channelIcon: 'ph:whatsapp-logo-bold', channelColor: '#25D366', preview: 'Where is my order?', active: true },
  { name: 'Tarek S.', initials: 'TS', avatarClass: 'bg-brand/20 text-brand', channelIcon: 'ph:device-mobile-bold', channelColor: '#F22F46', preview: 'OTP received', active: false },
  { name: 'Lina M.', initials: 'LM', avatarClass: 'bg-purple-500/20 text-purple-400', channelIcon: 'ph:chat-circle-dots-bold', channelColor: '#1F8DED', preview: 'Thanks!', active: false },
]

const mockMessages = [
  { text: 'Hi, where is my order #SO-9831?', outbound: false },
  { text: 'Your order is out for delivery! Track here: storeos.app/track/9831', outbound: true },
  { text: 'Estimated arrival: today by 6 PM 🎉', outbound: true },
]

const features = [
  { icon: 'ph:whatsapp-logo-bold', title: 'WhatsApp Business', description: 'Send order confirmations, shipping updates, and support messages via WhatsApp. Two-way conversations supported.' },
  { icon: 'ph:device-mobile-bold', title: 'SMS notifications', description: 'OTP verification, delivery alerts, and promotional SMS via Twilio — with region-based sender ID.' },
  { icon: 'ph:chat-circle-dots-bold', title: 'Live chat', description: 'Embedded chat widget for your storefront. Route conversations to the right team member automatically.' },
  { icon: 'ph:robot-bold', title: 'Automated sequences', description: 'Trigger multi-step message flows based on order events — abandoned cart, shipped, delivered, or review request.' },
  { icon: 'ph:folders-bold', title: 'Template library', description: 'Pre-approved WhatsApp and SMS templates for every order milestone. Customizable with your brand tone.' },
  { icon: 'ph:chart-bar-bold', title: 'Delivery analytics', description: 'Track delivery rate, open rate, response rate, and revenue attributed per channel and per campaign.' },
]

const automationPoints = [
  'Trigger on order created, shipped, or delivered',
  'Personalize with customer name, order ID, and product names',
  'Multi-step sequences with configurable delays',
  'A/B test message variants',
  'Opt-out handling built in — GDPR & PDPA compliant',
]

const automationSteps = [
  { label: 'Trigger: Cart Abandoned', desc: 'Customer leaves without checkout', rate: '100%', rateLabel: 'trigger rate', active: false },
  { label: 'Wait 1 hour', desc: 'Allow time to complete purchase', rate: '—', rateLabel: '', active: false },
  { label: 'WhatsApp: Reminder sent', desc: '"You left something behind!" + cart link', rate: '72%', rateLabel: 'open rate', active: true },
  { label: 'Wait 6 hours — if no purchase', desc: 'Check if order was placed', rate: '—', rateLabel: '', active: false },
  { label: 'SMS: Discount offer sent', desc: '10% off if they complete checkout', rate: '28%', rateLabel: 'conversion', active: false },
]

const messagingIntegrations = [
  { emoji: '💬', name: 'WhatsApp Business', desc: 'Order updates & support' },
  { emoji: '📱', name: 'Twilio', desc: 'SMS & OTP verification' },
  { emoji: '🟣', name: 'Intercom', desc: 'Live chat & bots' },
  { emoji: '🟢', name: 'Zendesk', desc: 'Support ticketing' },
  { emoji: '🌊', name: 'Freshchat', desc: 'Omnichannel messaging' },
  { emoji: '🐦', name: 'Sendbird', desc: 'In-app chat API' },
]

useSeoMeta({
  title: 'Messaging',
  description: 'WhatsApp order confirmations, SMS alerts, live chat, and automated sequences — manage all customer communication from a single inbox.',
})
</script>