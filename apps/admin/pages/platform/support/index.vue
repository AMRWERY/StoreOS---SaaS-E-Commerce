<template>
  <div>
    <platform-page-header :title="t('platform.support.title')" :subtitle="t('platform.support.subtitle')" />

    <section class="card overflow-hidden">
      <div class="border-b border-border-subtle px-4 pt-3.5">
        <v-tabs v-model="tab" :tabs="tabs" />
      </div>
      <v-table v-if="filtered.length" :headers="headers" :items="filtered" table-class="cursor-pointer" @row-click="select">
        <template #cell(id)="{ item }">
          <span class="font-mono text-xs text-tx-secondary">{{ item.id }}</span>
        </template>
        <template #cell(subject)="{ item }">
          <p class="text-xs font-semibold text-tx-primary">{{ item.subject }}</p>
          <p class="text-[10px] text-tx-muted">{{ item.store }}</p>
        </template>
        <template #cell(priority)="{ item }">
          <platform-status-pill :label="t(`platform.support.priority.${item.priority}`)" :tone="tones.priority(item.priority)" />
        </template>
        <template #cell(status)="{ item }">
          <platform-status-pill :label="t(`platform.status.${item.status}`)" :tone="tones.ticket(item.status)" />
        </template>
        <template #cell(assignee)="{ item }">
          <span class="text-xs text-tx-secondary">{{ item.assignee }}</span>
        </template>
        <template #cell(createdAt)="{ item }">
          <span class="font-mono text-xs text-tx-secondary">{{ item.createdAt }}</span>
        </template>
      </v-table>
      <platform-empty-state v-else :title="t('platform.support.empty')" :hint="t('platform.support.emptyHint')" icon="ph:lifebuoy" />
    </section>

    <v-side-panel v-model="panelOpen" :title="active?.subject ?? ''" :subtitle="active ? `${active.id} · ${active.store}` : ''" width="lg">
      <template v-if="active">
        <div class="mb-4 flex flex-wrap items-center gap-2">
          <platform-status-pill :label="t(`platform.status.${active.status}`)" :tone="tones.ticket(active.status)" />
          <platform-status-pill :label="t(`platform.support.priority.${active.priority}`)" :tone="tones.priority(active.priority)" />
          <span class="text-[11px] text-tx-muted">{{ active.assignee }}</span>
        </div>

        <h4 class="mb-2 text-eyebrow">{{ t('platform.support.internalNotes') }}</h4>
        <ul v-if="active.notes.length" class="mb-3 space-y-2">
          <li v-for="n in active.notes" :key="n.id" class="rounded-md border border-border-subtle bg-bg-base px-3 py-2">
            <p class="text-xs text-tx-primary">{{ n.body }}</p>
            <p class="mt-1 text-[10px] text-tx-muted">{{ n.author }} · <span class="font-mono">{{ n.date }}</span></p>
          </li>
        </ul>
        <platform-empty-state v-else :title="t('platform.support.notesEmpty')" icon="ph:note" />

        <v-textarea-input v-model="noteDraft" :rows="3" :placeholder="t('platform.support.notePlaceholder')" />
        <v-button class-name="mt-2" :label="t('platform.support.addNote')" :disabled="!noteDraft.trim()" @click="addNote" />
      </template>

      <template #footer>
        <div class="grid grid-cols-2 gap-2">
          <v-button variant="secondary" :label="t('platform.support.markPending')" @click="setStatus('pending')" />
          <v-button icon="ph:check" icon-position="left" :label="t('platform.support.resolve')" @click="setStatus('resolved')" />
        </div>
      </template>
    </v-side-panel>
  </div>
</template>

<script lang="ts" setup>
import type { TicketStatus } from '@/types/platform'

definePageMeta({ layout: 'platform' })

const { t } = useI18n()
const tones = usePlatformTones()

useSeoMeta({ title: t('platform.support.title'), robots: 'noindex, nofollow' })

const store = usePlatformSupportStore()

const tab = ref('all')

const countOf = (status: string) => store.tickets.filter((x) => x.status === status).length

const tabs = computed(() => [
  { name: t('platform.support.tabs.all'), value: 'all', count: store.tickets.length },
  { name: t('platform.status.open'), value: 'open', count: countOf('open') },
  { name: t('platform.status.pending'), value: 'pending', count: countOf('pending') },
  { name: t('platform.status.resolved'), value: 'resolved', count: countOf('resolved') },
])

const filtered = computed(() => store.tickets.filter((x) => tab.value === 'all' || x.status === tab.value))

const headers = computed(() => [
  { label: t('platform.common.id'), key: 'id' },
  { label: t('platform.support.subject'), key: 'subject' },
  { label: t('platform.support.priorityLabel'), key: 'priority' },
  { label: t('platform.common.status'), key: 'status' },
  { label: t('platform.support.assignee'), key: 'assignee' },
  { label: t('platform.common.created'), key: 'createdAt', align: 'end' as const },
])

const activeId = ref<string | null>(null)
const panelOpen = ref(false)
const active = computed(() => store.tickets.find((x) => x.id === activeId.value) ?? null)

const select = (item: { id: string }) => {
  activeId.value = item.id
  noteDraft.value = ''
  panelOpen.value = true
}

const noteDraft = ref('')
const addNote = () => {
  const body = noteDraft.value.trim()
  if (!activeId.value || !body) return
  store.addNote(activeId.value, body)
  noteDraft.value = ''
}

const setStatus = (status: TicketStatus) => {
  if (activeId.value) store.setStatus(activeId.value, status)
}
</script>
