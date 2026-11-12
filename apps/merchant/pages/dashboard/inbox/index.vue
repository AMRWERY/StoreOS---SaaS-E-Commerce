<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-7xl mx-auto space-y-6">
        <ops-page-header
          :title="t(`${p}.title`)"
          :subtitle="t(`${p}.subtitle`)"
          :count="conversations.filter((c) => c.unread).length"
        />

        <div
          v-if="conversations.length"
          class="card grid grid-cols-1 lg:grid-cols-[17rem_1fr_17rem] overflow-hidden lg:h-[34rem]"
        >
          <!-- Conversations -->
          <aside class="border-b lg:border-b-0 lg:border-e border-border-subtle overflow-y-auto max-h-64 lg:max-h-none">
            <ul class="divide-y divide-border-subtle">
              <li v-for="c in conversations" :key="c.id">
                <button
                  class="w-full flex items-start gap-3 px-4 py-3 text-start transition-colors duration-200"
                  :class="c.id === activeId ? 'bg-bg-elevated' : 'hover:bg-bg-elevated'"
                  @click="select(c.id)"
                >
                  <Icon :name="channelIcons[c.channel]" class="mt-0.5 text-lg shrink-0" :class="channelColors[c.channel]" />
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-2">
                      <span class="truncate text-sm" :class="c.unread ? 'font-bold' : 'font-semibold'">{{ c.customer }}</span>
                      <span class="font-mono text-[10px] text-tx-muted shrink-0">{{ c.time }}</span>
                    </div>
                    <p class="truncate text-xs text-tx-muted mt-0.5" dir="auto">{{ lastText(c) }}</p>
                  </div>
                  <span
                    v-if="c.unread"
                    class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand"
                    :aria-label="t(`${p}.unread`)"
                  />
                </button>
              </li>
            </ul>
          </aside>

          <!-- Thread -->
          <section v-if="active" class="flex flex-col min-h-96 lg:min-h-0">
            <header class="flex items-center justify-between gap-3 border-b border-border-subtle px-4 py-3">
              <div class="flex items-center gap-2">
                <Icon :name="channelIcons[active.channel]" class="text-lg" :class="channelColors[active.channel]" />
                <span class="text-sm font-bold">{{ active.customer }}</span>
              </div>
              <span class="text-[11px] text-tx-muted">{{ t(`${p}.channels.${active.channel}`) }}</span>
            </header>

            <div class="flex-1 overflow-y-auto space-y-3 p-4">
              <template v-for="m in active.messages" :key="m.id">
                <div v-if="m.kind === 'draft'" class="flex justify-center">
                  <status-pill tone="purple">{{ t(`${p}.draftCreated`, { id: m.draftId }) }}</status-pill>
                </div>
                <div v-else class="flex" :class="m.kind === 'agent' ? 'justify-end' : 'justify-start'">
                  <div
                    class="max-w-[80%] px-3 py-2 text-sm"
                    :class="
                      m.kind === 'agent'
                        ? 'bg-brand text-white rounded-xl rounded-se-sm'
                        : 'bg-bg-elevated border border-border-subtle rounded-xl rounded-ss-sm'
                    "
                  >
                    <p dir="auto">{{ m.text }}</p>
                    <p class="mt-1 font-mono text-[10px] opacity-70 text-end">{{ m.time }}</p>
                  </div>
                </div>
              </template>
            </div>

            <footer class="border-t border-border-subtle p-3 space-y-2">
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="q in quickReplyKeys"
                  :key="q"
                  type="button"
                  class="rounded-full border border-border-subtle bg-bg-elevated px-3 py-1 text-[11px] font-semibold text-tx-secondary hover:text-tx-primary hover:border-border-default transition-colors duration-200"
                  @click="draft = t(`${p}.quick.${q}`)"
                >
                  {{ t(`${p}.quickLabels.${q}`) }}
                </button>
              </div>
              <form class="flex items-center gap-2" @submit.prevent="send">
                <div class="flex-1">
                  <LazyVInput v-model="draft" :placeholder="t(`${p}.typeMessage`)" dir="auto" />
                </div>
                <LazyVButton type="submit" icon="ph:paper-plane-tilt-bold" iconPosition="left" :label="t(`${p}.send`)" :disabled="!draft.trim()" />
              </form>
            </footer>
          </section>

          <!-- Context -->
          <aside v-if="active" class="border-t lg:border-t-0 lg:border-s border-border-subtle overflow-y-auto p-4 space-y-5">
            <div>
              <p class="text-sm font-bold">{{ active.customer }}</p>
              <p class="font-mono text-xs text-tx-muted mt-0.5" dir="ltr">{{ active.phone }}</p>
            </div>
            <div class="space-y-2">
              <h3 class="text-[11px] font-semibold text-tx-muted">{{ t(`${p}.orderHistory`) }}</h3>
              <ul v-if="active.orders.length" class="space-y-2">
                <li v-for="o in active.orders" :key="o.id" class="rounded-md border border-border-subtle bg-bg-elevated p-2.5 flex items-center justify-between gap-2">
                  <div>
                    <p class="font-mono text-xs font-semibold">{{ o.id }}</p>
                    <p class="font-mono text-[11px] text-tx-muted">{{ money(o.total) }}</p>
                  </div>
                  <status-pill :tone="orderTones[o.status]">{{ t(`${p}.orderStatus.${o.status}`) }}</status-pill>
                </li>
              </ul>
              <p v-else class="text-xs text-tx-muted">{{ t(`${p}.noOrders`) }}</p>
            </div>
            <LazyVButton
              class="w-full"
              icon="ph:note-pencil-bold"
              iconPosition="left"
              :label="t(`${p}.createDraft`)"
              @click="draftOpen = true"
            />
          </aside>
        </div>
        <ops-empty-state v-else :title="t(`${p}.empty`)" :hint="t(`${p}.emptyHint`)" icon="ph:chats-circle-bold" />
      </div>
    </div>

    <LazyVSidePanel v-model="draftOpen" :title="t(`${p}.createDraft`)" :subtitle="t(`${p}.draftSubtitle`)">
      <div class="space-y-5 p-1">
        <ul v-if="products.length" class="space-y-2">
          <li
            v-for="pr in products"
            :key="pr.id"
            class="flex items-center justify-between gap-3 rounded-md border border-border-subtle bg-bg-elevated p-3"
          >
            <div class="min-w-0">
              <p class="truncate text-sm font-semibold">{{ pr.name }}</p>
              <p class="font-mono text-xs text-tx-muted">{{ money(pr.price) }}</p>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <button
                type="button"
                class="h-6 w-6 rounded border border-border-default text-tx-secondary hover:text-tx-primary transition-colors"
                :aria-label="t(`${p}.decrease`)"
                @click="changeQty(pr.id, -1)"
              >
                -
              </button>
              <span class="w-5 text-center font-mono text-sm">{{ qty[pr.id] ?? 0 }}</span>
              <button
                type="button"
                class="h-6 w-6 rounded border border-border-default text-tx-secondary hover:text-tx-primary transition-colors"
                :aria-label="t(`${p}.increase`)"
                @click="changeQty(pr.id, 1)"
              >
                +
              </button>
            </div>
          </li>
        </ul>
        <ops-empty-state v-else :title="t(`${p}.noProducts`)" :hint="t(`${p}.noProductsHint`)" icon="ph:package-bold" />

        <dl class="rounded-md border border-border-subtle p-3 space-y-2 text-sm">
          <div class="flex justify-between"><dt class="text-tx-muted">{{ t(`${p}.subtotal`) }}</dt><dd class="font-mono">{{ money(subtotal) }}</dd></div>
          <div class="flex justify-between"><dt class="text-tx-muted">{{ t(`${p}.shipping`) }}</dt><dd class="font-mono">{{ money(shipping) }}</dd></div>
          <div class="flex justify-between border-t border-border-subtle pt-2 font-bold"><dt>{{ t(`${p}.total`) }}</dt><dd class="font-mono">{{ money(subtotal + shipping) }}</dd></div>
        </dl>

        <LazyVButton class="w-full" :label="t(`${p}.createDraftCta`)" :disabled="!subtotal" @click="createDraft" />
      </div>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { InboxChannel, InboxConversation } from '@/types/insights'
import type { Tone } from '@/types/operations'

const { t } = useI18n()
const { money } = useOpsFormat()
const p = 'dashboard.ops.inbox'

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.inbox.title') })

const store = useChanInboxStore()
const { conversations, products } = storeToRefs(store)
const quickReplyKeys = store.quickReplyKeys

const channelIcons: Record<InboxChannel, string> = {
  whatsapp: 'ph:whatsapp-logo-bold',
  messenger: 'ph:messenger-logo-bold',
  instagram: 'ph:instagram-logo-bold',
}
const channelColors: Record<InboxChannel, string> = {
  whatsapp: 'text-success',
  messenger: 'text-info',
  instagram: 'text-status-purple',
}
const orderTones: Record<string, Tone> = { delivered: 'success', shipped: 'info', processing: 'warning' }

const activeId = ref(conversations.value[0]?.id ?? '')
const active = computed(() => conversations.value.find((c) => c.id === activeId.value))
const draft = ref('')
const draftOpen = ref(false)
const qty = reactive<Record<string, number>>({})

const lastText = (c: InboxConversation) => {
  const last = [...c.messages].reverse().find((m) => m.kind !== 'draft')
  return last?.text ?? ''
}

function select(id: string) {
  activeId.value = id
  store.markRead(id)
}
if (activeId.value) store.markRead(activeId.value)

function send() {
  if (!activeId.value) return
  store.send(activeId.value, draft.value)
  draft.value = ''
}

function changeQty(id: string, delta: number) {
  qty[id] = Math.max(0, (qty[id] ?? 0) + delta)
}
const subtotal = computed(() => products.value.reduce((s, pr) => s + pr.price * (qty[pr.id] ?? 0), 0))
const shipping = computed(() => (subtotal.value ? 60 : 0))

function createDraft() {
  if (!activeId.value || !subtotal.value) return
  store.addDraft(activeId.value)
  for (const k of Object.keys(qty)) delete qty[k]
  draftOpen.value = false
}
</script>
