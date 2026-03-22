<template>
  <div class="overflow-x-auto hide-scrollbar" :class="wrapperClass">
    <table class="w-full text-start" :class="tableClass">
      <thead v-if="headers && headers.length" class="text-[9px] font-black text-gray-600 tracking-widest border-b border-white/5 bg-black/40">
        <tr>
          <th v-for="header in headers" :key="header.label" 
            :class="[
              'px-6 py-4',
              header.align === 'center' ? 'text-center' : header.align === 'end' ? 'text-end' : 'text-start',
              header.headerClass || ''
            ]">
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/[0.03]">
        <tr v-for="(item, index) in items" :key="item.id || index" 
          class="group hover:bg-white/[0.02] transition-colors"
          @click="$emit('row-click', item)">
          <td v-for="header in headers" :key="header.label"
            :class="[
              'px-6 py-4',
              header.align === 'center' ? 'text-center' : header.align === 'end' ? 'text-end' : 'text-start',
              header.class || ''
            ]">
            <slot :name="`cell(${header.key})`" :item="item" :index="index">
              {{ header.key ? item[header.key] : '' }}
            </slot>
          </td>
        </tr>
        <tr v-if="!items || items.length === 0">
          <td :colspan="headers.length" class="px-6 py-12 text-center">
            <div class="flex flex-col items-center gap-2 text-gray-600">
              <icon name="ph:folder-open-bold" class="text-3xl opacity-20" />
              <p class="text-xs font-bold tracking-widest uppercase">No data found</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import type { TableHeader } from '../types/v-table'

defineProps<{
  headers: TableHeader[]
  items: any[]
  wrapperClass?: string
  tableClass?: string
}>()

defineEmits(['row-click'])
</script>
