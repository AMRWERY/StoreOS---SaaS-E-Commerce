<template>
  <div
    class="group relative cursor-pointer outline-none transition-opacity"
    :class="section.is_hidden ? 'opacity-[0.45]' : ''"
    role="button"
    tabindex="0"
    @click.stop="$emit('select')"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @keydown.enter.prevent="$emit('select')"
  >
    <lazy-section-overlay
      :selected="selected"
      :highlighted="!selected && isHovered"
    />

    <div
      v-show="selected || isHovered"
      class="sb-drag-handle absolute start-0 top-0 z-20 flex cursor-grab items-center gap-1 rounded-br-md bg-brand/90 px-2 py-0.5 text-[9px] font-bold tracking-widest text-white active:cursor-grabbing"
      title="Drag to reorder"
    >
      <Icon name="ph:dots-six-vertical-bold" class="text-[11px]" />
      {{ label }}
    </div>

    <lazy-floating-toolbar
      :visible="selected"
      placement="block"
      @action="$emit('toolbar-action', $event)"
    />

    <!-- The same renderer the published store uses — so editor and live site always match. -->
    <lazy-section-render :section="section" editing />
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";
import { SECTION_TYPE_LABELS } from "@/types/sections";

const props = defineProps<{
  section: PageSection;
  selected: boolean;
}>();

defineEmits<{
  select: [];
  "toolbar-action": [action: string];
}>();

const isHovered = ref(false);

const label = computed(
  () => SECTION_TYPE_LABELS[props.section.type] ?? props.section.type,
);
</script>