<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.organization.title')"
          :subtitle="t('dashboard.ops.organization.subtitle')"
          :count="stores.length"
        >
          <LazyVButton
            size="none"
            className="px-3 py-1.5 text-xs"
            icon="ph:plus-bold"
            iconPosition="left"
            :disabled="!canCreate"
            :label="t('dashboard.ops.organization.add.button')"
            @click="panelOpen = true"
          />
        </ops-page-header>

        <p v-if="!canCreate" class="text-xs text-warning">
          {{ t('dashboard.ops.organization.add.limitHint', { count: limit }) }}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <section class="card px-4 py-3.5 md:col-span-2 space-y-3">
            <LazyVInput v-model="orgName" :label="t('dashboard.ops.organization.orgName')" />
            <LazyVButton
              size="none"
              className="px-4 py-2 text-xs"
              :label="t('dashboard.ops.organization.save')"
            />
          </section>
          <LazyVStatCard
            :label="t('dashboard.ops.organization.members')"
            :value="membersCount"
            iconName="ph:users-three-bold"
            :sub="t('dashboard.ops.organization.membersDesc')"
          />
        </div>

        <section class="card overflow-hidden">
          <div class="px-4 py-3.5 border-b border-border-subtle">
            <h2 class="text-sm font-bold">{{ t('dashboard.ops.organization.stores') }}</h2>
          </div>
          <LazyVTable v-if="stores.length" :headers="headers" :items="stores">
            <template #cell(name)="{ item }">
              <div class="flex items-center gap-2">
                <span class="text-sm font-semibold">{{ item.name }}</span>
                <status-pill v-if="item.id === activeStoreId" tone="success">
                  {{ t('dashboard.ops.organization.active') }}
                </status-pill>
              </div>
            </template>
            <template #cell(domain)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.domain }}</span>
            </template>
            <template #cell(plan)="{ item }">
              <status-pill tone="info" class="uppercase">{{ item.plan }}</status-pill>
            </template>
            <template #cell(role)="{ item }">
              <status-pill :tone="item.role === 'owner' ? 'purple' : 'neutral'">
                {{ t(`dashboard.ops.organization.roles.${item.role}`) }}
              </status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.organization.empty')"
            icon="ph:storefront-bold"
          />
        </section>

        <section class="card px-4 py-3.5 flex items-start gap-3">
          <Icon name="ph:credit-card-bold" class="text-xl text-brand mt-0.5" />
          <div>
            <h2 class="text-sm font-bold">{{ t('dashboard.ops.organization.billing.title') }}</h2>
            <p class="text-xs text-tx-muted mt-1">{{ t('dashboard.ops.organization.billing.desc') }}</p>
          </div>
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="panelOpen"
      :title="t('dashboard.ops.organization.add.title')"
      :subtitle="t('dashboard.ops.organization.add.subtitle')"
    >
      <div class="space-y-4">
        <LazyVInput v-model="draftName" :label="t('dashboard.ops.organization.add.name')" />
        <LazyVInput
          v-model="draftDomain"
          :label="t('dashboard.ops.organization.add.domain')"
          placeholder="my-store"
        />
        <p class="font-mono text-[10px] text-tx-muted" dir="ltr">{{ draftDomain || 'my-store' }}.storeos.app</p>
      </div>
      <template #footer>
        <LazyVButton
          size="none"
          className="px-4 py-2 text-xs"
          :disabled="!draftName.trim() || !draftDomain.trim()"
          :label="t('dashboard.ops.organization.add.submit')"
          @click="submit"
        />
      </template>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.organization.title') })

const { plan } = useAuth()
const orgStore = useOrganizationStoresStore()
const { orgName, membersCount, stores, activeStoreId } = storeToRefs(orgStore)

const limit = computed(() => (plan.value === 'enterprise' ? Infinity : plan.value === 'growth' ? 3 : 1))
const canCreate = computed(() => stores.value.length < limit.value)

const panelOpen = ref(false)
const draftName = ref('')
const draftDomain = ref('')

function submit() {
  orgStore.addStore(draftName.value.trim(), draftDomain.value.trim().toLowerCase().replace(/\s+/g, '-'))
  draftName.value = ''
  draftDomain.value = ''
  panelOpen.value = false
}

const headers = computed(() => [
  { key: 'name', label: t('dashboard.ops.organization.storeName') },
  { key: 'domain', label: t('dashboard.ops.organization.domain') },
  { key: 'plan', label: t('dashboard.ops.organization.plan') },
  { key: 'role', label: t('dashboard.ops.organization.role') },
])
</script>
