<template>
  <div class="bg-bg-base min-h-screen text-tx-primary pb-32">
    <!-- Header -->
    <header class="pt-32 pb-16 px-6 border-b border-border-subtle bg-bg-primary/50">
      <div class="max-w-4xl mx-auto">
        <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted mb-6 uppercase">Legal & Compliance</p>
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p class="text-tx-secondary text-sm">Last Updated: April 21, 2026</p>
      </div>
    </header>

    <!-- Content -->
    <main class="py-20 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="grid lg:grid-cols-4 gap-16">
          <!-- Side Nav (Desktop) -->
          <aside class="hidden lg:block space-y-4 sticky top-32 h-fit">
            <a v-for="s in sections" :key="s.id" :href="`#${s.id}`"
              class="block text-xs font-bold text-tx-muted hover:text-brand transition-colors py-1">
              {{ s.title }}
            </a>
          </aside>

          <!-- Articles -->
          <div class="lg:col-span-3 space-y-16">
            <section v-for="s in sections" :key="s.id" :id="s.id" class="scroll-mt-32">
              <h2 class="text-2xl font-bold mb-6 text-tx-primary">{{ s.title }}</h2>
              <div class="prose prose-invert prose-sm max-w-none text-tx-secondary leading-relaxed space-y-4">
                <p v-for="(p, i) in s.paragraphs" :key="i">{{ p }}</p>
                <ul v-if="s.list" class="list-disc ps-5 mt-4 space-y-2">
                  <li v-for="item in s.list" :key="item">{{ item }}</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>

    <!-- Quick Links -->
    <section class="py-20 px-6 border-t border-border-subtle bg-bg-elevated/30">
      <div class="max-w-4xl mx-auto">
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="link in quickLinks" :key="link.title"
            class="p-8 rounded-2xl border border-border-subtle bg-bg-base hover:border-brand/30 transition-all group">
            <Icon :name="link.icon" class="text-2xl text-brand mb-4" />
            <h3 class="font-bold mb-2">{{ link.title }}</h3>
            <p class="text-[11px] text-tx-secondary mb-6">{{ link.desc }}</p>
            <div
              class="text-[10px] font-black text-brand uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
              Learn More
              <Icon name="ph:arrow-right-bold" />
            </div>
            <nuxt-link-locale to="" class="absolute inset-0 z-10"></nuxt-link-locale>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: "Privacy Policy — StoreOS Data Protection",
  description: "Learn how StoreOS collects, uses, and protects your data. Transparency is at the core of our business.",
  ogTitle: "StoreOS Privacy Policy",
  ogDescription: "A clear and transparent guide to how we handle your information.",
})

const sections = [
  {
    id: 'intro',
    title: '1. Introduction',
    paragraphs: [
      'Welcome to StoreOS. We value your privacy and the security of your data. This Privacy Policy explains how we collect, use, and share information through our platform, marketing efforts, and support services.',
      'By using StoreOS, you agree to the terms outlined in this policy. If you do not agree, please do not use our services.'
    ]
  },
  {
    id: 'collection',
    title: '2. Information We Collect',
    paragraphs: [
      'We collect information that you provide directly to us, as well as information that is generated automatically through your use of the StoreOS platform.',
    ],
    list: [
      'Account information (Name, Email, Business Name)',
      'Transaction data and payment history',
      'Technical identifiers (IP address, Browser type, Device info)',
      'Integration credentials for third-party services',
      'Usage metrics and analytics events'
    ]
  },
  {
    id: 'usage',
    title: '3. How We Use Your Information',
    paragraphs: [
      'Your information is used solely to provide and improve the StoreOS experience. We do not sell your personal data to third parties.',
      'Primary uses include processing transactions, providing customer support, performing fraud analysis, and sending transactional notifications.'
    ]
  },
  {
    id: 'security',
    title: '4. Data Security',
    paragraphs: [
      'We implement enterprise-grade security measures to protect your data. This includes AES-256 encryption at rest, TLS encryption in transit, and regular third-party security audits.',
      'While we strive for 100% security, no method of transmission or storage is perfect. We encourage users to use strong passwords and enable multi-factor authentication (MFA).'
    ]
  },
  {
    id: 'retention',
    title: '5. Data Retention',
    paragraphs: [
      'We retain your data for as long as your account is active or as needed to provide you with our services. We may also retain information for legal compliance, dispute resolution, and enforcement of our agreements.'
    ]
  }
]

const quickLinks = [
  { title: 'Terms of Service', desc: 'The legal agreement between you and StoreOS.', icon: 'ph:scales-fill' },
  { title: 'Cookie Policy', desc: 'How we use cookies to improve your experience.', icon: 'ph:cookie-fill' },
  { title: 'GDPR Compliance', desc: 'How we respect the privacy rights of EU citizens.', icon: 'ph:shield-star-fill' },
]
</script>