<template>
  <div v-if="visible && messages.length" :class="variant === 'pill' ? 'px-4 py-3' : ''">
    <div
      class="relative flex items-center justify-center gap-3 text-xs font-medium"
      :class="[
        variant === 'solid' && 'px-10 py-2',
        variant === 'pill' && 'mx-auto max-w-2xl rounded-full px-10 py-2 shadow-sm',
        variant === 'minimal' && 'border-b border-neutral-200 px-10 py-2',
      ]"
      :style="
        variant === 'minimal'
          ? { color: str('bg_color') }
          : { backgroundColor: str('bg_color'), color: str('text_color') }
      "
    >
      <button v-if="showArrows" type="button" class="opacity-80 hover:opacity-100" aria-label="Previous" @click="step(-1)">
        <Icon name="ph:caret-left-bold" class="rtl:rotate-180" />
      </button>
      <p class="text-center">
        {{ current.text }}
        <a v-if="current.link_label" :href="current.url || '#'" class="ms-1 font-bold underline" @click.prevent>
          {{ current.link_label }}
        </a>
      </p>
      <button v-if="showArrows" type="button" class="opacity-80 hover:opacity-100" aria-label="Next" @click="step(1)">
        <Icon name="ph:caret-right-bold" class="rtl:rotate-180" />
      </button>
      <button
        v-if="bool('dismissible', true)"
        type="button"
        class="absolute end-3 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
        aria-label="Dismiss"
        @click="visible = false"
      >
        <Icon name="ph:x-bold" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, num, bool, list } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "solid"));
const messages = computed(() => list("messages"));
const showArrows = computed(() => bool("show_arrows", true) && messages.value.length > 1);
const index = ref(0);
const visible = ref(true);
const current = computed(() => messages.value[index.value % messages.value.length] ?? {});

const step = (dir: number) => {
  const n = messages.value.length;
  if (n) index.value = (index.value + dir + n) % n;
}

let timer: ReturnType<typeof setInterval> | undefined;
const restart = () => {
  if (timer) clearInterval(timer);
  timer = undefined;
  if (bool("autoplay", true) && messages.value.length > 1) {
    timer = setInterval(() => step(1), Math.max(2, num("interval", 4)) * 1000);
  }
}

onMounted(restart);
watch(() => [bool("autoplay", true), num("interval", 4), messages.value.length], restart);
onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>
