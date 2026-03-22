<template>
  <div>
    <div class="mb-8 overflow-x-auto hide-scrollbar">
      <div class="flex items-center border-b border-white/5 gap-8 min-w-max">
        <VButton v-for="tab in tabs" :key="tab.name" @click="$emit('update:activeTab', tab.name)"
          variant="none"
          className="pb-4 text-xs font-bold tracking-widest transition-all relative whitespace-nowrap"
          :class="activeTab === tab.name ? 'text-white' : 'text-gray-500 hover:text-gray-300'">
          {{ tab.name }}
          <span v-if="tab.count !== null && tab.count !== undefined"
            :class="[tab.name === 'New' ? 'bg-orange-600 text-white' : 'bg-white/10 text-gray-400', 'ms-2 text-[9px] px-1.5 py-0.5 rounded-full']">
            {{ tab.count }}
          </span>
          <div v-if="activeTab === tab.name" class="absolute bottom-0 start-0 w-full h-0.5 bg-indigo-500"></div>
        </VButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  activeTab: string;
  tabs: Array<{ name: string; count: number | null }>;
}>();

defineEmits(['update:activeTab']);
</script>