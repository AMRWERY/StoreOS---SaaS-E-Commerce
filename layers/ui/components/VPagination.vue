<template>
  <div>
    <div v-if="totalPages > 1" class="flex items-center justify-between px-2 py-4 my-6">
      <!-- Left: info -->
      <p class="text-xs text-tx-secondary">
        Showing <span class="text-tx-primary font-semibold">{{ from }}–{{ to }}</span> of
        <span class="text-tx-primary font-semibold">{{ total }}</span> results
      </p>

      <!-- Right: controls -->
      <div class="flex items-center gap-1">
        <!-- Prev -->
        <VButton variant="none" :disabled="currentPage === 1" @click="changePage(currentPage - 1)"
          className="w-8 h-8 flex items-center justify-center rounded-md text-tx-secondary hover:text-tx-primary hover:bg-bg-elevated transition-all disabled:opacity-30 disabled:cursor-not-allowed">
          <Icon name="ph:caret-left-bold" class="text-sm" />
        </VButton>

        <!-- Page numbers -->
        <template v-for="page in visiblePages" :key="page">
          <span v-if="page === '...'"
            class="w-8 h-8 flex items-center justify-center text-tx-muted text-xs select-none">
            ···
          </span>
          <VButton v-else variant="none" @click="changePage(page)" :className="[
            'w-8 h-8 flex items-center justify-center rounded-md text-xs font-semibold transition-all',
            page === currentPage
              ? 'bg-brand text-white shadow-lg shadow-brand/20'
              : 'text-tx-secondary hover:text-tx-primary hover:bg-bg-elevated'
          ].join(' ')">
            {{ page }}
          </VButton>
        </template>

        <!-- Next -->
        <VButton variant="none" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)"
          className="w-8 h-8 flex items-center justify-center rounded-md text-tx-secondary hover:text-tx-primary hover:bg-bg-elevated transition-all disabled:opacity-30 disabled:cursor-not-allowed">
          <Icon name="ph:caret-right-bold" class="text-sm" />
        </VButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  total: number
  perPage: number
  currentPage: number
}>()

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void
}>()

const totalPages = computed(() => Math.ceil(props.total / props.perPage))
const from = computed(() => (props.currentPage - 1) * props.perPage + 1)
const to = computed(() => Math.min(props.currentPage * props.perPage, props.total))

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const current = props.currentPage
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }
  pages.push(1)
  if (current > 3) pages.push('...')
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i)
  }
  if (current < total - 2) pages.push('...')
  pages.push(total)
  return pages
})

const changePage = (page: number | string) => {
  const p = Number(page)
  if (p >= 1 && p <= totalPages.value) {
    emit('update:currentPage', p)
  }
}
</script>
