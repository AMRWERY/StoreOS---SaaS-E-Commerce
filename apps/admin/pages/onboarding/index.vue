<template>
  <div class="min-h-screen bg-bg-base text-tx-primary">
    <!-- Top Bar -->
    <header class="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-bg-base/80 backdrop-blur-md">
      <div class="flex items-center gap-2 font-bold text-lg">
        <div class="w-5 h-5 bg-orange-500 rounded-sm"></div>
        StoreOS
      </div>

      <div class="hidden sm:flex items-center gap-1">
        <template v-for="(s, i) in steps" :key="i">
          <div class="flex items-center gap-1.5">
            <div
              class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all"
              :class="
                currentStep > i + 1
                  ? 'bg-green-500 text-white'
                  : currentStep === i + 1
                  ? 'bg-brand text-white'
                  : 'bg-bg-elevated text-tx-muted border border-border-subtle'
              "
            >
              <Icon v-if="currentStep > i + 1" name="lucide:check" class="w-3 h-3" />
              <span v-else>{{ i + 1 }}</span>
            </div>
            <span
              class="text-[11px] font-bold tracking-wide transition-colors"
              :class="currentStep === i + 1 ? 'text-tx-primary' : 'text-tx-muted'"
            >
              {{ s.label }}
            </span>
          </div>
          <div
            v-if="i < steps.length - 1"
            class="w-8 h-px mx-1 transition-colors"
            :class="currentStep > i + 1 ? 'bg-green-500/60' : 'bg-border-subtle'"
          />
        </template>
      </div>

      <button
        @click="skipOnboarding"
        class="text-[11px] font-bold text-tx-muted hover:text-tx-secondary transition flex items-center gap-1"
      >
        Skip setup
        <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
      </button>
    </header>

    <!-- Step Content -->
    <div class="pt-20">
      <Transition name="step" mode="out-in">
        <!-- Step 1: Store Setup -->
        <div v-if="currentStep === 1" key="s1">
          <step-two
            :progress="progress"
            :step="currentStep"
            :totalSteps="totalSteps"
            @next="nextStep"
          />
        </div>

        <!-- Step 2: Payment Methods -->
        <div v-else-if="currentStep === 2" key="s2">
          <step-three
            :progress="progress"
            :step="currentStep"
            :totalSteps="totalSteps"
            @next="nextStep"
            @prev="prevStep"
          />
        </div>

        <!-- Step 3: Add First Product -->
        <div v-else-if="currentStep === 3" key="s3">
          <div class="flex items-center justify-center p-6 mt-4">
            <step-one
              :progress="progress"
              :step="currentStep"
              :totalSteps="totalSteps"
              @next="nextStep"
              @skip="nextStep"
            />
          </div>
        </div>

        <!-- Step 4: Store Ready -->
        <div v-else-if="currentStep === 4" key="s4">
          <store-ready />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: false })

const localePath = useLocalePath()

const totalSteps = 3

const currentStep = ref(1)

const steps = [
  { label: 'Store Setup' },
  { label: 'Payments' },
  { label: 'First Product' },
]

const progress = computed(() => {
  if (currentStep.value > totalSteps) return 100
  return Math.round(((currentStep.value - 1) / totalSteps) * 100)
})

const nextStep = () => {
  if (currentStep.value <= totalSteps) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const skipOnboarding = async () => {
  await navigateTo(localePath('/dashboard'))
}

useSeoMeta({
  title: 'Set up your store',
  robots: 'noindex, nofollow',
})
</script>

<style scoped>
.step-enter-active,
.step-leave-active {
  transition: all 0.28s ease;
}
.step-enter-from {
  opacity: 0;
  transform: translateX(24px);
}
.step-leave-to {
  opacity: 0;
  transform: translateX(-24px);
}
</style>
