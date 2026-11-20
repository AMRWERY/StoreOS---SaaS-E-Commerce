<template>
  <div>
    <!-- Standard / Wide -->
    <div v-if="variant !== 'poster'" :class="variant === 'wide' ? 'py-8' : 'px-6 py-12 md:px-8'">
      <h2
        v-if="title"
        class="mb-4 px-6 text-center text-xl font-bold text-neutral-900 md:px-8"
      >
        {{ title }}
      </h2>
      <div
        class="relative mx-auto overflow-hidden bg-neutral-900"
        :class="[ratioClass, variant === 'wide' ? 'w-full' : 'max-w-3xl rounded-xl']"
      >
        <iframe
          v-if="src"
          :src="src"
          :title="title || 'Video'"
          class="absolute inset-0 size-full border-0"
          :loading="bool('lazy_load', true) ? 'lazy' : 'eager'"
          allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
          allowfullscreen
          referrerpolicy="strict-origin-when-cross-origin"
        />
        <div
          v-else
          class="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center"
        >
          <Icon name="ph:play-circle-fill" class="text-6xl text-white/30" />
          <p class="text-xs text-neutral-400">
            Add a YouTube or Vimeo link (https) in the settings panel.
          </p>
        </div>
      </div>
      <p v-if="caption" class="mx-auto mt-3 max-w-3xl px-6 text-center text-sm text-neutral-500">
        {{ caption }}
      </p>
    </div>

    <!-- Poster -->
    <div v-else class="px-6 py-12 md:px-8">
      <div class="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-5 md:gap-12">
        <div class="md:col-span-3">
          <div class="relative overflow-hidden rounded-2xl bg-neutral-900" :class="ratioClass">
            <iframe
              v-if="playing && src"
              :src="src"
              :title="title || 'Video'"
              class="absolute inset-0 size-full border-0"
              allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowfullscreen
              referrerpolicy="strict-origin-when-cross-origin"
            />
            <template v-else>
              <img :src="thumbnail" alt="" class="absolute inset-0 size-full object-cover" loading="lazy" />
              <div class="absolute inset-0 bg-black/30" />
              <button
                v-if="src"
                type="button"
                aria-label="Play video"
                class="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-lg transition hover:scale-105 hover:bg-white"
                @click="playing = true"
              >
                <Icon name="ph:play-fill" class="text-3xl" />
              </button>
              <p
                v-else
                class="absolute inset-x-0 bottom-3 text-center text-xs text-white/80"
              >
                Add a YouTube or Vimeo link (https) in the settings panel.
              </p>
            </template>
          </div>
        </div>
        <div class="md:col-span-2">
          <h2 class="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
            {{ title || "Watch the story" }}
          </h2>
          <p v-if="caption" class="mt-3 text-[15px] leading-relaxed text-neutral-500">
            {{ caption }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, bool } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "standard"));
const title = computed(() => str("title"));
const caption = computed(() => str("caption"));
const playing = ref(false);

const ratioClass = computed(
  () =>
    ({ "4:3": "aspect-[4/3]", "1:1": "aspect-square" })[str("ratio", "16:9")] ??
    "aspect-video",
);

// Only https YouTube / Vimeo URLs are accepted; the embed URL is rebuilt from the id.
const video = computed(() => {
  const raw = str("embed_url") || str("url");
  let u: URL;
  try {
    u = new URL(raw.trim());
  } catch {
    return null;
  }
  if (u.protocol !== "https:") return null;
  const host = u.hostname.replace(/^(www|m)\./, "");
  let m: RegExpMatchArray | null;
  if (host === "youtu.be") {
    const id = u.pathname.slice(1).split("/")[0] ?? "";
    return /^[\w-]{6,20}$/.test(id) ? { kind: "youtube", id, hash: "" } : null;
  }
  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    let id = "";
    if (u.pathname === "/watch") id = u.searchParams.get("v") ?? "";
    else if ((m = u.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?]+)/)))
      id = m[1]!;
    return /^[\w-]{6,20}$/.test(id) ? { kind: "youtube", id, hash: "" } : null;
  }
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    m = u.pathname.match(/\/(?:video\/)?(\d{5,12})(?:\/([\w]+))?/);
    if (!m) return null;
    const hash = u.searchParams.get("h") || m[2] || "";
    return { kind: "vimeo", id: m[1]!, hash: /^\w+$/.test(hash) ? hash : "" };
  }
  return null;
});

const src = computed(() => {
  const v = video.value;
  if (!v) return "";
  const autoplay = variant.value === "poster" && playing.value ? "autoplay=1&" : "";
  if (v.kind === "youtube")
    return `https://www.youtube-nocookie.com/embed/${v.id}?${autoplay}rel=0`;
  return `https://player.vimeo.com/video/${v.id}?${autoplay}${v.hash ? `h=${v.hash}` : ""}`;
});

const thumbnail = computed(() =>
  video.value?.kind === "youtube"
    ? `https://i.ytimg.com/vi/${video.value.id}/hqdefault.jpg`
    : "/img/marketing-hero.png",
);
</script>
