<template>
  <div class="space-y-2">
    <div v-if="label" class="flex justify-between items-center">
      <label class="text-[10px] font-bold text-tx-secondary tracking-wider">{{
        label
      }}</label>
      <slot name="label-right"></slot>
    </div>

    <div class="relative group">
      <select
        :value="modelValue"
        :name="name"
        :required="required"
        :disabled="disabled"
        @change="onChange"
        :class="selectClasses"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option
          v-for="opt in normalizedOptions"
          :key="opt.value"
          :value="opt.value"
          :disabled="opt.disabled"
        >
          {{ opt.label }}
        </option>
      </select>
      <Icon
        name="ph:caret-down-bold"
        class="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-tx-muted transition-colors"
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
import type {
  LazyVSelectInputProps,
  VSelectOption,
} from "../types/VSelectInput";

const props = defineProps<LazyVSelectInputProps>();

const emit = defineEmits(["update:modelValue"]);

const onChange = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLSelectElement).value);
};

const normalizedOptions = computed<VSelectOption[]>(() =>
  props.options.map((opt: string | number | VSelectOption) =>
    typeof opt === "string" || typeof opt === "number"
      ? { value: opt, label: String(opt) }
      : opt,
  ),
);

const selectClasses = computed(() => {
  return [
    "w-full appearance-none bg-bg-elevated border border-border-subtle rounded-md px-3 py-2 text-[12px] text-tx-primary outline-none transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
    props.error
      ? "border-red-500/50 focus:border-red-500"
      : "focus:border-brand focus:ring-2 focus:ring-brand-dim hover:border-border-default",
    props.selectClass,
  ];
});
</script>