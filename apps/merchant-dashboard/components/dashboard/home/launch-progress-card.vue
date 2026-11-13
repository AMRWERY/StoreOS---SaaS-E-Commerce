<!--
  Launch-readiness summary for the dashboard home. Reads useLaunchChecklistStore().
  Hides itself once every task is done. No props or events.
-->
<template>
  <section v-if="progress < 100" class="card p-4 mb-6">
    <div class="flex flex-col md:flex-row md:items-center gap-4">
      <div class="md:w-64 shrink-0">
        <p class="text-eyebrow">{{ t('dashboard.ops.launch.title') }}</p>
        <p class="mt-1 font-mono text-lg font-bold text-tx-primary">
          {{ doneCount }}/{{ tasks.length }}
        </p>
        <div
          class="mt-2 h-1.5 w-full rounded-full bg-bg-elevated overflow-hidden"
          role="progressbar"
          :aria-valuenow="progress"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-label="t('dashboard.ops.launch.progress')"
        >
          <div
            class="h-full rounded-full bg-brand transition-all duration-300"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
        <p class="mt-1 font-mono text-[10px] text-tx-muted">{{ progress }}%</p>
      </div>

      <ul class="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 gap-2">
        <li v-for="task in nextTasks" :key="task.id">
          <nuxt-link-locale
            :to="task.to"
            class="flex items-center gap-2 rounded-md border border-border-subtle bg-bg-elevated px-3 py-2 text-xs text-tx-secondary hover:border-border-default hover:text-tx-primary transition-colors"
          >
            <Icon name="ph:circle-bold" class="shrink-0 text-tx-muted" />
            <span class="truncate flex-1">
              {{ t(`dashboard.ops.launch.tasks.${task.id}.title`) }}
            </span>
            <Icon name="ph:arrow-right-bold" class="shrink-0 text-tx-muted rtl:rotate-180" />
          </nuxt-link-locale>
        </li>
      </ul>

      <nuxt-link-locale
        to="/dashboard/launch-checklist"
        class="shrink-0 inline-flex items-center justify-center gap-2 rounded-md bg-brand hover:bg-brand-hover px-4 py-2 text-xs font-bold text-tx-primary transition-colors"
      >
        {{ t('dashboard.ops.launch.viewChecklist') }}
      </nuxt-link-locale>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { tasks, doneCount, progress } = storeToRefs(useLaunchChecklistStore())

const nextTasks = computed(() => tasks.value.filter((x) => !x.done).slice(0, 3))
</script>
