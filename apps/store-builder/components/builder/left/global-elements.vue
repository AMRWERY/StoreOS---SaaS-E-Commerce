<template>
  <div class="shrink-0 border-b border-border-subtle p-2">
    <p class="mb-1.5 px-2 text-[9px] font-black tracking-[0.2em] text-tx-muted">
      Global
    </p>
    <div class="grid grid-cols-2 gap-1">
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        class="flex min-w-0 items-center gap-2 rounded-md border px-2.5 py-2 text-start text-[11px] font-semibold transition-all"
        :class="
          item.active
            ? 'border-border-subtle bg-bg-elevated text-brand'
            : 'border-transparent text-tx-secondary hover:bg-bg-elevated/50'
        "
        @click="item.select"
      >
        <Icon
          :name="item.icon"
          class="shrink-0 text-[13px]"
          :class="item.active ? 'text-brand' : 'text-tx-muted'"
        />
        <span class="min-w-0 flex-1 truncate">{{ item.label }}</span>
        <span
          class="shrink-0 rounded-full bg-bg-overlay px-1.5 py-0.5 font-mono text-[9px] font-bold text-tx-muted"
        >
          {{ item.count }}
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const store = useBuilderStore();

const select = (mode: "navbar-settings" | "footer-settings") => {
  store.selectedId = null;
  store.setPanelMode(mode);
};

const items = computed(() => [
  {
    id: "navbar",
    label: "Navbar",
    icon: "ph:navigation-arrow-bold",
    count: store.navLinks.length,
    active: store.panelMode === "navbar-settings",
    select: () => select("navbar-settings"),
  },
  {
    id: "footer",
    label: "Footer",
    icon: "ph:layout-bold",
    count: store.footerColumns.length,
    active: store.panelMode === "footer-settings",
    select: () => select("footer-settings"),
  },
]);
</script>
