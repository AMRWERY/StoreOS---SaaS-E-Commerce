<template>
  <div>
    <div class="space-y-2.5">
      <label v-if="label" class="text-[11px] font-bold text-tx-secondary tracking-wider">{{ label }}</label>
      <!-- Upload Dropzone (Default State) -->
      <div v-if="!selectedFile" @click="triggerFileSelect" :class="wrapperClass">
        <div v-if="icon" :class="iconWrapperClass">
          <Icon :name="icon" :class="iconClass" />
        </div>

        <slot>
          <p v-if="title" class="text-sm font-bold mb-1">
            {{ title }}
          </p>
          <p v-if="subtitle" class="text-[11px] text-tx-muted" :class="subtitleClass">
            {{ subtitle }}
          </p>
        </slot>
      </div>

      <!-- File Preview / Selected State -->
      <div v-else class="relative border border-border-default rounded-xl bg-bg-overlay overflow-hidden group">
        <!-- Image Preview -->
        <div v-if="isImage" class="aspect-video w-full relative">
          <img :src="previewUrl" class="w-full h-full object-cover" />
          <div
            class="absolute inset-0 bg-bg-overlay opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <LazyVButton @click="triggerFileSelect" variant="none"
              className="p-2 bg-bg-elevated rounded-md hover:bg-bg-elevated transition-colors">
              <Icon name="ph:pencil-simple-bold" class="text-tx-primary w-5 h-5" />
            </LazyVButton>
            <LazyVButton @click="removeFile" variant="none"
              className="p-2 bg-red-500/20 rounded-md hover:bg-red-500/40 transition-colors">
              <Icon name="ph:trash-bold" class="text-red-500 w-5 h-5" />
            </LazyVButton>
          </div>
        </div>

        <!-- Non-Image File Details -->
        <div v-else class="p-6 flex items-center gap-4">
          <div class="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center shrink-0">
            <Icon name="ph:file-bold" class="text-brand text-2xl" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold truncate">{{ selectedFile.name }}</p>
            <p class="text-[11px] text-tx-secondary">{{ formatFileSize(selectedFile.size) }}</p>
          </div>
          <LazyVButton @click="removeFile" variant="none"
            className="p-2 hover:bg-bg-elevated rounded-md transition-colors">
            <Icon name="ph:x-bold" class="text-tx-secondary w-4 h-4" />
          </LazyVButton>
        </div>
      </div>

      <!-- Hidden File Input -->
      <input ref="fileInput" type="file" class="hidden" :accept="accept" :multiple="multiple"
        @change="handleFileChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { VFileUploadProps } from '../types/v-file-upload';

const props = withDefaults(defineProps<VFileUploadProps>(), {
  icon: 'ic:twotone-cloud-upload',
  title: 'Click to upload or drag and drop',
  subtitle: 'PNG, JPG or WebP (max. 5MB)',
  wrapperClass: 'relative border-2 border-dashed border-border-subtle rounded-xl p-5 flex flex-col items-center justify-center hover:bg-bg-elevated hover:border-border-default transition-all cursor-pointer group',
  iconWrapperClass: 'w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform',
  iconClass: 'text-brand text-2xl',
});

const emit = defineEmits(['click', 'change']);

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);

const isImage = computed(() => {
  return selectedFile.value?.type.startsWith('image/');
});

const triggerFileSelect = () => {
  fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    selectedFile.value = file;
    emit('change', file);

    if (file.type.startsWith('image/')) {
      if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
      previewUrl.value = URL.createObjectURL(file);
    } else {
      previewUrl.value = null;
    }
  }
};

const removeFile = (event: Event) => {
  event.stopPropagation();
  selectedFile.value = null;
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = null;
  }
  if (fileInput.value) fileInput.value.value = '';
  emit('change', null);
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

onUnmounted(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }
});
</script>