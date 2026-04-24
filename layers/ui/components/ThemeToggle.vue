<template>
  <VButton
    ref="btnRef"
    type="button"
    variant="none"
    :aria-label="isDark ? $t('nav.useLightTheme') : $t('nav.useDarkTheme')"
    className="flex items-center justify-center p-2 rounded-md text-tx-secondary hover:text-tx-primary hover:bg-bg-elevated border border-border-subtle transition-colors"
    @click="handleToggle"
  >
    <ClientOnly>
      <Transition name="theme-icon" mode="out-in">
        <Icon :key="isDark ? 'dark' : 'light'" :name="isDark ? 'ph:sun-bold' : 'ph:moon-stars-bold'" class="text-lg shrink-0" />
      </Transition>
      <template #fallback>
        <span class="inline-block size-5" aria-hidden="true" />
      </template>
    </ClientOnly>
  </VButton>
</template>

<script lang="ts" setup>
const { isDark, toggleTheme } = useAppTheme();

const btnRef = ref<{ $el?: HTMLElement } | null>(null);

async function handleToggle(event: MouseEvent) {
  const target = (event.currentTarget ?? event.target) as HTMLElement;
  const rect = target.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  if (!document.startViewTransition) {
    toggleTheme();
    return;
  }

  const transition = document.startViewTransition(() => {
    toggleTheme();
  });

  await transition.ready;

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${maxRadius}px at ${x}px ${y}px)`,
  ];

  document.documentElement.animate(
    { clipPath },
    {
      duration: 420,
      easing: "ease-in-out",
      pseudoElement: "::view-transition-new(root)",
    },
  );
}
</script>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-30deg) scale(0.7);
}
.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(30deg) scale(0.7);
}
</style>
