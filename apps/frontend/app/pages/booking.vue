<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { ref } from 'vue';
import { useRouter } from '#app';
import { useBooking } from '~/composables/useBooking';
const { postNewBooking } = useBooking();
const router = useRouter();

const stepperItems = ref([
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

const currentStep = ref(0);

const form = ref({
  rideType: '',
  name: '',
  companyName: '',
  email: '',
  phone: '',
  passengers: '',
  homeAddress: '',
  departureLocation: '',
  departureDate: null as CalendarDate | null,
  departureTime: '',
  destinationLocation: '',
  takeoffTime: '',
  flightNumber: '',
  return: false as boolean,
  returnLocation: '',
  returnDate: null as CalendarDate | null,
  returnTime: '',
  comment: '',
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

const loading = ref(false);

const submitBooking = async () => {
  loading.value = true;
  try {
    const response = await postNewBooking(form.value);
    console.log('Booking created:', response);
    router.push({ path: '/' });
  } catch (error) {
    console.error('Error creating booking:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="w-screen min-h-screen gap-6 flex flex-col items-center justify-between bg-radial-[at_50%_0%] from-main-700 to-main-900 pt-32 pb-18">
    <UStepper :items="stepperItems" v-model="currentStep" class="w-full" :disabled="currentStep === 0" />

    <BookingStepChooseType v-if="currentStep == 0" @select="chooseType" />
    <BookingStepPersonal v-if="currentStep == 1" v-model:form="form" />
    <BookingStepTravelDetails v-if="currentStep == 2" v-model:form="form" />
    <BookingStepConfirmation v-if="currentStep == 3" v-model:form="form" />

    <!-- Action buttons -->
    <div v-if="currentStep != 0 && currentStep != 3" class="w-full flex justify-between md:px-46 px-4">
      <UButton size="xl" class="text-text-inverse" icon="i-lucide-move-left" @click="goBack()">Előző</UButton>
      <UButton size="xl" class="text-text-inverse" trailing-icon="i-lucide-move-right" @click="goNext()">Következő</UButton>
    </div>

    <div v-if="currentStep == 3">
      <UButton
        color="primary"
        size="xl"
        trailing-icon="i-lucide-calendar-check"
        class="px-12 py-4 text-xl text-text-inverse z-100 shadow-xl shadow-black/30 mt-12"
        @click="submitBooking"
        :loading="loading"
      >
        Megerősítés
      </UButton>
    </div>

    <div v-if="currentStep == 0"></div>
  </div>
</template>

<style scoped></style>
