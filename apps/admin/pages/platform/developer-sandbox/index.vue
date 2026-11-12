<template>
  <div>
    <platform-page-header :title="t('platform.sandbox.title')" :subtitle="t('platform.sandbox.subtitle')">
      <template #actions>
        <v-button icon="ph:plus" icon-position="left" :label="t('platform.sandbox.createStore')" @click="openStore" />
      </template>
    </platform-page-header>

    <!-- Test stores -->
    <section class="card mb-6 overflow-hidden">
      <h2 class="border-b border-border-subtle px-4 py-3 text-sm font-bold">{{ t('platform.sandbox.storesTitle') }}</h2>
      <v-table v-if="store.stores.length" :headers="storeHeaders" :items="store.stores">
        <template #cell(name)="{ item }">
          <p class="font-mono text-xs font-semibold text-tx-primary">{{ item.name }}</p>
          <p class="font-mono text-[10px] text-tx-muted">{{ item.id }}</p>
        </template>
        <template #cell(createdAt)="{ item }">
          <p class="font-mono text-xs text-tx-secondary">{{ item.createdAt }}</p>
          <p v-if="item.resetAt" class="text-[10px] text-tx-muted">{{ t('platform.sandbox.lastReset') }} <span class="font-mono">{{ item.resetAt }}</span></p>
        </template>
        <template #cell(theme)="{ item }">
          <span class="text-xs text-tx-secondary">{{ t(`platform.sandbox.themes.${item.theme}`) }}</span>
        </template>
        <template #cell(status)="{ item }">
          <platform-status-pill :label="t(`platform.sandbox.status.${item.status}`)" :tone="item.status === 'active' ? 'success' : 'neutral'" />
        </template>
        <template #cell(actions)="{ item }">
          <div class="flex justify-end">
            <v-button variant="secondary" size="none" class-name="px-2.5 py-1 text-xs" icon="ph:arrow-counter-clockwise" icon-position="left" :label="t('platform.sandbox.reset')" @click="store.reset(item.id)" />
          </div>
        </template>
      </v-table>
      <platform-empty-state v-else :title="t('platform.sandbox.storesEmpty')" :hint="t('platform.sandbox.storesEmptyHint')" icon="ph:flask" />
    </section>

    <div class="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
      <!-- Theme CLI -->
      <section class="card overflow-hidden lg:col-span-7">
        <div class="border-b border-border-subtle px-4 py-3">
          <h2 class="text-sm font-bold">{{ t('platform.sandbox.cli.title') }}</h2>
          <p class="mt-0.5 text-[11px] text-tx-muted">{{ t('platform.sandbox.cli.hint') }}</p>
        </div>
        <div class="px-4 py-3">
          <div class="relative rounded-md border border-border-subtle bg-bg-base">
            <pre class="overflow-x-auto px-3 py-3 pe-20 font-mono text-[11px] leading-relaxed text-tx-secondary" dir="ltr">{{ cliSnippet }}</pre>
            <button
              type="button"
              class="absolute end-2 top-2 rounded-md bg-bg-elevated px-2 py-1 text-[10px] font-semibold text-tx-secondary transition-colors hover:text-tx-primary"
              @click="copySnippet"
            >
              {{ copied ? t('platform.sandbox.cli.copied') : t('platform.sandbox.cli.copy') }}
            </button>
          </div>
        </div>
        <div class="flex items-center justify-between border-y border-border-subtle px-4 py-2.5">
          <h3 class="text-eyebrow">{{ t('platform.sandbox.cli.tokens') }}</h3>
          <v-button variant="secondary" size="none" class-name="px-2.5 py-1 text-xs" icon="ph:plus" icon-position="left" :label="t('platform.sandbox.cli.createToken')" @click="openToken" />
        </div>
        <v-table v-if="store.tokens.length" :headers="tokenHeaders" :items="store.tokens">
          <template #cell(name)="{ item }">
            <p class="text-xs font-semibold text-tx-primary">{{ item.name }}</p>
            <p class="font-mono text-[10px] text-tx-muted">{{ item.prefix }}... - {{ item.createdAt }}</p>
          </template>
          <template #cell(scopes)="{ item }">
            <div class="flex flex-wrap gap-1">
              <span v-for="s in item.scopes" :key="s" class="rounded-full bg-bg-elevated px-1.5 py-0.5 font-mono text-[9px] font-semibold text-tx-secondary">{{ s }}</span>
            </div>
          </template>
          <template #cell(status)="{ item }">
            <platform-status-pill :label="item.revoked ? t('platform.sandbox.cli.revoked') : t('platform.sandbox.cli.active')" :tone="item.revoked ? 'danger' : 'success'" />
          </template>
          <template #cell(actions)="{ item }">
            <div class="flex justify-end">
              <v-button v-if="!item.revoked" variant="secondary" size="none" class-name="px-2.5 py-1 text-xs" :label="t('platform.sandbox.cli.revoke')" @click="store.revokeToken(item.id)" />
            </div>
          </template>
        </v-table>
        <platform-empty-state v-else :title="t('platform.sandbox.cli.tokensEmpty')" icon="ph:key" />
      </section>

      <div class="space-y-6 lg:col-span-5">
        <!-- Sandbox webhooks -->
        <section class="card overflow-hidden">
          <div class="border-b border-border-subtle px-4 py-3">
            <h2 class="text-sm font-bold">{{ t('platform.sandbox.webhooks.title') }}</h2>
            <p class="mt-0.5 text-[11px] text-tx-muted">{{ t('platform.sandbox.webhooks.hint') }}</p>
          </div>
          <ul v-if="store.webhooks.length" class="divide-y divide-border-subtle">
            <li v-for="w in store.webhooks" :key="w.id" class="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
              <div class="min-w-0">
                <p class="truncate font-mono text-[11px] text-tx-primary" dir="ltr">{{ w.url }}</p>
                <p class="font-mono text-[10px] text-tx-muted">{{ w.event }}</p>
              </div>
              <div class="flex items-center gap-2">
                <v-switch-button :model-value="w.enabled" @update:model-value="(v: boolean) => (w.enabled = v)" />
                <v-button variant="secondary" size="none" class-name="px-2.5 py-1 text-xs" :label="t('platform.sandbox.webhooks.sendTest')" @click="store.sendTest(w.id)" />
              </div>
            </li>
          </ul>
          <platform-empty-state v-else :title="t('platform.sandbox.webhooks.empty')" icon="ph:webhooks-logo" />
          <div class="border-t border-border-subtle px-4 py-3">
            <h3 class="mb-2 text-eyebrow">{{ t('platform.sandbox.webhooks.deliveries') }}</h3>
            <ul v-if="store.deliveries.length" class="space-y-1.5">
              <li v-for="d in store.deliveries.slice(0, 5)" :key="d.id" class="flex items-center justify-between gap-2 text-[11px]">
                <span class="font-mono text-tx-muted">{{ d.at }}</span>
                <span class="min-w-0 flex-1 truncate font-mono text-tx-secondary">{{ d.event }}</span>
                <span class="font-mono font-semibold" :class="d.code < 300 ? 'text-success' : 'text-danger'">{{ d.code }}</span>
              </li>
            </ul>
            <p v-else class="text-[11px] text-tx-muted">{{ t('platform.sandbox.webhooks.deliveriesEmpty') }}</p>
          </div>
        </section>

        <!-- Docs -->
        <section class="card px-4 py-3.5">
          <h2 class="mb-3 text-sm font-bold">{{ t('platform.sandbox.docs.title') }}</h2>
          <ul class="space-y-2">
            <li v-for="link in docLinks" :key="link.key">
              <a
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between gap-2 rounded-md border border-border-subtle bg-bg-base px-3 py-2 text-xs text-tx-secondary transition-colors hover:border-border-default hover:text-tx-primary"
              >
                <span>{{ t(`platform.sandbox.docs.${link.key}`) }}</span>
                <Icon name="ph:arrow-square-out" class="text-sm" />
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <!-- Create test store -->
    <v-dialog v-model="storeOpen" :title="t('platform.sandbox.createStoreTitle')">
      <div class="space-y-4">
        <v-input
          v-model="storeForm.name"
          :label="t('platform.sandbox.nameLabel')"
          placeholder="my-test-store"
          input-class="font-mono"
          :error="storeTouched && !storeForm.name.trim() ? t('platform.sandbox.nameRequired') : ''"
        />
        <v-select-input v-model="storeForm.theme" :label="t('platform.sandbox.themeLabel')" :options="themeOptions" />
      </div>
      <template #footer>
        <v-button variant="secondary" :label="t('platform.common.cancel')" @click="storeOpen = false" />
        <v-button :label="t('platform.sandbox.createStore')" @click="submitStore" />
      </template>
    </v-dialog>

    <!-- Create API token -->
    <v-dialog v-model="tokenOpen" :title="t('platform.sandbox.cli.createToken')">
      <div v-if="newToken" class="space-y-3">
        <p class="text-xs text-tx-secondary">{{ t('platform.sandbox.cli.tokenShownOnce') }}</p>
        <code class="block break-all rounded-md border border-border-subtle bg-bg-base px-3 py-2 font-mono text-[11px] text-tx-primary" dir="ltr">{{ newToken }}</code>
      </div>
      <div v-else class="space-y-4">
        <v-input
          v-model="tokenForm.name"
          :label="t('platform.sandbox.cli.tokenName')"
          :error="tokenTouched && !tokenForm.name.trim() ? t('platform.sandbox.nameRequired') : ''"
        />
        <div>
          <p class="mb-2 text-eyebrow">{{ t('platform.sandbox.cli.scopes') }}</p>
          <div class="space-y-2">
            <v-input
              v-for="scope in ALL_SCOPES"
              :key="scope"
              type="checkbox"
              :model-value="tokenForm.scopes.includes(scope)"
              :label="scope"
              @update:model-value="toggleScope(scope)"
            />
          </div>
          <p v-if="tokenTouched && !tokenForm.scopes.length" class="mt-1 text-[11px] text-danger">{{ t('platform.sandbox.cli.scopeRequired') }}</p>
        </div>
      </div>
      <template #footer>
        <v-button variant="secondary" :label="newToken ? t('platform.sandbox.cli.done') : t('platform.common.cancel')" @click="tokenOpen = false" />
        <v-button v-if="!newToken" :label="t('platform.sandbox.cli.createToken')" @click="submitToken" />
      </template>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { SandboxScope, SandboxTheme } from '@/types/platformOps'

definePageMeta({ layout: 'platform' })

const { t } = useI18n()

useSeoMeta({ title: t('platform.sandbox.title'), robots: 'noindex, nofollow' })

const store = usePlatformSandboxStore()

const ALL_SCOPES: SandboxScope[] = ['themes:read', 'themes:write', 'stores:read', 'webhooks:write']

const docLinks = [
  { key: 'themeGuide', href: 'https://docs.storeos.shop/themes' },
  { key: 'apiReference', href: 'https://docs.storeos.shop/api' },
  { key: 'webhooksGuide', href: 'https://docs.storeos.shop/webhooks' },
  { key: 'cliReference', href: 'https://docs.storeos.shop/cli' },
]

const storeHeaders = computed(() => [
  { label: t('platform.common.name'), key: 'name' },
  { label: t('platform.common.created'), key: 'createdAt' },
  { label: t('platform.sandbox.theme'), key: 'theme' },
  { label: t('platform.common.status'), key: 'status' },
  { label: t('platform.common.actions'), key: 'actions', align: 'end' as const },
])
const tokenHeaders = computed(() => [
  { label: t('platform.common.name'), key: 'name' },
  { label: t('platform.sandbox.cli.scopes'), key: 'scopes' },
  { label: t('platform.common.status'), key: 'status' },
  { label: t('platform.common.actions'), key: 'actions', align: 'end' as const },
])

const themeOptions = computed(() => (['dawn', 'noor', 'cairo', 'souq'] as const).map((v) => ({ value: v, label: t(`platform.sandbox.themes.${v}`) })))

/* CLI snippet */
const cliSnippet = 'npm install -g @storeos/cli\nstoreos login --token $STOREOS_TOKEN\nstoreos theme dev --store dawn-dev-cairo'
const copied = ref(false)
const copySnippet = async () => {
  try {
    await navigator.clipboard.writeText(cliSnippet)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 1500)
  } catch {
    copied.value = false
  }
}

/* Create test store */
const storeOpen = ref(false)
const storeTouched = ref(false)
const storeForm = reactive({ name: '', theme: 'dawn' as SandboxTheme })

const openStore = () => {
  storeForm.name = ''
  storeForm.theme = 'dawn'
  storeTouched.value = false
  storeOpen.value = true
}
const submitStore = () => {
  storeTouched.value = true
  if (!storeForm.name.trim()) return
  store.createStore(storeForm.name.trim(), storeForm.theme)
  storeOpen.value = false
}

/* Create token */
const tokenOpen = ref(false)
const tokenTouched = ref(false)
const newToken = ref('')
const tokenForm = reactive({ name: '', scopes: [] as SandboxScope[] })

const openToken = () => {
  tokenForm.name = ''
  tokenForm.scopes = ['themes:read']
  tokenTouched.value = false
  newToken.value = ''
  tokenOpen.value = true
}
const toggleScope = (scope: SandboxScope) => {
  tokenForm.scopes = tokenForm.scopes.includes(scope) ? tokenForm.scopes.filter((s) => s !== scope) : [...tokenForm.scopes, scope]
}
const submitToken = () => {
  tokenTouched.value = true
  if (!tokenForm.name.trim() || !tokenForm.scopes.length) return
  newToken.value = store.createToken(tokenForm.name.trim(), tokenForm.scopes)
}
</script>
