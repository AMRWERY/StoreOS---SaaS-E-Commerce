<!--
  Organization / store switcher dropdown. Mount in the sidebar or header: <store-switcher />
  No props or events; reads the in-memory organization store and the current plan from useAuth().
  Store limits: Growth = 3, Enterprise = unlimited, every other plan = 1.
-->
<template>
  <LazyVDropdownMenu align="start" width="w-72">
    <template #trigger>
      <div
        class="flex items-center gap-2 rounded-md border border-border-subtle bg-bg-elevated px-3 py-2 hover:border-border-default transition-colors"
      >
        <span class="size-6 rounded bg-brand-dim text-brand flex items-center justify-center text-[10px] font-bold">
          {{ activeStore?.name.slice(0, 1) }}
        </span>
        <span class="min-w-0 flex-1 text-start">
          <span class="block text-xs font-bold truncate">{{ activeStore?.name }}</span>
          <span class="block text-[10px] text-tx-muted truncate">{{ orgName }}</span>
        </span>
        <Icon name="ph:caret-up-down-bold" class="text-tx-muted shrink-0" aria-hidden="true" />
      </div>
    </template>
    <template #default="{ close }">
      <div class="space-y-1">
        <p class="px-2 pt-1 text-[10px] font-bold text-tx-muted tracking-widest">
          {{ t('dashboard.ops.storeSwitcher.stores') }}
        </p>
        <button
          v-for="s in stores"
          :key="s.id"
          type="button"
          class="w-full flex items-center gap-2 rounded-md px-2 py-2 text-start hover:bg-bg-elevated transition-colors"
          :aria-current="s.id === activeStoreId ? 'true' : undefined"
          @click="select(s.id, close)"
        >
          <span class="flex-1 min-w-0">
            <span class="block text-xs font-semibold truncate">{{ s.name }}</span>
            <span class="block font-mono text-[10px] text-tx-muted truncate">{{ s.domain }}</span>
          </span>
          <status-pill tone="info" class="uppercase">{{ s.plan }}</status-pill>
          <Icon v-if="s.id === activeStoreId" name="ph:check-bold" class="text-brand" />
        </button>

        <div class="border-t border-border-subtle pt-2 space-y-1">
          <LazyVButton
            v-if="canCreate"
            size="none"
            variant="secondary"
            className="px-3 py-1.5 text-xs w-full"
            icon="ph:plus-bold"
            iconPosition="left"
            :to="localePath('/dashboard/settings/organization')"
            :label="t('dashboard.ops.storeSwitcher.create')"
            @click="close()"
          />
          <template v-else>
            <LazyVButton
              size="none"
              variant="secondary"
              className="px-3 py-1.5 text-xs w-full"
              icon="ph:plus-bold"
              iconPosition="left"
              disabled
              :label="t('dashboard.ops.storeSwitcher.create')"
            />
            <p class="px-1 text-[10px] text-tx-muted">
              {{ t('dashboard.ops.storeSwitcher.limitHint', { count: limit }) }}
            </p>
          </template>
        </div>
      </div>
    </template>
  </LazyVDropdownMenu>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const localePath = useLocalePath()
const { plan } = useAuth()

const orgStore = useOrganizationStoresStore()
const { orgName, stores, activeStoreId } = storeToRefs(orgStore)

const activeStore = computed(() => stores.value.find((s) => s.id === activeStoreId.value) ?? stores.value[0])

const limit = computed(() => (plan.value === 'enterprise' ? Infinity : plan.value === 'growth' ? 3 : 1))
const canCreate = computed(() => stores.value.length < limit.value)

function select(id: string, close: () => void) {
  activeStoreId.value = id
  close()
}
</script>
