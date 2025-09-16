<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui';

const stepperItems = ref<StepperItem[]>([
  {
    title: 'Utazás típusa',
    description: 'Válasszon egy utazás típust',
    icon: 'i-lucide-luggage',
  },
  {
    title: 'Személyes adatok',
    description: 'Adja meg személyes adatait',
    icon: 'i-lucide-user',
  },
  {
    title: 'Utazás részletei',
    description: 'Adja meg az utazás részleteit',
    icon: 'i-lucide-map',
  },
  {
    title: 'Megerősítés',
    icon: 'i-lucide-badge-check',
  },
]);

const currentStep = ref(0);

const form = ref({
  name: '',
});
</script>

<template>
  <div class="h-screen w-screen flex flex-col items-center justify-between bg-radial-[at_50%_0%] from-main-700 to-main-900 pt-32 pb-18">
    <UStepper :items="stepperItems" v-model="currentStep" class="w-full" />
    <div class="w-full flex md:flex-row flex-col items-center gap-10 p-6 md:px-64">
      <div class="card_border flex-grow">
        <div class="card ">Ceges</div>
      </div>
      <div class="card_border flex-grow">
        <div class="card">Repteri</div>
      </div>
            <div class="card_border flex-grow">
        <div class="card">Privat</div>
      </div>
    </div>

    <div class="w-full flex justify-between md:px-46 px-4">
      <UButton size="xl" class="text-text-primary" icon="i-lucide-move-left">Előző</UButton>
      <UButton size="xl" class="text-text-primary" trailing-icon="i-lucide-move-right">Következő</UButton>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--color-main-400);
  aspect-ratio: 16 / 9;
  border-radius: calc(var(--ui-radius) * 1.5);
}

.card_border {
  background: linear-gradient(to bottom, var(--color-main-200), var(--color-main-400));
  border-radius: calc(var(--ui-radius) * 1.5);
  padding: 2px;
}
</style>
