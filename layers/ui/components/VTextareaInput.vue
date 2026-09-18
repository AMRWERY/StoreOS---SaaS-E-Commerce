<template>
  <div class="space-y-2">
    <label
      v-if="label"
      class="text-[10px] font-bold text-tx-secondary tracking-wider"
      >{{ label }}</label
    >

    <textarea
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      :name="name"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      @input="onInput"
      :class="textareaClasses"
    ></textarea>

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
import type { LazyVTextareaInputProps } from "../types/VTextareaInput";

const props = withDefaults(defineProps<LazyVTextareaInputProps>(), {
  rows: 4,
});

const emit = defineEmits(["update:modelValue"]);

const onInput = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLTextAreaElement).value);
};

const textareaClasses = computed(() => {
  return [
    "w-full resize-none bg-bg-elevated border border-border-subtle rounded-md px-3 py-2 text-[12px] text-tx-primary outline-none transition-all duration-200 placeholder:text-tx-muted disabled:opacity-50 disabled:cursor-not-allowed",
    props.error
      ? "border-red-500/50 focus:border-red-500"
      : "focus:border-brand focus:ring-2 focus:ring-brand-dim hover:border-border-default",
    props.textareaClass,
  ];
});
</script>