<template>
  <div>
    <div class="min-h-screen pt-8 text-white flex flex-col items-center">
      <div class="w-full max-w-3xl mx-auto">
        <ClientOnly>
          <StepOne v-if="step === 1" :progress="progress" :step="step" :total-steps="totalSteps" @next="nextStep"
            @skip="skip" />

          <StepTwo v-else-if="step === 2" :progress="progress" :step="step" :total-steps="totalSteps" @next="nextStep"
            @prev="prevStep" />

          <StepThree v-else-if="step === 3" :progress="progress" :step="step" :total-steps="totalSteps" @prev="prevStep"
            @next="nextStep" />

          <StoreReady v-else-if="step === 4" />
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

const finish = () => {
  window.alert("Setup complete!");
};

const skip = () => {
  window.alert("Skipped onboarding.");
};

useHead({
  titleTemplate: () => 'Add First Product',
});
</script>