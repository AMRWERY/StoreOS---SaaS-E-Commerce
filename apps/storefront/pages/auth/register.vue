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
            class="absolute inset-0 opacity-10 pointer-events-none"
            style="
              background-image: radial-gradient(
                circle at 2px 2px,
                white 1px,
                transparent 0
              );
              background-size: 32px 32px;
            "
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

            <VFormWrapper @submit="handleSubmit">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <VInput
                  :label="t('auth.register.storeName')"
                  :placeholder="t('auth.register.storeNamePlaceholder')"
                  v-model="storeName"
                />
                <VInput
                  :label="t('auth.register.fullName')"
                  :placeholder="t('auth.register.fullNamePlaceholder')"
                  v-model="fullName"
                />
              </div>

              <VInput
                type="email"
                :label="t('auth.register.emailAddress')"
                :placeholder="t('auth.register.emailPlaceholder')"
                v-model="email"
              />

              <VInput
                type="password"
                :label="t('auth.register.password')"
                :placeholder="t('auth.register.passwordPlaceholder')"
                v-model="password"
              />

              <!-- Industry Dropdown & Tags -->
              <div class="space-y-4">
                <div class="space-y-2">
                  <label
                    class="text-[10px] font-semibold text-tx-secondary tracking-[0.6px]"
                    >{{ t("auth.register.industry") }}</label
                  >
                  <div class="relative cursor-pointer group">
                    <div
                      class="w-full bg-bg-elevated border border-border-subtle rounded-lg px-4 py-3 text-sm text-tx-secondary flex justify-between items-center group-hover:border-border-default transition"
                    >
                      {{ t("auth.register.selectIndustry") }}
                      <Icon
                        name="lucide:chevron-down"
                        class="w-4 h-4 shrink-0"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex flex-wrap gap-2">
                  <VButton
                    v-for="tag in industries"
                    :key="tag"
                    variant="none"
                    className="px-3 py-1.5 rounded-full border border-border-subtle text-[10px] font-bold text-tx-secondary hover:border-orange-500/50 hover:text-tx-primary transition"
                  >
                    {{ tag }}
                  </VButton>
                </div>
              </div>

              <VInput type="checkbox" v-model="agree">
                {{ t("auth.register.agreeTerms") }}
                <span class="text-orange-500 hover:underline">{{
                  t("auth.register.termsOfService")
                }}</span>
                {{ t("auth.register.and") }}
                <span class="text-orange-500 hover:underline">{{
                  t("auth.register.privacyPolicy")
                }}</span>
              </VInput>

              <VButton
                type="submit"
                variant="none"
                :disabled="isLoading"
                className="w-full flex items-center justify-center bg-orange-600 hover:bg-orange-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-sm transition-all transform active:scale-[0.98] shadow-lg shadow-orange-600/20"
              >
                <VLoadingSpinner v-if="isLoading" size="sm" color="white" />
                <span v-else>{{ t("auth.register.createStore") }}</span>
              </VButton>
            </VFormWrapper>

            <p class="text-center mt-8 text-sm text-tx-secondary">
              {{ t("auth.register.alreadyHaveAccount") }}
              <nuxt-link-locale
                to="/auth/login"
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
const industries = ["Fashion", "Food", "Electronics", "Beauty"];

const storeName = ref("");
const fullName = ref("");
const email = ref("");
const password = ref("");
const agree = ref(false);

const { login } = useAuth();
const localePath = useLocalePath();
const isLoading = ref(false);

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    // TODO: replace with real register call
    await new Promise((resolve) => setTimeout(resolve, 2500));
    login();
    await navigateTo(localePath("/"));
  } finally {
    isLoading.value = false;
  }
};

useSeoMeta({
  title: "Create Account",
  description: "Create your StoreOS storefront.",
  robots: "noindex, nofollow",
});
</script>