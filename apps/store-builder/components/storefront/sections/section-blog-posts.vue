<template>
  <div class="px-8 py-14">
    <div class="mx-auto max-w-6xl">
      <div :class="variant === 'cards' ? 'text-center' : 'text-start'">
        <h2 v-if="str('heading')" class="text-2xl font-bold text-neutral-900">
          {{ str("heading") }}
        </h2>
        <p v-if="str('subheading')" class="mt-2 text-sm text-neutral-500">
          {{ str("subheading") }}
        </p>
      </div>

      <div class="mt-10" :class="wrapClass">
        <article
          v-for="(post, i) in posts"
          :key="i"
          class="flex overflow-hidden border border-neutral-200 bg-white"
          :class="articleClass(i)"
        >
          <div :class="imageClass(i)">
            <img
              :src="post.image || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]"
              :alt="post.title"
              class="size-full object-cover"
            />
          </div>
          <div class="flex flex-1 flex-col p-5">
            <span
              v-if="bool('show_category', true) && post.category"
              class="w-fit rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-600"
            >
              {{ post.category }}
            </span>
            <h3 class="mt-3 font-bold text-neutral-900" :class="isLead(i) ? 'text-xl' : 'text-base'">
              {{ post.title }}
            </h3>
            <p class="mt-1.5 flex-1 text-sm leading-relaxed text-neutral-500">
              {{ post.excerpt }}
            </p>
            <div v-if="meta(post)" class="mt-4 text-xs text-neutral-400">
              {{ meta(post) }}
            </div>
            <a
              :href="post.url || '#'"
              class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600"
            >
              {{ str("read_more_label", "Read more") }}
              <Icon name="ph:arrow-right-bold" class="text-xs rtl:rotate-180" />
            </a>
          </div>
        </article>
      </div>

      <div v-if="str('view_all_label') && str('view_all_url')" class="mt-10 text-center">
        <a
          :href="str('view_all_url')"
          class="inline-flex items-center rounded-xl border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-900"
        >
          {{ str("view_all_label") }}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";
import { DEMO_POSTS } from "@/data/demo-catalog";

const props = defineProps<{ section: PageSection }>();
const { str, num, bool, list } = useSectionData(() => props.section);

const FALLBACK_IMAGES = ["/img/collection-01.png", "/img/collection-02.png", "/img/collection-04.png"];

const variant = computed(() => str("variant", "cards"));

const posts = computed<Record<string, any>[]>(() => {
  const custom = list("posts");
  return bool("use_custom") && custom.length ? custom : DEMO_POSTS;
});

const gridClass = computed(
  () =>
    ({
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    })[num("columns", 3)] ?? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
);

const isLead = (i: number) => variant.value === "featured" && i === 0;

const wrapClass = computed(() => {
  if (variant.value === "list") return "flex flex-col gap-4";
  if (variant.value === "featured") return "grid gap-6 lg:grid-cols-2";
  return `grid gap-6 ${gridClass.value}`;
});

const articleClass = (i: number) => {
  if (variant.value === "list") return "flex-col rounded-2xl sm:flex-row";
  if (isLead(i)) return "flex-col rounded-2xl lg:row-span-2";
  if (variant.value === "featured") return "flex-col rounded-2xl sm:flex-row";
  return "flex-col rounded-2xl";
};

const imageClass = (i: number) => {
  if (variant.value === "list" || (variant.value === "featured" && !isLead(i)))
    return "aspect-[16/10] shrink-0 bg-neutral-100 sm:aspect-auto sm:w-48";
  return isLead(i) ? "aspect-[16/10] bg-neutral-100 lg:aspect-[4/3]" : "aspect-[16/10] bg-neutral-100";
};

const meta = (post: Record<string, any>) =>
  [
    bool("show_author", true) ? post.author : "",
    bool("show_date", true) ? post.date : "",
  ]
    .filter(Boolean)
    .join(" · ");
</script>
