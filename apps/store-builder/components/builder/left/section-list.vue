<template>
  <div class="min-h-0 flex-1 space-y-1 overflow-y-auto p-3">
    <!-- ── Page sections ── -->
    <div v-if="!isSystemPage">
      <div class="mb-1.5 flex items-center justify-between px-2">
        <p class="text-[9px] font-black tracking-[0.2em] text-tx-muted">
          Sections
        </p>
        <button
          v-if="store.clipboard.length"
          type="button"
          class="flex items-center gap-1 rounded-md border border-brand/30 bg-brand/10 px-2 py-0.5 text-[9px] font-bold text-brand transition-colors hover:bg-brand/20"
          title="Paste the copied section after the selected one (Ctrl+V)"
          @click="store.pasteSection()"
        >
          <Icon name="ph:clipboard-text-bold" /> Paste
        </button>
      </div>
      <VueDraggable
        v-model="orderedList"
        group="sections"
        handle=".sb-list-handle"
        :animation="150"
        ghost-class="sb-ghost"
        class="min-h-[40px] space-y-0.5"
      >
        <lazy-section-list-item
          v-for="s in orderedList"
          :key="s.id"
          :section="s"
        />
      </VueDraggable>
    </div>

    <!-- System page info (checkout / order confirmed) -->
    <div v-else class="mt-1">
      <p
        class="mb-1.5 px-2 text-[9px] font-black tracking-[0.2em] text-tx-muted"
      >
        Page
      </p>
      <div
        class="rounded-xl border border-border-default bg-bg-elevated p-3 text-center"
      >
        <Icon name="ph:lock-bold" class="text-xl text-tx-muted" />
        <p class="mt-1.5 text-[11px] font-semibold text-tx-secondary">
          System page
        </p>
        <p class="mt-1 text-[10px] text-tx-muted">
          Layout is managed automatically
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { VueDraggable } from "vue-draggable-plus";
import type { PageSection } from "@/types/sections";

const { t } = useI18n();
const store = useBuilderStore();

const isSystemPage = computed(
  () =>
    store.currentPage?.type === "checkout" ||
    store.currentPage?.type === "order_confirmed",
);

const orderedList = computed<PageSection[]>({
  get: () => [...store.sections].sort((a, b) => a.sort_order - b.sort_order),
  set: (next) => store.commitSections(next),
});
</script>