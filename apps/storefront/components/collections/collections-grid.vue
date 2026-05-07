<template>
  <div class="py-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div v-for="c in collections" :key="c.id" class="h-full min-h-0">
        <collections-card :collection="c" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
import type { StorefrontCollection } from '@/types/collections'

defineProps<{ collections: StorefrontCollection[] }>()
</script>