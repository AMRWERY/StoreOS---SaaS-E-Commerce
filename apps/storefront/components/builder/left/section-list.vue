<template>
  <div class="min-h-0 flex-1 space-y-1 overflow-y-auto p-3">

    <!-- ── Global elements (Navbar + Footer) ── -->
    <div class="mb-3">
      <p class="mb-1.5 px-2 text-[9px] font-black tracking-[0.2em] text-tx-muted">
        Global
      </p>
      <div class="space-y-0.5">
        <button type="button"
          class="flex w-full items-center gap-3 rounded-md border border-transparent px-2 py-2.5 text-start text-[12px] font-medium transition-all"
          :class="navbarActive
            ? 'border-border-subtle bg-bg-elevated text-brand'
            : 'text-tx-secondary hover:bg-bg-elevated/50'" @click="selectNavbar">
          <Icon name="ph:navigation-arrow-bold" class="text-[13px] transition-colors"
            :class="navbarActive ? 'text-brand' : 'text-tx-muted'" />
          <span class="min-w-0 flex-1 truncate">Navbar</span>
          <span class="shrink-0 rounded-full bg-bg-elevated px-1.5 py-0.5 text-[9px] font-bold text-tx-muted">
            {{ store.navLinks.length }}
          </span>
        </button>

        <button type="button"
          class="flex w-full items-center gap-3 rounded-md border border-transparent px-2 py-2.5 text-start text-[12px] font-medium transition-all"
          :class="footerActive
            ? 'border-border-subtle bg-bg-elevated text-brand'
            : 'text-tx-secondary hover:bg-bg-elevated/50'" @click="selectFooter">
          <Icon name="ph:layout-bold" class="text-[13px] transition-colors"
            :class="footerActive ? 'text-brand' : 'text-tx-muted'" />
          <span class="min-w-0 flex-1 truncate">Footer</span>
          <span class="shrink-0 rounded-full bg-bg-elevated px-1.5 py-0.5 text-[9px] font-bold text-tx-muted">
            {{ store.footerColumns.length }}
          </span>
        </button>
      </div>
    </div>

    <!-- ── Page sections ── -->
    <div v-if="!isSystemPage">
      <p class="mb-1.5 px-2 text-[9px] font-black tracking-[0.2em] text-tx-muted">
        Sections
      </p>
      <div class="space-y-0.5">
        <section-list-item v-for="s in ordered" :key="s.id" :section="s" />
      </div>
    </div>

    <!-- System page info (checkout / order confirmed) -->
    <div v-else class="mt-1">
      <p class="mb-1.5 px-2 text-[9px] font-black tracking-[0.2em] text-tx-muted">
        Page
      </p>
      <div class="rounded-xl border border-border-default bg-bg-elevated p-3 text-center">
        <Icon name="ph:lock-bold" class="text-xl text-tx-muted" />
        <p class="mt-1.5 text-[11px] font-semibold text-tx-secondary">System page</p>
        <p class="mt-1 text-[10px] text-tx-muted">Layout is managed automatically</p>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const store = useBuilderStore()

const isSystemPage = computed(() =>
  store.currentPage?.type === 'checkout' || store.currentPage?.type === 'order_confirmed',
)

const navbarActive = computed(() => store.panelMode === 'navbar-settings')
const footerActive = computed(() => store.panelMode === 'footer-settings')

const ordered = computed(() =>
  [...store.sections].sort((a, b) => a.sort_order - b.sort_order),
)

function selectNavbar() {
  store.selectedId = null
  store.setPanelMode('navbar-settings')
}

function selectFooter() {
  store.selectedId = null
  store.setPanelMode('footer-settings')
}
</script>