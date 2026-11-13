<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-3xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.launch.title')"
          :subtitle="t('dashboard.ops.launch.subtitle')"
        />

        <div class="card p-5 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-eyebrow">{{ t('dashboard.ops.launch.progress') }}</span>
            <span class="font-mono text-sm font-semibold">{{ doneCount }}/{{ tasks.length }}</span>
          </div>
          <div class="h-1.5 bg-bg-elevated rounded-full overflow-hidden">
            <div
              class="h-full bg-brand rounded-full transition-all duration-300"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
          <p v-if="progress === 100" class="text-xs text-success font-semibold">
            {{ t('dashboard.ops.launch.ready') }}
          </p>
        </div>

        <section v-for="group in groups" :key="group" class="card overflow-hidden">
          <h2 class="text-eyebrow px-5 pt-4 pb-2">{{ t(`dashboard.ops.launch.groups.${group}`) }}</h2>
          <ul>
            <li
              v-for="task in tasks.filter((x) => x.group === group)"
              :key="task.id"
              class="flex items-center gap-3 px-5 py-3 border-t border-border-subtle"
            >
              <button
                class="w-5 h-5 shrink-0 rounded-full border flex items-center justify-center transition-colors"
                :class="task.done ? 'bg-success border-success text-white' : 'border-border-default text-transparent hover:border-brand'"
                :aria-label="t(`dashboard.ops.launch.tasks.${task.id}.title`)"
                :aria-pressed="task.done"
                @click="toggle(task.id)"
              >
                <Icon name="ph:check-bold" class="text-[10px]" />
              </button>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold" :class="task.done ? 'text-tx-muted line-through' : ''">
                  {{ t(`dashboard.ops.launch.tasks.${task.id}.title`) }}
                </p>
                <p class="text-xs text-tx-muted truncate">{{ t(`dashboard.ops.launch.tasks.${task.id}.hint`) }}</p>
              </div>
              <nuxt-link-locale
                v-if="!task.done"
                :to="task.to"
                class="text-[11px] font-semibold text-brand hover:text-brand-hover"
              >
                {{ t('dashboard.ops.launch.go') }}
              </nuxt-link-locale>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.launch.title') })

const store = useLaunchChecklistStore()
const { tasks, doneCount, progress } = storeToRefs(store)
const { toggle } = store

const groups = ['store', 'payments', 'shipping', 'launch'] as const
</script>
