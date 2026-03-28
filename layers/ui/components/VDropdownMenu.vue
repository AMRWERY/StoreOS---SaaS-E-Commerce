<template>
  <div class="relative inline-block text-start">
    <!-- Trigger Slot -->
    <div @click="toggle" class="cursor-pointer">
      <slot name="trigger" :open="isOpen" />
    </div>

    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="isOpen" 
        :class="[
          align === 'end' ? 'end-0' : 'start-0',
          widthClass,
          'absolute top-full mt-2 bg-bg-primary border border-border-default rounded-xl shadow-2xl p-2 z-[60] backdrop-blur-xl shrink-0'
        ]">
        <slot :close="close" />
      </div>
    </transition>

    <!-- Backdrop for click-away -->
    <div v-if="isOpen" @click="close" class="fixed inset-0 z-[55] bg-transparent"></div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  align: {
    type: String,
    default: 'end',
    validator: (value: string) => ['start', 'end'].includes(value)
  },
  width: {
    type: String,
    default: 'w-48'
  }
})

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const widthClass = computed(() => props.width)

defineExpose({
  open: () => (isOpen.value = true),
  close
})
</script>
