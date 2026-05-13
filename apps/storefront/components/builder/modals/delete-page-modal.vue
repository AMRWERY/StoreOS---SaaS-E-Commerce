<template>
  <Teleport to="body">
    <div
      v-if="deletePageOpen"
      class="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="absolute inset-0 bg-black/65 backdrop-blur-sm"
        @click="deletePageOpen = false"
      />
      <div
        class="relative w-full max-w-md rounded-2xl border border-red-500/30 bg-bg-primary p-6 shadow-2xl"
      >
        <div class="flex gap-3">
          <div
            class="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-400"
          >
            <Icon name="ph:warning-bold" class="text-xl" />
          </div>
          <div>
            <h2 class="text-lg font-bold tracking-wide text-tx-primary">
              Delete page?
            </h2>
            <p class="mt-2 text-sm text-tx-secondary">
              <strong class="text-tx-primary">{{
                store.currentPage?.title
              }}</strong>
              and all its sections will be permanently removed. This cannot be
              undone.
            </p>
          </div>
        </div>

        <div class="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            class="rounded-lg bg-red-600 px-5 py-2.5 text-[11px] font-black tracking-wider text-white transition-colors hover:bg-red-500"
            @click="onDelete"
          >
            Delete page
          </button>
          <button
            type="button"
            class="rounded-lg border border-border-subtle px-5 py-2.5 text-[11px] font-bold text-tx-secondary hover:bg-bg-elevated"
            @click="deletePageOpen = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const store = useBuilderStore();

const { deletePageOpen } = useBuilderModals();
const localePath = useLocalePath();

const onDelete = async () => {
  const pageId = store.currentPageId;
  if (!pageId) return;

  const nextPage = store.deletePage(pageId);
  deletePageOpen.value = false;

  if (nextPage) {
    await navigateTo(localePath(`/dashboard/builder/${nextPage.slug}`));
  }
};
</script>