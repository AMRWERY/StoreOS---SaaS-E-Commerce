<template>
  <header class="pb-12 px-6 lg:px-12 border-b border-[#1C1C30]">
    <div class="max-w-[1400px] mx-auto space-y-6">
      <VBreadcrumb :items="breadcrumbItems"
        class="[&_nav]:text-[10px] [&_nav]:text-[#50506A] [&_nav]:mb-0 [&_a]:hover:text-[#6366F1]" />

      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div class="space-y-2">
          <h1 class="text-5xl lg:text-6xl font-bold tracking-tighter">Collections</h1>
          <p class="text-[15px] text-[#50506A] font-bold tracking-widest flex items-center gap-3">
            Catalog Directory <span class="w-8 h-px bg-[#1C1C30]" />
            <span class="text-[#6366F1]">{{ sectorCount }} Active Sectors</span>
          </p>
        </div>

        <div class="flex gap-4">
          <component :is="VButton" variant="none" type="button"
            className="bg-[#0D0D18] border border-[#1C1C30] px-5 py-3 rounded-[10px] text-[11px] font-bold tracking-widest text-[#8888AA] hover:text-[#F0F0FF] hover:border-[#6366F1] transition-all flex items-center gap-2">
            <Icon name="ph:arrows-down-up" class="w-4 h-4" />
            Sort: Default
          </component>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '../../../../layers/ui/types/v-breadcrumb'

defineProps<{
  breadcrumbItems: BreadcrumbItem[]
  sectorCount: number
}>()

const VButton = resolveComponent('VButton')
</script>