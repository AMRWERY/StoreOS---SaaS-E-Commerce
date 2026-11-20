<template>
  <Teleport to="body">
    <div
      v-if="templatePickerOpen"
      class="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="absolute inset-0 bg-black/65 backdrop-blur-sm"
        @click="templatePickerOpen = false"
      />
      <div
        class="relative flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl border border-border-subtle bg-bg-primary p-6 shadow-2xl"
      >
        <h2 class="text-lg font-bold tracking-wide text-tx-primary">
          Apply template
        </h2>
        <p class="mt-2 text-sm text-tx-secondary">
          Replace the current page structure with a curated layout. You can undo
          from history afterward.
        </p>
        <ul class="mt-5 min-h-0 flex-1 space-y-2 overflow-y-auto">
          <li
            v-for="tpl in templates"
            :key="tpl.id"
            class="flex cursor-pointer items-center justify-between rounded-lg border border-border-subtle bg-bg-elevated/50 px-4 py-3 transition-colors hover:border-brand/40 hover:bg-bg-elevated"
            @click="apply(tpl.id)"
          >
            <div class="flex min-w-0 items-center gap-3">
              <span
                class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-bg-overlay text-tx-secondary"
              >
                <Icon :name="tpl.icon" class="text-lg" />
              </span>
              <div class="min-w-0">
                <p class="text-[13px] font-semibold text-tx-primary">
                  {{ tpl.name }}
                </p>
                <p class="text-[11px] text-tx-muted">{{ tpl.description }}</p>
              </div>
            </div>
            <Icon name="ph:caret-right-bold" class="text-tx-muted" />
          </li>
        </ul>
        <LazyVButton
          variant="none"
          type="button"
          className="mt-6 w-full rounded-lg border border-border-subtle py-2.5 text-[11px] font-bold tracking-wider text-tx-secondary hover:bg-bg-elevated"
          @click="templatePickerOpen = false"
        >
          Close
        </LazyVButton>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { PAGE_TEMPLATES, buildTemplateSections } from "@/data/page-templates";

const { t } = useI18n();
const { templatePickerOpen } = useBuilderModals();

const store = useBuilderStore();

// Templates built for this page type first, then everything else.
const templates = computed(() => {
  const type = store.currentPage?.type;
  return [...PAGE_TEMPLATES].sort(
    (a, b) => Number(b.pageType === type) - Number(a.pageType === type),
  );
});

const apply = (id: string) => {
  const page = store.currentPage;
  if (!page) return;
  store.setSections(buildTemplateSections(id, page.id, page.store_id));
  templatePickerOpen.value = false;
};
</script>