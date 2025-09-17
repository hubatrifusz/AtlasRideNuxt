<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui';
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date';

const stepperItems = ref<StepperItem[]>([
  {
    title: 'Utazás típusa',
    icon: 'i-lucide-luggage',
  },
  {
    title: 'Személyes adatok',
    icon: 'i-lucide-user',
  },
  {
    title: 'Utazás részletei',
    icon: 'i-lucide-map',
  },
  {
    title: 'Megerősítés',
    icon: 'i-lucide-badge-check',
  },
]);

const currentStep = ref(2);

const form = ref({
  rideType: '',
  name: '',
  companyName: '',
  email: '',
  phone: '',
  homeAddress: '',
  departureLocation: '',
  departureDate: null as CalendarDate | null,
});

function chooseType(type: string) {
  form.value.rideType = type;
  currentStep.value = 1;
}

function goBack() {
  if (currentStep.value > 0) {
    currentStep.value -= 1;
  }
}

function goNext() {
  if (currentStep.value < stepperItems.value.length - 1) {
    currentStep.value += 1;
  }
}

const df = new DateFormatter('hu-HU', {
  dateStyle: 'medium',
});
</script>

<template>
  <div class="w-screen min-h-screen flex flex-col items-center justify-between bg-radial-[at_50%_0%] from-main-700 to-main-900 pt-32 pb-18">
    <UStepper :items="stepperItems" v-model="currentStep" class="w-full" />

    <div v-if="currentStep == 0" class="w-full flex md:flex-row flex-col items-center justify-center gap-10 md:p-12 p-18 md:px-72">
      <div class="card_border flex-1 md:aspect-[3/4] w-full aspect-[2/1]" @click="chooseType('céges')">
        <div class="card">Céges</div>
      </div>
      <div class="card_border flex-1 md:aspect-[3/4] w-full aspect-[2/1]" @click="chooseType('reptéri')">
        <div class="card">Reptéri</div>
      </div>
      <div class="card_border flex-1 md:aspect-[3/4] w-full aspect-[2/1]" @click="chooseType('egyéb')">
        <div class="card">Egyéb</div>
      </div>
    </div>

    <!-- Személyes adatok -->
    <div v-if="currentStep == 1 && (form.rideType == 'reptéri' || form.rideType) == 'egyéb'" class="flex flex-col gap-2 w-full justify-center items-center">
      <UInput v-model="form.name" trailing-icon="i-lucide-user" label="Teljes név" placeholder="Teljes név" size="xl" />
      <UInput v-model="form.email" trailing-icon="i-lucide-at-sign" label="Email" placeholder="Email" size="xl" />
      <UInput v-model="form.phone" trailing-icon="i-lucide-phone" label="Telefonszám" placeholder="Telefonszám" size="xl" />
    </div>

    <div v-if="currentStep == 1 && form.rideType == 'céges'" class="flex flex-col gap-2 w-full justify-center items-center">
      <UInput v-model="form.companyName" trailing-icon="i-lucide-building-2" label="Cégnév" placeholder="Cégnév" size="xl" />
      <UInput v-model="form.name" trailing-icon="i-lucide-user" label="Kapcsolattartó neve" placeholder="Kapcsolattartó neve" size="xl" />
      <UInput v-model="form.email" trailing-icon="i-lucide-at-sign" label="Email" placeholder="Email" size="xl" />
      <UInput v-model="form.phone" trailing-icon="i-lucide-phone" label="Telefonszám" placeholder="Telefonszám" size="xl" />
      <UInput v-model="form.homeAddress" trailing-icon="i-lucide-map-pin-house" label="Telephely" placeholder="Telephely" size="xl" />
    </div>

    <!-- Utazás részletei -->
    <div v-if="currentStep == 2" class="flex flex-col gap-2 w-full justify-center items-center">
      <UInput v-model="form.companyName" trailing-icon="i-lucide-map-pin-house" label="Indulási hely" placeholder="Indulás hely" size="xl" />
      <UInput v-model="form.companyName" trailing-icon="i-lucide-map-pinned" label="Úticél" placeholder="Úticél" size="xl" />
      <UPopover>
        <UButton class="text-text-primary" color="secondary">{{ form.departureDate ? df.format(form.departureDate.toDate(getLocalTimeZone())) : 'Válassza ki az indulás napját' }}</UButton>
        <template #content>
          <UCalendar v-model="form.departureDate as CalendarDate" :year-controls="false" :fixed-weeks="false" size="lg" />
        </template>
      </UPopover>
    </div>

    <!-- Action buttons -->
    <div v-if="currentStep != 0 && currentStep != 3" class="w-full flex justify-between md:px-46 px-4">
      <UButton size="xl" class="text-text-primary" icon="i-lucide-move-left" @click="goBack()">Előző</UButton>
      <UButton size="xl" class="text-text-primary" trailing-icon="i-lucide-move-right" @click="goNext()">Következő</UButton>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--color-main-800);
  border-radius: calc(var(--ui-radius) * 1.5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--text-xl) /* 1.5rem = 24px */;
  line-height: var(--tw-leading, var(--text-xl--line-height) /* calc(2 / 1.5) ≈ 1.3333 */);
  color: var(--color-text-primary);
  cursor: pointer;
  height: 100%;
  width: 100%;
}

.card_border {
  background: linear-gradient(to bottom, var(--color-main-600), var(--color-main-800));
  border-radius: calc(var(--ui-radius) * 1.5);
  padding: 2px;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 0 32px var(--color-accent-500);
    background: linear-gradient(to bottom, var(--color-main-400), var(--color-main-700));
    transform: scale(1.05);
  }
}
</style>
