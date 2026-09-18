<template>
  <div class="space-y-2">
    <label
      v-if="label"
      class="text-[10px] font-bold tracking-wider text-tx-secondary"
      >{{ label }}</label
    >

    <div class="flex items-center gap-2">
      <input
        type="color"
        :value="modelValue"
        :disabled="disabled"
        :name="name"
        @input="onSwatchInput"
        :class="swatchClasses"
      />
      <LazyVInput
        :model-value="modelValue"
        :disabled="disabled"
        :input-class="
          inputClass ??
          '!min-w-0 !flex-1 !rounded-md !border-border-subtle !bg-bg-elevated !px-3 !py-2 !text-[12px] !text-tx-primary !outline-none focus:!border-brand'
        "
        @update:model-value="(v: string) => $emit('update:modelValue', v)"
      />
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <p v-if="error" class="text-xs text-red-500 mt-1 font-medium">
        {{ error }}
      </p>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import type { LazyVColorInputProps } from "../types/VColorInput";

const props = defineProps<LazyVColorInputProps>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const onSwatchInput = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};

const swatchClasses = computed(() => [
  "size-10 shrink-0 cursor-pointer rounded-md border border-border-subtle bg-bg-elevated p-0.5 disabled:opacity-50 disabled:cursor-not-allowed",
  props.swatchClass,
]);
</script>