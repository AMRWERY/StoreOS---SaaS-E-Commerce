<template>
  <div>
    <div class="flex flex-col items-center justify-center p-6 text-white selection:bg-indigo-500/30 mt-12">
      <div class="w-full max-w-[440px] rounded-2xl px-4 py-3.5 md:px-6 md:py-5 shadow-2xl border bg-bg-primary border-border-subtle">
        <!-- Header -->
        <div class="flex flex-col items-center text-center mb-6">
          <div class="flex items-center gap-2 font-bold text-2xl mb-4">
            <div class="w-6 h-6 bg-orange-500 rounded-sm"></div>
            StoreOS
          </div>
          <h1 class="text-xl font-bold mb-2">{{ t("auth.title") }}</h1>
          <p class="text-sm text-tx-secondary">{{ t("auth.subtitle") }}</p>
        </div>

        <!-- Form -->
        <VFormWrapper class="space-y-5" @submit="handleSubmit">
          <VInput type="email" :label="t('auth.email')" :placeholder="t('auth.emailPlaceholder')" v-model="email" />

          <VInput type="password" :label="t('auth.password')" v-model="password">
            <template #label-right>
              <nuxt-link-locale to="" class="text-xs text-brand hover:underline">
                {{ t("auth.forgotPassword") }}
              </nuxt-link-locale>
            </template>
          </VInput>

          <VButton type="submit" variant="none" :disabled="isLoading"
            className="w-full flex items-center justify-center bg-brand hover:bg-brand-hover disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold transition shadow-lg shadow-indigo-500/10">
            <VLoadingSpinner v-if="isLoading" size="sm" />
            <span v-else>{{ t("auth.signIn") }}</span>
          </VButton>
        </VFormWrapper>

        <!-- Divider -->
        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-border-subtle"></div>
          </div>
          <div class="relative flex justify-center text-[10px] tracking-widest font-bold">
            <span class="px-4 text-tx-muted bg-bg-primary">
              {{ t("auth.orContinueWith") }}
            </span>
          </div>
        </div>

        <!-- Social -->
        <VButton variant="none"
          className="w-full py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-3 transition border bg-transparent hover:bg-bg-elevated border-border-default text-tx-primary">
          <Icon name="devicon:google" class="w-4 h-4" />
          {{ t("auth.signInWithGoogle") }}
        </VButton>

        <!-- Register CTA -->
        <div class="mt-8 text-center">
          <p class="text-sm text-tx-secondary mb-1">{{ t("auth.noAccount") }}</p>
          <div class="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
            <nuxt-link-locale to="/auth/register"
              class="text-orange-500 font-bold hover:text-orange-400 hover:underline transition">
              {{ t("auth.registerNow") }}
            </nuxt-link-locale>
            <span class="text-tx-muted">{{ t("auth.or") }}</span>
            <nuxt-link-locale to="/auth/register"
              class="text-brand font-medium hover:text-brand-hover hover:underline transition">
              {{ t("auth.startFreeTrial") }}
            </nuxt-link-locale>
          </div>
        </div>
      </div>

      <p class="mt-8 text-[10px] tracking-wider text-tx-muted">
        {{ t("auth.copyright") }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { login } = useAuth();
const localePath = useLocalePath();

const email = ref("");
const password = ref("");
const isLoading = ref(false);

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    // TODO: replace with real auth call
    await new Promise(resolve => setTimeout(resolve, 2500));
    login();
    await navigateTo(localePath('/'));
  } finally {
    isLoading.value = false;
  }
};

useSeoMeta({
  title: 'Sign In',
  description: 'Sign in to your StoreOS storefront',
  robots: 'noindex, nofollow',
})
</script>