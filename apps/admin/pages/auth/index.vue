<template>
  <div
    class="min-h-dvh w-full bg-bg-base text-tx-primary flex flex-col justify-between selection:bg-brand/20"
  >
    <!-- Header with controls -->
    <header
      class="w-full flex items-center justify-end gap-2.5 sm:gap-3 p-3 sm:p-4 md:px-8"
    >
      <LazyThemeToggle />

      <LazyVLocaleSwitch />
    </header>

    <!-- Main Content Area -->
    <main
      class="w-full flex-1 flex flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-8 md:py-10"
    >
      <div
        class="w-full max-w-[420px] sm:max-w-[440px] rounded-xl sm:rounded-2xl p-5 sm:p-7 md:p-8 shadow-xl sm:shadow-2xl border bg-bg-primary border-border-subtle transition-all"
      >
        <!-- Header -->
        <div class="flex flex-col items-center text-center mb-5 sm:mb-6">
          <img
            src="/gif/storeose-logo.gif"
            alt="storeose-logo"
            class="h-10 sm:h-12 md:h-14 w-auto max-w-full object-contain mb-2 sm:mb-3"
            width="117"
            height="40"
          />
          <h1
            class="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-tx-primary tracking-tight"
          >
            {{ t("auth.title") }}
          </h1>
          <p
            class="text-xs sm:text-sm text-tx-secondary max-w-xs sm:max-w-sm mx-auto"
          >
            {{ t("auth.subtitle") }}
          </p>
        </div>

        <!-- Form -->
        <LazyVFormWrapper
          formClass="!space-y-4 sm:!space-y-5"
          @submit="handleSubmit"
        >
          <LazyVInput
            type="email"
            :label="t('auth.email')"
            :placeholder="t('auth.email_placeholder')"
            v-model="email"
          />

          <LazyVInput
            type="password"
            :label="t('auth.password')"
            :placeholder="t('auth.register.passwordPlaceholder')"
            v-model="password"
          >
            <template #label-right>
              <span
                class="text-xs text-brand hover:underline cursor-pointer select-none whitespace-nowrap"
              >
                {{ t("auth.forgot_password") }}
              </span>
            </template>
          </LazyVInput>

          <LazyVButton
            type="submit"
            variant="none"
            :disabled="isLoading"
            className="w-full min-h-[42px] sm:min-h-[46px] flex items-center justify-center bg-brand hover:bg-brand-hover active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 sm:py-3 rounded-lg font-semibold sm:font-bold text-sm sm:text-base transition-all shadow-md shadow-brand/20"
          >
            <LazyVLoadingSpinner v-if="isLoading" size="sm" />
            <span v-else>{{ t("auth.sign_in") }}</span>
          </LazyVButton>
        </LazyVFormWrapper>

        <!-- Divider -->
        <div class="relative my-5 sm:my-6 md:my-7">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-border-subtle"></div>
          </div>
          <div
            class="relative flex justify-center text-[10px] sm:text-xs tracking-widest font-bold uppercase"
          >
            <span class="px-3 sm:px-4 text-tx-muted bg-bg-primary select-none">
              {{ t("auth.or_continue_with") }}
            </span>
          </div>
        </div>

        <!-- Social -->
        <LazyVButton
          variant="none"
          className="w-full min-h-[42px] sm:min-h-[46px] py-2.5 sm:py-3 px-4 rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center gap-2.5 sm:gap-3 transition-colors border bg-transparent hover:bg-bg-elevated border-border-default text-tx-primary active:scale-[0.99]"
        >
          <Icon name="devicon:google" class="w-4 h-4 shrink-0" />
          <span class="truncate">{{ t("auth.sign_in_with_google") }}</span>
        </LazyVButton>

        <!-- Register CTA -->
        <div class="mt-6 sm:mt-7 text-center">
          <p class="text-xs sm:text-sm text-tx-secondary mb-1">
            {{ t("auth.no_account") }}
          </p>
          <div
            class="flex flex-wrap items-center justify-center gap-x-1 gap-y-1"
          >
            <LazyVButton
              type="button"
              variant="none"
              @click="showTrialModal = true"
              className="text-xs sm:text-sm text-brand font-semibold hover:text-brand-hover hover:underline transition"
            >
              {{ t("auth.start_free_trial") }}
            </LazyVButton>
          </div>
        </div>
      </div>

      <lazy-start-trial-modal v-model="showTrialModal" />
    </main>

    <!-- Footer -->
    <footer class="w-full py-4 text-center px-4">
      <p class="text-[10px] sm:text-xs tracking-wider text-tx-muted">
        {{ t("auth.copyright") }}
      </p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: false });

const { t } = useI18n();
const { login } = useAuth();
const localePath = useLocalePath();

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const showTrialModal = ref(false);

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    // TODO: replace with real auth call
    await new Promise((resolve) => setTimeout(resolve, 2500));
    login();
    await navigateTo(localePath("/platform"));
  } finally {
    isLoading.value = false;
  }
};

useSeoMeta({
  title: "Sign In",
  description: "Sign in to your StoreOS admin",
  robots: "noindex, nofollow",
});
</script>