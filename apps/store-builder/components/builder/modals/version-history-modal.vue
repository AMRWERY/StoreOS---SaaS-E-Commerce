<template>
  <Teleport to="body">
    <div
      v-if="versionsOpen"
      class="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="versions-title"
      @keydown.esc="versionsOpen = false"
    >
      <div class="absolute inset-0 bg-black/65 backdrop-blur-sm" @click="versionsOpen = false" />

      <div class="relative flex max-h-[85vh] w-full max-w-xl flex-col rounded-2xl border border-border-subtle bg-bg-primary shadow-2xl">
        <header class="shrink-0 border-b border-border-subtle p-5">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 id="versions-title" class="text-lg font-bold tracking-wide text-tx-primary">Version history</h2>
              <p class="mt-1 text-sm text-tx-secondary">
                Every publish is saved automatically. Restore any version — your current design is kept first, so you can always go back.
              </p>
            </div>
            <button
              type="button"
              class="rounded-lg border border-border-subtle p-2 text-tx-muted transition-colors hover:bg-bg-elevated hover:text-tx-primary"
              aria-label="Close"
              @click="versionsOpen = false"
            >
              <Icon name="ph:x-bold" class="text-xl" />
            </button>
          </div>

          <form class="mt-4 flex gap-2" @submit.prevent="saveNow">
            <input
              v-model="label"
              type="text"
              maxlength="60"
              placeholder="Name this version (optional), e.g. “Before sale”"
              class="min-w-0 flex-1 rounded-lg border border-border-subtle bg-bg-base px-3 py-2 text-[12px] text-tx-primary outline-none placeholder:text-tx-muted focus:border-brand"
            />
            <button
              type="submit"
              class="flex shrink-0 items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-[11px] font-black tracking-wider text-white transition-colors hover:bg-brand/90 disabled:opacity-60"
              :disabled="saving"
            >
              <Icon :name="saving ? 'ph:spinner-gap-bold' : 'ph:floppy-disk-bold'" :class="saving ? 'animate-spin' : ''" />
              Save version
            </button>
          </form>
        </header>

        <div class="min-h-0 flex-1 overflow-y-auto p-5">
          <p v-if="notice" class="mb-3 rounded-lg bg-emerald-500/10 px-3 py-2 text-[12px] text-emerald-400">{{ notice }}</p>

          <div v-if="!store.versions.length" class="flex flex-col items-center gap-2 py-10 text-center">
            <Icon name="ph:clock-counter-clockwise-bold" class="text-4xl text-tx-muted" />
            <p class="text-sm font-semibold text-tx-secondary">No versions yet</p>
            <p class="text-[12px] text-tx-muted">Publish your store or press “Save version” to create the first one.</p>
          </div>

          <ul v-else class="space-y-2">
            <li
              v-for="v in store.versions"
              :key="v.id"
              class="rounded-xl border border-border-subtle bg-bg-elevated/40 p-3"
            >
              <div class="flex items-start gap-3">
                <span
                  class="mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[9px] font-black tracking-wider"
                  :class="kindClass[v.kind]"
                >{{ kindLabel[v.kind] }}</span>
                <div class="min-w-0 flex-1">
                  <input
                    :value="v.label"
                    maxlength="60"
                    class="w-full truncate rounded bg-transparent px-1 py-0.5 text-[13px] font-semibold text-tx-primary outline-none focus:bg-bg-base"
                    :aria-label="`Rename ${v.label}`"
                    @change="store.renameVersion(v.id, ($event.target as HTMLInputElement).value)"
                  />
                  <p class="px-1 font-mono text-[10px] text-tx-muted">
                    {{ formatDate(v.createdAt) }} · {{ v.pages }} pages · {{ v.sections }} blocks
                  </p>
                </div>
              </div>

              <div class="mt-2.5 flex items-center justify-end gap-2">
                <template v-if="confirming === v.id">
                  <span class="text-[11px] text-tx-secondary">Replace the current design?</span>
                  <button type="button" class="rounded-md bg-brand px-3 py-1.5 text-[11px] font-black text-white hover:bg-brand/90" @click="restore(v.id)">Yes, restore</button>
                  <button type="button" class="rounded-md border border-border-subtle px-3 py-1.5 text-[11px] font-bold text-tx-secondary hover:bg-bg-elevated" @click="confirming = null">Cancel</button>
                </template>
                <template v-else>
                  <button type="button" class="flex items-center gap-1 rounded-md border border-border-subtle px-3 py-1.5 text-[11px] font-bold text-tx-secondary transition-colors hover:border-brand/40 hover:text-brand" @click="confirming = v.id">
                    <Icon name="ph:arrow-counter-clockwise-bold" /> Restore
                  </button>
                  <button type="button" class="rounded-md p-1.5 text-tx-muted transition-colors hover:text-red-400" title="Delete version" @click="store.deleteVersion(v.id)">
                    <Icon name="ph:trash-bold" />
                  </button>
                </template>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import type { VersionMeta } from "@/types/builder";

const store = useBuilderStore();
const { versionsOpen } = useBuilderModals();

const label = ref("");
const saving = ref(false);
const confirming = ref<string | null>(null);
const notice = ref("");

watch(versionsOpen, (open) => {
  if (!open) return;
  confirming.value = null;
  notice.value = "";
  void store.loadVersions();
});

const kindLabel: Record<VersionMeta["kind"], string> = { publish: "PUBLISHED", manual: "SAVED", auto: "AUTO" };
const kindClass: Record<VersionMeta["kind"], string> = {
  publish: "bg-emerald-500/10 text-emerald-400",
  manual: "bg-brand/15 text-brand",
  auto: "bg-bg-overlay text-tx-muted",
};

const formatDate = (ts: number) => new Date(ts).toLocaleString();

const saveNow = async () => {
  saving.value = true;
  await store.saveVersion(label.value.trim() || `Saved ${new Date().toLocaleString()}`, "manual");
  label.value = "";
  saving.value = false;
  notice.value = "Version saved.";
};

const restore = async (id: string) => {
  const ok = await store.restoreVersion(id);
  confirming.value = null;
  if (ok) versionsOpen.value = false;
  else notice.value = "That version could not be loaded.";
};
</script>
