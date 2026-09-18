<template>
  <div class="space-y-2">
    <label
      v-if="label"
      class="text-[10px] font-bold text-tx-secondary tracking-wider"
      >{{ label }}</label
    >

    <div class="flex gap-2" @paste="onPaste">
      <input
        v-for="(digit, i) in boxes"
        :key="i"
        :ref="(el) => setBoxRef(el, i)"
        :value="digit"
        type="text"
        inputmode="numeric"
        autocomplete="one-time-code"
        maxlength="1"
        :disabled="disabled"
        :name="name ? `${name}-${i}` : undefined"
        @input="onInput(i, $event)"
        @keydown="onKeydown(i, $event)"
        :class="boxClasses"
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
import type { LazyVOtpProps } from "../types/VOtp";

const props = withDefaults(defineProps<LazyVOtpProps>(), {
  length: 6,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  complete: [value: string];
}>();

const boxes = ref<string[]>(
  Array.from({ length: props.length }, (_, i) => props.modelValue?.[i] ?? ""),
);

const boxRefs: (HTMLInputElement | null)[] = [];
const setBoxRef = (el: Element | null, i: number) => {
  boxRefs[i] = el as HTMLInputElement | null;
};

const focusBox = (i: number) => {
  const el = boxRefs[i];
  el?.focus();
  el?.select();
};

const emitValue = () => {
  const value = boxes.value.join("");
  emit("update:modelValue", value);
  if (value.length === props.length && !value.includes("")) {
    emit("complete", value);
  }
};

watch(
  () => props.modelValue,
  (val) => {
    const next = Array.from({ length: props.length }, (_, i) => val?.[i] ?? "");
    if (next.join("") !== boxes.value.join("")) boxes.value = next;
  },
);

watch(
  () => props.length,
  (len) => {
    boxes.value = Array.from({ length: len }, (_, i) => boxes.value[i] ?? "");
  },
);

const onInput = (i: number, e: Event) => {
  const target = e.target as HTMLInputElement;
  const digit = target.value.replace(/\D/g, "").slice(-1);
  boxes.value[i] = digit;
  target.value = digit;
  emitValue();
  if (digit && i < props.length - 1) focusBox(i + 1);
};

const onKeydown = (i: number, e: KeyboardEvent) => {
  if (e.key === "Backspace") {
    if (!boxes.value[i] && i > 0) {
      e.preventDefault();
      boxes.value[i - 1] = "";
      emitValue();
      focusBox(i - 1);
    }
  } else if (e.key === "ArrowLeft" && i > 0) {
    e.preventDefault();
    focusBox(i - 1);
  } else if (e.key === "ArrowRight" && i < props.length - 1) {
    e.preventDefault();
    focusBox(i + 1);
  }
};

const onPaste = (e: ClipboardEvent) => {
  e.preventDefault();
  const pasted = e.clipboardData?.getData("text").replace(/\D/g, "") ?? "";
  if (!pasted) return;
  const chars = pasted.slice(0, props.length).split("");
  boxes.value = Array.from({ length: props.length }, (_, i) => chars[i] ?? "");
  emitValue();
  focusBox(Math.min(chars.length, props.length - 1));
};

const boxClasses = computed(() => [
  "w-11 h-12 text-center text-lg font-bold bg-bg-elevated border border-border-subtle rounded-md text-tx-primary outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
  props.error
    ? "border-red-500/50 focus:border-red-500"
    : "focus:border-brand focus:ring-2 focus:ring-brand-dim hover:border-border-default",
  props.boxClass,
]);
</script>