<template>
  <div class="bg-bg-base min-h-screen text-tx-primary pb-32">
    <!-- Header -->
    <header class="pt-32 pb-20 px-6 border-b border-border-subtle bg-bg-primary/50 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent pointer-events-none" />
      <div class="max-w-5xl mx-auto relative z-10">
        <p class="text-[10px] font-black tracking-[0.4em] text-brand mb-6 uppercase">Contact</p>
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Let's talk.</h1>
        <p class="text-tx-secondary text-lg max-w-xl leading-relaxed">
          Whether you have a sales question, need technical support, or just want to say hi — we're here.
        </p>
      </div>
    </header>

    <!-- Content -->
    <section class="py-20 px-6">
      <div class="max-w-5xl mx-auto grid md:grid-cols-5 gap-12">
        <!-- Contact options -->
        <div class="md:col-span-2 space-y-5">
          <div v-for="channel in channels" :key="channel.title"
            class="bg-bg-primary border border-border-subtle rounded-2xl p-5">
            <div class="flex items-start gap-4">
              <div class="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                <Icon :name="channel.icon" class="text-brand" />
              </div>
              <div>
                <p class="font-bold text-sm mb-1">{{ channel.title }}</p>
                <p class="text-xs text-tx-muted mb-2 leading-relaxed">{{ channel.description }}</p>
                <a :href="channel.href" class="text-xs text-brand font-semibold hover:underline">{{ channel.cta }}</a>
              </div>
            </div>
          </div>

          <div class="bg-bg-primary border border-border-subtle rounded-2xl p-5">
            <p class="text-xs font-bold text-tx-secondary mb-3 uppercase tracking-widest">Office Hours</p>
            <div class="space-y-2 text-xs text-tx-muted">
              <div class="flex justify-between"><span>Sunday – Thursday</span><span
                  class="font-medium text-tx-secondary">9:00 AM – 6:00 PM</span></div>
              <div class="flex justify-between"><span>Friday – Saturday</span><span
                  class="font-medium text-tx-secondary">Closed</span></div>
              <div class="flex justify-between"><span>Timezone</span><span class="font-medium text-tx-secondary">Cairo
                  (UTC+3)</span></div>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div class="md:col-span-3">
          <div class="bg-bg-primary border border-border-subtle rounded-2xl p-8">
            <h2 class="font-bold text-lg mb-6">Send us a message</h2>

            <Transition name="fade" mode="out-in">
              <div v-if="sent" class="text-center py-12">
                <div class="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Icon name="ph:check-circle-bold" class="text-green-400 text-3xl" />
                </div>
                <h3 class="font-bold text-lg mb-2">Message sent!</h3>
                <p class="text-sm text-tx-secondary">We'll get back to you within one business day.</p>
              </div>

              <form v-else @submit.prevent="submit" class="space-y-5">
                <div class="grid sm:grid-cols-2 gap-5">
                  <LazyVInput v-model="form.firstName" label="First name" placeholder="Adam" required />
                  <LazyVInput v-model="form.lastName" label="Last name" placeholder="Karim" required />
                </div>

                <LazyVInput v-model="form.email" label="Email" type="email" placeholder="adam@mystore.com" required />

                <div>
                  <label class="block text-xs font-bold text-tx-secondary mb-2">Topic</label>
                  <select v-model="form.topic"
                    class="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm outline-none focus:border-brand/40 transition-colors appearance-none">
                    <option value="">Select a topic</option>
                    <option>Sales & Pricing</option>
                    <option>Technical Support</option>
                    <option>Billing</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold text-tx-secondary mb-2">Message</label>
                  <textarea v-model="form.message" required rows="5" placeholder="Tell us what you need..."
                    class="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm outline-none focus:border-brand/40 transition-colors resize-none" />
                </div>

                <LazyVButton type="submit" :disabled="loading" variant="none"
                  className="w-full bg-brand text-white py-3.5 rounded-xl font-bold text-sm hover:bg-brand/90 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                  <Icon v-if="loading" name="ph:circle-notch-bold" class="animate-spin" />
                  {{ loading ? 'Sending...' : 'Send message' }}
                  <Icon v-if="!loading" name="ph:paper-plane-tilt-bold" />
                </LazyVButton>
              </form>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()

/**
 * Arriving from the pricing page (`/contact?plan=enterprise&email=…`) — carry the
 * email the visitor already typed so they never enter it twice. Seeded during setup,
 * not onMounted, so the field is already filled in the server-rendered HTML.
 */
const PLAN_TOPICS: Record<string, string> = { enterprise: 'Sales & Pricing' }

const queryParam = (key: string) => {
  const value = route.query[key]
  return typeof value === 'string' ? value : ''
}

const plan = queryParam('plan')

const sent = ref(false)
const loading = ref(false)
const form = reactive({
  firstName: '',
  lastName: '',
  email: queryParam('email'),
  topic: PLAN_TOPICS[plan] ?? '',
  message: PLAN_TOPICS[plan]
    ? `I'd like to talk about the ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan.`
    : '',
})

const submit = async () => {
  loading.value = true
  await new Promise((r) => setTimeout(r, 1200))
  loading.value = false
  sent.value = true
}

const channels = [
  { icon: 'ph:envelope-bold', title: 'Email us', description: 'For general inquiries and partnerships.', cta: 'hello@storeos.io', href: 'mailto:hello@storeos.io' },
  { icon: 'ph:headset-bold', title: 'Support', description: 'Technical issues and billing questions.', cta: 'support@storeos.io', href: 'mailto:support@storeos.io' },
  { icon: 'ph:chat-circle-dots-bold', title: 'Live chat', description: 'Available inside your dashboard for paid plans.', cta: 'Open dashboard', href: '/auth/login' },
]

useSeoMeta({
  title: 'Contact',
  description: 'Get in touch with the StoreOS team.'
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>