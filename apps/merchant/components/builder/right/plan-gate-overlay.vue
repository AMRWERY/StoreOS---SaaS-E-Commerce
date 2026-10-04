<template>
  <Teleport to="body">
    <div
      v-if="planGateOpen"
      class="fixed inset-0 z-[220] flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="absolute inset-0 bg-bg-overlay backdrop-blur-md"
        @click="planGateOpen = false"
      />
      <div
        class="relative max-w-sm rounded-2xl border border-brand/30 bg-bg-primary p-8 text-center shadow-2xl shadow-brand/10"
      >
        <div
          class="mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand/15 text-brand"
        >
          <Icon name="ph:lock-key-bold" class="text-2xl" />
        </div>
        <h2 class="mt-5 text-lg font-bold tracking-wide text-tx-primary">
          {{ isTrialMode ? "Free Trial — Limited Access" : "Growth Plan Required" }}
        </h2>
        <p class="mt-2 text-sm leading-relaxed text-tx-secondary">
          {{
            isTrialMode
              ? "Publishing stores live, custom domains, and premium sections require the Growth plan. Upgrade to unlock all Store Builder features."
              : "Custom fonts, advanced sections, and priority publishing are on the Growth plan."
          }}
        </p>
        <LazyVButton
          variant="none"
          type="button"
          className="mt-6 w-full rounded-lg bg-brand py-3 text-[11px] font-black tracking-wider text-white shadow-lg shadow-brand/25 transition-transform hover:scale-[1.02]"
          @click="handleUpgrade"
        >
          View plans & upgrade
        </LazyVButton>
        <LazyVButton
          variant="none"
          type="button"
          className="mt-3 w-full text-[11px] font-semibold text-tx-muted hover:text-tx-secondary"
          @click="planGateOpen = false"
        >
          Continue free trial
        </LazyVButton>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { planGateOpen } = useBuilderModals();
const { hasFeature } = useAuth();
const localePath = useLocalePath();

const isTrialMode = computed(() => !hasFeature("builder"));

const handleUpgrade = () => {
  planGateOpen.value = false;
  navigateTo(localePath("/dashboard/settings/billing-and-plan"));
};
</script>