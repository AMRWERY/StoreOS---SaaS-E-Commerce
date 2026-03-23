<template>
  <div>
    <!-- Trigger Button -->
    <VButton @click="isInternalOpen = true" variant="none"
      :className="['relative text-gray-500 hover:text-white p-2 transition-colors', isInternalOpen ? 'text-white' : '']">
      <ClientOnly>
        <icon name="ph:bell-simple-bold" class="text-xl" />
      </ClientOnly>
      <span v-if="unreadCount > 0"
        class="absolute top-2 end-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#050505] animate-ping"></span>
    </VButton>

    <Teleport to="body">
      <!-- Backdrop -->
      <Transition name="fade">
        <div v-if="isInternalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          @click="isInternalOpen = false"></div>
      </Transition>

      <!-- Slide-over Drawer -->
      <aside
        class="fixed end-0 top-0 h-full w-full max-w-[480px] bg-[#080809] border-s border-white/5 shadow-2xl flex flex-col z-[101] transition-transform duration-300 ease-in-out"
        :class="isInternalOpen ? 'translate-x-0' : 'ltr:translate-x-full rtl:-translate-x-full'">
        <!-- Header -->
        <div class="p-8 border-b border-white/5 bg-white/[0.01]">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-[10px] font-black text-gray-600 tracking-[0.2em] uppercase">
              Notifications Center
            </h3>
            <div class="flex items-center gap-4">
              <button @click="markAllAsRead"
                class="text-[9px] font-black tracking-widest text-indigo-400 hover:text-white transition-colors uppercase">
                Mark Read
              </button>
              <button @click="isInternalOpen = false" class="text-gray-500 hover:text-white transition-colors">
                <ClientOnly>
                  <icon name="ph:x-bold" class="text-lg" />
                </ClientOnly>
              </button>
            </div>
          </div>
          <h2 class="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Updates <span
              class="bg-indigo-500/10 text-indigo-500 text-[10px] px-2 py-0.5 rounded-full border border-indigo-500/20">{{
              unreadCount }} New</span>
          </h2>
        </div>

        <!-- Tabs -->
        <div class="flex border-b border-white/5 bg-black/20">
          <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
            'flex-1 py-4 text-[10px] font-black tracking-[0.15em] uppercase transition-all relative',
            activeTab === tab.id ? 'text-white' : 'text-gray-600 hover:text-gray-400'
          ]">
            {{ tab.label }}
            <div v-if="activeTab === tab.id"
              class="absolute bottom-0 start-0 end-0 h-0.5 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto hide-scrollbar bg-black/5">
          <div v-if="filteredNotifications.length > 0" class="divide-y divide-white/5">
            <div v-for="n in filteredNotifications" :key="n.id"
              class="p-8 group hover:bg-white/[0.02] transition-colors cursor-pointer relative">
              <div class="flex gap-5">
                <!-- Icon -->
                <div class="relative shrink-0">
                  <div
                    :class="['w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner', n.bgColor]">
                    <ClientOnly>
                      <icon :name="n.icon" :class="['text-2xl', n.iconColor]" />
                    </ClientOnly>
                  </div>
                  <span v-if="!n.read"
                    class="absolute -top-1 -end-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#080809] animate-ping"></span>
                </div>

                <!-- Details -->
                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between gap-2 mb-1.5">
                    <p class="text-[9px] font-black tracking-widest text-gray-600 uppercase">{{ n.category }}</p>
                    <span class="text-[9px] font-bold text-gray-700 tracking-tighter">{{ n.time }}</span>
                  </div>
                  <h4 class="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{{ n.title }}
                  </h4>
                  <p class="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed font-medium">{{ n.message }}</p>

                  <div v-if="n.type === 'orders'" class="mt-4">
                    <button
                      class="text-[10px] font-black tracking-widest text-indigo-400 hover:text-white flex items-center gap-2 transition-all uppercase group/btn">
                      View Order Details
                      <ClientOnly>
                        <icon name="ph:caret-right-bold" class="rtl:rotate-180" />
                      </ClientOnly>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="h-full flex flex-col items-center justify-center text-center p-12">
            <div
              class="w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center mb-8 border border-white/5">
              <ClientOnly>
                <icon name="ph:bell-slash-bold" class="text-4xl text-gray-700" />
              </ClientOnly>
            </div>
            <h4 class="text-xl font-bold text-gray-400 tracking-tight">Everything is quiet</h4>
            <p class="text-sm text-gray-600 mt-3 max-w-[260px] leading-relaxed">Notifications about your store activity
              and security will appear here.</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-8 border-t border-white/5 bg-[#0c0c0e]">
          <button
            class="w-full py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5 hover:border-white/10">
            View All Activity Log
          </button>
        </div>
      </aside>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
const isInternalOpen = ref(false)

const activeTab = ref('all')

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'orders', label: 'Orders' },
  { id: 'security', label: 'Security' }
]

const notifications = ref([
  {
    id: 1,
    category: 'Orders',
    title: 'New order received',
    message: '#ORD-0889 from Ethan Laurent for $189.00 is awaiting confirmation.',
    time: '2m ago',
    icon: 'ph:shopping-cart-bold',
    iconColor: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    read: false,
    type: 'orders'
  },
  {
    id: 2,
    category: 'Security',
    title: 'New login attempt',
    message: 'A successful login was detected from a new device in London, UK.',
    time: '45m ago',
    icon: 'ph:shield-check-bold',
    iconColor: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    read: false,
    type: 'security'
  },
  {
    id: 3,
    category: 'Orders',
    title: 'Payment processed',
    message: 'Payment for order #ORD-0887 was successfully processed.',
    time: '2h ago',
    icon: 'ph:check-circle-bold',
    iconColor: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    read: true,
    type: 'orders'
  },
  {
    id: 4,
    category: 'System',
    title: 'Version Update',
    message: 'StoreOS has been updated to v4.4.2. Check out the new dashboard features.',
    time: '5h ago',
    icon: 'ph:rocket-launch-bold',
    iconColor: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    read: true,
    type: 'system'
  }
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const filteredNotifications = computed(() => {
  if (activeTab.value === 'all') return notifications.value
  return notifications.value.filter(n => n.type === activeTab.value)
})

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}
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
</style>