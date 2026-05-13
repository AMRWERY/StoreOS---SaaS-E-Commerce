<template>
  <component
    :is="UiButton"
    variant="none"
    type="button"
    :class-name="rowClass"
    @click="onSelect"
  >
    <Icon
      name="ph:dots-six-vertical-bold"
      class="text-tx-muted opacity-0 transition-opacity group-hover:opacity-100"
    />
    <span class="min-w-0 flex-1 truncate text-[12px] font-medium">{{
      label
    }}</span>
    <Icon
      v-if="section.is_hidden"
      name="ph:eye-slash-bold"
      class="text-tx-muted"
    />
    <Icon
      v-else
      name="ph:eye-bold"
      class="text-brand opacity-0 transition-opacity group-hover:opacity-100"
    />
  </component>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";
import { SECTION_TYPE_LABELS } from "@/types/sections";

const { t } = useI18n();
const store = useBuilderStore();

const props = defineProps<{
  section: PageSection;
}>();

const UiButton = resolveComponent("VButton");

const label = computed(() => SECTION_TYPE_LABELS[props.section.type]);

const selected = computed(() => store.selectedId === props.section.id);

const rowClass = computed(() => {
  const base =
    "group flex w-full cursor-pointer items-center gap-3 rounded-md border border-transparent px-2 py-2.5 text-start transition-all justify-start ";
  return (
    base +
    (selected.value
      ? "border-border-subtle bg-bg-elevated text-tx-primary"
      : "text-tx-secondary hover:bg-bg-elevated/50")
  );
});

const onSelect = () => {
  store.selectSection(props.section.id);
};
</script>