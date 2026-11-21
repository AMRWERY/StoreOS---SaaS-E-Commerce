<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[210] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="media-title"
      @keydown.esc="close"
    >
      <div
        class="absolute inset-0 bg-black/65 backdrop-blur-sm"
        @click="close"
      />

      <div
        class="relative flex h-[min(88vh,760px)] w-full max-w-4xl flex-col rounded-2xl border border-border-subtle bg-bg-primary shadow-2xl"
      >
        <header
          class="flex shrink-0 items-start justify-between gap-4 border-b border-border-subtle p-5"
        >
          <div class="min-w-0">
            <h2
              id="media-title"
              class="text-lg font-bold tracking-wide text-tx-primary"
            >
              {{ picking ? "Choose an image" : "Media library" }}
            </h2>
            <p class="mt-1 text-sm text-tx-secondary">
              <span class="font-mono">{{ store.media.length }}</span> images ·
              <span class="font-mono">{{ totalSize }}</span
              >. Upload once, reuse anywhere on your site.
            </p>
          </div>
          <button
            type="button"
            class="rounded-lg border border-border-subtle p-2 text-tx-muted transition-colors hover:bg-bg-elevated hover:text-tx-primary"
            aria-label="Close"
            @click="close"
          >
            <Icon name="ph:x-bold" class="text-xl" />
          </button>
        </header>

        <div
          class="flex shrink-0 flex-wrap items-center gap-2 border-b border-border-subtle p-4"
        >
          <button
            type="button"
            class="flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-[11px] font-black tracking-wider text-white transition-colors hover:bg-brand/90 disabled:opacity-60"
            :disabled="busy"
            @click="fileInput?.click()"
          >
            <Icon
              :name="busy ? 'ph:spinner-gap-bold' : 'ph:upload-simple-bold'"
              :class="busy ? 'animate-spin' : ''"
            />
            Upload images
          </button>
          <form
            class="flex min-w-0 flex-1 items-center gap-1.5"
            @submit.prevent="addUrl"
          >
            <input
              v-model="urlInput"
              type="url"
              placeholder="…or paste an image URL"
              class="min-w-0 flex-1 rounded-lg border border-border-subtle bg-bg-base px-3 py-2 text-[12px] text-tx-primary outline-none placeholder:text-tx-muted focus:border-brand"
            />
            <button
              type="submit"
              class="rounded-lg border border-border-subtle px-3 py-2 text-[11px] font-bold text-tx-secondary transition-colors hover:border-brand/40 hover:text-brand disabled:opacity-40"
              :disabled="!urlInput.trim()"
            >
              Add
            </button>
          </form>
          <div class="relative min-w-[160px]">
            <Icon
              name="ph:magnifying-glass-bold"
              class="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-tx-muted"
            />
            <input
              v-model="query"
              type="search"
              placeholder="Search…"
              class="w-full rounded-lg border border-border-subtle bg-bg-base py-2 ps-9 pe-3 text-[12px] text-tx-primary outline-none placeholder:text-tx-muted focus:border-brand"
            />
          </div>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            multiple
            class="hidden"
            @change="onFiles"
          />
        </div>

        <p
          v-if="error"
          class="shrink-0 border-b border-border-subtle bg-red-500/10 px-5 py-2 text-[11px] text-red-400"
        >
          {{ error }}
        </p>

        <div class="min-h-0 flex-1 overflow-y-auto p-5">
          <div
            v-if="!filtered.length"
            class="flex h-full flex-col items-center justify-center gap-2 text-center"
          >
            <Icon name="ph:images-bold" class="text-4xl text-tx-muted" />
            <p class="text-sm font-semibold text-tx-secondary">
              {{
                store.media.length
                  ? "No images match your search."
                  : "No images yet."
              }}
            </p>
            <p v-if="!store.media.length" class="text-[12px] text-tx-muted">
              Upload photos of your products, banners and logo — they will show
              up here.
            </p>
          </div>

          <ul
            v-else
            class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          >
            <li
              v-for="item in filtered"
              :key="item.id"
              class="group relative overflow-hidden rounded-xl border bg-bg-elevated/40 transition-colors"
              :class="
                selected === item.id
                  ? 'border-brand ring-2 ring-brand/40'
                  : 'border-border-subtle hover:border-border-default'
              "
            >
              <button
                type="button"
                class="block aspect-square w-full overflow-hidden bg-bg-base"
                :title="
                  picking ? 'Click to select · double-click to use' : item.name
                "
                @click="selected = item.id"
                @dblclick="picking && choose(item.url)"
              >
                <img
                  :src="item.url"
                  :alt="item.name"
                  loading="lazy"
                  class="size-full object-cover"
                />
              </button>
              <div class="flex items-center gap-1 p-2">
                <input
                  :value="item.name"
                  class="min-w-0 flex-1 truncate rounded bg-transparent px-1 py-0.5 text-[11px] font-medium text-tx-primary outline-none focus:bg-bg-base"
                  :aria-label="`Rename ${item.name}`"
                  @change="
                    store.renameMedia(
                      item.id,
                      ($event.target as HTMLInputElement).value,
                    )
                  "
                />
                <button
                  type="button"
                  class="rounded p-1 text-tx-muted opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100 focus:opacity-100"
                  title="Delete image"
                  @click="store.removeMedia(item.id)"
                >
                  <Icon name="ph:trash-bold" class="text-sm" />
                </button>
              </div>
              <p class="px-3 pb-2 font-mono text-[10px] text-tx-muted">
                {{ formatSize(item.size) }}
              </p>
            </li>
          </ul>
        </div>

        <footer
          v-if="picking"
          class="flex shrink-0 items-center justify-end gap-3 border-t border-border-subtle p-4"
        >
          <button
            type="button"
            class="rounded-lg border border-border-subtle px-5 py-2.5 text-[11px] font-bold tracking-wider text-tx-secondary hover:bg-bg-elevated"
            @click="close"
          >
            Cancel
          </button>
          <button
            type="button"
            class="rounded-lg bg-brand px-5 py-2.5 text-[11px] font-black tracking-wider text-white transition-colors hover:bg-brand/90 disabled:opacity-40"
            :disabled="!selectedItem"
            @click="selectedItem && choose(selectedItem.url)"
          >
            Use this image
          </button>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
const store = useBuilderStore();
const { open, picking, finish } = useMediaLibrary();
const { toDataUrl, busy } = useImageUpload();

const query = ref("");
const urlInput = ref("");
const selected = ref<string | null>(null);
const error = ref("");
const fileInput = ref<HTMLInputElement | null>(null);

watch(open, (isOpen) => {
  if (!isOpen) return;
  query.value = "";
  selected.value = null;
  error.value = "";
});

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return q
    ? store.media.filter((m) => m.name.toLowerCase().includes(q))
    : store.media;
});

const selectedItem = computed(
  () => store.media.find((m) => m.id === selected.value) ?? null,
);

const formatSize = (bytes: number) =>
  bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

const totalSize = computed(() =>
  formatSize(store.media.reduce((n, m) => n + m.size, 0)),
);

const onFiles = async (e: Event) => {
  const input = e.target as HTMLInputElement;
  const files = [...(input.files ?? [])];
  input.value = "";
  error.value = "";
  const added: { name: string; url: string; size: number }[] = [];
  for (const file of files) {
    const url = await toDataUrl(file);
    if (url)
      added.push({
        name: file.name.replace(/\.[^.]+$/, ""),
        url,
        size: Math.round(url.length * 0.75),
      });
    else error.value = `Could not add “${file.name}”. Use an image under 8 MB.`;
  }
  if (added.length) {
    const items = store.addMedia(added);
    selected.value = items[0]?.id ?? null;
  }
};

const addUrl = () => {
  const url = urlInput.value.trim();
  if (!/^https?:\/\//i.test(url) && !url.startsWith("/")) {
    error.value = "Image URLs must start with https:// (or /).";
    return;
  }
  error.value = "";
  const name = decodeURIComponent(
    url.split("/").pop()?.split("?")[0] || "image",
  );
  const [item] = store.addMedia([{ name, url, size: 0 }]);
  selected.value = item?.id ?? null;
  urlInput.value = "";
};

const choose = (url: string) => finish(url);
const close = () => finish(null);
</script>