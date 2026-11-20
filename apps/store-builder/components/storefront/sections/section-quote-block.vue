<template>
  <div class="px-8 py-14">
    <figure
      class="mx-auto max-w-3xl"
      :class="[
        center ? 'text-center' : 'text-start',
        style === 'boxed' ? 'rounded-2xl border border-neutral-200 bg-neutral-50 p-8 sm:p-10' : '',
        style === 'bar' ? 'border-s-4 border-indigo-600 ps-6 sm:ps-8' : '',
      ]"
    >
      <Icon
        v-if="bool('show_icon', true)"
        name="ph:quotes-fill"
        class="mb-4 text-4xl text-indigo-600"
      />
      <blockquote class="text-xl font-semibold leading-relaxed text-neutral-900 sm:text-2xl">
        {{ str("quote") }}
      </blockquote>
      <figcaption
        class="mt-6 flex items-center gap-3"
        :class="center ? 'justify-center' : 'justify-start'"
      >
        <img
          v-if="bool('show_avatar', true) && str('avatar')"
          :src="str('avatar')"
          :alt="str('author')"
          class="size-11 rounded-full object-cover"
        />
        <div class="text-start">
          <div v-if="str('author')" class="text-sm font-bold text-neutral-900">
            {{ str("author") }}
          </div>
          <div v-if="str('role')" class="text-xs text-neutral-500">
            {{ str("role") }}
          </div>
        </div>
      </figcaption>
    </figure>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, bool } = useSectionData(() => props.section);

const center = computed(() => str("align", "center") === "center");
const style = computed(() => str("variant", "plain"));
</script>
