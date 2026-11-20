<template>
  <div
    class="marquee-root overflow-hidden"
    :class="variant === 'display' ? 'py-8' : variant === 'pills' ? 'py-5' : 'py-4'"
    dir="ltr"
    :style="{ backgroundColor: str('bg_color', '#111827'), color: str('text_color', '#ffffff') }"
  >
    <div
      class="marquee-track flex w-max"
      :style="{
        animationDuration: `${Math.max(5, num('speed', 30))}s`,
        animationDirection: str('direction', 'left') === 'right' ? 'reverse' : 'normal',
      }"
    >
      <ul
        v-for="n in 2"
        :key="n"
        class="flex shrink-0 items-center"
        :aria-hidden="n === 2 ? 'true' : undefined"
      >
        <li
          v-for="(item, i) in items"
          :key="i"
          class="flex items-center whitespace-nowrap"
          :class="[uppercaseClass, itemClass]"
        >
          <span :class="textClass">{{ item.text }}</span>
          <template v-if="variant !== 'pills'">
            <Icon
              v-if="separator.startsWith('ph:')"
              :name="separator"
              class="opacity-70"
              :class="variant === 'display' ? 'mx-10 text-xl' : 'mx-6 text-xs'"
            />
            <span v-else class="opacity-70" :class="variant === 'display' ? 'mx-10 text-xl' : 'mx-6'">{{ separator }}</span>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, num, bool, list } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "ticker"));
const items = computed(() => list("items"));
const separator = computed(() => str("separator", "ph:star-four-fill").trim());
const uppercaseClass = computed(() => (bool("uppercase", true) ? "uppercase" : ""));

// pills: bordered chips with a gap; display: oversized outline-ish headline; ticker: slim strip
const itemClass = computed(() => (variant.value === "pills" ? "me-3" : ""));
const textClass = computed(
  () =>
    ({
      ticker: "text-sm font-semibold tracking-wide",
      pills: "rounded-full border border-current px-5 py-1.5 text-sm font-semibold",
      display: "text-4xl font-extrabold tracking-tight sm:text-6xl",
    })[variant.value] ?? "text-sm font-semibold tracking-wide",
);
</script>

<style scoped>
.marquee-track {
  animation-name: marquee-scroll;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
