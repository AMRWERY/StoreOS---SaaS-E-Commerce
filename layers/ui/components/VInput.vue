<template>
  <div>
    <div class="space-y-2">
      <!-- Checkbox Type -->
      <template v-if="type === 'checkbox'">
        <label class="flex items-center gap-3 cursor-pointer group">
          <input type="checkbox" :checked="!!modelValue" @change="onInput"
            class="w-4 h-4 rounded border-border-default bg-bg-elevated text-orange-500 focus:ring-orange-500 focus:ring-offset-0 transition-all cursor-pointer" />
          <span v-if="label || $slots.default"
            class="text-xs text-tx-secondary group-hover:text-tx-primary transition-colors">
            <slot>{{ label }}</slot>
          </span>
        </label>
      </template>

      <!-- Standard Input Types -->
      <template v-else>
        <div v-if="label" class="flex justify-between items-center">
          <label class="text-[10px] font-bold text-tx-secondary tracking-wider">{{ label }}</label>
          <slot name="label-right"></slot>
        </div>

        <div class="relative group">
          <slot name="prefix"></slot>
          <input :type="currentType" :value="modelValue" :placeholder="placeholder" :required="required" :name="name"
            @input="onInput" :class="inputClasses" />

          <!-- Password Toggle -->
          <VButton v-if="isPassword" @click="showPassword = !showPassword" type="button" variant="none"
            className="absolute end-3 top-1/2 -translate-y-1/2 text-tx-secondary hover:text-tx-primary transition-colors">
            <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="w-[18px] h-[18px]" />
          </VButton>
        </div>
      </template>

      <!-- Error Message -->
      <Transition enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-2 opacity-0" enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in" leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-2 opacity-0">
        <p v-if="error" class="text-xs text-red-500 mt-1 font-medium">{{ error }}</p>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { VInputProps } from '../types/v-input';

const props = withDefaults(defineProps<VInputProps>(), {
  type: "text",
});

const emit = defineEmits(["update:modelValue"]);

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const value = target.type === "checkbox" ? target.checked : target.value;
  emit("update:modelValue", value);
};

const inputClasses = computed(() => {
  return [
    "w-full bg-bg-elevated border border-border-subtle rounded-md px-3 py-2 text-[12px] text-tx-primary placeholder:text-tx-muted outline-none transition-all duration-200",
    props.error
      ? "border-red-500/50 focus:border-red-500"
      : "focus:border-brand focus:ring-2 focus:ring-brand-dim hover:border-border-default",
    props.inputClass,
  ];
});

const isPassword = computed(() => props.type === "password");
const showPassword = ref(false);
const currentType = computed(() => {
  if (isPassword.value) return showPassword.value ? "text" : "password";
  return props.type;
});
</script>
