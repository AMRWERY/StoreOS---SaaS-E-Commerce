<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header :title="t('dashboard.ops.themes.title')" :subtitle="t('dashboard.ops.themes.subtitle')">
          <LazyVButton
            variant="secondary"
            icon="ph:clock-counter-clockwise-bold"
            iconPosition="left"
            :label="t('dashboard.ops.themes.history')"
            :to="localePath('/dashboard/themes/history')"
          />
        </ops-page-header>

        <section class="card overflow-hidden">
          <div v-if="published" class="grid grid-cols-1 md:grid-cols-5">
            <div
              :class="[
                'md:col-span-2 min-h-44 bg-gradient-to-br flex items-center justify-center border-b md:border-b-0 md:border-e border-border-subtle',
                published.gradient,
              ]"
            >
              <Icon :name="published.icon" class="w-14 h-14 text-brand" />
            </div>
            <div class="md:col-span-3 p-5 space-y-3">
              <div class="flex items-center gap-2">
                <p class="text-[11px] font-bold text-tx-muted tracking-widest">{{ t('dashboard.ops.themes.current') }}</p>
                <status-pill tone="success">{{ t('dashboard.ops.themes.active') }}</status-pill>
              </div>
              <h2 class="text-xl font-bold">{{ published.name }}</h2>
              <p class="text-sm text-tx-muted">{{ t(`dashboard.ops.themes.desc.${published.id}`) }}</p>
              <p class="text-xs text-tx-muted">
                {{ t('dashboard.ops.themes.lastPublished') }}:
                <span class="font-mono text-tx-secondary">{{ published.publishedAt }}</span>
              </p>
            </div>
          </div>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.themes.noneTitle')"
            :hint="t('dashboard.ops.themes.noneHint')"
            icon="ph:paint-brush-bold"
          />
        </section>

        <section class="space-y-3">
          <h3 class="text-sm font-bold">{{ t('dashboard.ops.themes.installedTitle') }}</h3>
          <div v-if="installed.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <article v-for="th in installed" :key="th.id" class="card overflow-hidden">
              <div :class="['h-28 bg-gradient-to-br flex items-center justify-center', th.gradient]">
                <Icon :name="th.icon" class="w-9 h-9 text-tx-primary" />
              </div>
              <div class="p-4 space-y-3">
                <div>
                  <h4 class="text-sm font-bold">{{ th.name }}</h4>
                  <p class="text-xs text-tx-muted">{{ t(`dashboard.ops.themes.desc.${th.id}`) }}</p>
                </div>
                <div class="flex gap-2">
                  <LazyVButton className="!py-1 !px-3 !text-xs" variant="secondary" :label="t('dashboard.ops.themes.preview')" />
                  <LazyVButton className="!py-1 !px-3 !text-xs" :label="t('dashboard.ops.themes.activate')" @click="activate(th.id)" />
                </div>
              </div>
            </article>
          </div>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.themes.emptyInstalled')"
            :hint="t('dashboard.ops.themes.emptyInstalledHint')"
            icon="ph:palette-bold"
          />
        </section>

        <section class="space-y-3">
          <h3 class="text-sm font-bold">{{ t('dashboard.ops.themes.startersTitle') }}</h3>
          <div v-if="starters.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <article v-for="th in starters" :key="th.id" class="card overflow-hidden">
              <div :class="['h-28 bg-gradient-to-br flex items-center justify-center', th.gradient]">
                <Icon :name="th.icon" class="w-9 h-9 text-tx-primary" />
              </div>
              <div class="p-4 space-y-3">
                <div>
                  <div class="flex items-center gap-2">
                    <h4 class="text-sm font-bold">{{ th.name }}</h4>
                    <status-pill v-if="th.rtl" tone="purple">{{ t('dashboard.ops.themes.rtl') }}</status-pill>
                  </div>
                  <p class="text-xs text-tx-muted">{{ t(`dashboard.ops.themes.desc.${th.id}`) }}</p>
                </div>
                <div class="flex gap-2">
                  <LazyVButton className="!py-1 !px-3 !text-xs" variant="secondary" :label="t('dashboard.ops.themes.preview')" />
                  <LazyVButton className="!py-1 !px-3 !text-xs" :label="t('dashboard.ops.themes.install')" @click="install(th.id)" />
                </div>
              </div>
            </article>
          </div>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.themes.emptyStarters')"
            :hint="t('dashboard.ops.themes.emptyStartersHint')"
            icon="ph:palette-bold"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const localePath = useLocalePath()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.themes.title') })

const store = useEcoThemesStore()
const { published, installed, starters } = storeToRefs(store)
const { install, activate } = store
</script>
