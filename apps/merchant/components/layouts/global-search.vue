<!--
  Command-palette search. Mount once in the dashboard layout: <global-search />
  Opens with Ctrl/Cmd+K. Other components can open it by setting the shared state:
    useState<boolean>('global-search-open').value = true
  Mock entities only; selecting a result navigates with useLocalePath().
-->
<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-[110] flex items-start justify-center px-4 pt-[12vh]"
        role="dialog"
        aria-modal="true"
        :aria-label="t('dashboard.ops.search.title')"
      >
        <div class="absolute inset-0 bg-bg-overlay backdrop-blur-sm" @click="close"></div>
        <div
          class="relative z-10 w-full max-w-xl bg-bg-primary border border-border-default rounded-xl overflow-hidden flex flex-col max-h-[70vh]"
        >
          <div class="flex items-center gap-3 px-4 py-3 border-b border-border-subtle">
            <Icon name="ph:magnifying-glass-bold" class="text-tx-muted" />
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              class="flex-1 bg-transparent text-sm text-tx-primary placeholder:text-tx-muted outline-none"
              :placeholder="t('dashboard.ops.search.placeholder')"
              @keydown.down.prevent="move(1)"
              @keydown.up.prevent="move(-1)"
              @keydown.enter.prevent="choose(results[active])"
            />
            <kbd class="font-mono text-[10px] text-tx-muted border border-border-subtle rounded px-1.5 py-0.5">Esc</kbd>
          </div>

          <div class="overflow-y-auto hide-scrollbar py-2">
            <template v-if="results.length">
              <template v-for="(group, gi) in grouped" :key="group.key">
                <p class="px-4 pt-2 pb-1 text-[10px] font-bold text-tx-muted tracking-widest">
                  {{ t(`dashboard.ops.search.groups.${group.key}`) }}
                </p>
                <button
                  v-for="r in group.items"
                  :key="r.id"
                  type="button"
                  class="w-full flex items-center gap-3 px-4 py-2 text-start transition-colors"
                  :class="results[active]?.id === r.id ? 'bg-bg-elevated' : 'hover:bg-bg-elevated'"
                  :data-group="gi"
                  @mouseenter="active = results.findIndex((x) => x.id === r.id)"
                  @click="choose(r)"
                >
                  <Icon :name="r.icon" class="text-tx-muted shrink-0" />
                  <span class="flex-1 min-w-0">
                    <span class="block text-sm text-tx-primary truncate">{{ r.label }}</span>
                    <span v-if="r.hint" class="block font-mono text-[10px] text-tx-muted truncate">{{ r.hint }}</span>
                  </span>
                </button>
              </template>
            </template>
            <p v-else class="px-4 py-10 text-center text-xs text-tx-muted">
              {{ t('dashboard.ops.search.empty') }}
            </p>
          </div>

          <div class="px-4 py-2 border-t border-border-subtle text-[10px] text-tx-muted flex gap-4">
            <span>{{ t('dashboard.ops.search.navigate') }}</span>
            <span>{{ t('dashboard.ops.search.select') }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
interface SearchEntity {
  id: string
  group: 'orders' | 'products' | 'customers' | 'settings'
  label: string
  hint?: string
  icon: string
  to: string
}

const { t } = useI18n()
const localePath = useLocalePath()

const open = useState<boolean>('global-search-open', () => false)
const query = ref('')
const active = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

const settingsItems: { key: string; to: string }[] = [
  { key: 'storeInfo', to: '/dashboard/settings/store-info' },
  { key: 'billing', to: '/dashboard/settings/billing-and-plan' },
  { key: 'staff', to: '/dashboard/settings/staff-and-permissions' },
  { key: 'security', to: '/dashboard/settings/security' },
  { key: 'whatsapp', to: '/dashboard/settings/whatsapp' },
  { key: 'organization', to: '/dashboard/settings/organization' },
]

const entities = computed<SearchEntity[]>(() => [
  { id: 'o1', group: 'orders', label: 'ORD-8841', hint: 'Sara Mostafa', icon: 'ph:receipt-bold', to: '/dashboard/orders' },
  { id: 'o2', group: 'orders', label: 'ORD-8790', hint: 'Omar Hassan', icon: 'ph:receipt-bold', to: '/dashboard/orders' },
  { id: 'o3', group: 'orders', label: 'ORD-8702', hint: 'Nour Adel', icon: 'ph:receipt-bold', to: '/dashboard/orders' },
  { id: 'p1', group: 'products', label: 'Linen Shirt', hint: '590 EGP', icon: 'ph:package-bold', to: '/dashboard/products' },
  { id: 'p2', group: 'products', label: 'Leather Wallet', hint: '420 EGP', icon: 'ph:package-bold', to: '/dashboard/products' },
  { id: 'p3', group: 'products', label: 'Wireless Earbuds', hint: '1,250 EGP', icon: 'ph:package-bold', to: '/dashboard/products' },
  { id: 'c1', group: 'customers', label: 'Sara Mostafa', hint: 'sara@example.com', icon: 'ph:user-bold', to: '/dashboard/customers' },
  { id: 'c2', group: 'customers', label: 'Karim Fathy', hint: 'karim@example.com', icon: 'ph:user-bold', to: '/dashboard/customers' },
  { id: 'c3', group: 'customers', label: 'Mona Samir', hint: 'mona@example.com', icon: 'ph:user-bold', to: '/dashboard/customers' },
  ...settingsItems.map((s) => ({
    id: `s-${s.key}`,
    group: 'settings' as const,
    label: t(`dashboard.ops.search.settingsItems.${s.key}`),
    icon: 'ph:gear-six-bold',
    to: s.to,
  })),
])

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  const list = q
    ? entities.value.filter((e) => `${e.label} ${e.hint ?? ''}`.toLowerCase().includes(q))
    : entities.value
  return q ? list : list.filter((e) => e.group !== 'customers').slice(0, 8)
})

const grouped = computed(() =>
  (['orders', 'products', 'customers', 'settings'] as const)
    .map((key) => ({ key, items: results.value.filter((r) => r.group === key) }))
    .filter((g) => g.items.length),
)

watch(query, () => (active.value = 0))

function move(step: number) {
  if (!results.value.length) return
  active.value = (active.value + step + results.value.length) % results.value.length
}

function close() {
  open.value = false
}

async function choose(r?: SearchEntity) {
  if (!r) return
  close()
  await navigateTo(localePath(r.to))
}

watch(open, (v) => {
  if (v) {
    query.value = ''
    active.value = 0
    nextTick(() => inputRef.value?.focus())
  }
})

onKeyStroke('k', (e) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault()
    open.value = !open.value
  }
})
onKeyStroke('Escape', () => {
  if (open.value) close()
})
</script>
