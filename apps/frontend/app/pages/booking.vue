<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui';

const items = ref<StepperItem[]>([
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
</script>

<template>
  <div class="h-screen w-screen flex flex-col items-center justify-between bg-main-800 py-32">
    <UStepper :items="items" class="w-full" />
    
  </div>
</template>
