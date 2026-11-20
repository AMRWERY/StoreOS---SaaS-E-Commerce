<template>
  <div
    class="flex min-h-0 min-w-0 flex-col rounded-xl border border-border-subtle bg-[var(--builder-preview-bg,#0a0a12)] p-4 shadow-inner md:p-6 xl:h-full"
  >
    <p class="mb-3 text-[9px] font-medium tracking-[0.35em] text-tx-muted">
      Preview
    </p>

    <div class="min-h-0 flex-1 overflow-auto rounded-lg">
      <lazy-preview-frame :device="store.device">
        <div
          class="flex h-full min-h-[520px] flex-col overflow-hidden rounded-t-xl bg-white"
        >
          <!-- Browser chrome -->
          <div
            class="flex shrink-0 items-center gap-3 border-b border-neutral-200/90 bg-neutral-100/95 px-3 py-2.5"
          >
            <div class="flex gap-1.5 ps-1">
              <span class="size-2.5 rounded-full bg-[#ff5f57]" />
              <span class="size-2.5 rounded-full bg-[#febc2e]" />
              <span class="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div
              class="mx-auto flex max-w-md flex-1 items-center justify-center rounded-md bg-white/90 px-3 py-1.5 text-center text-[11px] text-neutral-400 shadow-sm ring-1 ring-neutral-200/80"
            >
              <span class="truncate"
                >mystore.storeos.io/{{
                  store.currentPage?.slug ?? "home"
                }}</span
              >
            </div>
            <div class="w-14 shrink-0" aria-hidden="true" />
          </div>

          <!-- admin content -->
          <div
            class="relative min-h-0 flex-1 overflow-y-auto bg-white text-neutral-900"
          >
            <!-- ── Checkout page ───────────────────────────────────── -->
            <lazy-checkout-preview
              v-if="store.currentPage?.type === 'checkout'"
            />

            <!-- ── Order confirmed page ───────────────────────────── -->
            <lazy-order-summary-preview
              v-else-if="store.currentPage?.type === 'order_confirmed'"
            />

            <!-- ── Regular page ───────────────────────────────────── -->
            <template v-else>
              <!-- Persistent Navbar -->
              <lazy-navbar-preview
                :selected="navbarSelected"
                @select="selectNavbar"
              />

              <!-- Sections (drop zone: reorder + blocks dragged from the library) -->
              <div class="relative">
                <VueDraggable
                  v-model="sectionList"
                  group="sections"
                  handle=".sb-drag-handle"
                  :animation="180"
                  ghost-class="sb-ghost"
                  chosen-class="sb-chosen"
                  class="min-h-[160px]"
                >
                  <lazy-section-preview-block
                    v-for="section in sectionList"
                    :key="section.id"
                    :section="section"
                    :selected="store.selectedId === section.id"
                    @select="store.selectSection(section.id)"
                    @toolbar-action="onToolbar($event, section.id)"
                  />
                </VueDraggable>

                <div
                  v-if="store.sections.length === 0"
                  class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
                >
                  <Icon
                    name="ph:squares-four-bold"
                    class="text-4xl text-neutral-300"
                  />
                  <p class="mt-3 text-sm text-neutral-400">No sections yet</p>
                  <p class="text-xs text-neutral-300">
                    Drag a block here from the left panel
                  </p>
                </div>
              </div>

              <!-- Persistent Footer -->
              <lazy-footer-preview
                :selected="footerSelected"
                @select="selectFooter"
              />
            </template>
          </div>
        </div>
      </lazy-preview-frame>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { VueDraggable } from "vue-draggable-plus";
import type { PageSection } from "@/types/sections";

const { t } = useI18n();
const store = useBuilderStore();

/** Drag & drop writes straight back to the store as one undoable step. */
const sectionList = computed<PageSection[]>({
  get: () => store.sections,
  set: (next) => store.commitSections(next),
});

const navbarSelected = computed(() => store.panelMode === "navbar-settings");
const footerSelected = computed(() => store.panelMode === "footer-settings");

const selectNavbar = () => {
  store.selectedId = null;
  store.setPanelMode("navbar-settings");
};

const selectFooter = () => {
  store.selectedId = null;
  store.setPanelMode("footer-settings");
};

const onToolbar = (action: string, sectionId: string) => {
  switch (action) {
    case "up":
      store.moveSection(sectionId, "up");
      break;
    case "down":
      store.moveSection(sectionId, "down");
      break;
    case "dup":
      store.duplicateSection(sectionId);
      break;
    case "hide":
      store.toggleSectionHidden(sectionId);
      break;
    case "del":
      store.removeSection(sectionId);
      break;
  }
};
</script>

<style>
.sb-ghost {
  opacity: 0.45;
  outline: 2px dashed rgb(99 102 241);
  outline-offset: -2px;
  background: rgb(99 102 241 / 0.08);
}
.sb-chosen {
  cursor: grabbing;
}
</style>
