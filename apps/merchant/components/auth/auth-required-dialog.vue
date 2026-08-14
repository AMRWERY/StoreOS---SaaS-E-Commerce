<template>
  <LazyVDialog v-model="open" maxWidth="md" :title="t('auth.gate.modalTitle')">
    <div class="space-y-6">
      <!-- Lock badge -->
      <div class="flex flex-col items-center text-center gap-3">
        <div
          class="w-12 h-12 rounded-xl bg-brand-dim border border-brand/20 flex items-center justify-center"
        >
          <Icon name="lucide:lock" class="w-5 h-5 text-brand" />
        </div>
        <div class="space-y-1.5">
          <h2 class="text-[15px] font-semibold text-tx-primary">
            {{ featureLabel ? t("auth.gate.titleFeature", { feature: featureLabel }) : t("auth.gate.title") }}
          </h2>
          <p class="text-xs text-tx-secondary max-w-[300px]">
            {{ t("auth.gate.subtitle") }}
          </p>
        </div>
      </div>

      <!-- What signing up unlocks -->
      <ul class="space-y-2 px-1">
        <li
          v-for="perk in perks"
          :key="perk"
          class="flex items-center gap-2.5 text-xs text-tx-secondary"
        >
          <Icon name="lucide:check" class="w-3.5 h-3.5 text-success shrink-0" />
          <span>{{ perk }}</span>
        </li>
      </ul>

      <!-- Actions -->
      <div class="space-y-2.5">
        <LazyVButton
          variant="none"
          @click="goToRegister"
          className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white py-3 rounded-lg font-bold text-xs transition-all shadow-lg shadow-orange-600/20"
        >
          {{ t("auth.gate.createAccount") }}
          <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
        </LazyVButton>

        <LazyVButton
          variant="none"
          @click="goToLogin"
          className="w-full flex items-center justify-center py-3 rounded-lg font-bold text-xs border border-border-default bg-bg-elevated text-tx-secondary hover:text-tx-primary transition"
        >
          {{ t("auth.gate.signIn") }}
        </LazyVButton>

        <button
          type="button"
          @click="closeGate"
          class="w-full py-1.5 text-[11px] font-medium text-tx-muted hover:text-tx-secondary transition-colors"
        >
          {{ t("auth.gate.keepExploring") }}
        </button>
      </div>

      <p class="text-center text-[10px] tracking-wider text-tx-muted">
        {{ t("auth.gate.noCardRequired") }}
      </p>
    </div>
  </LazyVDialog>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const localePath = useLocalePath();
const { isGateOpen, gateFeature, closeGate } = useAuthGate();

const open = computed({
  get: () => isGateOpen.value,
  set: (v) => (v ? undefined : closeGate()),
});

/** Feature keys share their labels with the sidebar nav; write actions stay generic. */
const FEATURE_LABEL_KEYS: Record<string, string> = {
  inventory: "nav.inventory",
  customers: "nav.customers",
  analytics: "nav.analytics",
  coupons: "nav.coupons",
  builder: "nav.storeBuilder",
  settings: "nav.settings",
  profile: "nav.userProfile",
};

const featureLabel = computed(() => {
  const key = gateFeature.value ? FEATURE_LABEL_KEYS[gateFeature.value] : undefined;
  return key ? t(key) : "";
});

const perks = computed(() => [
  t("auth.gate.perk1"),
  t("auth.gate.perk2"),
  t("auth.gate.perk3"),
]);

const goToRegister = async () => {
  closeGate();
  await navigateTo(localePath("/auth/register"));
};

const goToLogin = async () => {
  closeGate();
  await navigateTo(localePath("/auth/login"));
};
</script>
