<template>
  <div class="px-4 py-10 sm:px-8 sm:py-14" :class="alignClass">
    <div
      class="mx-auto"
      :class="
        variant === 'card'
          ? 'rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-10'
          : ''
      "
      :style="{ maxWidth: variant === 'columns' ? (str('max_width') || '64rem') : (str('max_width') || '42rem') }"
    >
      <h2 v-if="heading" class="text-2xl font-bold text-neutral-900">
        {{ heading }}
      </h2>
      <div
        class="mt-4 text-[15px] leading-relaxed text-neutral-600"
        :class="variant === 'columns' ? 'gap-8 md:columns-2' : ''"
      >
        <p
          v-for="(para, i) in paragraphs"
          :key="i"
          class="whitespace-pre-line"
          :class="[i > 0 ? 'mt-4' : '', variant === 'columns' ? 'break-inside-avoid-column' : '']"
        >
          {{ para }}
        </p>
      </div>
      <a
        v-if="str('cta_text')"
        :href="str('cta_url', '#')"
        class="mt-6 inline-flex rounded-md bg-neutral-900 px-6 py-2.5 text-sm font-bold text-white hover:bg-neutral-800"
      >
        {{ str("cta_text") }}
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "plain"));
const heading = computed(() => str("heading", str("headline")));

const alignClass = computed(() => {
  const a = str("align", "start");
  if (a === "center") return "text-center";
  if (a === "end" || a === "right") return "text-end";
  return "text-start";
});

const paragraphs = computed(() =>
  str("body", "Start writing your content here.")
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean),
);
</script>
