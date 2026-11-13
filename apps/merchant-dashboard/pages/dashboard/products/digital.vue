<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.digital.title')"
          :subtitle="t('dashboard.ops.digital.subtitle')"
          :count="products.length"
        />

        <section class="card overflow-hidden">
          <LazyVTable v-if="products.length" :headers="headers" :items="products">
            <template #cell(product)="{ item }">
              <span class="text-sm font-semibold">{{ item.product }}</span>
            </template>
            <template #cell(files)="{ item }">
              <span class="font-mono text-sm">{{ item.files }}</span>
            </template>
            <template #cell(downloadLimit)="{ item }">
              <span class="font-mono text-sm">{{ item.downloadLimit }}</span>
            </template>
            <template #cell(expiryHours)="{ item }">
              <span class="font-mono text-sm">{{ item.expiryHours }}</span>
            </template>
            <template #cell(licenseKeys)="{ item }">
              <LazyVSwitchButton
                :model-value="item.licenseKeys"
                @update:model-value="(v: boolean) => store.toggleLicense(item.id, v)"
              />
            </template>
            <template #cell(actions)="{ item }">
              <LazyVButton
                variant="secondary"
                icon="ph:paperclip-bold"
                iconPosition="left"
                :label="t('dashboard.ops.digital.attach')"
                @click="openPanel(item.id)"
              />
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.digital.empty')"
            :hint="t('dashboard.ops.digital.emptyHint')"
            icon="ph:cloud-arrow-down-bold"
          />
        </section>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section class="card px-4 py-3.5 space-y-3">
            <h2 class="text-eyebrow">{{ t('dashboard.ops.digital.emailPreview') }}</h2>
            <div class="bg-bg-elevated border border-border-subtle rounded-md p-4 space-y-2 text-xs">
              <p class="text-tx-muted">{{ t('dashboard.ops.digital.emailSubject') }}</p>
              <p class="font-semibold text-sm">{{ t('dashboard.ops.digital.emailGreeting') }}</p>
              <p class="text-tx-secondary">{{ t('dashboard.ops.digital.emailBody') }}</p>
              <span class="inline-block bg-brand text-tx-primary rounded-md px-3 py-1.5 font-semibold">
                {{ t('dashboard.ops.digital.emailButton') }}
              </span>
              <p class="text-tx-muted font-mono">{{ t('dashboard.ops.digital.emailFooter') }}</p>
            </div>
          </section>

          <section class="card overflow-hidden">
            <div class="px-4 py-3 border-b border-border-subtle">
              <h2 class="text-eyebrow">{{ t('dashboard.ops.digital.recentDownloads') }}</h2>
            </div>
            <LazyVTable v-if="downloads.length" :headers="downloadHeaders" :items="downloads">
              <template #cell(product)="{ item }">
                <span class="text-xs font-semibold">{{ item.product }}</span>
              </template>
              <template #cell(customer)="{ item }">
                <span class="text-xs text-tx-secondary">{{ item.customer }}</span>
              </template>
              <template #cell(at)="{ item }">
                <span class="font-mono text-xs">{{ item.at }}</span>
              </template>
              <template #cell(ip)="{ item }">
                <span class="font-mono text-xs text-tx-muted">{{ item.ip }}</span>
              </template>
            </LazyVTable>
            <ops-empty-state
              v-else
              :title="t('dashboard.ops.digital.noDownloads')"
              icon="ph:download-simple-bold"
            />
          </section>
        </div>
      </div>
    </div>

    <LazyVSidePanel
      v-model="isOpen"
      :title="t('dashboard.ops.digital.attachTitle')"
      :subtitle="active?.product"
    >
      <div class="space-y-5 p-1">
        <LazyVFileUpload
          multiple
          :title="t('dashboard.ops.digital.uploadTitle')"
          :subtitle="t('dashboard.ops.digital.uploadHint')"
          @change="onFile"
        />
        <p class="text-xs text-tx-secondary">
          {{ t('dashboard.ops.digital.currentFiles') }}:
          <span class="font-mono">{{ active?.files ?? 0 }}</span>
        </p>
        <LazyVButton class="w-full" :label="t('dashboard.ops.catxCommon.done')" @click="isOpen = false" />
      </div>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.digital.title') })

const store = useCatxDigitalStore()
const { products, downloads } = storeToRefs(store)

const isOpen = ref(false)
const activeId = ref<string | null>(null)
const active = computed(() => products.value.find((p) => p.id === activeId.value))

function openPanel(id: string) {
  activeId.value = id
  isOpen.value = true
}

function onFile(file: File | null) {
  if (file && activeId.value) store.addFiles(activeId.value, 1)
}

const headers = computed(() => [
  { key: 'product', label: t('dashboard.ops.digital.cols.product') },
  { key: 'files', label: t('dashboard.ops.digital.cols.files') },
  { key: 'downloadLimit', label: t('dashboard.ops.digital.cols.limit') },
  { key: 'expiryHours', label: t('dashboard.ops.digital.cols.expiry') },
  { key: 'licenseKeys', label: t('dashboard.ops.digital.cols.license') },
  { key: 'actions', label: '' },
])

const downloadHeaders = computed(() => [
  { key: 'product', label: t('dashboard.ops.digital.cols.product') },
  { key: 'customer', label: t('dashboard.ops.common.customer') },
  { key: 'at', label: t('dashboard.ops.common.date') },
  { key: 'ip', label: t('dashboard.ops.digital.cols.ip') },
])
</script>
