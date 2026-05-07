<template>
  <Teleport to="body">
    <div v-if="publishOpen" class="fixed inset-0 z-[200] flex items-center justify-center p-4" role="dialog"
      aria-modal="true">
      <div class="absolute inset-0 bg-black/65 backdrop-blur-sm" @click="!isSaving && (publishOpen = false)" />

      <div class="relative w-full max-w-md rounded-2xl border border-border-subtle bg-bg-primary p-6 shadow-2xl">

        <!-- Published success state -->
        <template v-if="published">
          <div class="flex flex-col items-center text-center py-2">
            <div class="mb-4 flex size-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Icon name="ph:check-bold" class="text-2xl text-emerald-400" />
            </div>
            <h2 class="text-lg font-bold tracking-wide text-tx-primary">Store is live!</h2>
            <p class="mt-2 text-sm leading-relaxed text-tx-secondary">
              Your store has been published. The new tab should have opened automatically.
            </p>
            <button type="button"
              class="mt-6 w-full rounded-lg bg-brand px-5 py-2.5 text-[11px] font-black tracking-wider text-white shadow-lg shadow-brand/25 flex items-center justify-center gap-2"
              @click="openPreview">
              <Icon name="ph:arrow-square-out-bold" />
              Open Store Preview
            </button>
            <button type="button"
              class="mt-3 w-full rounded-lg border border-border-subtle px-5 py-2.5 text-[11px] font-bold tracking-wider text-tx-secondary hover:bg-bg-elevated"
              @click="close">
              Back to Builder
            </button>
          </div>
        </template>

        <!-- Default / saving state -->
        <template v-else>
          <h2 class="text-lg font-bold tracking-wide text-tx-primary">Publish store</h2>
          <p class="mt-2 text-sm leading-relaxed text-tx-secondary">
            Push the latest changes live. Visitors will see the updated theme and pages.
          </p>

          <!-- Pages summary -->
          <ul v-if="store.pages.length" class="mt-4 space-y-1.5 rounded-xl border border-border-subtle bg-bg-elevated p-3">
            <li v-for="page in store.pages" :key="page.id"
              class="flex items-center justify-between text-xs text-tx-secondary">
              <span class="flex items-center gap-2">
                <Icon name="ph:file-text-bold" class="text-tx-muted" />
                {{ page.title }}
              </span>
              <span class="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-black tracking-widest text-emerald-400">
                WILL PUBLISH
              </span>
            </li>
          </ul>

          <div class="mt-6 flex flex-wrap gap-3">
            <button type="button"
              class="flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-[11px] font-black tracking-wider text-white shadow-lg shadow-brand/25 disabled:opacity-60"
              :disabled="isSaving"
              @click="handlePublish">
              <Icon v-if="isSaving" name="ph:spinner-gap-bold" class="animate-spin" />
              <Icon v-else name="ph:rocket-launch-bold" />
              {{ isSaving ? 'Publishing…' : 'Publish now' }}
            </button>
            <button type="button"
              class="rounded-lg border border-border-subtle px-5 py-2.5 text-[11px] font-bold tracking-wider text-tx-secondary hover:bg-bg-elevated disabled:opacity-40"
              :disabled="isSaving"
              @click="close">
              Cancel
            </button>
          </div>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { publishOpen } = useBuilderModals()
const store = useBuilderStore()
const localePath = useLocalePath()

const isSaving = computed(() => store.isSaving)
const published = ref(false)
const previewUrl = ref('')

async function handlePublish() {
  const rawUrl = await store.publish()
  previewUrl.value = localePath(rawUrl)
  published.value = true
  window.open(previewUrl.value, '_blank')
}

function openPreview() {
  window.open(previewUrl.value, '_blank')
}

function close() {
  publishOpen.value = false
  setTimeout(() => { published.value = false }, 300)
}
</script>
