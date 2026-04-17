<template>
  <div>
    <!-- Trigger Button -->
    <VButton @click="isInternalOpen = true" variant="none"
      :className="['relative text-tx-secondary hover:text-tx-primary p-2 transition-colors', isInternalOpen ? 'text-tx-primary' : '']">
      <Icon name="ph:bell-simple-bold" class="text-xl" />
      <span v-if="unreadCount > 0"
        class="absolute top-2 end-2 w-2 h-2 bg-red-500 rounded-full border-2 border-bg-base animate-ping"></span>
    </VButton>

    <Teleport to="body">
      <!-- Backdrop -->
      <Transition name="fade">
        <div v-if="isInternalOpen" class="fixed inset-0 bg-bg-overlay backdrop-blur-sm z-[100]"
          @click="isInternalOpen = false"></div>
      </Transition>

      <!-- Slide-over Drawer -->
      <Transition name="slide">
        <aside v-if="isInternalOpen"
          class="fixed end-0 top-0 h-full w-full max-w-[480px] bg-bg-primary border-s border-border-subtle shadow-2xl flex flex-col z-[101]">
          <!-- Header -->
          <div class="px-4 py-3.5 border-b border-border-subtle bg-bg-elevated">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-[10px] font-black text-tx-muted tracking-[0.2em]">
                Notifications Center
              </h3>
              <div class="flex items-center gap-4">
                <button @click="markAllAsRead"
                  class="text-[9px] font-black tracking-widest text-brand hover:text-tx-primary transition-colors">
                  Mark Read
                </button>
                <button @click="isInternalOpen = false" class="text-tx-secondary hover:text-tx-primary transition-colors">
                  <ClientOnly>
                    <Icon name="ph:x-bold" class="text-lg" />
                  </ClientOnly>
                </button>
              </div>
            </div>
            <h2 class="text-2xl font-bold text-tx-primary tracking-tight flex items-center gap-3">
              Updates <span
                class="bg-brand-dim text-brand text-[10px] px-2 py-0.5 rounded-full border border-brand/20">{{
                  unreadCount }} New</span>
            </h2>
          </div>

          <!-- Tabs -->
          <div class="flex border-b border-border-subtle bg-bg-overlay">
            <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
              'flex-1 py-4 text-[10px] font-black tracking-[0.15em] transition-all relative',
              activeTab === tab.id ? 'text-tx-primary' : 'text-tx-muted hover:text-tx-secondary'
            ]">
              {{ tab.label }}
              <div v-if="activeTab === tab.id"
                class="absolute bottom-0 start-0 end-0 h-0.5 bg-brand shadow-[0_0_10px_rgba(99,102,241,0.5)]">
              </div>
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto hide-scrollbar bg-black/5">
            <div v-if="filteredNotifications.length > 0" class="divide-y divide-border-subtle">
              <div v-for="n in filteredNotifications" :key="n.id"
                class="px-4 py-3.5 group hover:bg-bg-elevated transition-colors cursor-pointer relative">
                <div class="flex gap-5">
                  <!-- Icon -->
                  <div class="relative shrink-0">
                    <div
                      :class="['w-14 h-14 rounded-2xl flex items-center justify-center border border-border-subtle shadow-inner', n.bgColor]">
                      <ClientOnly>
                        <Icon :name="n.icon" :class="['text-2xl', n.iconColor]" />
                      </ClientOnly>
                    </div>
                    <span v-if="!n.read"
                      class="absolute -top-1 -end-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-bg-primary animate-ping"></span>
                  </div>

                  <!-- Details -->
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-2 mb-1.5">
                      <p class="text-[9px] font-black tracking-widest text-tx-muted">{{ n.category }}</p>
                      <span class="text-[9px] font-bold text-tx-muted tracking-tighter">{{ n.time }}</span>
                    </div>
                    <h4 class="text-sm font-bold text-tx-primary group-hover:text-brand transition-colors">{{ n.title }}
                    </h4>
                    <p class="text-xs text-tx-secondary mt-2 line-clamp-2 leading-relaxed font-medium">{{ n.message }}</p>

                    <div v-if="n.type === 'orders'" class="mt-4">
                      <button
                        class="text-[10px] font-black tracking-widest text-brand hover:text-tx-primary flex items-center gap-2 transition-all group/btn">
                        View Order Details
                        <ClientOnly>
                          <Icon name="ph:caret-right-bold" class="rtl:rotate-180" />
                        </ClientOnly>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="h-full flex flex-col items-center justify-center text-center p-5">
              <div
                class="w-24 h-24 rounded-2xl bg-bg-elevated flex items-center justify-center mb-8 border border-border-subtle">
                <ClientOnly>
                  <Icon name="ph:bell-slash-bold" class="text-4xl text-tx-muted" />
                </ClientOnly>
              </div>
              <h4 class="text-xl font-bold text-tx-secondary tracking-tight">Everything is quiet</h4>
              <p class="text-sm text-tx-muted mt-3 max-w-[260px] leading-relaxed">Notifications about your store
                activity
                and security will appear here.</p>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-4 py-3.5 border-t border-border-subtle bg-bg-primary">
            <button
              class="w-full py-4 rounded-xl font-black text-[10px] tracking-widest bg-bg-elevated hover:bg-bg-elevated text-tx-primary transition-all border border-border-subtle hover:border-border-default">
              View All Activity Log
            </button>
          </div>
        </aside>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
const notificationsStore = useNotificationsStore()
const { activeTab, tabs, unreadCount, filteredNotifications } = storeToRefs(notificationsStore)
const { markAllAsRead } = notificationsStore

const isInternalOpen = ref(false)
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
