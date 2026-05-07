<template>
  <section id="pricing" class="py-32 px-6 border-t border-border-subtle scroll-mt-24">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <p class="text-[10px] font-black tracking-[0.3em] text-brand mb-4">
          {{ t("home.pricing.sectionLabel") }}
        </p>
        <h2 class="text-4xl md:text-5xl font-bold mb-5">
          {{ t("home.pricing.title") }}
        </h2>
        <p class="text-tx-secondary mb-10">{{ t("home.pricing.subtitle") }}</p>

        <!-- Billing Toggle -->
        <div class="inline-flex items-center gap-4 bg-bg-primary border border-border-subtle rounded-2xl p-1.5">
          <button @click="billing = 'monthly'" :class="[
            'px-5 py-2 rounded-xl text-xs font-bold transition-all',
            billing === 'monthly'
              ? 'bg-bg-elevated text-tx-primary shadow'
              : 'text-tx-muted hover:text-tx-secondary',
          ]">
            {{ t("home.pricing.monthly") }}
          </button>
          <button @click="billing = 'annual'" :class="[
            'relative px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2',
            billing === 'annual'
              ? 'bg-bg-elevated text-tx-primary shadow'
              : 'text-tx-muted hover:text-tx-secondary',
          ]">
            {{ t("home.pricing.annual") }}
            <span class="bg-success/20 text-success text-[9px] font-black px-1.5 py-0.5 rounded tracking-widest">{{
              t("home.pricing.save20") }}</span>
          </button>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
        <div v-for="tier in tiers" :key="tier.name" :class="[
          'relative p-8 rounded-3xl border flex flex-col transition-all duration-300',
          tier.popular
            ? 'bg-bg-primary border-brand/40 shadow-2xl shadow-brand/10 scale-[1.02]'
            : 'bg-bg-elevated/30 border-border-subtle hover:border-border-default',
        ]">
          <!-- Popular Badge -->
          <div v-if="tier.popular" class="absolute -top-4 start-1/2 -translate-x-1/2">
            <span
              class="bg-brand text-white text-[9px] font-black tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-brand/30">
              {{ t("home.pricing.mostPopular") }}
            </span>
          </div>

          <!-- Tier Header -->
          <div class="mb-8">
            <div :class="[
              'w-10 h-10 rounded-xl flex items-center justify-center mb-4',
              tier.iconBg,
            ]">
              <Icon :name="tier.icon" :class="['text-xl', tier.iconColor]" />
            </div>
            <h3 class="text-xl font-bold mb-1">{{ tier.name }}</h3>
            <p class="text-sm text-tx-muted">{{ tier.tagline }}</p>
          </div>

          <!-- Price -->
          <div class="mb-8">
            <div class="flex items-end gap-1">
              <span class="text-4xl font-bold">
                {{
                  tier.free
                    ? t("home.pricing.free")
                    : `$${billing === "annual"
                      ? tier.annualPrice
                      : tier.monthlyPrice
                    }`
                }}
              </span>
              <span v-if="!tier.free" class="text-tx-muted mb-1.5">{{
                t("home.pricing.perMonth")
              }}</span>
            </div>
            <p v-if="!tier.free && billing === 'annual'" class="text-xs text-success font-bold mt-1">
              {{
                t("home.pricing.billedAnnually").replace(
                  "${amount}",
                  String((tier.monthlyPrice - tier.annualPrice) * 12)
                )
              }}
            </p>
            <p v-else-if="!tier.free" class="text-xs text-tx-muted mt-1">
              {{ t("home.pricing.billedMonthly") }}
            </p>
            <p v-else class="text-xs text-success font-bold mt-1">
              {{ t("home.pricing.alwaysFree") }}
            </p>
          </div>

          <!-- CTA -->
          <LazyVButton variant="none" :to="tier.trial ? undefined : tier.ctaRoute"
            @click="tier.trial ? openTrialModal(tier) : undefined" :className="`w-full py-3.5 rounded-xl font-bold text-sm transition-all mb-8 flex items-center justify-center ${tier.popular
              ? 'bg-brand hover:bg-brand-hover text-white shadow-lg shadow-brand/20'
              : tier.free
                ? 'bg-success/15 hover:bg-success/25 border border-success/30 text-success'
                : 'bg-bg-elevated hover:bg-white/10 border border-border-default text-tx-primary'
              }`">
            {{ tier.cta }}
          </LazyVButton>

          <!-- Features List -->
          <div class="space-y-1 flex-1">
            <div v-for="group in tier.featureGroups" :key="group.label" class="mb-5">
              <p class="text-[9px] font-black text-tx-muted tracking-[0.2em] mb-3">
                {{ group.label }}
              </p>
              <div v-for="feat in group.items" :key="feat.label" class="flex items-start gap-3 py-1.5">
                <Icon :name="feat.included
                  ? 'ph:check-circle-fill'
                  : 'ph:minus-circle-fill'
                  " :class="[
                      'text-base shrink-0 mt-0.5',
                      feat.included ? 'text-success' : 'text-tx-muted',
                    ]" />
                <span :class="[
                  'text-xs leading-relaxed',
                  feat.included
                    ? 'text-tx-secondary'
                    : 'text-tx-muted line-through',
                ]">
                  {{ feat.label }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature Comparison Table -->
      <div class="bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden mb-20">
        <div class="p-6 border-b border-border-subtle">
          <h3 class="font-bold">
            {{ t("home.pricing.fullFeatureComparison") }}
          </h3>
          <p class="text-xs text-tx-muted mt-1">
            {{ t("home.pricing.seeExactlyIncluded") }}
          </p>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-border-subtle">
                <th class="text-start px-6 py-4 text-xs font-bold text-tx-muted w-1/2">
                  {{ t("home.pricing.featureColumn") }}
                </th>
                <th v-for="tier in tiers" :key="tier.name" class="px-6 py-4 text-center text-xs font-bold"
                  :class="tier.popular ? 'text-brand' : 'text-tx-secondary'">
                  {{ tier.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in comparisonRows" :key="row.feature" :class="[
                'border-b border-border-subtle/50 hover:bg-bg-elevated/30 transition-colors',
                i % 2 === 0 ? '' : 'bg-bg-elevated/10',
              ]">
                <td class="px-6 py-3.5 text-xs font-medium text-tx-secondary">
                  {{ row.feature }}
                </td>
                <td v-for="(val, j) in row.values" :key="j" class="px-6 py-3.5 text-center">
                  <Icon v-if="val === true" name="ph:check-bold" class="text-success mx-auto" />
                  <Icon v-else-if="val === false" name="ph:minus-bold" class="text-tx-muted mx-auto" />
                  <span v-else class="text-xs font-bold text-tx-secondary">{{
                    val
                  }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Trust & FAQ strip -->
      <div class="grid md:grid-cols-2 gap-12 items-start">
        <!-- Trust signals -->
        <div>
          <h3 class="text-xl font-bold mb-6">
            {{ t("home.pricing.everythingYouNeed") }}
          </h3>
          <div class="space-y-4">
            <div v-for="trust in trustItems" :key="trust.title" class="flex items-start gap-4">
              <div class="w-9 h-9 rounded-xl bg-brand-dim flex items-center justify-center shrink-0">
                <Icon :name="trust.icon" class="text-brand text-base" />
              </div>
              <div>
                <p class="text-sm font-bold">{{ trust.title }}</p>
                <p class="text-xs text-tx-muted mt-0.5">{{ trust.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ -->
        <div class="space-y-3">
          <h3 class="text-xl font-bold mb-6">
            {{ t("home.pricing.commonQuestions") }}
          </h3>
          <div v-for="(faq, idx) in faqs" :key="faq.q" class="border border-border-subtle rounded-xl overflow-hidden">
            <button @click="faqOpen[idx] = !faqOpen[idx]"
              class="w-full flex items-center justify-between px-5 py-4 text-sm font-bold text-start hover:bg-bg-elevated/30 transition-colors">
              {{ faq.q }}
              <Icon :name="faqOpen[idx] ? 'ph:minus-bold' : 'ph:plus-bold'" class="text-tx-muted shrink-0 ms-4" />
            </button>
            <Transition name="faq-slide">
              <div v-if="faqOpen[idx]"
                class="px-5 pb-4 text-xs text-tx-secondary leading-relaxed border-t border-border-subtle/50 pt-3">
                {{ faq.a }}
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Trial Modal -->
  <LazyVDialog v-model="isTrialOpen" max-width="440px">
    <template #title>
      <div class="flex items-center gap-2">
        <span class="inline-flex w-2 h-2 rounded-full bg-brand animate-pulse"></span>
        {{
          selectedTier?.free
            ? t("home.pricing.modal.createFreeAccount")
            : t("home.pricing.modal.startTrial")
        }}
      </div>
    </template>

    <div v-if="selectedTier" class="space-y-5">
      <!-- Plan recap -->
      <div class="flex items-center gap-4 p-4 rounded-2xl bg-bg-elevated border border-border-subtle">
        <div :class="[
          'w-11 h-11 rounded-xl flex items-center justify-center shrink-0',
          selectedTier.iconBg,
        ]">
          <Icon :name="selectedTier.icon" :class="['text-xl', selectedTier.iconColor]" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-bold text-sm">
            {{ selectedTier.name }} {{ t("home.pricing.modal.plan") }}
          </p>
          <p class="text-xs text-tx-muted truncate">
            {{ selectedTier.tagline }}
          </p>
        </div>
        <div class="text-end shrink-0">
          <p class="font-bold text-sm">
            <template v-if="selectedTier.free">Free</template>
            <template v-else>${{
              billing === "annual"
                ? selectedTier.annualPrice
                : selectedTier.monthlyPrice
            }}<span class="text-tx-muted font-normal text-xs">/mo</span></template>
          </p>
          <p class="text-[11px] text-success font-bold">
            {{
              selectedTier.free
                ? t("home.pricing.modal.alwaysFree")
                : t("home.pricing.modal.14daysFree")
            }}
          </p>
        </div>
      </div>

      <!-- Email input -->
      <div>
        <label class="text-xs font-bold text-tx-secondary mb-2 block">{{
          t("home.pricing.modal.workEmail")
        }}</label>
        <input v-model="trialEmail" type="email" :placeholder="t('home.pricing.modal.emailPlaceholder')"
          @keydown.enter="startTrial"
          class="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-tx-primary placeholder:text-tx-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all" />
        <p v-if="emailError" class="text-xs text-error mt-1.5 flex items-center gap-1">
          <Icon name="ph:warning-fill" class="text-sm shrink-0" />
          {{ emailError }}
        </p>
      </div>

      <!-- Submit -->
      <LazyVButton variant="none" @click="startTrial" :className="`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${selectedTier.free
        ? 'bg-success/15 hover:bg-success/25 border border-success/30 text-success shadow-success/10'
        : 'bg-brand hover:bg-brand-hover text-white shadow-brand/20'
        }`">
        {{
          selectedTier.free
            ? t("home.pricing.modal.createFreeAccountBtn")
            : t("home.pricing.modal.startMyTrial")
        }}
        <Icon name="ph:arrow-right-bold" class="text-base rtl:rotate-180" />
      </LazyVButton>

      <p class="text-center text-[11px] text-tx-muted">
        {{
          selectedTier.free
            ? t("home.pricing.modal.noCardFree")
            : t("home.pricing.modal.noCardTrial")
        }}
      </p>
    </div>
  </LazyVDialog>
</template>

<script lang="ts" setup>
import type { Tier } from "@/types/pricing";

const { t } = useI18n();
const router = useRouter();
const billing = ref<"monthly" | "annual">("monthly");

const isTrialOpen = ref(false);
const selectedTier = ref<Tier | null>(null);
const trialEmail = ref("");
const emailError = ref("");

const openTrialModal = (tier: Tier) => {
  selectedTier.value = tier;
  trialEmail.value = "";
  emailError.value = "";
  isTrialOpen.value = true;
};

const startTrial = () => {
  if (
    !trialEmail.value ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trialEmail.value)
  ) {
    emailError.value = t("home.pricing.modal.invalidEmail");
    return;
  }
  emailError.value = "";
  router.push({
    path: "/auth/register",
    query: {
      plan: selectedTier.value?.name.toLowerCase(),
      email: trialEmail.value,
      trial: "true",
    },
  });
  isTrialOpen.value = false;
};

const tiers = computed(() => [
  {
    name: t("home.pricing.tiers.free.name"),
    tagline: t("home.pricing.tiers.free.tagline"),
    monthlyPrice: 0,
    annualPrice: 0,
    icon: "ph:gift-fill",
    iconBg: "bg-success-dim",
    iconColor: "text-success",
    popular: false,
    free: true,
    trial: true,
    cta: t("home.pricing.tiers.free.cta"),
    ctaRoute: "/auth/register",
    featureGroups: [
      {
        label: t("home.pricing.ordersAndProducts"),
        items: [
          { label: t("home.pricing.features.up50orders"), included: true },
          { label: t("home.pricing.features.up50skus"), included: true },
          {
            label: t("home.pricing.features.bulkOrderActions"),
            included: false,
          },
        ],
      },
      {
        label: t("home.pricing.teamAndAccess"),
        items: [
          { label: t("home.pricing.features.1member"), included: true },
          {
            label: t("home.pricing.features.roleBasedPermissions"),
            included: false,
          },
          {
            label: t("home.pricing.features.staffActivityLog"),
            included: false,
          },
        ],
      },
      {
        label: t("home.pricing.analyticsLabel"),
        items: [
          { label: t("home.pricing.features.basicRevenue"), included: true },
          {
            label: t("home.pricing.features.advancedAnalytics"),
            included: false,
          },
        ],
      },
    ],
  },
  {
    name: t("home.pricing.tiers.starter.name"),
    tagline: t("home.pricing.tiers.starter.tagline"),
    monthlyPrice: 19,
    annualPrice: 15,
    icon: "ph:rocket-launch-fill",
    iconBg: "bg-bg-elevated",
    iconColor: "text-tx-secondary",
    popular: false,
    free: false,
    trial: true,
    cta: t("home.pricing.tiers.starter.cta"),
    ctaRoute: "/auth/register?plan=starter",
    featureGroups: [
      {
        label: t("home.pricing.ordersAndProducts"),
        items: [
          { label: t("home.pricing.features.up1000orders"), included: true },
          { label: t("home.pricing.features.up500skus"), included: true },
          {
            label: t("home.pricing.features.bulkOrderActions"),
            included: false,
          },
        ],
      },
      {
        label: t("home.pricing.teamAndAccess"),
        items: [
          { label: t("home.pricing.features.3members"), included: true },
          {
            label: t("home.pricing.features.roleBasedPermissions"),
            included: false,
          },
          {
            label: t("home.pricing.features.staffActivityLog"),
            included: false,
          },
        ],
      },
      {
        label: t("home.pricing.analyticsLabel"),
        items: [
          { label: t("home.pricing.features.basicRevenue"), included: true },
          {
            label: t("home.pricing.features.advancedAnalytics"),
            included: false,
          },
        ],
      },
    ],
  },
  {
    name: t("home.pricing.tiers.growth.name"),
    tagline: t("home.pricing.tiers.growth.tagline"),
    monthlyPrice: 49,
    annualPrice: 39,
    icon: "ph:chart-line-up-fill",
    iconBg: "bg-brand-dim",
    iconColor: "text-brand",
    popular: true,
    free: false,
    trial: true,
    cta: t("home.pricing.tiers.growth.cta"),
    ctaRoute: "/auth/register?plan=growth",
    featureGroups: [
      {
        label: t("home.pricing.ordersAndProducts"),
        items: [
          { label: t("home.pricing.features.unlimitedOrders"), included: true },
          { label: t("home.pricing.features.unlimitedSKUs"), included: true },
          {
            label: t("home.pricing.features.bulkOrderActions"),
            included: true,
          },
        ],
      },
      {
        label: t("home.pricing.teamAndAccess"),
        items: [
          { label: t("home.pricing.features.10members"), included: true },
          {
            label: t("home.pricing.features.roleBasedPermissions"),
            included: true,
          },
          {
            label: t("home.pricing.features.staffActivityLog"),
            included: true,
          },
        ],
      },
      {
        label: t("home.pricing.analyticsLabel"),
        items: [
          {
            label: t("home.pricing.features.advancedAnalytics"),
            included: true,
          },
          { label: t("home.pricing.features.multiWarehouse"), included: true },
        ],
      },
    ],
  },
  {
    name: t("home.pricing.tiers.enterprise.name"),
    tagline: t("home.pricing.tiers.enterprise.tagline"),
    monthlyPrice: 99,
    annualPrice: 79,
    icon: "ph:buildings-fill",
    iconBg: "bg-info-dim",
    iconColor: "text-info",
    popular: false,
    free: false,
    trial: false,
    cta: t("home.pricing.tiers.enterprise.cta"),
    ctaRoute: "/auth/register?plan=enterprise",
    featureGroups: [
      {
        label: t("home.pricing.ordersAndProducts"),
        items: [
          { label: t("home.pricing.features.unlimitedOrders"), included: true },
          { label: t("home.pricing.features.unlimitedSKUs"), included: true },
          {
            label: t("home.pricing.features.priorityFulfilment"),
            included: true,
          },
        ],
      },
      {
        label: t("home.pricing.teamAndAccess"),
        items: [
          {
            label: t("home.pricing.features.unlimitedMembers"),
            included: true,
          },
          {
            label: t("home.pricing.features.customRoleBuilder"),
            included: true,
          },
          {
            label: t("home.pricing.features.dedicatedManager"),
            included: true,
          },
        ],
      },
      {
        label: t("home.pricing.platform"),
        items: [
          { label: t("home.pricing.features.fullApiAccess"), included: true },
          {
            label: t("home.pricing.features.customIntegrations"),
            included: true,
          },
        ],
      },
    ],
  },
]);

const comparisonRows = computed(() => [
  {
    feature: t("home.pricing.comparison.monthlyOrders"),
    values: ["50", "1,000", t("common.all"), t("common.all")],
  },
  {
    feature: t("home.pricing.comparison.productsSKUs"),
    values: ["50", "500", t("common.all"), t("common.all")],
  },
  {
    feature: t("home.pricing.comparison.teamMembers"),
    values: ["1", "3", "10", t("common.all")],
  },
  {
    feature: t("home.pricing.comparison.analyticsDashboard"),
    values: [t("home.pricing.comparison.basic"), t("home.pricing.comparison.basic"), t("home.pricing.comparison.advanced"), t("home.pricing.comparison.Advanced + API")],
  },
  {
    feature: t("home.pricing.comparison.multiWarehouse"),
    values: [false, false, true, true],
  },
  {
    feature: t("home.pricing.comparison.customerCRM"),
    values: [false, true, true, true],
  },
  {
    feature: t("home.pricing.comparison.couponBuilder"),
    values: [false, false, true, true],
  },
  {
    feature: t("home.pricing.comparison.apiAccess"),
    values: [false, false, false, true],
  },
  {
    feature: t("home.pricing.comparison.storeBuilder"),
    values: [false, false, true, true],
  },
  {
    feature: t("home.pricing.comparison.dedicatedSupport"),
    values: [t("home.pricing.comparison.Community"), t("home.pricing.comparison.Email"), t("home.pricing.comparison.Priority"), t("home.pricing.comparison.AccountManager")],
  },
]);

const trustItems = computed(() => [
  {
    icon: "ph:shield-check-fill",
    title: t("home.pricing.trust.noCreditCard"),
    desc: t("home.pricing.trust.noCreditCardDesc"),
  },
  {
    icon: "ph:arrows-counter-clockwise-fill",
    title: t("home.pricing.trust.cancelAnytime"),
    desc: t("home.pricing.trust.cancelAnytimeDesc"),
  },
  {
    icon: "ph:lock-key-fill",
    title: t("home.pricing.trust.yourData"),
    desc: t("home.pricing.trust.yourDataDesc"),
  },
  {
    icon: "ph:headset-fill",
    title: t("home.pricing.trust.onboardingSupport"),
    desc: t("home.pricing.trust.onboardingSupportDesc"),
  },
]);

const faqOpen = reactive([false, false, false, false]);

const faqs = computed(() => [
  {
    q: t("home.pricing.faq.switchPlans"),
    a: t("home.pricing.faq.switchPlansAnswer"),
    open: false,
  },
  {
    q: t("home.pricing.faq.afterTrial"),
    a: t("home.pricing.faq.afterTrialAnswer"),
    open: false,
  },
  {
    q: t("home.pricing.faq.arabicRTL"),
    a: t("home.pricing.faq.arabicRTLAnswer"),
    open: false,
  },
  {
    q: t("home.pricing.faq.annualDiscount"),
    a: t("home.pricing.faq.annualDiscountAnswer"),
    open: false,
  },
]);
</script>

<style scoped>
.faq-slide-enter-active,
.faq-slide-leave-active {
  transition: max-height 0.25s ease, opacity 0.2s ease;
  max-height: 200px;
  overflow: hidden;
}

.faq-slide-enter-from,
.faq-slide-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>