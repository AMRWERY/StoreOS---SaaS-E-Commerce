<template>
  <LazyVDialog
    v-model="open"
    maxWidth="lg"
    hideClose
    hideHeaderBorder
    @close="reset"
  >
    <template #title>
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
            {{ t("auth.trial.modalTitle") }}
          </h2>
        </div>
      </div>
    </template>

    <!-- Step Progress -->
    <div class="mb-8">
      <LazyVProgressBar
        :progress="progress"
        :height="8"
        color="blue"
        trackVariant="slate"
        :showHeader="true"
        :headerLeft="steps[step - 1]"
        :headerRight="`${Math.round(progress)}%`"
        :showLabel="false"
        :shadow="false"
      />
    </div>

    <!-- Step 1: Email -->
    <Transition name="slide" mode="out-in">
      <div v-if="step === 1" key="step1" class="space-y-5">
        <div class="text-center space-y-1 mb-6">
          <h2 class="text-xl font-bold">{{ t("auth.trial.step1Title") }}</h2>
          <p class="text-sm text-tx-secondary">
            {{ t("auth.trial.step1Subtitle") }}
          </p>
        </div>

        <LazyVFormWrapper @submit="goToStep2">
          <LazyVInput
            type="email"
            :label="t('auth.register.emailAddress')"
            :placeholder="t('auth.register.emailPlaceholder')"
            v-model="form.email"
            :error="errors.email"
            autocomplete="email"
          />
          <LazyVButton
            type="submit"
            variant="none"
            className="w-full flex items-center justify-center bg-orange-600 hover:bg-orange-500 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-orange-600/20"
          >
            {{ t("auth.trial.continue") }}
            <Icon
              name="lucide:arrow-right"
              class="w-4 h-4 ms-2 icon-nudge-end"
            />
          </LazyVButton>
        </LazyVFormWrapper>

        <p class="text-center text-xs text-tx-muted">
          {{ t("auth.trial.noCardRequired") }}
        </p>
      </div>
    </Transition>

    <!-- Step 2: Store Info -->
    <Transition name="slide" mode="out-in">
      <div v-if="step === 2" key="step2" class="space-y-5">
        <div class="text-center space-y-1 mb-6">
          <h2 class="text-xl font-bold">{{ t("auth.trial.step2Title") }}</h2>
          <p class="text-sm text-tx-secondary">
            {{ t("auth.trial.step2Subtitle") }}
          </p>
        </div>

        <LazyVFormWrapper @submit="goToStep3">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <LazyVInput
              :label="t('auth.register.storeName')"
              :placeholder="t('auth.register.storeNamePlaceholder')"
              v-model="form.storeName"
              :error="errors.storeName"
              autocomplete="organization"
            />
            <LazyVInput
              :label="t('auth.register.fullName')"
              :placeholder="t('auth.register.fullNamePlaceholder')"
              v-model="form.fullName"
              :error="errors.fullName"
              autocomplete="name"
            />
          </div>

          <!-- Industry Tags -->
          <div class="space-y-2">
            <label
              class="text-[10px] font-bold text-tx-secondary tracking-wider"
            >
              {{ t("auth.register.industry") }}
            </label>
            <div class="flex flex-wrap gap-2">
              <LazyVButton
                v-for="tag in industries"
                :key="tag.value"
                type="button"
                variant="none"
                @click="form.industry = tag.value"
                :className="`px-3 py-1.5 rounded-full border text-[11px] font-bold transition-all ${
                  form.industry === tag.value
                    ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                    : 'border-border-subtle text-tx-secondary hover:border-border-default hover:text-tx-primary'
                }`"
              >
                {{ tag.emoji }} {{ tag.label }}
              </LazyVButton>
            </div>
            <p v-if="errors.industry" class="text-xs text-red-500 font-medium">
              {{ errors.industry }}
            </p>
          </div>

          <div class="flex gap-3">
            <LazyVButton
              type="button"
              variant="none"
              @click="step = 1"
              className="flex-1 py-3 rounded-xl font-bold text-sm border border-border-default text-tx-secondary hover:bg-bg-elevated transition"
            >
              {{ t("auth.trial.back") }}
            </LazyVButton>
            <LazyVButton
              type="submit"
              variant="none"
              className="flex-[2] flex items-center justify-center bg-orange-600 hover:bg-orange-500 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-orange-600/20"
            >
              {{ t("auth.trial.continue") }}
              <Icon
                name="lucide:arrow-right"
                class="w-4 h-4 ms-2 icon-nudge-end"
              />
            </LazyVButton>
          </div>
        </LazyVFormWrapper>
      </div>
    </Transition>

    <!-- Step 3: Password + Terms -->
    <Transition name="slide" mode="out-in">
      <div v-if="step === 3" key="step3" class="space-y-5">
        <div class="text-center space-y-1 mb-6">
          <h2 class="text-xl font-bold">{{ t("auth.trial.step3Title") }}</h2>
          <p class="text-sm text-tx-secondary">
            {{ t("auth.trial.step3Subtitle") }}
          </p>
        </div>

        <LazyVFormWrapper @submit="handleSubmit">
          <LazyVInput
            type="password"
            :label="t('auth.register.password')"
            :placeholder="t('auth.register.passwordPlaceholder')"
            v-model="form.password"
            :error="errors.password"
            autocomplete="new-password"
          />

          <!-- Password strength indicator -->
          <div v-if="form.password" class="space-y-1.5">
            <div class="flex gap-1">
              <div
                v-for="i in 4"
                :key="i"
                class="h-1 flex-1 rounded-full transition-all duration-300"
                :class="
                  passwordStrength >= i ? strengthColor : 'bg-bg-elevated'
                "
              />
            </div>
            <p class="text-[10px] font-bold" :class="strengthTextColor">
              {{ strengthLabel }}
            </p>
          </div>

          <LazyVInput
            type="checkbox"
            v-model="form.agree"
            :error="errors.agree"
          >
            {{ t("auth.register.agreeTerms") }}
            <span class="text-orange-500 hover:underline cursor-pointer">{{
              t("auth.register.termsOfService")
            }}</span>
            {{ t("auth.register.and") }}
            <span class="text-orange-500 hover:underline cursor-pointer">{{
              t("auth.register.privacyPolicy")
            }}</span>
          </LazyVInput>

          <div class="flex gap-3">
            <LazyVButton
              type="button"
              variant="none"
              @click="step = 2"
              className="flex-1 py-3 rounded-xl font-bold text-sm border border-border-default text-tx-secondary hover:bg-bg-elevated transition"
            >
              {{ t("auth.trial.back") }}
            </LazyVButton>
            <LazyVButton
              type="submit"
              variant="none"
              :disabled="isLoading"
              className="flex-[2] flex items-center justify-center bg-orange-600 hover:bg-orange-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-orange-600/20"
            >
              <LazyVLoadingSpinner v-if="isLoading" size="sm" color="white" />
              <span v-else>{{ t("auth.trial.createStore") }}</span>
            </LazyVButton>
          </div>
        </LazyVFormWrapper>

        <!-- Trust badges -->
        <div class="flex items-center justify-center gap-6 pt-2">
          <div
            v-for="badge in trustBadges"
            :key="badge.icon"
            class="flex items-center gap-1.5 text-tx-muted"
          >
            <Icon :name="badge.icon" class="w-3.5 h-3.5 text-green-500" />
            <span class="text-[10px] font-medium">{{ badge.label }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </LazyVDialog>
</template>

<script lang="ts" setup>
const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(["update:modelValue"]);

const { t } = useI18n();
const { register } = useAuth();
const localePath = useLocalePath();

const open = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

const step = ref(1);
const isLoading = ref(false);

const form = reactive({
  email: "",
  storeName: "",
  fullName: "",
  industry: "",
  password: "",
  agree: false,
});

const steps = computed(() => [
  t("auth.trial.stepEmail"),
  t("auth.trial.stepStore"),
  t("auth.trial.stepPassword"),
]);

// Step 1 of 3 shows a third of the bar, the final step fills it.
const progress = computed(() => (step.value / steps.value.length) * 100);

const industries = computed(() => [
  { value: "fashion", label: t("auth.trial.industryFashion"), emoji: "👗" },
  { value: "food", label: t("auth.trial.industryFood"), emoji: "🍔" },
  {
    value: "electronics",
    label: t("auth.trial.industryElectronics"),
    emoji: "📱",
  },
  { value: "beauty", label: t("auth.trial.industryBeauty"), emoji: "💄" },
  { value: "home", label: t("auth.trial.industryHome"), emoji: "🏠" },
  { value: "sports", label: t("auth.trial.industrySports"), emoji: "⚽" },
]);

const trustBadges = computed(() => [
  { icon: "lucide:shield-check", label: t("auth.trial.badgeSecure") },
  { icon: "lucide:credit-card", label: t("auth.trial.badgeNoCard") },
  { icon: "lucide:zap", label: t("auth.trial.badgeInstant") },
]);

const passwordStrength = computed(() => {
  const p = form.password;
  if (!p) return 0;
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  return score;
});

const strengthColor = computed(() => {
  const map = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
  return map[passwordStrength.value - 1] || "bg-red-500";
});

const strengthTextColor = computed(() => {
  const map = [
    "text-red-400",
    "text-orange-400",
    "text-yellow-400",
    "text-green-400",
  ];
  return map[passwordStrength.value - 1] || "text-red-400";
});

const strengthLabel = computed(() => {
  const map = [
    t("auth.trial.strengthWeak"),
    t("auth.trial.strengthFair"),
    t("auth.trial.strengthGood"),
    t("auth.trial.strengthStrong"),
  ];
  return map[passwordStrength.value - 1] || map[0];
});

type Field =
  | "email"
  | "storeName"
  | "fullName"
  | "industry"
  | "password"
  | "agree";
const errors = reactive<Record<Field, string>>({
  email: "",
  storeName: "",
  fullName: "",
  industry: "",
  password: "",
  agree: "",
});

// Clear a field's error as soon as the user fixes it.
(Object.keys(errors) as Field[]).forEach((field) =>
  watch(
    () => form[field],
    () => (errors[field] = ""),
  ),
);

const fieldError = (field: Field): string => {
  switch (field) {
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
        ? ""
        : t("auth.register.errEmail");
    case "storeName":
      return form.storeName.trim() ? "" : t("auth.register.errStoreName");
    case "fullName":
      return form.fullName.trim() ? "" : t("auth.register.errFullName");
    case "industry":
      return form.industry ? "" : t("auth.register.errIndustry");
    case "password":
      return form.password.length >= 8 ? "" : t("auth.register.errPassword");
    case "agree":
      return form.agree ? "" : t("auth.register.errAgree");
  }
};

/** Validates one wizard step; returns true when every field on it is valid. */
const validateFields = (fields: Field[]): boolean => {
  fields.forEach((field) => (errors[field] = fieldError(field)));
  return fields.every((field) => !errors[field]);
};

const goToStep2 = () => {
  if (validateFields(["email"])) step.value = 2;
};
const goToStep3 = () => {
  if (validateFields(["storeName", "fullName", "industry"])) step.value = 3;
};

const handleSubmit = async () => {
  if (isLoading.value || !validateFields(["password", "agree"])) return;
  isLoading.value = true;
  try {
    // TODO: replace with real register call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    open.value = false;
    register("trial");
    await navigateTo(localePath("/platform"));
  } finally {
    isLoading.value = false;
  }
};

const reset = () => {
  step.value = 1;
  Object.assign(form, {
    email: "",
    storeName: "",
    fullName: "",
    industry: "",
    password: "",
    agree: false,
  });
  (Object.keys(errors) as Field[]).forEach((field) => (errors[field] = ""));
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.22s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(18px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-18px);
}
</style>
