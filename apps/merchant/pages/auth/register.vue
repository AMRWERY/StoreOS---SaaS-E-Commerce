<template>
  <div>
    <div class="flex items-center justify-center p-4 md:p-6 text-white mt-12">
      <div
        class="w-full max-w-6xl flex flex-col md:flex-row bg-bg-primary border border-brand/30 rounded-2xl overflow-hidden shadow-2xl"
      >
        <!-- Left Column (Informational) -->
        <div
          class="md:w-5/12 bg-gradient-to-br from-indigo-900 via-indigo-950 to-black px-4 py-3.5 md:px-8 md:py-8 relative overflow-hidden flex flex-col justify-between"
        >
          <!-- Subtle Grid Pattern Background -->
          <div
            class="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[length:32px_32px]"
          ></div>

          <div class="relative z-10">
            <div class="flex items-center gap-2 font-bold text-xl mb-16">
              <div class="w-6 h-6 bg-orange-500 rounded-sm"></div>
              StoreOS
            </div>

            <h2 class="text-4xl md:text-5xl font-bold leading-tight mb-6">
              {{ t("auth.register.trustTitle") }}
            </h2>

            <div class="space-y-6">
              <div
                v-for="text in [
                  t('auth.register.feature1'),
                  t('auth.register.feature2'),
                  t('auth.register.feature3'),
                ]"
                :key="text"
                class="flex items-center gap-4 text-indigo-200/80"
              >
                <Icon
                  name="lucide:check-circle-2"
                  class="text-orange-500 shrink-0 w-[22px] h-[22px]"
                />
                <span class="font-medium">{{ text }}</span>
              </div>
            </div>
          </div>

          <!-- Notification Card Mockup -->
          <div class="relative z-10 mt-20 md:mt-0">
            <div
              class="bg-bg-elevated backdrop-blur-md border border-border-default p-4 rounded-2xl flex items-center gap-4 max-w-xs animate-pulse"
            >
              <div
                class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center"
              >
                <span class="text-white text-xl">🛒</span>
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-center mb-1">
                  <p class="text-[10px] font-bold tracking-wider">
                    {{ t("auth.register.newOrderReceived") }}
                  </p>
                  <span class="text-[10px] text-tx-secondary">{{
                    t("auth.register.justNow")
                  }}</span>
                </div>
                <p class="text-xs text-gray-300">
                  Order #4429 by Sarah J. ($124.50)
                </p>
                <div
                  class="mt-2 h-1 w-full bg-bg-elevated rounded-full overflow-hidden"
                >
                  <div class="h-full bg-orange-500 w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column (Form) -->
        <div class="md:w-7/12 px-4 py-3.5 md:px-6 md:py-5 bg-bg-primary">
          <div class="max-w-md mx-auto">
            <h1 class="text-3xl font-bold mb-2">
              {{ t("auth.register.title") }}
            </h1>
            <p class="text-tx-secondary mb-6 text-sm">
              {{ t("auth.register.subtitle") }}
            </p>

            <LazyVFormWrapper @submit="handleSubmit">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LazyVInput
                  :label="t('auth.register.storeName')"
                  :placeholder="t('auth.register.storeNamePlaceholder')"
                  v-model="storeName"
                />
                <LazyVInput
                  :label="t('auth.register.fullName')"
                  :placeholder="t('auth.register.fullNamePlaceholder')"
                  v-model="fullName"
                />
              </div>

              <LazyVInput
                type="email"
                :label="t('auth.register.emailAddress')"
                :placeholder="t('auth.register.emailPlaceholder')"
                v-model="email"
              />

              <LazyVInput
                type="password"
                :label="t('auth.register.password')"
                :placeholder="t('auth.register.passwordPlaceholder')"
                v-model="password"
              />

              <!-- Industry Dropdown & Tags -->
              <LazyVSelectInput
                v-model="industry"
                :label="t('auth.register.industry')"
                :placeholder="t('auth.register.selectIndustry')"
                :options="industries"
                :hint="`${t('auth.register.industryHint')}: ${industries.join(' · ')}`"
              />

              <LazyVInput type="checkbox" v-model="agree">
                {{ t("auth.register.agreeTerms") }}
                <nuxt-link-locale
                  to="/terms"
                  class="text-orange-500 hover:underline"
                  >{{ t("auth.register.termsOfService") }}</nuxt-link-locale
                >
                {{ t("auth.register.and") }}
                <nuxt-link-locale
                  to="/privacy"
                  class="text-orange-500 hover:underline"
                  >{{ t("auth.register.privacyPolicy") }}</nuxt-link-locale
                >
              </LazyVInput>

              <LazyVButton
                type="submit"
                variant="none"
                :disabled="isLoading"
                className="w-full flex items-center justify-center bg-orange-600 hover:bg-orange-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-sm transition-all transform active:scale-[0.98] shadow-lg shadow-orange-600/20"
              >
                <LazyVLoadingSpinner v-if="isLoading" size="sm" color="white" />
                <span v-else>{{ t("auth.register.createStore") }}</span>
              </LazyVButton>
            </LazyVFormWrapper>

            <p class="text-center mt-8 text-sm text-tx-secondary">
              {{ t("auth.register.alreadyHaveAccount") }}
              <nuxt-link-locale
                to="/auth"
                class="text-orange-500 font-bold hover:underline"
                >{{ t("auth.register.signIn") }}</nuxt-link-locale
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Plan } from "@/types/auth";

const { t } = useI18n();

const industries = ["Fashion", "Food", "Electronics", "Beauty"];

const industry = ref("");
const storeName = ref("");
const fullName = ref("");
const email = ref("");
const password = ref("");
const agree = ref(false);

const localePath = useLocalePath();
const route = useRoute();
const { register } = useAuth();
const isLoading = ref(false);

/** Pricing CTAs link here as `?plan=growth`; anything unknown starts a plain trial. */
const selectedPlan = computed<Plan>(() => {
  const plan = String(route.query.plan ?? "");
  return plan in PLAN_CONFIGS && plan !== "guest" ? (plan as Plan) : "trial";
});

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    // TODO: replace with real register call
    await new Promise((resolve) => setTimeout(resolve, 2500));
    register(selectedPlan.value);
    await navigateTo(localePath("/auth/add-first-product"));
  } finally {
    isLoading.value = false;
  }
};

useSeoMeta({
  title: "Create Account",
  description:
    "Create your StoreOS merchant account and start managing your store today.",
  robots: "noindex, nofollow",
});
</script>