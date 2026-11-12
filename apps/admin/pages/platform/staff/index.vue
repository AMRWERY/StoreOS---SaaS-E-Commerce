<template>
  <div>
    <platform-page-header :title="t('platform.staff.title')" :subtitle="t('platform.staff.subtitle')" />

    <section class="card mb-4 overflow-hidden">
      <div class="border-b border-border-subtle px-4 py-3">
        <h3 class="text-sm font-bold">{{ t('platform.staff.members') }}</h3>
      </div>
      <v-table v-if="store.staff.length" :headers="staffHeaders" :items="store.staff">
        <template #cell(name)="{ item }">
          <p class="text-xs font-semibold text-tx-primary">{{ item.name }}</p>
          <p class="font-mono text-[10px] text-tx-muted">{{ item.email }}</p>
        </template>
        <template #cell(role)="{ item }">
          <platform-status-pill :label="t(`platform.staff.role.${item.role}`)" :tone="item.role === 'superAdmin' ? 'purple' : 'info'" />
        </template>
        <template #cell(twoFactor)="{ item }">
          <platform-status-pill
            :label="item.twoFactor ? t('platform.staff.twoFactorOn') : t('platform.staff.twoFactorOff')"
            :tone="item.twoFactor ? 'success' : 'warning'"
          />
        </template>
        <template #cell(lastActive)="{ item }">
          <span class="font-mono text-xs text-tx-secondary">{{ item.lastActive }}</span>
        </template>
      </v-table>
      <platform-empty-state v-else :title="t('platform.staff.empty')" icon="ph:users-three" />
    </section>

    <section class="card overflow-hidden">
      <div class="border-b border-border-subtle px-4 py-3">
        <h3 class="text-sm font-bold">{{ t('platform.staff.auditLog') }}</h3>
        <p class="text-[11px] text-tx-muted">{{ t('platform.staff.auditHint') }}</p>
      </div>
      <v-table v-if="store.audit.length" :headers="auditHeaders" :items="store.audit">
        <template #cell(date)="{ item }">
          <span class="font-mono text-xs text-tx-secondary">{{ item.date }}</span>
        </template>
        <template #cell(actor)="{ item }">
          <span class="text-xs text-tx-primary">{{ item.actor }}</span>
        </template>
        <template #cell(action)="{ item }">
          <span class="text-xs text-tx-secondary">{{ t(`platform.audit.${item.action}`) }}</span>
        </template>
        <template #cell(target)="{ item }">
          <span class="font-mono text-xs text-tx-primary">{{ item.target }}</span>
        </template>
        <template #cell(ip)="{ item }">
          <span class="font-mono text-xs text-tx-muted">{{ item.ip }}</span>
        </template>
      </v-table>
      <platform-empty-state v-else :title="t('platform.staff.auditEmpty')" icon="ph:scroll" />
    </section>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'platform' })

const { t } = useI18n()

useSeoMeta({ title: t('platform.staff.title'), robots: 'noindex, nofollow' })

const store = usePlatformStaffStore()

const staffHeaders = computed(() => [
  { label: t('platform.common.name'), key: 'name' },
  { label: t('platform.staff.roleLabel'), key: 'role' },
  { label: t('platform.staff.twoFactor'), key: 'twoFactor' },
  { label: t('platform.common.lastActive'), key: 'lastActive', align: 'end' as const },
])

const auditHeaders = computed(() => [
  { label: t('platform.common.date'), key: 'date' },
  { label: t('platform.staff.actor'), key: 'actor' },
  { label: t('platform.staff.action'), key: 'action' },
  { label: t('platform.staff.target'), key: 'target' },
  { label: t('platform.staff.ip'), key: 'ip', align: 'end' as const },
])
</script>
