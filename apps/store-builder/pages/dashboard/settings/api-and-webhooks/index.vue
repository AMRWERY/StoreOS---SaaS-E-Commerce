<template>
  <div>
    <div class="min-h-screen text-tx-primary pb-12 overflow-x-hidden">
      <LazyVBreadcrumb />

      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold">{{ t("dashboard.api.title") }}</h1>
          <p class="text-sm text-tx-secondary mt-1">
            {{ t("dashboard.api.subtitle") }}
          </p>
        </div>
        <span
          class="bg-info-dim text-info px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest border border-info/20"
        >
          {{ t("dashboard.api.enterpriseOnly") }}
        </span>
      </div>

      <div class="max-w-4xl space-y-6">
        <!-- API key -->
        <div
          class="bg-bg-primary border border-border-subtle rounded-xl overflow-hidden"
        >
          <div
            class="px-4 py-3.5 border-b border-border-subtle flex items-center justify-between"
          >
            <h2 class="text-xs font-semibold text-tx-primary">
              {{ t("dashboard.api.secretKey") }}
            </h2>
            <span class="text-[10px] text-tx-muted font-mono">{{
              t("dashboard.api.lastUsed")
            }}</span>
          </div>
          <div class="px-4 py-4 flex items-center gap-3">
            <code
              class="flex-1 font-mono text-xs text-tx-secondary bg-bg-elevated border border-border-subtle rounded-md px-3 py-2 truncate"
            >
              {{ maskedKey }}
            </code>
            <LazyVButton
              variant="secondary"
              @click="isRevealed = !isRevealed"
              className="px-3 py-2 rounded-md text-[11px] font-bold"
            >
              {{
                isRevealed ? t("dashboard.api.hide") : t("dashboard.api.reveal")
              }}
            </LazyVButton>
          </div>
        </div>

        <!-- Webhook endpoints -->
        <div
          class="bg-bg-primary border border-border-subtle rounded-xl overflow-hidden"
        >
          <div class="px-4 py-3.5 border-b border-border-subtle">
            <h2 class="text-xs font-semibold text-tx-primary">
              {{ t("dashboard.api.webhooks") }}
            </h2>
          </div>
          <div
            v-for="hook in webhooks"
            :key="hook.event"
            class="px-4 py-2.5 border-b border-border-subtle last:border-b-0 flex items-center justify-between hover:bg-bg-elevated transition-colors"
          >
            <div class="min-w-0">
              <p class="text-xs font-medium text-tx-primary font-mono">
                {{ hook.event }}
              </p>
              <p class="text-[10px] text-tx-muted font-mono truncate">
                {{ hook.url }}
              </p>
            </div>
            <span
              class="shrink-0 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider"
              :class="
                hook.active
                  ? 'bg-success-dim text-success'
                  : 'bg-bg-overlay text-tx-muted'
              "
            >
              {{
                hook.active
                  ? t("dashboard.api.active")
                  : t("dashboard.api.paused")
              }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const isRevealed = ref(false);
/**
 * Demo value only. Deliberately NOT in a real provider's key format (`sk_live_…`,
 * `ghp_…`, `AKIA…`) — those trip GitHub secret scanning and block the push.
 */
const API_KEY_PREFIX = "sos_live";
const API_KEY = `${API_KEY_PREFIX}_demo_key_0000000000000000`;

const maskedKey = computed(() =>
  isRevealed.value ? API_KEY : `${API_KEY_PREFIX}_${"•".repeat(24)}`,
);

const webhooks = [
  { event: "order.created", url: "https://api.mystore.com/hooks/orders", active: true },
  { event: "order.fulfilled", url: "https://api.mystore.com/hooks/fulfil", active: true },
  { event: "inventory.low_stock", url: "https://api.mystore.com/hooks/stock", active: false },
];

definePageMeta({ layout: "dashboard" });

useSeoMeta({ title: "API & Webhooks", robots: "noindex, nofollow" });
</script>
