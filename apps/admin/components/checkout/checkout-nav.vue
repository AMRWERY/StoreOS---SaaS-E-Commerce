<template>
  <aside class="w-52 shrink-0 space-y-6">
    <div class="mb-10">
      <h2 class="text-brand font-bold text-xl tracking-tight">
        {{ t("storefront.checkout.checkout") }}
      </h2>
      <p class="text-[9px] font-black text-tx-muted tracking-[0.3em] mt-1">
        Terminal Session 08-X
      </p>
    </div>

    <nav class="space-y-1">
      <div
        v-for="step in steps"
        :key="step.id"
        class="group flex items-center gap-3 px-4 py-3 rounded-[8px] transition-all cursor-pointer border-s-2"
        :class="[
          step.active
            ? 'bg-bg-primary border-brand text-white shadow-lg'
            : 'bg-transparent border-transparent text-tx-muted hover:text-tx-secondary',
        ]"
        @click="$emit('step-click', step.id)"
      >
        <Icon
          :name="step.icon"
          class="w-4 h-4"
          :class="step.active ? 'text-brand' : ''"
        />
        <span class="text-[12px] font-semibold tracking-widest">{{
          step.name
        }}</span>
      </div>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
const { t } = useI18n()
defineProps<{
  steps: Array<{ id: string; name: string; icon: string; active: boolean }>;
}>();

defineEmits<{
  "step-click": [id: string];
}>();
</script>