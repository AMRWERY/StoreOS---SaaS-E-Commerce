<template>
  <div
    aria-hidden="true"
    :class="bool('hide_mobile', false) ? 'hidden sm:block' : ''"
    :style="{ height: `${Math.max(0, num('height', 48))}px` }"
  />
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { num, bool } = useSectionData(() => props.section);
</script>
