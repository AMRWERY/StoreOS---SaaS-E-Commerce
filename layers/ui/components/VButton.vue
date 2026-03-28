<template>
  <nuxt-link-locale v-if="to" :to="to" :class="buttonClass" :disabled="disabled" v-bind="$attrs">
    <Icon v-if="icon && iconPosition === 'left'" :name="icon" class="w-4 h-4" />
    <slot>
      <span v-if="label">{{ label }}</span>
    </slot>
    <Icon v-if="icon && iconPosition === 'right'" :name="icon" class="w-4 h-4" />
  </nuxt-link-locale>

  <button v-else :type="type" :class="buttonClass" :disabled="disabled" v-bind="$attrs">
    <Icon v-if="icon && iconPosition === 'left'" :name="icon" class="w-4 h-4" />
    <slot>
      <span v-if="label">{{ label }}</span>
    </slot>
    <Icon v-if="icon && iconPosition === 'right'" :name="icon" class="w-4 h-4" />
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
  className: { type: [String, Array, Object], default: "" },
});

const buttonClass = computed(() => {
  const isNone = props.variant === "none";

  const base = isNone
    ? ""
    : "flex items-center justify-center gap-2 rounded-md font-bold text-sm transition-all duration-200";

  const padding = isNone || props.size === "none"
    ? ""
    : "py-2 px-4";

  let common = "";
  if (!isNone) {
    common = props.variant === "secondary"
      ? "bg-bg-elevated border border-border-default text-tx-secondary hover:text-tx-primary"
      : props.variant === "ghost"
        ? "bg-transparent text-tx-secondary hover:text-tx-primary"
        : "bg-brand hover:bg-brand-hover text-white shadow-lg shadow-brand/20";
  }

  const opacity = props.disabled
    ? "opacity-50 cursor-not-allowed"
    : isNone ? "" : "active:scale-[0.98]";

  return `${base} ${padding} ${common} ${opacity} ${props.className}`.trim();
});
</script>
