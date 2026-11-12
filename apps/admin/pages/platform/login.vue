<template>
  <div class="w-full max-w-[420px]">
    <div class="card px-5 py-6 md:px-7 md:py-8">
      <div class="mb-6 flex flex-col items-center text-center">
        <img
          src="/gif/storeose-logo-admin.gif"
          alt="StoreOS"
          class="mb-3 h-16 w-auto max-w-full object-contain"
          width="117"
          height="40"
        />
        <span
          class="mb-3 inline-flex items-center gap-1 rounded-full bg-danger-dim px-2 py-0.5 text-[10px] font-semibold text-danger"
        >
          <Icon name="ph:shield-warning-bold" class="text-xs" />
          {{ t('platform.badge') }}
        </span>
        <h1 class="text-xl font-bold">
          {{ step === 'credentials' ? t('platform.login.title') : t('platform.login.twoFactorTitle') }}
        </h1>
        <p class="mt-1 text-sm text-tx-secondary">
          {{
            step === 'credentials'
              ? t('platform.login.subtitle')
              : t('platform.login.twoFactorSubtitle', { email })
          }}
        </p>
      </div>

      <!-- Step 1: credentials -->
      <form v-if="step === 'credentials'" class="space-y-5" novalidate @submit.prevent="submitCredentials">
        <LazyVInput
          v-model="email"
          type="email"
          name="email"
          :label="t('platform.login.email')"
          :placeholder="t('platform.login.emailPlaceholder')"
          :error="errors.email"
          autocomplete="username"
        />
        <LazyVInput
          v-model="password"
          type="password"
          name="password"
          :label="t('platform.login.password')"
          :error="errors.password"
          autocomplete="current-password"
        />
        <LazyVButton
          type="submit"
          class="w-full"
          :disabled="busy"
          :label="t('platform.login.continue')"
        />
      </form>

      <!-- Step 2: two-factor code -->
      <form v-else class="space-y-5" novalidate @submit.prevent="submitCode">
        <div dir="ltr">
          <LazyVOtp v-model="code" :length="6" :error="errors.code" :disabled="busy" />
        </div>

        <p class="rounded-md border border-border-subtle bg-bg-elevated px-3 py-2 text-[11px] text-tx-secondary">
          <Icon name="ph:info-bold" class="me-1 align-middle" />
          {{ t('platform.login.demoHint') }}
          <span class="font-mono font-semibold text-tx-primary">{{ DEMO_CODE }}</span>
        </p>

        <div class="flex items-center gap-3">
          <LazyVButton
            type="button"
            variant="secondary"
            :disabled="busy"
            :label="t('platform.login.back')"
            @click="backToCredentials"
          />
          <LazyVButton
            type="submit"
            class="flex-1"
            :disabled="busy || code.length < 6"
            :label="t('platform.login.verify')"
          />
        </div>
      </form>
    </div>

    <p class="mt-4 text-center text-[11px] text-tx-muted">
      <nuxt-link-locale to="/status" class="hover:text-tx-primary underline-offset-2 hover:underline">
        {{ t('platform.login.statusLink') }}
      </nuxt-link-locale>
    </p>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'platform-auth' })

const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const { signIn } = usePlatformAuth()

useSeoMeta({ title: () => t('platform.login.title'), robots: 'noindex, nofollow' })

// Mock-only second factor: replace with a server-verified TOTP check.
const DEMO_CODE = '123456'

const step = ref<'credentials' | 'twofactor'>('credentials')
const email = ref<string | number | boolean | undefined>('')
const password = ref<string | number | boolean | undefined>('')
const code = ref('')
const busy = ref(false)
const errors = reactive({ email: '', password: '', code: '' })

const emailValue = computed(() => String(email.value ?? '').trim())

function submitCredentials() {
  errors.email = ''
  errors.password = ''
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue.value)) errors.email = t('platform.login.errors.email')
  if (String(password.value ?? '').length < 8) errors.password = t('platform.login.errors.password')
  if (errors.email || errors.password) return
  step.value = 'twofactor'
}

function backToCredentials() {
  step.value = 'credentials'
  code.value = ''
  errors.code = ''
}

/** Only allow redirects back into the console (never to another path or origin). */
function safeRedirect(): string {
  const r = route.query.redirect
  const target = Array.isArray(r) ? r[0] : r
  return typeof target === 'string' && /^\/platform(\/|$)/.test(target) && !target.startsWith('//')
    ? target
    : '/platform'
}

async function submitCode() {
  errors.code = ''
  if (code.value !== DEMO_CODE) {
    errors.code = t('platform.login.errors.code')
    code.value = ''
    return
  }
  busy.value = true
  signIn(emailValue.value)
  await navigateTo(localePath(safeRedirect()), { replace: true })
  busy.value = false
}
</script>
