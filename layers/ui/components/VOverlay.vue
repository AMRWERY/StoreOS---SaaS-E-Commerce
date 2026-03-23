<template>
    <div>
        <Teleport to="body">
            <Transition name="overlay-fade">
                <div v-if="show" dir="ltr"
                    class="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] backdrop-blur-xl">
                    <div class="flex flex-col items-center gap-6 animate-pulse-slow">
                        <!-- Logo -->
                        <div class="flex items-center gap-4">
                            <div
                                class="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-indigo-500/20">
                                <icon name="ph:storefront-bold" class="text-4xl" />
                            </div>
                            <div class="text-start">
                                <h1 class="font-bold text-3xl leading-none text-white tracking-tight">StoreOS</h1>
                                <p class="text-[11px] text-indigo-400 tracking-[0.3em] font-black mt-2 uppercase">Global
                                    Merchant</p>
                            </div>
                        </div>

                        <!-- Loading indicator (optional but premium) -->
                        <div class="flex gap-1.5">
                            <div class="w-1.5 h-1.5 rounded-full bg-indigo-500/40 animate-bounce"
                                style="animation-delay: 0s"></div>
                            <div class="w-1.5 h-1.5 rounded-full bg-indigo-500/40 animate-bounce"
                                style="animation-delay: 0.1s"></div>
                            <div class="w-1.5 h-1.5 rounded-full bg-indigo-500/40 animate-bounce"
                                style="animation-delay: 0.2s"></div>
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