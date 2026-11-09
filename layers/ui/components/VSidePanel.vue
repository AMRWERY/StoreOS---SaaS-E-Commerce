<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="overlay-backdrop z-[90]"
        aria-hidden="true"
        @click="close"
      ></div>
    </Transition>

    <!-- Panel -->
    <!-- Always docked to the physical right edge and slides in from the right,
         in both LTR and RTL (hence right-0 / translate-x-full, not end-0). -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-in-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in-out"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <aside
        v-if="modelValue"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        :class="[
          'fixed inset-y-0 right-0 z-[100] w-full bg-bg-primary border-l border-border-default shadow-2xl flex flex-col',
          widthClass,
        ]"
      >
        <!-- Header -->
        <div
          class="px-4 py-3.5 border-b border-border-subtle flex justify-between items-center gap-3 bg-bg-base"
        >
          <div class="min-w-0">
            <h2
              :id="titleId"
              class="text-xl font-bold text-tx-primary tracking-tight truncate"
            >
              <slot name="title">{{ title }}</slot>
            </h2>
            <p
              v-if="subtitle || $slots.subtitle"
              class="text-[10px] text-tx-muted font-bold tracking-widest mt-1"
            >
              <slot name="subtitle">{{ subtitle }}</slot>
            </p>
          </div>
          <LazyVButton
            variant="none"
            className="text-tx-muted hover:text-tx-primary transition-colors shrink-0"
            :aria-label="t('common.close')"
            @click="close"
          >
            <Icon name="ph:x-bold" class="text-xl" />
          </LazyVButton>
        </div>

        <!-- Body -->
        <div class="flex-1 px-4 py-3.5 overflow-y-auto hide-scrollbar">
          <slot />
        </div>

        <!-- Footer -->
        <div
          v-if="$slots.footer"
          class="px-4 py-3.5 border-t border-border-subtle bg-bg-primary flex flex-col gap-4"
        >
          <slot name="footer" />
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title?: string;
    subtitle?: string;
    width?: "sm" | "md" | "lg";
  }>(),
  { width: "md" },
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  close: [];
}>();

const { t } = useI18n();
const titleId = useId();

const WIDTH_CLASSES = {
  sm: "max-w-[380px]",
  md: "max-w-[460px]",
  lg: "max-w-[560px]",
} as const;

const widthClass = computed(
  () => WIDTH_CLASSES[props.width as keyof typeof WIDTH_CLASSES],
);

const close = () => {
  emit("update:modelValue", false);
  emit("close");
};

onKeyStroke("Escape", () => {
  if (props.modelValue) close();
});

// Stop the page behind the panel from scrolling while it is open.
watch(
  () => props.modelValue,
  (open) => {
    if (import.meta.client) document.body.style.overflow = open ? "hidden" : "";
  },
);

onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = "";
});
</script>
