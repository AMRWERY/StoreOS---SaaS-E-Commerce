<template>
  <div class="space-y-2">
    <label
      class="block text-[10px] font-bold tracking-wider text-tx-secondary"
      >{{ label }}</label
    >
    <div class="grid grid-cols-2 gap-2">
      <LazyVButton
        v-for="opt in options"
        :key="opt.value"
        variant="none"
        type="button"
        :class-name="[
          'rounded-lg border px-3 py-3 text-start transition-all',
          modelValue === opt.value
            ? 'border-brand bg-brand/15 ring-1 ring-brand/40'
            : 'border-border-subtle bg-bg-elevated hover:border-border-default',
        ].join(' ')"
        @click="$emit('update:modelValue', opt.value)"
      >
        <Icon
          v-if="opt.icon"
          :name="opt.icon"
          class="mb-2 text-lg text-tx-secondary"
        />
        <p class="text-[11px] font-semibold text-tx-primary">
          {{ opt.label }}
        </p>
        <p
          v-if="opt.description"
          class="mt-1 text-[10px] leading-snug text-tx-muted"
        >
          {{ opt.description }}
        </p>
      </LazyVButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

defineProps<{
  modelValue: string;
  label: string;
  options: {
    value: string;
    label: string;
    description?: string;
    icon?: string;
  }[];
}>();

defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>