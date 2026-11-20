<template>
  <div class="flex shrink-0 items-center gap-1.5">
    <button
      type="button"
      class="flex size-8 items-center justify-center rounded-md border border-border-subtle text-tx-secondary transition-colors hover:bg-bg-elevated hover:text-tx-primary"
      title="Version history"
      aria-label="Version history"
      @click="versionsOpen = true"
    >
      <Icon name="ph:clock-counter-clockwise-bold" class="text-base" />
    </button>

    <tour-launcher />

    <button
      type="button"
      data-tour="preview-btn"
      class="flex items-center gap-1.5 rounded-md border border-border-subtle px-2.5 py-1.5 text-[11px] font-semibold text-tx-secondary transition-colors hover:bg-bg-elevated hover:text-tx-primary disabled:opacity-60"
      title="Open your full store in a new tab"
      :disabled="opening"
      @click="openPreview"
    >
      <Icon :name="opening ? 'ph:spinner-gap-bold' : 'ph:arrow-square-out-bold'" :class="opening ? 'animate-spin' : ''" class="size-4 shrink-0" />
      <span class="hidden whitespace-nowrap 2xl:inline">Preview store</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
const store = useBuilderStore();
const { versionsOpen } = useBuilderModals();
const localePath = useLocalePath();

const opening = ref(false);

/** Opens the full multi-page store (all pages, working links, cart) without publishing. */
const openPreview = async () => {
  // Open the tab synchronously so popup blockers allow it, then point it at the preview.
  const tab = window.open("about:blank", "_blank");
  opening.value = true;
  await store.preparePreview();
  const slug = store.currentPage?.slug ?? "home";
  const url = `${localePath("/builder/preview")}?page=${encodeURIComponent(slug)}`;
  if (tab) tab.location.href = url;
  else window.open(url, "_blank");
  opening.value = false;
};
</script>
