<template>
  <aside class="flex h-full flex-col overflow-hidden" aria-label="Footer settings">
    <!-- Header -->
    <div class="flex h-12 shrink-0 items-center gap-2.5 border-b border-border-subtle px-4">
      <Icon name="ph:layout-bold" class="text-sm text-brand" />
      <span class="text-[13px] font-semibold text-tx-primary">Footer</span>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-5">

      <!-- Style picker -->
      <div class="space-y-2">
        <p class="text-[9px] font-black tracking-[0.2em] text-tx-muted">Footer style</p>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="style in FOOTER_STYLES"
            :key="style.value"
            type="button"
            class="relative flex flex-col items-start overflow-hidden rounded-xl border-2 p-3 text-start transition-all"
            :class="store.footerStyle === style.value
              ? 'border-brand bg-brand/5'
              : 'border-border-default bg-bg-elevated hover:border-border-subtle'"
            @click="store.footerStyle = style.value"
          >
            <div class="mb-2.5 w-full overflow-hidden rounded-lg border border-border-subtle" :class="style.dark ? 'bg-neutral-900' : 'bg-neutral-50'">
              <component :is="style.sketch" />
            </div>
            <p class="text-[11px] font-bold" :class="store.footerStyle === style.value ? 'text-brand' : 'text-tx-primary'">
              {{ style.label }}
            </p>
            <p class="mt-0.5 text-[10px] text-tx-muted">{{ style.description }}</p>
            <div v-if="store.footerStyle === style.value" class="absolute end-2 top-2 flex size-4 items-center justify-center rounded-full bg-brand">
              <Icon name="ph:check-bold" class="text-[9px] text-white" />
            </div>
          </button>
        </div>
      </div>

      <!-- Tagline -->
      <div class="space-y-1.5">
        <p class="text-[9px] font-black tracking-[0.2em] text-tx-muted">Brand</p>
        <div>
          <label class="mb-1 block text-[11px] font-medium text-tx-secondary">Tagline</label>
          <input
            type="text"
            class="w-full rounded-lg border border-border-default bg-bg-elevated px-3 py-2 text-xs text-tx-primary focus:border-brand focus:outline-none"
            :value="store.footerTagline"
            placeholder="Short brand tagline…"
            @input="store.footerTagline = ($event.target as HTMLInputElement).value"
          />
        </div>
        <div class="mt-2">
          <label class="mb-1 block text-[11px] font-medium text-tx-secondary">Copyright text</label>
          <input
            type="text"
            class="w-full rounded-lg border border-border-default bg-bg-elevated px-3 py-2 text-xs text-tx-primary focus:border-brand focus:outline-none"
            :value="store.footerCopyright"
            placeholder="© 2025 My Store…"
            @input="store.footerCopyright = ($event.target as HTMLInputElement).value"
          />
        </div>
      </div>

      <!-- Social toggle -->
      <div class="space-y-1.5">
        <p class="text-[9px] font-black tracking-[0.2em] text-tx-muted">Social</p>
        <div class="flex items-center justify-between rounded-lg border border-border-default bg-bg-elevated px-3 py-2.5">
          <span class="text-xs text-tx-primary">Show social icons</span>
          <button
            type="button"
            class="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none"
            :class="store.footerShowSocial ? 'bg-brand' : 'bg-bg-overlay'"
            role="switch"
            :aria-checked="store.footerShowSocial"
            @click="store.footerShowSocial = !store.footerShowSocial"
          >
            <span
              class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition-transform"
              :class="store.footerShowSocial ? 'translate-x-4' : 'translate-x-0'"
            />
          </button>
        </div>
      </div>

      <!-- Columns -->
      <div class="space-y-1.5">
        <div class="flex items-center justify-between">
          <p class="text-[9px] font-black tracking-[0.2em] text-tx-muted">
            Link columns
            <span class="ms-1 rounded-full bg-bg-overlay px-1.5 py-0.5 text-tx-secondary">{{ store.footerColumns.length }}</span>
          </p>
          <button
            type="button"
            class="flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold text-brand hover:bg-brand/10"
            @click="store.addFooterColumn()"
          >
            <Icon name="ph:plus-bold" class="text-[9px]" />
            Add column
          </button>
        </div>

        <p v-if="store.footerColumns.length === 0" class="rounded-lg border border-dashed border-border-default px-4 py-6 text-center text-xs text-tx-muted">
          No columns yet
        </p>

        <div v-else class="space-y-3">
          <div
            v-for="(col, ci) in store.footerColumns"
            :key="ci"
            class="overflow-hidden rounded-xl border border-border-default bg-bg-elevated"
          >
            <!-- Column header -->
            <div class="flex items-center gap-2 border-b border-border-subtle px-3 py-2.5">
              <Icon name="ph:dots-six-vertical-bold" class="text-sm text-tx-muted" />
              <input
                type="text"
                class="min-w-0 flex-1 bg-transparent text-xs font-semibold text-tx-primary placeholder-tx-muted focus:outline-none"
                :value="col.title"
                placeholder="Column title"
                @input="store.updateFooterColumn(ci, ($event.target as HTMLInputElement).value)"
              />
              <button
                type="button"
                class="rounded-md p-1 text-tx-muted hover:bg-bg-overlay hover:text-red-400"
                title="Remove column"
                @click="store.removeFooterColumn(ci)"
              >
                <Icon name="ph:trash-bold" class="text-xs" />
              </button>
            </div>

            <!-- Links -->
            <div class="p-2.5">
              <div v-if="col.links.length === 0" class="py-2 text-center text-[10px] text-tx-muted">
                No links
              </div>
              <div v-else class="space-y-1.5 mb-2">
                <div
                  v-for="(link, li) in col.links"
                  :key="li"
                  class="flex items-center gap-1.5 rounded-lg bg-bg-base px-2 py-1.5"
                >
                  <div class="min-w-0 flex-1 space-y-1">
                    <input
                      type="text"
                      class="w-full bg-transparent text-[11px] font-medium text-tx-primary placeholder-tx-muted focus:outline-none"
                      :value="link.label"
                      placeholder="Label"
                      @input="store.updateFooterLink(ci, li, 'label', ($event.target as HTMLInputElement).value)"
                    />
                    <input
                      type="text"
                      class="w-full bg-transparent text-[10px] text-tx-muted placeholder-tx-muted focus:outline-none"
                      :value="link.href"
                      placeholder="/path"
                      @input="store.updateFooterLink(ci, li, 'href', ($event.target as HTMLInputElement).value)"
                    />
                  </div>
                  <button
                    type="button"
                    class="shrink-0 rounded p-1 text-tx-muted hover:text-red-400"
                    @click="store.removeFooterLink(ci, li)"
                  >
                    <Icon name="ph:x-bold" class="text-[10px]" />
                  </button>
                </div>
              </div>
              <button
                type="button"
                class="flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-border-default py-1.5 text-[10px] font-semibold text-tx-muted hover:border-brand hover:text-brand"
                @click="store.addFooterLink(ci)"
              >
                <Icon name="ph:plus-bold" class="text-[9px]" />
                Add link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const store = useBuilderStore()

const FOOTER_STYLES = [
  {
    value: 'columns' as const,
    label: 'Columns',
    description: 'Dark · multi-column links',
    dark: true,
    sketch: {
      template: `<div class="bg-neutral-900 px-2 py-2.5">
        <div class="flex justify-between">
          <div class="space-y-1">
            <div class="h-1.5 w-8 rounded bg-white/80" />
            <div class="h-1 w-12 rounded bg-neutral-600" />
          </div>
          <div class="flex gap-2">
            <div class="space-y-1">
              <div class="h-1 w-5 rounded bg-neutral-600" />
              <div class="h-1 w-7 rounded bg-neutral-700" />
              <div class="h-1 w-5 rounded bg-neutral-700" />
            </div>
            <div class="space-y-1">
              <div class="h-1 w-5 rounded bg-neutral-600" />
              <div class="h-1 w-7 rounded bg-neutral-700" />
              <div class="h-1 w-5 rounded bg-neutral-700" />
            </div>
          </div>
        </div>
      </div>`,
    },
  },
  {
    value: 'centered' as const,
    label: 'Centered',
    description: 'Light · all centered',
    dark: false,
    sketch: {
      template: `<div class="bg-neutral-50 px-2 py-2.5 text-center">
        <div class="mx-auto h-2 w-10 rounded bg-neutral-800" />
        <div class="mx-auto mt-1.5 h-1 w-16 rounded bg-neutral-300" />
        <div class="mx-auto mt-2 flex justify-center gap-1.5">
          <div class="h-1 w-5 rounded bg-neutral-300" />
          <div class="h-1 w-4 rounded bg-neutral-300" />
          <div class="h-1 w-5 rounded bg-neutral-300" />
        </div>
      </div>`,
    },
  },
  {
    value: 'newsletter' as const,
    label: 'Newsletter',
    description: 'Dark · email signup form',
    dark: true,
    sketch: {
      template: `<div class="bg-neutral-900 px-2 py-2.5">
        <div class="flex gap-2">
          <div class="flex-1 space-y-1">
            <div class="h-1.5 w-8 rounded bg-white/80" />
            <div class="flex gap-1">
              <div class="h-1 w-4 rounded bg-neutral-700" />
              <div class="h-1 w-4 rounded bg-neutral-700" />
              <div class="h-1 w-4 rounded bg-neutral-700" />
            </div>
          </div>
          <div class="w-16 rounded-lg border border-neutral-700 bg-neutral-800 p-1.5">
            <div class="h-1 w-full rounded bg-neutral-600" />
            <div class="mt-1.5 flex gap-1">
              <div class="h-2.5 flex-1 rounded bg-neutral-700" />
              <div class="h-2.5 w-5 rounded bg-indigo-600" />
            </div>
          </div>
        </div>
      </div>`,
    },
  },
  {
    value: 'minimal' as const,
    label: 'Minimal',
    description: 'Light · single bar',
    dark: false,
    sketch: {
      template: `<div class="flex items-center justify-between border-t border-neutral-200 bg-white px-2 py-1.5">
        <div class="h-1.5 w-8 rounded bg-neutral-800" />
        <div class="flex gap-1.5">
          <div class="h-1 w-5 rounded bg-neutral-300" />
          <div class="h-1 w-4 rounded bg-neutral-300" />
          <div class="h-1 w-5 rounded bg-neutral-300" />
        </div>
        <div class="h-1 w-12 rounded bg-neutral-200" />
      </div>`,
    },
  },
]
</script>
