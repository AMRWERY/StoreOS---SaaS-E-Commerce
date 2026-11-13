<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.navigation.title')"
          :subtitle="t('dashboard.ops.navigation.subtitle')"
          :count="menus.length"
        >
          <span v-if="lastSaved" class="text-[11px] text-tx-muted">
            {{ t('dashboard.ops.navigation.savedAt') }}
            <span class="font-mono">{{ lastSaved }}</span>
          </span>
          <LazyVButton
            :label="t('dashboard.ops.common.save')"
            :className="dirty ? '' : 'opacity-60'"
            @click="save"
          />
        </ops-page-header>

        <div class="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4">
          <aside class="card p-2 space-y-1 self-start">
            <button
              v-for="m in menus"
              :key="m.id"
              type="button"
              class="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md text-sm text-start transition-colors duration-200"
              :class="m.id === selectedId ? 'bg-brand-dim text-brand' : 'text-tx-secondary hover:bg-bg-elevated'"
              @click="selectedId = m.id"
            >
              <span class="truncate">{{ m.name }}</span>
              <span class="font-mono text-[10px] text-tx-muted">{{ m.items.length }}</span>
            </button>
          </aside>

          <section v-if="selected" class="card p-4 space-y-3">
            <div class="flex items-center justify-between gap-3">
              <div>
                <h2 class="text-sm font-semibold">{{ selected.name }}</h2>
                <p class="text-[11px] text-tx-muted font-mono">{{ selected.handle }}</p>
              </div>
              <LazyVButton
                size="none"
                variant="secondary"
                className="px-3 py-1.5 text-[11px]"
                icon="ph:plus-bold"
                :label="t('dashboard.ops.navigation.addItem')"
                @click="addItem()"
              />
            </div>

            <ul v-if="selected.items.length" class="space-y-2">
              <li v-for="(item, i) in selected.items" :key="item.id" class="space-y-2">
                <div class="flex flex-wrap items-center gap-2 bg-bg-elevated border border-border-subtle rounded-md p-2">
                  <div class="flex flex-col">
                    <button
                      type="button"
                      class="text-tx-muted hover:text-tx-primary disabled:opacity-30"
                      :disabled="i === 0"
                      :aria-label="t('dashboard.ops.navigation.moveUp')"
                      @click="move(item, -1)"
                    >
                      <Icon name="ph:caret-up-bold" />
                    </button>
                    <button
                      type="button"
                      class="text-tx-muted hover:text-tx-primary disabled:opacity-30"
                      :disabled="i === selected.items.length - 1"
                      :aria-label="t('dashboard.ops.navigation.moveDown')"
                      @click="move(item, 1)"
                    >
                      <Icon name="ph:caret-down-bold" />
                    </button>
                  </div>
                  <div class="flex-1 min-w-[140px]">
                    <LazyVInput v-model="item.label" :placeholder="t('dashboard.ops.navigation.label')" />
                  </div>
                  <div class="flex-1 min-w-[140px]">
                    <LazyVInput v-model="item.url" :placeholder="t('dashboard.ops.navigation.link')" />
                  </div>
                  <LazyVButton
                    size="none"
                    variant="ghost"
                    className="px-2 py-1 text-[11px]"
                    icon="ph:plus-bold"
                    :label="t('dashboard.ops.navigation.addChild')"
                    @click="addItem(item)"
                  />
                  <LazyVButton
                    variant="none"
                    className="p-1.5 text-tx-muted hover:text-danger transition-colors"
                    :aria-label="t('dashboard.ops.common.delete')"
                    @click="removeItem(item)"
                  >
                    <Icon name="ph:trash-bold" />
                  </LazyVButton>
                </div>

                <ul v-if="item.children.length" class="space-y-2 ms-8">
                  <li
                    v-for="(child, j) in item.children"
                    :key="child.id"
                    class="flex flex-wrap items-center gap-2 bg-bg-base border border-border-subtle rounded-md p-2"
                  >
                    <div class="flex flex-col">
                      <button
                        type="button"
                        class="text-tx-muted hover:text-tx-primary disabled:opacity-30"
                        :disabled="j === 0"
                        :aria-label="t('dashboard.ops.navigation.moveUp')"
                        @click="move(child, -1, item)"
                      >
                        <Icon name="ph:caret-up-bold" />
                      </button>
                      <button
                        type="button"
                        class="text-tx-muted hover:text-tx-primary disabled:opacity-30"
                        :disabled="j === item.children.length - 1"
                        :aria-label="t('dashboard.ops.navigation.moveDown')"
                        @click="move(child, 1, item)"
                      >
                        <Icon name="ph:caret-down-bold" />
                      </button>
                    </div>
                    <div class="flex-1 min-w-[140px]">
                      <LazyVInput v-model="child.label" :placeholder="t('dashboard.ops.navigation.label')" />
                    </div>
                    <div class="flex-1 min-w-[140px]">
                      <LazyVInput v-model="child.url" :placeholder="t('dashboard.ops.navigation.link')" />
                    </div>
                    <LazyVButton
                      variant="none"
                      className="p-1.5 text-tx-muted hover:text-danger transition-colors"
                      :aria-label="t('dashboard.ops.common.delete')"
                      @click="removeItem(child, item)"
                    >
                      <Icon name="ph:trash-bold" />
                    </LazyVButton>
                  </li>
                </ul>
              </li>
            </ul>
            <ops-empty-state
              v-else
              :title="t('dashboard.ops.navigation.empty')"
              :hint="t('dashboard.ops.navigation.emptyHint')"
              icon="ph:list-bullets-bold"
            />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.navigation.title') })

const store = useNavigationStore()
const { menus, selectedId, selected, dirty, lastSaved } = storeToRefs(store)
const { addItem, removeItem, move, save } = store
</script>
