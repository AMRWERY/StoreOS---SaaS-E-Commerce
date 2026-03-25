<template>
  <div>
    <div class="space-y-2.5">
      <label v-if="label" class="text-[11px] font-bold text-gray-400 tracking-wider">{{ label }}</label>
      <!-- Upload Dropzone (Default State) -->
      <div v-if="!selectedFile" @click="triggerFileSelect" :class="wrapperClass">
        <div v-if="icon" :class="iconWrapperClass">
          <icon :name="icon" :class="iconClass" />
        </div>

        <slot>
          <p v-if="title" class="text-sm font-bold mb-1">
            {{ title }}
          </p>
          <p v-if="subtitle" class="text-[11px] text-gray-600" :class="subtitleClass">
            {{ subtitle }}
          </p>
        </slot>
      </div>

      <!-- File Preview / Selected State -->
      <div v-else class="relative border border-white/10 rounded-2xl bg-black/40 overflow-hidden group">
        <!-- Image Preview -->
        <div v-if="isImage" class="aspect-video w-full relative">
          <img :src="previewUrl" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
             <VButton @click="triggerFileSelect" variant="none" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
               <icon name="ph:pencil-simple-bold" class="text-white w-5 h-5" />
             </VButton>
             <VButton @click="removeFile" variant="none" className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/40 transition-colors">
               <icon name="ph:trash-bold" class="text-red-500 w-5 h-5" />
             </VButton>
          </div>
        </div>

        <!-- Non-Image File Details -->
        <div v-else class="p-6 flex items-center gap-4">
          <div class="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center shrink-0">
            <icon name="ph:file-bold" class="text-indigo-500 text-2xl" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold truncate">{{ selectedFile.name }}</p>
            <p class="text-[11px] text-gray-500">{{ formatFileSize(selectedFile.size) }}</p>
          </div>
          <VButton @click="removeFile" variant="none" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <icon name="ph:x-bold" class="text-gray-500 w-4 h-4" />
          </VButton>
        </div>
      </div>

      <!-- Hidden File Input -->
      <input 
        ref="fileInput" 
        type="file" 
        class="hidden" 
        :accept="accept" 
        :multiple="multiple"
        @change="handleFileChange" 
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { VFileUploadProps } from '../types/v-file-upload';

const props = withDefaults(defineProps<VFileUploadProps>(), {
  icon: 'ic:twotone-cloud-upload',
  title: 'Click to upload or drag and drop',
  subtitle: 'PNG, JPG or WebP (max. 5MB)',
  wrapperClass: 'relative border-2 border-dashed border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center hover:bg-white/[0.02] hover:border-white/10 transition-all cursor-pointer group',
  iconWrapperClass: 'w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform',
  iconClass: 'text-indigo-500 text-2xl',
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