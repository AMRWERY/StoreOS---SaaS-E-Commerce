<template>
  <div>
    <div class="overflow-x-auto hide-scrollbar">
      <div class="flex items-center border-b border-border-subtle gap-8 min-w-max">
        <button v-for="tab in tabs" :key="getValue(tab)" @click="$emit('update:modelValue', getValue(tab))" :class="[
          'pb-4 text-xs font-bold tracking-widest transition-colors relative whitespace-nowrap outline-none',
          modelValue === getValue(tab) ? 'text-tx-primary' : 'text-tx-secondary hover:text-tx-primary'
        ]">
          {{ getLabel(tab) }}

          <span v-if="getCount(tab) !== undefined && getCount(tab) !== null"
            :class="[getBadgeClass(tab) || 'bg-bg-elevated text-tx-secondary', 'ms-2 text-[10px] px-2 py-0.5 rounded-full']">
            {{ getCount(tab) }}
          </span>

          <div v-if="modelValue === getValue(tab)" class="absolute bottom-0 start-0 w-full h-0.5 bg-brand"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TabInput } from '../types/v-tabs';

defineProps<{
  tabs: (string | TabInput)[]
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const getLabel = (tab: string | TabInput) => typeof tab === 'string' ? tab : tab.name
const getValue = (tab: string | TabInput) => typeof tab === 'string' ? tab : (tab.value || tab.name)
const getCount = (tab: string | TabInput) => typeof tab === 'string' ? undefined : tab.count
const getBadgeClass = (tab: string | TabInput) => typeof tab === 'string' ? undefined : tab.badgeClass
</script>
