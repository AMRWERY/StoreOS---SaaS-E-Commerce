<template>
  <div>
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="modelValue" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          @click.self="close">
          <div class="absolute inset-0 bg-bg-overlay backdrop-blur-sm transition-opacity" @click="close"></div>
          <div
            class="relative bg-bg-primary border border-border-subtle shadow-2xl rounded-xl w-full flex flex-col overflow-hidden transition-all transform z-10"
            :class="maxWidthClass">
            <!-- Header-less mode: floating close button only -->
            <button v-if="hideHeader && !hideClose" @click="close" aria-label="Close"
              class="absolute top-3 end-3 z-20 text-tx-secondary hover:text-tx-primary transition-colors p-1.5 rounded-lg bg-bg-primary/70 hover:bg-bg-elevated backdrop-blur">
              <Icon name="ph:x-bold" class="w-4 h-4" />
            </button>

            <!-- Header -->
            <div v-if="!hideHeader" class="flex items-center justify-between px-6 py-5"
              :class="hideHeaderBorder ? '' : 'border-b border-border-subtle'">
              <h3 class="text-xs font-black tracking-widest text-tx-primary"
                :class="hideClose ? 'w-full text-center' : ''">
                <slot name="title">{{ title }}</slot>
              </h3>
              <button v-if="!hideClose" @click="close"
                class="text-tx-secondary hover:text-tx-primary transition-colors p-1.5 rounded-lg hover:bg-bg-elevated">
                <Icon name="ph:x-bold" class="w-4 h-4" />
              </button>
            </div>

            <!-- Body -->
            <div :class="flush ? '' : 'p-6 overflow-y-auto max-h-[calc(100vh-200px)] hide-scrollbar'">
              <slot></slot>
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer"
              class="px-6 py-5 border-t border-border-subtle bg-bg-overlay flex items-center justify-end gap-3">
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
  /** Hide the header's X button (the dialog can still be dismissed via the backdrop). */
  hideClose?: boolean;
  /** Drop the divider line under the header. */
  hideHeaderBorder?: boolean;
  /** Remove the title bar entirely; a floating close button is shown instead (unless hideClose). */
  hideHeader?: boolean;
  /** Edge-to-edge body: no padding or scroll, so media fills the dialog. */
  flush?: boolean;
}>(), {
  hideHeader: false,
  flush: false,
  title: 'Modal',
  maxWidth: 'md',
  hideClose: false,
  hideHeaderBorder: false,
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
