<template>
  <div>
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="modelValue" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          @click.self="close">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="close"></div>
          <div
            class="relative bg-[#0c0c0e] border border-white/5 shadow-2xl rounded-3xl w-full flex flex-col overflow-hidden transition-all transform z-10"
            :class="maxWidthClass">
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <h3 class="text-xs font-black tracking-widest text-gray-300">
                <slot name="title">{{ title }}</slot>
              </h3>
              <button @click="close"
                class="text-gray-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
                <Icon name="ph:x-bold" class="w-4 h-4" />
              </button>
            </div>

            <!-- Body -->
            <div class="p-6 overflow-y-auto max-h-[calc(100vh-200px)] hide-scrollbar">
              <slot></slot>
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer"
              class="px-6 py-5 border-t border-white/5 bg-black/20 flex items-center justify-end gap-3">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  modelValue: boolean;
  title?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
}>(), {
  title: 'Modal',
  maxWidth: 'md'
});

const emit = defineEmits(['update:modelValue', 'close']);

const close = () => {
  emit('update:modelValue', false);
  emit('close');
};

const maxWidthClass = computed(() => {
  const map: Record<string, string> = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
  };
  return map[props.maxWidth] || 'max-w-md';
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative {
  transform: scale(0.95) translateY(10px);
}

.modal-leave-to .relative {
  transform: scale(0.95) translateY(10px);
}
</style>