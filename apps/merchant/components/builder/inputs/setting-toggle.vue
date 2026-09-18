<template>
  <div class="flex items-center justify-between gap-3">
    <div class="min-w-0">
      <p class="text-[10px] font-bold tracking-wider text-tx-secondary">
        {{ label }}
      </p>
      <p v-if="hint" class="mt-0.5 text-[11px] text-tx-muted">
        {{ hint }}
      </p>
    </div>
    <LazyVButton
      variant="none"
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :class-name="[
        'relative h-7 w-12 shrink-0 rounded-full border border-border-subtle transition-colors',
        modelValue ? 'bg-brand/90 border-brand' : 'bg-bg-elevated',
      ].join(' ')"
      @click="$emit('update:modelValue', !modelValue)"
    >
      <span
        class="absolute top-0.5 size-5 rounded-full bg-white shadow transition-all"
        :class="modelValue ? 'start-6' : 'start-0.5'"
      />
    </LazyVButton>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

defineProps<{
  modelValue: boolean;
  label: string;
  hint?: string;
}>();

defineEmits<{
  "update:modelValue": [value: boolean];
}>();
</script>