<template>
  <div class="sticky top-0 z-40 bg-[#050505]/60 backdrop-blur-md border-b border-white/[0.03]">
    <header class="flex justify-between items-center py-4 px-6 md:px-8 lg:px-10 gap-4">
      <div class="flex items-center gap-4">
        <div>
          <h2 class="text-xl md:text-2xl font-bold flex items-center gap-2">
            Good morning, Amr 👋
          </h2>
          <p class="text-[10px] font-black text-gray-600 tracking-widest mt-1">March 21, 2026</p>
        </div>
      </div>

      <div class="flex items-center gap-3 md:gap-4 shrink-0">
        <!-- Locale Switcher -->
        <button
          @click="switchLocale"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-gray-400 hover:text-white text-xs font-bold"
        >
          <ClientOnly>
            <Icon name="ph:globe-bold" class="text-base shrink-0" />
          </ClientOnly>
          <span>{{ localeLabel }}</span>
        </button>

        <!-- Notifications -->
        <VButton 
          @click="isNotificationsOpen = true"
          variant="none" 
          :className="['relative text-gray-500 hover:text-white p-2 transition-colors', isNotificationsOpen ? 'text-white' : '']"
        >
          <ClientOnly>
            <Icon name="ph:bell-simple-bold" class="text-xl" />
          </ClientOnly>
          <span class="absolute top-2 end-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#050505]"></span>
        </VButton>

        <!-- Avatar -->
        <img src="/img/fake-user.png" class="w-10 h-10 rounded-full border border-white/10 shrink-0" alt="fake-user" />

        <!-- Mobile Menu Toggle -->
        <VButton @click="$emit('toggle-sidebar')" variant="none"
          className="lg:hidden p-2 bg-[#0c0c0e] border border-white/5 rounded-xl text-gray-400 hover:text-white transition-colors">
          <ClientOnly>
            <Icon name="ph:list-bold" class="text-xl" />
          </ClientOnly>
        </VButton>
      </div>
    </header>

    <!-- Side Over Components -->
    <notifications v-model="isNotificationsOpen" @close="isNotificationsOpen = false" />
  </div>
</template>

<script lang="ts" setup>
defineEmits(['toggle-sidebar']);

const isNotificationsOpen = ref(false)

const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const router = useRouter();

const isEnglish = computed(() => locale.value === 'en');
const localeLabel = computed(() => isEnglish.value ? 'ع' : 'EN');

const switchLocale = () => {
  const target = isEnglish.value ? 'ar' : 'en';
  router.push(switchLocalePath(target));
};
</script>
