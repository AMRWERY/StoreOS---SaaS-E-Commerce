<template>
  <div>
    <div v-if="isVisible" :class="[
      'p-4 rounded-xl flex items-center justify-between',
      variants[variant]?.wrapper
    ]">
      <div class="flex items-center gap-3">
        <Icon v-if="icon" :name="icon" :class="['text-xl shrink-0', variants[variant]?.icon]" />
        <div class="text-sm font-medium">
          <slot />
        </div>
      </div>
      <button v-if="dismissible" @click="close"
        class="text-[10px] font-black tracking-widest text-gray-500 hover:text-white transition-colors shrink-0 ms-4">
        Dismiss
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'warning'
  },
  icon: {
    type: String,
    default: 'ph:warning-bold'
  },
  dismissible: {
    type: Boolean,
    default: true
  }
})

const isVisible = ref(true)
const emit = defineEmits(['dismiss'])

const close = () => {
  isVisible.value = false
  emit('dismiss')
}

const variants: Record<string, any> = {
  warning: {
    wrapper: 'bg-orange-500/10 border border-orange-500/20 text-[#e1e1e1]',
    icon: 'text-orange-500',
  },
  error: {
    wrapper: 'bg-red-500/10 border border-red-500/20 text-red-50',
    icon: 'text-red-500',
  },
  success: {
    wrapper: 'bg-emerald-500/10 border border-emerald-500/20 text-[#e1e1e1]',
    icon: 'text-emerald-500',
  },
  info: {
    wrapper: 'bg-indigo-500/10 border border-indigo-500/20 text-[#e1e1e1]',
    icon: 'text-indigo-400',
  }
}
</script>