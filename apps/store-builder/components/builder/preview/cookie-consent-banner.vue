<template>
  <div
    v-if="visible"
    class="fixed inset-x-3 bottom-3 z-[60] mx-auto flex max-w-2xl flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-4 sm:flex-row sm:items-center"
    role="dialog"
    aria-label="Cookie consent"
  >
    <p class="flex-1 text-[13px] leading-relaxed text-neutral-600">
      {{ text }}
    </p>
    <div class="flex shrink-0 gap-2">
      <button
        type="button"
        class="rounded-lg border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
        @click="$emit('decline')"
      >
        {{ ar ? "رفض" : "Decline" }}
      </button>
      <button
        type="button"
        class="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
        @click="$emit('accept')"
      >
        {{ ar ? "موافق" : "Accept" }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ visible: boolean; locale: string }>();
defineEmits<{ accept: []; decline: [] }>();

const ar = computed(() => props.locale === "ar");
const text = computed(() =>
  ar.value
    ? "نستخدم ملفات تعريف الارتباط لتحليل الزيارات وتحسين تجربتك. هل توافق؟"
    : "We use cookies to understand how the store is used and improve your experience. Do you accept?",
);
</script>
