<template>
  <LazyVDialog
    v-model="open"
    maxWidth="md"
    :title="t('auth.guest.welcomeModalTitle')"
  >
    <div class="space-y-6">
      <div class="flex flex-col items-center text-center gap-3">
        <img
          src="/gif/storeose-logo.gif"
          alt="storeose-logo"
          class="h-12 w-auto"
          width="117"
          height="40"
        />

        <div class="space-y-1.5">
          <h2 class="text-[15px] font-semibold text-tx-primary">
            {{ t("auth.guest.welcomeTitle") }}
          </h2>
          <p class="text-xs text-tx-secondary max-w-[320px]">
            {{ t("auth.guest.welcomeSubtitle") }}
          </p>
        </div>
      </div>

      <!-- What preview mode means -->
      <ul class="space-y-3 px-1">
        <li
          v-for="point in points"
          :key="point.text"
          class="flex items-start gap-2.5 text-xs text-tx-secondary"
        >
          <Icon
            :name="point.icon"
            :class="['w-4 h-4 shrink-0 mt-px', point.color]"
          />
          <span>{{ point.text }}</span>
        </li>
      </ul>

      <div class="space-y-2.5">
        <LazyVButton
          variant="none"
          @click="closeWelcome"
          className="w-full flex items-center justify-center py-3 rounded-lg font-bold text-xs bg-brand hover:bg-brand-hover text-white transition-all"
        >
          {{ t("auth.guest.welcomeStart") }}
        </LazyVButton>

        <LazyVButton
          variant="none"
          @click="goToRegister"
          className="w-full flex items-center justify-center py-3 rounded-lg font-bold text-xs border border-border-default bg-bg-elevated text-tx-secondary hover:text-tx-primary transition"
        >
          {{ t("auth.gate.createAccount") }}
        </LazyVButton>
      </div>
    </div>
  </LazyVDialog>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const localePath = useLocalePath();
const { isGuest } = useAuth();

// Shown once per preview visit; the cookie keeps it from reappearing on every refresh.
const seen = useCookie<string | null>("storeos-preview-welcome", {
  maxAge: 60 * 60 * 24,
  sameSite: "lax",
  default: () => null,
});

const open = ref(false);

// Open on the client only, after hydration, and only while actually in preview mode.
onMounted(() => {
  open.value = isGuest.value && !seen.value;
});

const closeWelcome = () => {
  seen.value = "1";
  open.value = false;
};

// Closing via the X / backdrop counts as dismissed too.
watch(open, (value) => {
  if (!value) seen.value = "1";
});

const goToRegister = async () => {
  closeWelcome();
  await navigateTo(localePath("/auth/register"));
};

const points = computed(() => [
  {
    icon: "lucide:database",
    color: "text-info",
    text: t("auth.guest.welcomePoint1"),
  },
  {
    icon: "lucide:eye",
    color: "text-success",
    text: t("auth.guest.welcomePoint2"),
  },
  {
    icon: "lucide:lock",
    color: "text-warning",
    text: t("auth.guest.welcomePoint3"),
  },
]);
</script>