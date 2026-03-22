<template>
  <div class="overflow-x-auto hide-scrollbar">
    <div class="flex items-center border-b border-white/5 gap-8 min-w-max">
      <button v-for="tab in tabs" :key="getValue(tab)" 
        @click="$emit('update:modelValue', getValue(tab))"
        :class="[
          'pb-4 text-xs font-bold tracking-widest transition-colors relative whitespace-nowrap outline-none',
          modelValue === getValue(tab) ? 'text-white' : 'text-gray-500 hover:text-gray-300'
        ]">
        {{ getLabel(tab) }}
        
        <span v-if="getCount(tab) !== undefined && getCount(tab) !== null"
          :class="[getBadgeClass(tab) || 'bg-white/10 text-gray-400', 'ms-2 text-[10px] px-2 py-0.5 rounded-full']">
          {{ getCount(tab) }}
        </span>
        
        <div v-if="modelValue === getValue(tab)" class="absolute bottom-0 start-0 w-full h-0.5 bg-indigo-500"></div>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface TabInput {
  name: string
  value?: string
  count?: number
  badgeClass?: string
}

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
