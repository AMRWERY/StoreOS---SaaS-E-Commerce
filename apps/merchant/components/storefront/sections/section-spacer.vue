<template>
  <div :style="{ height: `${num('height', 48)}px` }" />
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()

const num = (key: string, fallback: number) => Number(props.section.settings[key] ?? fallback)
</script>