<template>
  <div>
    <div class="min-h-screen pt-8 text-white flex flex-col items-center">
      <div class="w-full max-w-3xl mx-auto">
        <ClientOnly>
          <step-one v-if="step === 1" :progress="progress" :step="step" :total-steps="totalSteps" @next="nextStep"
            @skip="skip" />

          <step-two v-else-if="step === 2" :progress="progress" :step="step" :total-steps="totalSteps" @next="nextStep"
            @prev="prevStep" />

          <step-three v-else-if="step === 3" :progress="progress" :step="step" :total-steps="totalSteps" @prev="prevStep"
            @next="nextStep" />

          <store-ready v-else-if="step === 4" />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const step = ref(1);
const totalSteps = 4;
const progress = computed(() => (step.value / totalSteps) * 100);

const nextStep = () => {
  if (step.value < totalSteps) step.value += 1;
};

const prevStep = () => {
  if (step.value > 1) step.value -= 1;
};

// Every step change (Next / Skip / Back) starts the new step at the top of the page.
watch(step, () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// "Skip for now" on the product step moves on to store setup without saving a product.
const skip = () => nextStep();

useSeoPage({
  titleTemplate: () => 'Add First Product',
});
</script>