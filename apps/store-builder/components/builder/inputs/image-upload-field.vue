<template>
  <div class="space-y-1.5">
    <label v-if="label" class="block text-[10px] font-bold tracking-wider text-tx-secondary">
      {{ label }}
    </label>

    <div class="flex items-center gap-2">
      <div
        class="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border-subtle bg-bg-elevated/50"
      >
        <img v-if="modelValue" :src="modelValue" alt="" class="size-full object-cover" />
        <Icon v-else name="ph:image-bold" class="text-xl text-tx-muted" />
      </div>

      <div class="min-w-0 flex-1 space-y-1.5">
        <div class="flex gap-1.5">
          <button
            type="button"
            class="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border-subtle bg-bg-elevated px-2.5 py-1.5 text-[11px] font-semibold text-tx-primary transition-colors hover:border-brand/40 hover:text-brand disabled:opacity-60"
            :disabled="busy"
            @click="picker?.click()"
          >
            <Icon :name="busy ? 'ph:spinner-gap-bold' : 'ph:upload-simple-bold'" :class="busy ? 'animate-spin' : ''" />
            {{ modelValue ? "Replace" : "Upload" }}
          </button>
          <button
            v-if="modelValue"
            type="button"
            class="rounded-md border border-border-subtle px-2 text-tx-muted transition-colors hover:border-red-400/40 hover:text-red-400"
            title="Remove image"
            @click="$emit('update:modelValue', '')"
          >
            <Icon name="ph:trash-bold" />
          </button>
        </div>

        <input
          :value="isData ? '' : modelValue"
          type="url"
          :placeholder="isData ? 'Uploaded image' : 'or paste an image URL'"
          class="w-full rounded-md border border-border-subtle bg-bg-base px-2 py-1.5 text-[11px] text-tx-primary outline-none placeholder:text-tx-muted focus:border-brand"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>

    <p v-if="error" class="text-[10px] text-red-400">{{ error }}</p>
    <p v-else-if="hint" class="text-[10px] text-tx-muted">{{ hint }}</p>

    <input ref="picker" type="file" accept="image/*" class="hidden" @change="onPick" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ modelValue: string; label?: string; hint?: string }>();
const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const { toDataUrl, error, busy } = useImageUpload();
const picker = ref<HTMLInputElement | null>(null);
const isData = computed(() => props.modelValue.startsWith("data:"));

const onPick = async (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = "";
  if (!file) return;
  const url = await toDataUrl(file);
  if (url) emit("update:modelValue", url);
};
</script>
