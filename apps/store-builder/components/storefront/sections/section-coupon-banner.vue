<template>
  <div
    class="px-8 py-10"
    :style="variant === 'banner' ? { backgroundColor: str('bg_color'), color: str('text_color') } : undefined"
  >
    <!-- ticket -->
    <div
      v-if="variant === 'ticket'"
      class="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border-2 border-dashed px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-start"
      :style="boxStyle"
    >
      <div>
        <p v-if="str('text')" class="text-lg font-bold">{{ str("text") }}</p>
        <p v-if="str('conditions')" class="mt-1 text-xs opacity-75">{{ str("conditions") }}</p>
      </div>
      <div class="flex items-center gap-2 sm:border-s-2 sm:border-dashed sm:ps-4" :style="{ borderColor: str('text_color') }">
        <span :class="codeClass" :style="{ borderColor: str('text_color') }">{{ str("code") }}</span>
        <button type="button" :class="btnClass" @click="copy">
          <Icon :name="copied ? 'ph:check-bold' : 'ph:copy-bold'" />
          {{ copied ? str("copied_label") : str("copy_label") }}
        </button>
      </div>
    </div>

    <!-- pill -->
    <div v-else-if="variant === 'pill'" class="mx-auto max-w-3xl">
      <div
        class="flex flex-wrap items-center justify-center gap-3 rounded-full px-5 py-2.5"
        :class="str('style') === 'ticket' && 'border border-dashed'"
        :style="boxStyle"
      >
        <Icon name="ph:tag-bold" class="text-lg" />
        <span v-if="str('text')" class="text-sm font-semibold">{{ str("text") }}</span>
        <span :class="codeClass" class="!py-1" :style="{ borderColor: str('text_color') }">{{ str("code") }}</span>
        <button type="button" :class="btnClass" class="!rounded-full !px-3 !py-1 text-xs" @click="copy">
          {{ copied ? str("copied_label") : str("copy_label") }}
        </button>
      </div>
      <p v-if="str('conditions')" class="mt-2 text-center text-xs text-neutral-500">{{ str("conditions") }}</p>
    </div>

    <!-- banner (full bleed) -->
    <div v-else class="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
      <p v-if="str('text')" class="text-2xl font-bold">{{ str("text") }}</p>
      <div class="flex items-center gap-2">
        <span :class="codeClass" :style="{ borderColor: str('text_color') }">{{ str("code") }}</span>
        <button type="button" :class="btnClass" @click="copy">
          <Icon :name="copied ? 'ph:check-bold' : 'ph:copy-bold'" />
          {{ copied ? str("copied_label") : str("copy_label") }}
        </button>
      </div>
      <p v-if="str('conditions')" class="text-xs opacity-75">{{ str("conditions") }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "ticket"));
const boxStyle = computed(() => ({
  backgroundColor: str("bg_color"),
  color: str("text_color"),
  borderColor: str("text_color"),
}));
const codeClass =
  "rounded-xl border border-dashed bg-white px-4 py-2 font-mono text-sm font-bold tracking-widest text-neutral-900";
const btnClass =
  "inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700";

const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

async function copy() {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(str("code"));
    }
  } catch {
    /* clipboard unavailable — still show feedback */
  }
  copied.value = true;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => (copied.value = false), 2000);
}

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});
</script>
