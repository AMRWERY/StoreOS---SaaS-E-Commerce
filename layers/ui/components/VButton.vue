<template>
  <nuxt-link-locale v-if="to" :to="to" :class="buttonClass" :disabled="disabled" v-bind="$attrs">
    <icon v-if="icon && iconPosition === 'left'" :name="icon" class="w-4 h-4" />
    <slot>
      <span v-if="label">{{ label }}</span>
    </slot>
    <icon v-if="icon && iconPosition === 'right'" :name="icon" class="w-4 h-4" />
  </nuxt-link-locale>
  
  <button v-else :type="type" :class="buttonClass" :disabled="disabled" v-bind="$attrs">
    <icon v-if="icon && iconPosition === 'left'" :name="icon" class="w-4 h-4" />
    <slot>
      <span v-if="label">{{ label }}</span>
    </slot>
    <icon v-if="icon && iconPosition === 'right'" :name="icon" class="w-4 h-4" />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: { type: String, default: "" },
  to: { type: [String, Object], default: undefined },
  type: { type: String, default: "button" },
  icon: { type: String, default: "" },
  iconPosition: { type: String, default: "right" },
  variant: { type: String, default: "primary" },
  size: { type: String, default: "md" },
  disabled: { type: Boolean, default: false },
  className: { type: String, default: "" },
});

const buttonClass = computed(() => {
  const isNone = props.variant === "none";

  const base = isNone
    ? ""
    : "flex items-center justify-center gap-2 rounded-xl font-bold text-sm transition-all duration-200";

  const padding = isNone || props.size === "none"
    ? ""
    : "py-4 px-4";

  let common = "";
  if (!isNone) {
    common = props.variant === "secondary"
      ? "bg-transparent hover:bg-white/5 text-gray-400 border border-white/10"
      : props.variant === "ghost"
        ? "bg-transparent text-gray-500 hover:text-white"
        : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20";
  }

  const opacity = props.disabled
    ? "opacity-50 cursor-not-allowed"
    : isNone ? "" : "active:scale-[0.98]";

  return `${base} ${padding} ${common} ${opacity} ${props.className}`.trim();
});
</script>