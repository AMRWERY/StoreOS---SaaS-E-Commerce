<template>
  <nav :class="variant === 'bar' ? 'border-y border-neutral-200 bg-neutral-50 px-8 py-3' : 'px-8 py-4'" aria-label="Breadcrumb">
    <ol class="mx-auto flex max-w-5xl flex-wrap items-center text-sm" :class="[alignClass, variant === 'pills' ? 'gap-1.5' : 'gap-2']">
      <template v-for="(c, i) in crumbs" :key="i">
        <li v-if="i > 0" class="text-neutral-300" aria-hidden="true">
          {{ str("separator", "/") }}
        </li>
        <li>
          <span
            v-if="i === crumbs.length - 1"
            :class="[variant === 'pills' ? 'rounded-full bg-neutral-100 px-3 py-1' : '', 'text-neutral-400']"
            aria-current="page"
          >
            {{ c.label }}
          </span>
          <a
            v-else
            :href="c.url || '#'"
            :class="
              variant === 'pills'
                ? 'rounded-full border border-neutral-200 bg-white px-3 py-1 text-neutral-700 hover:border-indigo-600 hover:text-indigo-600'
                : variant === 'bar'
                  ? 'font-medium text-neutral-700 hover:text-indigo-600'
                  : 'text-neutral-600 hover:text-indigo-600'
            "
            @click.prevent
          >
            {{ c.label }}
          </a>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, bool, list } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "plain"));
const crumbs = computed(() => {
  const items = list<{ label: string; url: string }>("items");
  return bool("show_home", true)
    ? [{ label: str("home_label", "Home"), url: str("home_url", "/") }, ...items]
    : items;
});

const alignClass = computed(
  () =>
    ({ start: "justify-start", center: "justify-center", end: "justify-end" })[str("align", "start")] ??
    "justify-start",
);
</script>
