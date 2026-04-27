<template>
  <div>
    <!-- Trigger Button -->
    <button
      @click="isInternalOpen = true"
      :class="[
        'relative text-tx-secondary hover:text-tx-primary p-2 transition-colors',
        isInternalOpen ? 'text-tx-primary' : '',
      ]"
    >
      <Icon name="ph:bell-simple-bold" class="text-xl" />
      <span
        v-if="unreadCount > 0"
        class="absolute top-2 end-2 w-2 h-2 bg-red-500 rounded-full border-2 border-bg-base animate-ping"
      ></span>
    </button>

    <Teleport to="body">
      <!-- Backdrop -->
      <Transition name="fade">
        <div
          v-if="isInternalOpen"
          class="fixed inset-0 bg-bg-overlay/40 backdrop-blur-sm z-[100]"
          @click="isInternalOpen = false"
        ></div>
      </Transition>

      <!-- Slide-over Drawer -->
      <Transition name="slide">
        <aside
          v-if="isInternalOpen"
          class="fixed end-0 top-0 h-full w-full max-w-[400px] bg-bg-base border-s border-border-subtle shadow-2xl flex flex-col z-[101]"
        >
          <!-- Header -->
          <div class="px-6 py-6 border-b border-border-subtle bg-bg-primary">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-[10px] font-black text-tx-muted tracking-[0.2em]">
                {{ t("storefront.notifications.center") }}
              </h3>
              <div class="flex items-center gap-4">
                <button
                  @click="markAllAsRead"
                  class="text-[9px] font-black tracking-widest text-brand hover:text-brand-hover transition-colors"
                >
                  {{ t("storefront.notifications.markRead") }}
                </button>
                <button
                  @click="isInternalOpen = false"
                  class="text-tx-muted hover:text-tx-primary transition-colors"
                >
                  <Icon name="ph:x-bold" class="text-lg" />
                </button>
              </div>
            </div>
            <h2
              class="text-2xl font-bold text-tx-primary tracking-tight flex items-center gap-3"
            >
              {{ t("storefront.notifications.updates") }}
              <span
                class="bg-brand-dim text-brand text-[10px] px-2 py-0.5 rounded-full border border-brand/20"
                >{{ unreadCount }} {{ t("storefront.notifications.new") }}</span
              >
            </h2>
          </div>

          <!-- Tabs -->
          <div class="flex border-b border-border-subtle bg-bg-base">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'flex-1 py-4 text-[10px] font-black tracking-[0.15em] transition-all relative',
                activeTab === tab.id
                  ? 'text-tx-primary'
                  : 'text-tx-muted hover:text-tx-secondary',
              ]"
            >
              {{ tab.label }}
              <div
                v-if="activeTab === tab.id"
                class="absolute bottom-0 start-0 end-0 h-0.5 bg-brand shadow-[0_0_10px_rgba(99,102,241,0.5)]"
              ></div>
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto hide-scrollbar bg-bg-primary">
            <div
              v-if="filteredNotifications.length > 0"
              class="divide-y divide-border-subtle"
            >
              <div
                v-for="n in filteredNotifications"
                :key="n.id"
                class="px-6 py-5 group hover:bg-white transition-colors cursor-pointer relative"
              >
                <div class="flex gap-4">
                  <!-- Icon -->
                  <div class="relative shrink-0">
                    <div
                      :class="[
                        'w-12 h-12 rounded-xl flex items-center justify-center border border-border-subtle shadow-inner',
                        n.bgColor,
                      ]"
                    >
                      <Icon :name="n.icon" :class="['text-2xl', n.iconColor]" />
                    </div>
                    <span
                      v-if="!n.read"
                      class="absolute -top-1 -end-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-bg-base animate-ping"
                    ></span>
                  </div>

                  <!-- Details -->
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-2 mb-1">
                      <p
                        class="text-[9px] font-black tracking-widest text-tx-muted"
                      >
                        {{ n.category }}
                      </p>
                      <span
                        class="text-[9px] font-bold text-tx-muted tracking-tighter"
                        >{{ n.time }}</span
                      >
                    </div>
                    <h4
                      class="text-sm font-bold text-tx-primary group-hover:text-brand transition-colors"
                    >
                      {{ n.title }}
                    </h4>
                    <p
                      class="text-xs text-tx-secondary mt-1 line-clamp-2 leading-relaxed font-medium"
                    >
                      {{ n.message }}
                    </p>

                    <div v-if="n.type === 'orders'" class="mt-3">
                      <button
                        class="text-[10px] font-black tracking-widest text-brand hover:text-brand-hover flex items-center gap-2 transition-all active:translate-x-1"
                      >
                        {{ t("storefront.notifications.viewOrderDetails") }}
                        <Icon
                          name="ph:caret-right-bold"
                          class="rtl:rotate-180"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div
              v-else
              class="h-full flex flex-col items-center justify-center text-center p-8"
            >
              <div
                class="w-20 h-20 rounded-2xl bg-bg-elevated flex items-center justify-center mb-6 border border-border-subtle"
              >
                <Icon
                  name="ph:bell-slash-bold"
                  class="text-3xl text-tx-muted opacity-40"
                />
              </div>
              <h4 class="text-xl font-bold text-tx-secondary tracking-tight">
                {{ t("storefront.notifications.quiet") }}
              </h4>
              <p
                class="text-sm text-tx-muted mt-2 max-w-[260px] leading-relaxed"
              >
                {{ t("storefront.notifications.quietDesc") }}
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-6 py-6 border-t border-border-subtle bg-bg-base">
            <VButton variant="secondary" className="w-full py-4 font-black">
              {{ t("storefront.notifications.viewActivityLog") }}
            </VButton>
          </div>
        </aside>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
const isInternalOpen = ref(false);

const notifStore = useStorefrontNotificationsStore();
const { activeTab, tabs, unreadCount, filteredNotifications } =
  storeToRefs(notifStore);
const { markAllAsRead } = notifStore;
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

[dir="rtl"] .slide-enter-from,
[dir="rtl"] .slide-leave-to {
  transform: translateX(-100%);
}
</style>