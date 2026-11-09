<template>
  <div>
    <Teleport to="body">
      <Transition name="overlay-fade">
        <div
          v-if="show"
          dir="ltr"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-bg-base backdrop-blur-xl"
        >
          <div class="flex flex-col items-center gap-6 animate-pulse-slow">
            <!-- Logo -->
            <img
              src="/gif/storeose-logo.gif"
              alt="storeose-logo"
              class="h-36 w-auto"
              width="117"
              height="40"
            />

            <!-- Loading indicator -->
            <div class="flex gap-1.5">
              <div
                class="status-dot bg-brand/40 animate-bounce"
                style="animation-delay: 0s"
              ></div>
              <div
                class="status-dot bg-brand/40 animate-bounce"
                style="animation-delay: 0.1s"
              ></div>
              <div
                class="status-dot bg-brand/40 animate-bounce"
                style="animation-delay: 0.2s"
              ></div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  show: boolean;
}>();
</script>

<style scoped>
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.8;
    transform: scale(0.98);
  }
}
</style>
