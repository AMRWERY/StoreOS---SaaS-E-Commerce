<template>
  <div>
    <!-- Full-bleed -->
    <div
      v-if="variant === 'fullbleed'"
      class="relative min-h-[380px] overflow-hidden bg-neutral-900 md:min-h-[460px]"
    >
      <img :src="posterImage" alt="" class="absolute inset-0 size-full object-cover" />
      <div v-if="embedSrc" class="absolute inset-0 overflow-hidden" style="container-type: size">
        <iframe
          :src="embedSrc"
          :title="headline || 'Video'"
          class="absolute inset-0 m-auto border-0"
          :class="bgMode && !bool('show_controls') ? 'pointer-events-none' : ''"
          style="width: max(100cqw, 177.78cqh); height: max(100cqh, 56.25cqw)"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowfullscreen
          referrerpolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div class="pointer-events-none absolute inset-0 bg-black/45" />
      <button
        v-if="embedUrl && !embedSrc"
        type="button"
        aria-label="Play video"
        class="absolute inset-0 z-10 m-auto flex size-20 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur transition hover:bg-white/40"
        @click="playing = true"
      >
        <Icon name="ph:play-fill" class="text-4xl" />
      </button>
      <div
        class="pointer-events-none relative z-10 flex min-h-[380px] flex-col items-center justify-center px-6 py-14 text-center md:min-h-[460px]"
      >
        <h2 v-if="headline" class="max-w-3xl text-3xl font-bold text-white md:text-5xl">
          {{ headline }}
        </h2>
        <p v-if="subheadline" class="mt-3 max-w-xl text-sm text-white/80 md:text-base">
          {{ subheadline }}
        </p>
        <p v-if="!embedUrl && !headline && !subheadline" class="text-sm text-white/70">
          Add a YouTube or Vimeo URL in the settings panel.
        </p>
        <a
          v-if="ctaText"
          :href="ctaUrl"
          class="pointer-events-auto mt-8 rounded-md bg-white px-8 py-3 text-xs font-bold tracking-[0.2em] text-neutral-900 shadow-lg transition hover:bg-neutral-100"
        >
          {{ ctaText }}
        </a>
      </div>
    </div>

    <!-- Framed -->
    <div v-else-if="variant === 'framed'" class="bg-neutral-900 px-6 py-12 md:px-12 md:py-16">
      <div class="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <h2 v-if="headline" class="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {{ headline }}
          </h2>
          <p v-if="subheadline" class="mt-4 text-neutral-400">{{ subheadline }}</p>
          <p v-if="!embedUrl && !headline && !subheadline" class="text-neutral-400">
            Add a YouTube or Vimeo URL in the settings panel.
          </p>
          <a
            v-if="ctaText"
            :href="ctaUrl"
            class="mt-7 inline-block rounded-md bg-white px-7 py-3 text-xs font-bold tracking-wider text-neutral-900 transition hover:bg-neutral-100"
          >
            {{ ctaText }}
          </a>
        </div>
        <div class="relative aspect-video overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800">
          <img v-if="!embedSrc" :src="posterImage" alt="" class="absolute inset-0 size-full object-cover" />
          <iframe
            v-if="embedSrc"
            :src="embedSrc"
            :title="headline || 'Video'"
            class="absolute inset-0 size-full border-0"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowfullscreen
            referrerpolicy="strict-origin-when-cross-origin"
          />
          <button
            v-else-if="embedUrl"
            type="button"
            aria-label="Play video"
            class="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-lg transition hover:bg-white"
            @click="playing = true"
          >
            <Icon name="ph:play-fill" class="text-3xl" />
          </button>
          <Icon
            v-else
            name="ph:play-circle-fill"
            class="absolute inset-0 m-auto text-6xl text-white/30"
          />
        </div>
      </div>
    </div>

    <!-- Poster (click to play) -->
    <div v-else class="relative aspect-[4/3] overflow-hidden bg-neutral-900 sm:aspect-video md:max-h-[560px]">
      <img :src="posterImage" alt="" class="absolute inset-0 size-full object-cover" />
      <iframe
        v-if="playing && embedSrc"
        :src="embedSrc"
        :title="headline || 'Video'"
        class="absolute inset-0 size-full border-0"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"
      />
      <template v-else>
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <button
          v-if="embedUrl"
          type="button"
          aria-label="Play video"
          class="absolute inset-0 m-auto flex size-20 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-lg transition hover:scale-105 hover:bg-white"
          @click="playing = true"
        >
          <Icon name="ph:play-fill" class="text-4xl" />
        </button>
        <Icon v-else name="ph:play-circle-fill" class="absolute inset-0 m-auto text-8xl text-white/25" />
        <div class="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <h2 v-if="headline" class="text-2xl font-bold text-white md:text-4xl">
            {{ headline }}
          </h2>
          <p v-if="subheadline" class="mt-2 max-w-xl text-sm text-white/80">
            {{ subheadline }}
          </p>
          <p v-if="!embedUrl && !headline && !subheadline" class="text-sm text-white/70">
            Add a YouTube or Vimeo URL in the settings panel.
          </p>
          <a
            v-if="ctaText"
            :href="ctaUrl"
            class="mt-5 inline-block rounded-md bg-white px-7 py-2.5 text-xs font-bold tracking-wider text-neutral-900 transition hover:bg-neutral-100"
          >
            {{ ctaText }}
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, bool } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "fullbleed"));
const headline = computed(() => str("headline"));
const subheadline = computed(() => str("subheadline"));
const ctaText = computed(() => str("cta_text"));
const ctaUrl = computed(() => str("cta_url") || "#");

interface ParsedVideo {
  kind: "youtube" | "vimeo";
  id: string;
  hash?: string;
}

// Only https YouTube / Vimeo URLs are accepted; the embed URL is rebuilt from the id.
const parseVideo = (raw: string): ParsedVideo | null => {
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
    return /^[\w-]{6,20}$/.test(id) ? { kind: "youtube", id } : null;
  }
  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    let id = "";
    if (u.pathname === "/watch") id = u.searchParams.get("v") ?? "";
    else if ((m = u.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?]+)/)))
      id = m[1]!;
    return /^[\w-]{6,20}$/.test(id) ? { kind: "youtube", id } : null;
  }
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    m = u.pathname.match(/\/(?:video\/)?(\d{5,12})(?:\/([\w]+))?/);
    if (!m) return null;
    const hash = u.searchParams.get("h") || m[2] || "";
    return { kind: "vimeo", id: m[1]!, hash: /^\w+$/.test(hash) ? hash : "" };
  }
  return null;
};

const video = computed(() => parseVideo(str("video_url")));
const embedUrl = computed(() => !!video.value);

const playing = ref(false);
// Autoplay (muted background) applies to the full-bleed and framed designs.
const bgMode = computed(
  () => !playing.value && bool("autoplay", true) && variant.value !== "poster",
);
const shouldEmbed = computed(() => playing.value || bgMode.value);

const embedSrc = computed(() => {
  const v = video.value;
  if (!v || !shouldEmbed.value) return "";
  const controls = bgMode.value ? (bool("show_controls", false) ? 1 : 0) : 1;
  const q = new URLSearchParams();
  if (v.kind === "youtube") {
    q.set("autoplay", "1");
    q.set("playsinline", "1");
    q.set("rel", "0");
    q.set("controls", String(controls));
    if (bgMode.value) {
      q.set("mute", "1");
      q.set("loop", "1");
      q.set("playlist", v.id);
    }
    return `https://www.youtube-nocookie.com/embed/${v.id}?${q}`;
  }
  q.set("autoplay", "1");
  if (v.hash) q.set("h", v.hash);
  if (bgMode.value) {
    q.set("muted", "1");
    q.set("loop", "1");
    if (controls) q.set("controls", "1");
    else q.set("background", "1");
  }
  return `https://player.vimeo.com/video/${v.id}?${q}`;
});

const posterImage = computed(() => {
  const p = str("poster_url");
  if (p) return p;
  const v = video.value;
  if (v?.kind === "youtube") return `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
  return "/img/marketing-hero.png";
});
</script>
