<template>
  <div>
    <form @submit.prevent="$emit('submit')" :class="formClasses">
      <slot />
    </form>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  formClass?: string;
}>();

defineEmits(["submit"]);

const formClasses = computed(() => {
  return [
    "space-y-6", // default spacing
    props.formClass,
  ];
});
</script>