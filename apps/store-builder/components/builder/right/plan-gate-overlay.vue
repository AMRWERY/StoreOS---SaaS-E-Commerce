<template>
  <LazyVDialog v-model="planGateOpen" max-width="5xl">
    <template #title>
      <div class="flex items-center gap-2">
        <span class="inline-flex size-2 animate-pulse rounded-full bg-brand" />
        {{ isTrialMode ? "Free Trial — Limited Access" : "Upgrade your plan" }}
      </div>
    </template>

    <p class="mb-5 text-center text-xs leading-relaxed text-tx-secondary">
      {{
        isTrialMode
          ? "Publishing stores live, custom domains, and premium sections require the Growth plan."
          : "Custom fonts, advanced sections, and priority publishing are on the Growth plan."
      }}
    </p>

    <!-- Billing toggle -->
    <div class="mb-6 flex justify-center">
      <div
        class="inline-flex items-center gap-1 rounded-2xl border border-border-subtle bg-bg-base p-1"
      >
        <button
          type="button"
          :class="toggleClass(billing === 'monthly')"
          @click="billing = 'monthly'"
        >
          {{ t("home.pricing.monthly") }}
        </button>
        <button
          type="button"
          :class="[toggleClass(billing === 'annual'), 'flex items-center gap-2']"
          @click="billing = 'annual'"
        >
          {{ t("home.pricing.annual") }}
          <span
            class="rounded bg-success/20 px-1.5 py-0.5 text-[9px] font-black tracking-widest text-success"
          >
            {{ t("home.pricing.save20") }}
          </span>
        </button>
      </div>
    </div>

    <!-- Plans -->
    <div class="grid gap-4 pt-3 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="tier in tiers"
        :key="tier.plan"
        :class="[
          'relative flex flex-col rounded-2xl border p-5',
          tier.popular
            ? 'border-brand/40 bg-bg-primary shadow-2xl shadow-brand/10'
            : 'border-border-subtle bg-bg-elevated/30',
        ]"
      >
        <span
          v-if="tier.popular"
          class="absolute -top-3 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-3 py-1 text-[9px] font-black tracking-widest text-white shadow-lg shadow-brand/30"
        >
          {{ t("home.pricing.mostPopular") }}
        </span>

        <div class="mb-5">
          <div
            :class="[
              'mb-3 flex size-9 items-center justify-center rounded-xl',
              tier.iconBg,
            ]"
          >
            <Icon :name="tier.icon" :class="['text-lg', tier.iconColor]" />
          </div>
          <h3 class="text-base font-bold">{{ tier.name }}</h3>
          <p class="text-xs text-tx-muted">{{ tier.tagline }}</p>
        </div>

        <div class="mb-5">
          <div class="flex items-end gap-1">
            <span class="font-mono text-3xl font-bold">
              {{
                tier.free
                  ? t("home.pricing.free")
                  : `$${billing === "annual" ? tier.annualPrice : tier.monthlyPrice}`
              }}
            </span>
            <span v-if="!tier.free" class="mb-1 text-xs text-tx-muted">
              {{ t("home.pricing.perMonth") }}
            </span>
          </div>
          <p
            v-if="!tier.free && billing === 'annual'"
            class="mt-1 text-[11px] font-bold text-success"
          >
            {{
              t("home.pricing.billedAnnually").replace(
                "${amount}",
                String((tier.monthlyPrice - tier.annualPrice) * 12),
              )
            }}
          </p>
          <p v-else-if="!tier.free" class="mt-1 text-[11px] text-tx-muted">
            {{ t("home.pricing.billedMonthly") }}
          </p>
          <p v-else class="mt-1 text-[11px] font-bold text-success">
            {{ t("home.pricing.alwaysFree") }}
          </p>
        </div>

        <button
          type="button"
          :class="[
            'mb-5 flex w-full items-center justify-center rounded-xl py-3 text-xs font-bold transition-colors',
            tier.popular
              ? 'bg-brand text-white shadow-lg shadow-brand/20 hover:bg-brand-hover'
              : tier.free
                ? 'border border-success/30 bg-success/15 text-success hover:bg-success/25'
                : 'border border-border-default bg-bg-elevated text-tx-primary hover:bg-white/10',
          ]"
          @click="planGateOpen = false"
        >
          {{ tier.cta }}
        </button>

        <div class="flex-1 space-y-1">
          <div v-for="group in tier.featureGroups" :key="group.label" class="mb-4">
            <p class="mb-2 text-[9px] font-black tracking-[0.2em] text-tx-muted">
              {{ group.label }}
            </p>
            <div
              v-for="feat in group.items"
              :key="feat.label"
              class="flex items-start gap-2.5 py-1"
            >
              <Icon
                :name="feat.included ? 'ph:check-circle-fill' : 'ph:minus-circle-fill'"
                :class="[
                  'mt-0.5 shrink-0 text-sm',
                  feat.included ? 'text-success' : 'text-tx-muted',
                ]"
              />
              <span
                :class="[
                  'text-xs leading-relaxed',
                  feat.included ? 'text-tx-secondary' : 'text-tx-muted line-through',
                ]"
              >
                {{ feat.label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </LazyVDialog>
</template>

<script lang="ts" setup>
import { buildPricingTiers } from "@/data/pricing-tiers";

const { t } = useI18n();
const { planGateOpen } = useBuilderModals();
const { hasFeature } = useAuth();

const isTrialMode = computed(() => !hasFeature("builder"));
const billing = ref<"monthly" | "annual">("monthly");
const tiers = computed(() => buildPricingTiers(t));

const toggleClass = (active: boolean) =>
  `rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
    active
      ? "bg-bg-elevated text-tx-primary shadow"
      : "text-tx-muted hover:text-tx-secondary"
  }`;
</script>
