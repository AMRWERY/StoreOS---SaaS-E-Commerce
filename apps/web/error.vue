<template>
    <div>
        <div
            class="min-h-screen bg-[#050505] text-[#e1e1e1] flex items-center justify-center p-6 relative overflow-hidden flex-col selection:bg-indigo-500/30">
            <!-- Grid Background -->
            <div
                class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay">
            </div>
            <div
                class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/15 via-[#050505] to-[#050505] pointer-events-none">
            </div>

            <div class="relative z-10 max-w-2xl w-full text-center flex flex-col items-center">
                <!-- Error Status Code -->
                <div
                    class="text-[140px] md:text-[200px] font-black leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/5 select-none tracking-tighter mix-blend-screen drop-shadow-2xl">
                    {{ props.error?.statusCode || 404 }}
                </div>

                <!-- Icon/Pulse -->
                <div
                    class="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center my-6 relative shadow-[0_0_40px_-10px_rgba(239,68,68,0.3)]">
                    <div
                        class="absolute inset-0 rounded-3xl bg-red-500/20 animate-ping opacity-50 delay-75 duration-1000">
                    </div>
                    <Icon
                        :name="props.error?.statusCode === 404 ? 'ph:map-pin-line-duotone' : 'ph:warning-circle-duotone'"
                        class="text-4xl text-red-500" />
                </div>

                <!-- Error Details -->
                <h1 class="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                    {{ props.error?.statusCode === 404 ? 'Lost in space' : 'Something went wrong' }}
                </h1>
                <p class="text-sm md:text-base text-gray-400 leading-relaxed max-w-md mb-12 font-medium">
                    {{ props.error?.statusMessage || props.error?.message || "We couldn't find the page you're looking for. It might have been moved or doesn't exist." }}
                </p>

                <!-- Actions -->
                <div class="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                    <VButton @click="handleGoBack" variant="none"
                        className="w-full sm:w-auto px-8 py-4 bg-white text-black font-black text-[10px] tracking-[0.2em] rounded-2xl hover:bg-gray-200 transition-all active:scale-95 shadow-xl shadow-white/10 flex items-center justify-center gap-3 group">
                        <Icon name="ph:arrow-left-bold" class="text-base group-hover:-translate-x-1 transition-transform" />
                        <span>GO BACK</span>
                    </VButton>
                    <VButton @click="handleGoHome" variant="none"
                        className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-black text-[10px] tracking-[0.2em] rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 shadow-xl shadow-black/50 flex items-center justify-center gap-3">
                        <Icon name="ph:house-bold" class="text-base" />
                        <span>DASHBOARD</span>
                    </VButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    error: {
        type: Object,
        default: null
    }
})

const isDev = import.meta.env.DEV

const handleGoBack = () => {
    // Navigate via browser history explicitly, then clear the error state after a short delay to unmount the layout seamlessly
    if (typeof window !== 'undefined' && window.history.length > 2) {
        useRouter().back()
        setTimeout(() => clearError(), 150)
    } else {
        handleGoHome()
    }
}

const handleGoHome = () => {
    clearError({ redirect: '/dashboard' })
}

useHead({
    title: `${props.error?.statusCode || 'Error'} - StoreOS`,
})
</script>