<template>
  <div class="space-y-5">
    <div class="space-y-1">
      <LazyVInput v-model="seoTitle" :label="t('dashboard.ops.productSeo.seoTitle')" />
      <p class="text-[10px] font-mono text-end" :class="seoTitle.length > TITLE_MAX ? 'text-danger' : 'text-tx-muted'">
        {{ seoTitle.length }}/{{ TITLE_MAX }}
      </p>
    </div>

    <div class="space-y-1">
      <LazyVTextareaInput v-model="seoDescription" :rows="3" :label="t('dashboard.ops.productSeo.seoDescription')" />
      <p class="text-[10px] font-mono text-end" :class="seoDescription.length > DESC_MAX ? 'text-danger' : 'text-tx-muted'">
        {{ seoDescription.length }}/{{ DESC_MAX }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <LazyVInput v-model="seoHandle" :label="t('dashboard.ops.productSeo.handle')" class="font-mono" />
      <LazyVInput v-model="seoCanonical" :label="t('dashboard.ops.productSeo.canonical')" class="font-mono" placeholder="https://" />
    </div>

    <div class="space-y-2">
      <p class="text-eyebrow">{{ t('dashboard.ops.productSeo.socialImage') }}</p>
      <LazyVFileUpload :title="t('dashboard.ops.productSeo.uploadTitle')" :subtitle="t('dashboard.ops.productSeo.uploadHint')" accept="image/*" />
    </div>

    <LazyVSwitchButton v-model="seoJsonLd" :label="t('dashboard.ops.productSeo.jsonLd')" />

    <div class="space-y-2">
      <p class="text-eyebrow">{{ t('dashboard.ops.productSeo.preview') }}</p>
      <div class="bg-bg-elevated border border-border-subtle rounded-md p-4 space-y-1" dir="ltr">
        <p class="font-mono text-[11px] text-tx-muted truncate">{{ previewUrl }}</p>
        <p class="text-base text-info truncate">{{ seoTitle || t('dashboard.ops.productSeo.titlePlaceholder') }}</p>
        <p class="text-xs text-tx-secondary line-clamp-2">
          {{ seoDescription || t('dashboard.ops.productSeo.descriptionPlaceholder') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{ productName?: string; handle?: string }>(),
  { productName: '', handle: '' },
)

const { t } = useI18n()

const TITLE_MAX = 60
const DESC_MAX = 160

const seoTitle = ref(props.productName)
const seoDescription = ref("")
const seoHandle = ref(props.handle)
const seoCanonical = ref("")
const seoJsonLd = ref(true)

const previewUrl = computed(() => `https://store.example.com/products/${seoHandle.value || '...'}`)
</script>
