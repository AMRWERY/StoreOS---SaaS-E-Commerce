<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.support.title')"
          :subtitle="t('dashboard.ops.support.subtitle')"
        >
          <LazyVButton
            size="none"
            className="px-3 py-1.5 text-xs"
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.support.newTicket')"
            @click="panelOpen = true"
          />
        </ops-page-header>

        <div class="card px-4 py-3 flex items-center gap-3 border-success">
          <span class="size-2 rounded-full bg-success"></span>
          <p class="text-xs font-semibold text-success">{{ t('dashboard.ops.support.status.operational') }}</p>
          <p class="text-xs text-tx-muted">{{ t('dashboard.ops.support.status.desc') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="c in contacts" :key="c.key" class="card px-4 py-3.5 space-y-2">
            <Icon :name="c.icon" class="text-2xl" :class="c.color" />
            <p class="text-sm font-bold">{{ t(`dashboard.ops.support.contact.${c.key}`) }}</p>
            <p class="text-xs text-tx-muted">{{ t(`dashboard.ops.support.contact.${c.key}Desc`) }}</p>
            <p class="font-mono text-[11px] text-tx-secondary" dir="ltr">{{ c.value }}</p>
          </div>
        </div>

        <section class="card overflow-hidden">
          <div class="px-4 py-3.5 border-b border-border-subtle space-y-3">
            <h2 class="text-sm font-bold">{{ t('dashboard.ops.support.articles.title') }}</h2>
            <LazyVSearchInput v-model="query" :placeholder="t('dashboard.ops.support.articles.search')" />
          </div>
          <ul v-if="filteredArticles.length" class="divide-y divide-border-subtle">
            <li
              v-for="a in filteredArticles"
              :key="a.id"
              class="px-4 py-3 flex items-center gap-3 hover:bg-bg-elevated transition-colors"
            >
              <Icon name="ph:article-bold" class="text-tx-muted" />
              <span class="flex-1 text-sm">{{ articleTitle(a.id) }}</span>
              <status-pill>{{ t(`dashboard.ops.support.topics.${a.topic}`) }}</status-pill>
              <span class="font-mono text-[11px] text-tx-muted">
                {{ t('dashboard.ops.support.articles.minutes', { n: a.minutes }) }}
              </span>
            </li>
          </ul>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.support.articles.empty')"
            :hint="t('dashboard.ops.support.articles.emptyHint')"
            icon="ph:magnifying-glass-bold"
          />
        </section>

        <section class="card overflow-hidden">
          <div class="px-4 py-3.5 border-b border-border-subtle">
            <h2 class="text-sm font-bold">{{ t('dashboard.ops.support.tickets.title') }}</h2>
          </div>
          <LazyVTable v-if="tickets.length" :headers="headers" :items="tickets">
            <template #cell(id)="{ item }">
              <span class="font-mono text-sm font-semibold text-brand">{{ item.id }}</span>
            </template>
            <template #cell(subject)="{ item }">
              <span class="text-sm">{{ item.subject }}</span>
            </template>
            <template #cell(priority)="{ item }">
              <status-pill :tone="priorityTones[item.priority]">
                {{ t(`dashboard.ops.support.priority.${item.priority}`) }}
              </status-pill>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="statusTones[item.status]">
                {{ t(`dashboard.ops.support.tickets.${item.status}`) }}
              </status-pill>
            </template>
            <template #cell(updatedAt)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.updatedAt }}</span>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.support.tickets.empty')"
            :hint="t('dashboard.ops.support.tickets.emptyHint')"
            icon="ph:lifebuoy-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="panelOpen"
      :title="t('dashboard.ops.support.panel.title')"
      :subtitle="t('dashboard.ops.support.panel.subtitle')"
    >
      <div class="space-y-4">
        <LazyVInput v-model="draft.subject" :label="t('dashboard.ops.support.panel.subject')" />
        <LazyVSelectInput
          v-model="draft.priority"
          :label="t('dashboard.ops.support.panel.priority')"
          :options="priorityOptions"
        />
        <LazyVTextareaInput v-model="draft.message" :label="t('dashboard.ops.support.panel.message')" :rows="6" />
      </div>
      <template #footer>
        <LazyVButton
          size="none"
          className="px-4 py-2 text-xs"
          :disabled="!draft.subject.trim()"
          :label="t('dashboard.ops.support.panel.submit')"
          @click="submit"
        />
      </template>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'
import type { SupportTicket } from '@/types/platformTools'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.support.title') })

const store = useSupportCenterStore()
const { articles, tickets } = storeToRefs(store)

const articleTitle = (id: string) => t(`dashboard.ops.support.articleTitles.${id}`)
const query = ref('')
const filteredArticles = computed(() => {
  const q = query.value.trim().toLowerCase()
  return articles.value.filter((a) => !q || articleTitle(a.id).toLowerCase().includes(q))
})

const contacts = [
  { key: 'chat', icon: 'ph:chats-circle-bold', color: 'text-brand', value: '09:00 - 21:00' },
  { key: 'whatsapp', icon: 'ph:whatsapp-logo-bold', color: 'text-success', value: '+20 100 555 0199' },
  { key: 'email', icon: 'ph:envelope-simple-bold', color: 'text-info', value: 'support@storeos.app' },
]

const priorityTones: Record<string, Tone> = { low: 'neutral', normal: 'info', high: 'danger' }
const statusTones: Record<string, Tone> = { open: 'warning', pending: 'info', resolved: 'success' }

const panelOpen = ref(false)
const draft = reactive<{ subject: string; priority: SupportTicket['priority']; message: string }>({
  subject: '',
  priority: 'normal',
  message: '',
})
const priorityOptions = computed(() =>
  (['low', 'normal', 'high'] as const).map((p) => ({ value: p, label: t(`dashboard.ops.support.priority.${p}`) })),
)

function submit() {
  store.createTicket(draft.subject.trim(), draft.priority)
  draft.subject = ''
  draft.message = ''
  draft.priority = 'normal'
  panelOpen.value = false
}

const headers = computed(() => [
  { key: 'id', label: t('dashboard.ops.support.tickets.id') },
  { key: 'subject', label: t('dashboard.ops.support.panel.subject') },
  { key: 'priority', label: t('dashboard.ops.support.panel.priority') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'updatedAt', label: t('dashboard.ops.common.updated') },
])
</script>
