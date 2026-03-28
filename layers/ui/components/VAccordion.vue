<template>
  <div class="space-y-4">
    <div v-for="item in items" :key="String(item[itemKey || 'id'])" class="group">
      <!-- Accordion Header -->
      <button @click="toggle(item[itemKey || 'id'])"
        class="w-full bg-bg-primary border border-border-subtle rounded-xl px-4 py-3.5 flex items-center gap-6 transition-all hover:border-border-default text-start"
        :class="[expandedItem === item[itemKey || 'id'] ? 'rounded-b-none border-b-brand/30' : '', headerClass]">

        <slot name="header" :item="item" :isExpanded="expandedItem === item[itemKey || 'id']">
          <div class="flex-1">
            <h3 class="text-sm font-bold">{{ item.title || item.name || item.id }}</h3>
            <p v-if="item.description || item.desc" class="text-xs text-tx-secondary mt-1 font-medium">{{ item.description
              || item.desc }}</p>
          </div>
        </slot>

        <div class="flex items-center gap-4 ms-auto shrink-0">
          <slot name="header-suffix" :item="item" :isExpanded="expandedItem === item[itemKey || 'id']"></slot>
          <Icon name="ph:caret-down-bold" class="text-tx-muted transition-transform duration-300 shrink-0"
            :class="expandedItem === item[itemKey || 'id'] ? 'rotate-180 text-brand' : ''" />
        </div>
      </button>

      <!-- Accordion Content -->
      <div v-if="expandedItem === item[itemKey || 'id']"
        class="bg-bg-primary border-x border-b border-border-subtle rounded-b-xl p-5 space-y-8 animate-in slide-in-from-top-2 duration-300"
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
