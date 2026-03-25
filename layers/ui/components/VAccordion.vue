<template>
  <div class="space-y-4">
    <div v-for="item in items" :key="String(item[itemKey || 'id'])" class="group">
      <!-- Accordion Header -->
      <button @click="toggle(item[itemKey || 'id'])"
        class="w-full bg-[#0c0c0e] border border-white/5 rounded-2xl p-6 flex items-center gap-6 transition-all hover:border-white/10 text-start"
        :class="[expandedItem === item[itemKey || 'id'] ? 'rounded-b-none border-b-indigo-500/30' : '', headerClass]">

        <slot name="header" :item="item" :isExpanded="expandedItem === item[itemKey || 'id']">
          <div class="flex-1">
            <h3 class="text-sm font-bold">{{ item.title || item.name || item.id }}</h3>
            <p v-if="item.description || item.desc" class="text-xs text-gray-500 mt-1 font-medium">{{ item.description
              || item.desc }}</p>
          </div>
        </slot>

        <div class="flex items-center gap-4 ms-auto shrink-0">
          <slot name="header-suffix" :item="item" :isExpanded="expandedItem === item[itemKey || 'id']"></slot>
          <Icon name="ph:caret-down-bold" class="text-gray-700 transition-transform duration-300 shrink-0"
            :class="expandedItem === item[itemKey || 'id'] ? 'rotate-180 text-indigo-500' : ''" />
        </div>
      </button>

      <!-- Accordion Content -->
      <div v-if="expandedItem === item[itemKey || 'id']"
        class="bg-[#0c0c0e] border-x border-b border-white/5 rounded-b-2xl p-8 space-y-8 animate-in slide-in-from-top-2 duration-300"
        :class="contentClass">
        <slot name="content" :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  items: any[]
  itemKey?: string
  modelValue?: string | number
  headerClass?: string
  contentClass?: string
}>()

const emit = defineEmits(['update:modelValue'])

const actualItemKey = props.itemKey || 'id'
const expandedItem = ref(props.modelValue || (props.items.length > 0 ? props.items[0][actualItemKey] : ''))

const toggle = (key: any) => {
  expandedItem.value = expandedItem.value === key ? '' : key
  emit('update:modelValue', expandedItem.value)
}

watch(() => props.modelValue, (newVal: string | number | undefined) => {
  if (newVal !== undefined) {
    expandedItem.value = newVal
  }
})
</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>