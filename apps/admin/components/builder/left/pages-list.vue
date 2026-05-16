<template>
  <div class="shrink-0 border-b border-border-subtle bg-bg-base/40">
    <!-- Page list -->
    <div class="max-h-[180px] overflow-y-auto p-2">
      <p
        class="mb-1.5 px-2 text-[9px] font-black tracking-[0.2em] text-tx-muted"
      >
        Pages
      </p>
      <button
        v-for="page in store.pages"
        :key="page.id"
        type="button"
        class="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-start transition-colors"
        :class="
          page.id === store.currentPageId
            ? 'bg-brand/10 text-brand'
            : 'text-tx-secondary hover:bg-bg-elevated hover:text-tx-primary'
        "
        @click="onSelectPage(page)"
      >
        <Icon
          :name="pageTypeIcon(page.type)"
          class="shrink-0 text-[13px]"
          :class="
            page.id === store.currentPageId ? 'text-brand' : 'text-tx-muted'
          "
        />
        <span class="min-w-0 flex-1 truncate text-[11px] font-semibold">{{
          page.title
        }}</span>
        <span
          v-if="page.id === store.currentPageId"
          class="shrink-0 size-1.5 rounded-full bg-brand"
        />
        <Icon
          v-if="page.is_published"
          name="ph:globe-bold"
          class="shrink-0 text-[10px] text-tx-muted"
          title="Published"
        />
      </button>

      <div
        v-if="store.pages.length === 0"
        class="px-2 py-3 text-[11px] text-tx-muted"
      >
        No pages yet
      </div>
    </div>

    <!-- Action buttons -->
    <div class="flex flex-wrap gap-1.5 p-2.5 pt-1">
      <button
        type="button"
        class="rounded-md border border-border-subtle bg-bg-elevated px-2 py-1.5 text-[9px] font-black tracking-wider text-tx-secondary transition-colors hover:border-brand/40 hover:text-brand"
        title="Page settings"
        @click="store.setPanelMode('page-settings')"
      >
        Settings
      </button>
      <button
        type="button"
        class="rounded-md border border-brand/30 bg-brand/10 px-2 py-1.5 text-[9px] font-black tracking-wider text-brand transition-colors hover:bg-brand/20"
        title="Create new page"
        @click="createPageOpen = true"
      >
        + New
      </button>
      <button
        type="button"
        class="rounded-md border border-border-subtle bg-bg-elevated px-2 py-1.5 text-[9px] font-black tracking-wider text-tx-secondary transition-colors hover:border-brand/40 hover:text-brand"
        title="Apply a template"
        @click="templatePickerOpen = true"
      >
        Template
      </button>
      <button
        v-if="
          store.pages.length > 1 &&
          store.currentPage &&
          !store.currentPage.is_system
        "
        type="button"
        class="rounded-md border border-red-500/30 bg-bg-elevated px-2 py-1.5 text-[9px] font-black tracking-wider text-red-400/90 transition-colors hover:bg-red-500/10"
        title="Delete current page"
        @click="deletePageOpen = true"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { StorePage, StorePageType } from "@/types/sections";

const { t } = useI18n();
const store = useBuilderStore();

const { createPageOpen, deletePageOpen, templatePickerOpen } =
  useBuilderModals();
const localePath = useLocalePath();

const onSelectPage = async (page: StorePage) => {
  store.switchPage(page.id);
  await navigateTo(localePath(`/dashboard/builder/${page.slug}`));
};

const pageTypeIcon = (type: StorePageType): string => {
  const map: Partial<Record<StorePageType, string>> = {
    home: "ph:house-bold",
    product: "ph:tag-bold",
    category: "ph:squares-four-bold",
    cart: "ph:shopping-cart-bold",
    checkout: "ph:credit-card-bold",
    page: "ph:file-text-bold",
    search: "ph:magnifying-glass-bold",
  };
  return map[type] ?? "ph:file-text-bold";
};
</script>