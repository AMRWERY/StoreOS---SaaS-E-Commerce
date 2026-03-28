<template>
  <div class="sticky top-0 z-40 bg-bg-base/60 backdrop-blur-md border-b border-border-subtle">
    <header class="flex justify-between items-center py-4 px-6 md:px-8 lg:px-10 gap-4">
      <div class="flex items-center gap-4">
        <div>
          <h2 class="text-xl md:text-2xl font-bold flex items-center gap-2">
            {{ greeting }}, Amr {{ emoji }}
          </h2>
          <div class="flex items-center gap-2 text-xs font-semibold text-tx-muted tracking-[0.6px] mt-1">
            <span class="font-mono">{{ currentDate }}</span>
            <span class="w-1 h-1 rounded-full bg-tx-muted"></span>
            
            <ClientOnly>
              <div class="flex items-center font-mono text-tx-secondary overflow-hidden relative">
                <div class="relative w-4 h-4 inline-flex justify-center">
                  <Transition name="time-slide">
                    <span :key="timeParts.hour" class="absolute">{{ timeParts.hour }}</span>
                  </Transition>
                </div>
                <span class="mx-0.5">:</span>
                <div class="relative w-4 h-4 inline-flex justify-center">
                  <Transition name="time-slide">
                    <span :key="timeParts.minute" class="absolute">{{ timeParts.minute }}</span>
                  </Transition>
                </div>
                <span class="mx-0.5">:</span>
                <div class="relative w-4 h-4 inline-flex justify-center">
                  <Transition name="time-slide">
                    <span :key="timeParts.second" class="absolute">{{ timeParts.second }}</span>
                  </Transition>
                </div>
                <span class="w-1"></span>
                <div class="relative w-5 h-4 inline-flex justify-center">
                  <Transition name="time-slide">
                    <span :key="timeParts.ampm" class="absolute tracking-tight">{{ timeParts.ampm }}</span>
                  </Transition>
                </div>
              </div>
            </ClientOnly>
            
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 md:gap-4 shrink-0">
        <!-- Locale Switcher -->
        <button @click="switchLocale"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-bg-elevated hover:bg-bg-elevated border border-border-subtle transition-colors text-tx-secondary hover:text-tx-primary text-xs font-bold">
          <ClientOnly>
            <Icon name="ph:globe-bold" class="text-base shrink-0" />
          </ClientOnly>
          <span>{{ localeLabel }}</span>
        </button>

        <!-- Notifications -->
        <notifications />

        <!-- Avatar -->
        <img src="/img/fake-user.avif" class="w-10 h-10 rounded-full border border-border-default shrink-0" alt="fake-user" />

        <!-- Mobile Menu Toggle -->
        <VButton @click="$emit('toggle-sidebar')" variant="none"
          className="lg:hidden p-2 bg-bg-primary border border-border-subtle rounded-md text-tx-secondary hover:text-tx-primary transition-colors">
          <ClientOnly>
            <Icon name="ph:list-bold" class="text-xl" />
          </ClientOnly>
        </VButton>
      </div>
    </header>

    <!-- Side Over Components -->
    <VOverlay :show="showOverlay" />
  </div>
</template>

<script lang="ts" setup>
defineEmits(["toggle-sidebar"]);

const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const router = useRouter();
const { greeting, emoji, currentDate, timeParts } = useGreeting();

const isEnglish = computed(() => locale.value === "en");
const localeLabel = computed(() => (isEnglish.value ? "ع" : "EN"));

const showOverlay = ref(false);

const switchLocale = async () => {
  const target = isEnglish.value ? "ar" : "en";
  showOverlay.value = true;

  // Wait for overlay animation (increased to 2.5s per user request)
  await new Promise((resolve) => setTimeout(resolve, 2500));

  await router.push(switchLocalePath(target));

  // Hide overlay after navigation
  setTimeout(() => {
    showOverlay.value = false;
  }, 200);
};
</script>

<style scoped>
.time-slide-enter-active,
.time-slide-leave-active {
  transition: all 0.3s ease;
}
.time-slide-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.time-slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
