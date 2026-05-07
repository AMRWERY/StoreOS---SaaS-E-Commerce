<template>
  <section id="integrations" class="py-32 px-6 border-t border-border-subtle bg-bg-elevated/20">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-20">
        <p class="text-[10px] font-black tracking-[0.3em] text-brand mb-4">
          {{ t("home.integrations.sectionLabel") }}
        </p>
        <h2 class="text-4xl md:text-5xl font-bold mb-6">
          {{ t("home.integrations.title") }}<br />
          <span class="text-tx-secondary">{{
            t("home.integrations.titleSecondary")
          }}</span>
        </h2>
        <p class="text-tx-secondary max-w-xl mx-auto leading-relaxed">
          {{ t("home.integrations.subtitle") }}
        </p>
      </div>

      <!-- Integration Categories -->
      <div class="space-y-12">
        <div v-for="category in categories" :key="category.label">
          <div class="flex items-center gap-4 mb-6">
            <div :class="[
              'w-8 h-8 rounded-lg flex items-center justify-center',
              category.iconBg,
            ]">
              <Icon :name="category.icon" :class="['text-base', category.iconColor]" />
            </div>
            <h3 class="text-xs font-black tracking-[0.2em] text-tx-muted">
              {{ category.label }}
            </h3>
            <div class="flex-1 h-px bg-border-subtle"></div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <div v-for="item in category.items" :key="item.name"
              class="group relative bg-bg-primary border border-border-subtle hover:border-brand/30 rounded-2xl p-4 flex flex-col items-center gap-3 transition-all duration-200 cursor-pointer hover:bg-bg-elevated hover:shadow-lg hover:shadow-brand/5 hover:-translate-y-0.5">
              <!-- Logo / Icon -->
              <div :class="[
                'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                item.bg,
              ]">
                <Icon :name="item.icon" :class="['text-xl', item.color]" />
              </div>
              <div class="text-center">
                <div class="text-xs font-bold text-tx-primary">
                  {{ item.name }}
                </div>
                <div class="text-[10px] text-tx-muted mt-0.5">
                  {{ item.sub }}
                </div>
              </div>

              <!-- "Live" badge for active ones -->
              <span v-if="item.live" class="absolute top-2 end-2 w-1.5 h-1.5 rounded-full bg-success"></span>

              <!-- Coming Soon badge -->
              <span v-if="item.soon"
                class="absolute top-2 end-2 text-[8px] font-black text-tx-muted bg-bg-elevated border border-border-subtle rounded px-1.5 py-0.5 tracking-widest">{{
                  t("home.integrations.soon") }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Strip -->
      <div
        class="mt-20 bg-bg-primary border border-border-subtle rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 class="text-lg font-bold mb-1">
            {{ t("home.integrations.dontSeeYourTool") }}
          </h3>
          <p class="text-sm text-tx-secondary">
            {{ t("home.integrations.weAreAdding") }}
          </p>
        </div>
        <div class="flex items-center gap-3 shrink-0">
          <LazyVButton variant="none" to="/auth/register"
            className="bg-brand hover:bg-brand-hover text-white px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-lg shadow-brand/20">
            {{ t("home.integrations.requestIntegration") }}
          </LazyVButton>
          <LazyVButton variant="none"
            className="px-6 py-3 bg-bg-elevated hover:bg-white/10 border border-border-subtle rounded-xl text-xs font-bold text-tx-secondary hover:text-tx-primary transition-all">
            {{ t("home.integrations.viewRoadmap") }}
          </LazyVButton>
        </div>
      </div>

      <!-- Go Live Steps -->
      <div class="mt-24 text-center">
        <p class="text-[10px] font-black tracking-[0.3em] text-brand mb-4">
          {{ t("home.integrations.getStarted") }}
        </p>
        <h2 class="text-3xl md:text-4xl font-bold mb-16">
          {{ t("home.integrations.goLive") }}
        </h2>
        <div class="grid md:grid-cols-3 gap-8 relative">
          <div class="hidden md:block absolute top-10 start-1/6 end-1/6 h-px bg-border-subtle -z-10"></div>
          <div v-for="step in steps" :key="step.id" class="flex flex-col items-center group">
            <div
              class="w-20 h-20 rounded-2xl bg-brand-dim border border-brand/20 flex items-center justify-center text-2xl font-black text-brand mb-6 group-hover:scale-105 transition-transform shadow-lg shadow-brand/10">
              {{ step.id }}
            </div>
            <h3 class="text-base font-bold mb-3">{{ step.title }}</h3>
            <p class="text-tx-secondary text-sm leading-relaxed max-w-xs">
              {{ step.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const categories = computed(() => [
  {
    label: t("home.integrations.payments"),
    icon: "ph:credit-card-fill",
    iconBg: "bg-brand-dim",
    iconColor: "text-brand",
    items: [
      {
        name: "Stripe",
        sub: "Cards & Wallets",
        icon: "ph:stripe-logo-fill",
        bg: "bg-[#635bff]/10",
        color: "text-[#635bff]",
        live: true,
      },
      {
        name: "Paymob",
        sub: "Local Gateway",
        icon: "ph:bank-fill",
        bg: "bg-emerald-500/10",
        color: "text-emerald-400",
        live: true,
      },
      {
        name: "Vodafone Cash",
        sub: "Mobile Wallet",
        icon: "ph:device-mobile-fill",
        bg: "bg-red-500/10",
        color: "text-red-400",
        live: true,
      },
      {
        name: "Cash on Delivery",
        sub: "COD",
        icon: "ph:money-fill",
        bg: "bg-yellow-500/10",
        color: "text-yellow-400",
        live: true,
      },
      {
        name: "Fawry",
        sub: "Egyptian Pay",
        icon: "ph:qr-code-fill",
        bg: "bg-orange-500/10",
        color: "text-orange-400",
        soon: true,
      },
      {
        name: "PayPal",
        sub: "Global Pay",
        icon: "ph:paypal-logo-fill",
        bg: "bg-sky-500/10",
        color: "text-sky-400",
        soon: true,
      },
    ],
  },
  {
    label: t("home.integrations.shippingLogistics"),
    icon: "ph:truck-fill",
    iconBg: "bg-warning-dim",
    iconColor: "text-warning",
    items: [
      {
        name: "Aramex",
        sub: "Express",
        icon: "ph:package-fill",
        bg: "bg-orange-500/10",
        color: "text-orange-400",
        live: true,
      },
      {
        name: "J&T Express",
        sub: "Last Mile",
        icon: "ph:lightning-fill",
        bg: "bg-red-500/10",
        color: "text-red-400",
        live: true,
      },
      {
        name: "Bosta",
        sub: "Same Day",
        icon: "ph:motorcycle-fill",
        bg: "bg-brand-dim",
        color: "text-brand",
        live: true,
      },
      {
        name: "DHL",
        sub: "International",
        icon: "ph:airplane-tilt-fill",
        bg: "bg-yellow-500/10",
        color: "text-yellow-400",
        live: true,
      },
      {
        name: "Mylerz",
        sub: "Egypt Delivery",
        icon: "ph:map-pin-fill",
        bg: "bg-emerald-500/10",
        color: "text-emerald-400",
        soon: true,
      },
      {
        name: "FedEx",
        sub: "Global",
        icon: "ph:globe-fill",
        bg: "bg-purple-500/10",
        color: "text-purple-400",
        soon: true,
      },
    ],
  },
  {
    label: t("home.integrations.communication"),
    icon: "ph:chat-circle-dots-fill",
    iconBg: "bg-success-dim",
    iconColor: "text-success",
    items: [
      {
        name: "WhatsApp",
        sub: "Order Updates",
        icon: "ph:whatsapp-logo-fill",
        bg: "bg-emerald-500/10",
        color: "text-emerald-400",
        live: true,
      },
      {
        name: "Email",
        sub: "Transactional",
        icon: "ph:envelope-fill",
        bg: "bg-brand-dim",
        color: "text-brand",
        live: true,
      },
      {
        name: "SMS",
        sub: "Local & Intl",
        icon: "ph:chat-fill",
        bg: "bg-info-dim",
        color: "text-info",
        live: true,
      },
      {
        name: "Slack",
        sub: "Team Alerts",
        icon: "ph:slack-logo-fill",
        bg: "bg-purple-500/10",
        color: "text-purple-400",
        soon: true,
      },
    ],
  },
  {
    label: t("home.integrations.marketingAnalytics"),
    icon: "ph:chart-bar-fill",
    iconBg: "bg-info-dim",
    iconColor: "text-info",
    items: [
      {
        name: "Meta Pixel",
        sub: "Facebook & IG",
        icon: "ph:meta-logo-fill",
        bg: "bg-brand-dim",
        color: "text-brand",
        live: true,
      },
      {
        name: "TikTok Pixel",
        sub: "TikTok Ads",
        icon: "ph:tiktok-logo-fill",
        bg: "bg-[#ff0050]/10",
        color: "text-[#ff0050]",
        live: true,
      },
      {
        name: "Google Analytics",
        sub: "GA4",
        icon: "ph:google-logo-fill",
        bg: "bg-yellow-500/10",
        color: "text-yellow-400",
        live: true,
      },
      {
        name: "Klaviyo",
        sub: "Email Marketing",
        icon: "ph:paper-plane-right-fill",
        bg: "bg-success-dim",
        color: "text-success",
        soon: true,
      },
    ],
  },
]);

const steps = computed(() => [
  {
    id: "01",
    title: t("home.integrations.step1Title"),
    desc: t("home.integrations.step1Desc"),
  },
  {
    id: "02",
    title: t("home.integrations.step2Title"),
    desc: t("home.integrations.step2Desc"),
  },
  {
    id: "03",
    title: t("home.integrations.step3Title"),
    desc: t("home.integrations.step3Desc"),
  },
]);
</script>