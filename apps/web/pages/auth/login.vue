<template>
  <div>
    <div
      class="flex flex-col items-center justify-center p-16 text-white selection:bg-indigo-500/30 mt-12"
    >
      <div
        class="w-full max-w-[440px] rounded-2xl p-8 md:p-10 shadow-2xl border bg-[#0c0c0e] border-white/5"
      >
        <!-- Header -->
        <div class="flex flex-col items-center text-center mb-10">
          <div class="flex items-center gap-2 font-bold text-2xl mb-4">
            <div class="w-6 h-6 bg-orange-500 rounded-sm"></div>
            StoreOS
          </div>
          <h1 class="text-xl font-bold mb-2">{{ t("auth.title") }}</h1>
          <p class="text-sm text-gray-500">{{ t("auth.subtitle") }}</p>
        </div>

        <!-- Form -->
        <VFormWrapper class="space-y-5">
          <VInput 
            type="email" 
            :label="t('auth.email')" 
            :placeholder="t('auth.emailPlaceholder')" 
            v-model="email" 
          />

          <VInput 
            type="password" 
            :label="t('auth.password')" 
            v-model="password"
          >
            <template #label-right>
              <nuxt-link-locale
                to=""
                class="text-xs text-indigo-400 hover:underline"
              >
                {{ t("auth.forgotPassword") }}
              </nuxt-link-locale>
            </template>
          </VInput>

          <VButton to="/dashboard"
            variant="none"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-bold transition shadow-lg shadow-indigo-500/10"
          >
            {{ t("auth.signIn") }}
          </VButton>
        </VFormWrapper>

        <!-- Divider -->
        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-white/5"></div>
          </div>
          <div
            class="relative flex justify-center text-[10px] tracking-widest font-bold"
          >
            <span class="px-4 text-gray-600 bg-[#0c0c0e]">
              {{ t("auth.orContinueWith") }}
            </span>
          </div>
        </div>

        <!-- Social -->
        <VButton
          variant="none"
          className="w-full py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-3 transition border bg-transparent hover:bg-white/5 border-white/10 text-white"
        >
          <icon name="devicon:google" class="w-4 h-4" />
          {{ t("auth.signInWithGoogle") }}
        </VButton>

        <!-- Register CTA -->
        <div class="mt-8 text-center">
          <p class="text-sm text-gray-500 mb-1">{{ t("auth.noAccount") }}</p>
          <div
            class="flex flex-wrap items-center justify-center gap-x-1 gap-y-1"
          >
            <nuxt-link-locale
              to="/auth/register"
              class="text-orange-500 font-bold hover:text-orange-400 hover:underline transition"
            >
              {{ t("auth.registerNow") }}
            </nuxt-link-locale>
            <span class="text-gray-600">{{ t("auth.or") }}</span>
            <nuxt-link-locale
              to="/auth/register"
              class="text-indigo-400 font-medium hover:text-indigo-300 hover:underline transition"
            >
              {{ t("auth.startFreeTrial") }}
            </nuxt-link-locale>
          </div>
        </div>
      </div>

      <p class="mt-8 text-[10px] tracking-wider text-gray-600">
        {{ t("auth.copyright") }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const email = ref("");
const password = ref("");
</script>