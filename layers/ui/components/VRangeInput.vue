<template>
  <div class="space-y-2">
    <div v-if="label" class="flex items-center justify-between gap-2">
      <label class="text-[10px] font-bold tracking-wider text-tx-secondary">{{
        label
      }}</label>
      <span class="text-[11px] text-tx-muted">
        {{
          multi
            ? `${minValue}${unit} – ${maxValue}${unit}`
            : `${singleValue}${unit}`
        }}
      </span>
    </div>

    <!-- Single handle -->
    <input
      v-if="!multi"
      type="range"
      :value="singleValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :name="name"
      @input="onSingleInput"
      :class="rangeClasses"
    />

    <!-- Dual handle -->
    <div v-else class="relative flex h-4 items-center">
      <div class="absolute inset-x-0 h-2 rounded-full bg-bg-elevated"></div>
      <div
        class="absolute h-2 rounded-full bg-brand"
        :style="{
          left: `${minPercent}%`,
          width: `${maxPercent - minPercent}%`,
        }"
      ></div>
      <input
        type="range"
        class="v-range-thumb absolute inset-x-0 h-2 w-full cursor-pointer appearance-none bg-transparent"
        :min="min"
        :max="max"
        :step="step"
        :value="minValue"
        :disabled="disabled"
        @input="onMinInput"
      />
      <input
        type="range"
        class="v-range-thumb absolute inset-x-0 h-2 w-full cursor-pointer appearance-none bg-transparent"
        :min="min"
        :max="max"
        :step="step"
        :value="maxValue"
        :disabled="disabled"
        @input="onMaxInput"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LazyVRangeInputProps } from "../types/VRangeInput";

const props = withDefaults(defineProps<LazyVRangeInputProps>(), {
  min: 0,
  max: 100,
  step: 1,
  unit: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: number | [number, number]];
}>();

const singleValue = computed(() =>
  Array.isArray(props.modelValue) ? props.min : (props.modelValue ?? props.min),
);

const minValue = computed(() =>
  Array.isArray(props.modelValue) ? props.modelValue[0] : props.min,
);
const maxValue = computed(() =>
  Array.isArray(props.modelValue) ? props.modelValue[1] : props.max,
);

const minPercent = computed(
  () => ((minValue.value - props.min) / (props.max - props.min)) * 100,
);
const maxPercent = computed(
  () => ((maxValue.value - props.min) / (props.max - props.min)) * 100,
);

const onSingleInput = (e: Event) => {
  emit("update:modelValue", Number((e.target as HTMLInputElement).value));
};

const onMinInput = (e: Event) => {
  const next = Math.min(
    Number((e.target as HTMLInputElement).value),
    maxValue.value,
  );
  emit("update:modelValue", [next, maxValue.value]);
};

const onMaxInput = (e: Event) => {
  const next = Math.max(
    Number((e.target as HTMLInputElement).value),
    minValue.value,
  );
  emit("update:modelValue", [minValue.value, next]);
};

const rangeClasses = computed(() => [
  "h-2 w-full cursor-pointer appearance-none rounded-full bg-bg-elevated accent-brand disabled:opacity-50 disabled:cursor-not-allowed",
  props.rangeClass,
]);
</script>

<style scoped>
.v-range-thumb {
  pointer-events: none;
}

.v-range-thumb::-webkit-slider-thumb {
  pointer-events: auto;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 9999px;
  background: rgb(var(--brand-rgb));
  cursor: pointer;
}

.v-range-thumb::-moz-range-thumb {
  pointer-events: auto;
  width: 14px;
  height: 14px;
  border: none;
  border-radius: 9999px;
  background: rgb(var(--brand-rgb));
  cursor: pointer;
}
</style>