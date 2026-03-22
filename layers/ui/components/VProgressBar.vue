<template>
  <div>
    <div class="space-y-1">
      <div v-if="showHeader" class="flex items-center justify-between text-xs font-bold tracking-widest mb-2">
        <span class="text-indigo-300">{{ headerLeft }}</span>
        <span class="text-slate-400">{{ headerRight }}</span>
      </div>
      <div class="flex items-center justify-between text-xs text-slate-400" v-if="showLabel || showProgressText">
        <span v-if="showLabel && label" class="font-medium text-slate-700">{{
          label
        }}</span>
        <!-- <span v-if="showProgressText">{{ Math.round(clampedProgress) }}%</span> -->
      </div>
      <div class="w-full rounded-full overflow-hidden" :class="trackClass" :style="{ height: `${height}px` }">
        <div class="h-full transition-all duration-300 ease-out" :class="barClass" :style="{
          width: `${clampedProgress}%`,
          boxShadow: shadow ? '0 0 15px rgba(99,102,241,0.5)' : 'none',
        }"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  progress: {
    type: Number,
    default: 0,
  },
  label: {
    type: String,
    default: "",
  },
  height: {
    type: Number,
    default: 6,
  },
  color: {
    type: String,
    default: "indigo",
  },
  trackVariant: {
    type: String,
    default: "slate",
  },
  showHeader: {
    type: Boolean,
    default: false,
  },
  headerLeft: {
    type: String,
    default: "STEP 1 OF 4",
  },
  headerRight: {
    type: String,
    default: "0% Complete",
  },
  showLabel: {
    type: Boolean,
    default: false,
  },
  showProgressText: {
    type: Boolean,
    default: true,
  },
  shadow: {
    type: Boolean,
    default: true,
  },
});

const clampedProgress = computed(() =>
  Math.min(100, Math.max(0, props.progress))
);

const barClass = computed(() => {
  const colorMap: Record<string, string> = {
    indigo: "bg-indigo-500",
    blue: "bg-blue-500",
    green: "bg-emerald-500",
    cyan: "bg-cyan-500",
    fuchsia: "bg-fuchsia-500",
    rose: "bg-rose-500",
    amber: "bg-amber-500",
    slate: "bg-slate-500",
  };
  return colorMap[props.color] ?? "bg-indigo-500";
});

const trackClass = computed(() => {
  const trackMap: Record<string, string> = {
    indigo: "bg-indigo-900/20",
    blue: "bg-blue-900/20",
    green: "bg-emerald-900/20",
    cyan: "bg-cyan-900/20",
    fuchsia: "bg-fuchsia-900/20",
    rose: "bg-rose-900/20",
    amber: "bg-amber-900/20",
    slate: "bg-slate-900/20",
  };
  return trackMap[props.trackVariant] ?? "bg-indigo-900/20";
});
</script>