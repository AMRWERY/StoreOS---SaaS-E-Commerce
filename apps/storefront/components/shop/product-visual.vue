<template>
  <div
    :class="[
      'relative flex items-center justify-center overflow-hidden bg-gradient-to-br',
      toneClass(tone),
      ratio,
    ]"
    :style="ratioStyle"
    role="img"
    :aria-label="label"
  >
    <img
      v-if="image"
      :src="image"
      alt=""
      loading="lazy"
      class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <template v-else>
      <div
        class="absolute -top-8 -end-8 w-32 h-32 rounded-full bg-bg-base/30 blur-2xl"
        aria-hidden="true"
      />
      <Icon
        :name="icon"
        :class="[
          'text-tx-primary/70 transition-transform duration-300 group-hover:scale-105',
          iconSize,
        ]"
      />
    </template>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    tone?: number;
    icon?: string;
    image?: string;
    label?: string;
    ratio?: string;
    iconSize?: string;
  }>(),
  {
    tone: 0,
    icon: "lucide:image",
    image: "",
    label: "",
    ratio: "aspect-[4/5]",
    iconSize: "w-14 h-14",
  },
);

// Inline aspect-ratio guarantees the box has height even if the utility class is missing
// (the image is absolutely positioned, so it adds no height of its own).
const ratioStyle = computed(() => {
  const m = /^aspect-(?:square|\[(\d+)\/(\d+)\])$/.exec(props.ratio.trim())
  if (!m) return undefined
  return { aspectRatio: m[1] ? `${m[1]} / ${m[2]}` : "1 / 1" }
})
</script>