<script setup lang="ts">
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
import { vMaska } from 'maska/vue';
import { CalendarDate } from '@internationalized/date';
import * as v from 'valibot';

const minDate = today(getLocalTimeZone());

const TravelInfoSchema = v.object({
  departureLocation: v.pipe(v.string(), v.nonEmpty('Indulási hely kötelező')),
  destinationLocation: v.pipe(v.string(), v.nonEmpty('Úti cél kötelező')),
  departureDate: v.pipe(v.string(), v.nonEmpty('Indulás dátuma kötelező')),
  departureTime: v.pipe(v.string(), v.nonEmpty('Indulás ideje kötelező')),
  passengers: v.pipe(v.string(), v.nonEmpty('Utasok száma kötelező')),
  return: v.boolean(),
  returnDate: v.pipe(v.string(), v.nonEmpty('Vissza dátuma kötelező')),
  returnTime: v.string(),
  comment: v.string(),
});

type TravelInfoData = v.InferOutput<typeof TravelInfoSchema>;

const departureDate = new CalendarDate(2000, 1, 1);
const returnDate = new CalendarDate(2000, 1, 1);

const travelInfoForm = ref<TravelInfoData>({
  departureLocation: '',
  destinationLocation: '',
  departureDate: departureDate.toString(),
  departureTime: '',
  passengers: '',
  comment: '',
  return: false,
  returnDate: returnDate.toString(),
  returnTime: '',
});

const FlightInfoSchema = v.object({
  flightNumber: v.string(),
  takeoffTime: v.string(),
});

type FlightInfoData = v.InferOutput<typeof FlightInfoSchema>;

const flightInfoForm = ref<FlightInfoData>({
  flightNumber: '',
  takeoffTime: '',
});

function beforeEnter(el: Element) {
  (el as HTMLElement).style.height = '0';
  (el as HTMLElement).style.opacity = '0';
}

function enter(el: Element) {
  (el as HTMLElement).style.transition = 'height 0.3s ease, opacity 0.3s ease';
  (el as HTMLElement).style.height = (el as HTMLElement).scrollHeight + 'px';
  (el as HTMLElement).style.opacity = '1';
}

function beforeLeave(el: Element) {
  (el as HTMLElement).style.height = (el as HTMLElement).scrollHeight + 'px';
  (el as HTMLElement).style.opacity = '1';
}

function leave(el: Element) {
  (el as HTMLElement).style.transition = 'height 0.2s ease, opacity 0.2s ease';
  (el as HTMLElement).style.height = '0';
  (el as HTMLElement).style.opacity = '0';
}
</script>

<template>
  <UForm :schema="TravelInfoSchema" :state="travelInfoForm" class="flex flex-col gap-4 w-full justify-center items-center px-4">
    <UFormField class="md:w-1/2 w-full" name="departureLocation">
      <UInput v-model="travelInfoForm.departureLocation" trailing-icon="i-lucide-map-pin-house" label="Indulási hely" placeholder="Indulás hely" size="xl" class="w-full" />
    </UFormField>

    <UFormField class="md:w-1/2 w-full" name="destinationLocation">
      <UInput v-model="travelInfoForm.destinationLocation" trailing-icon="i-lucide-map-pinned" label="Úti cél" placeholder="Úti cél" size="xl" class="w-full" />
    </UFormField>

    <UPopover
      :content="{
        align: 'center',
        side: 'bottom',
        sideOffset: 2,
      }"
    >
      <UButton size="xl" icon="i-lucide-calendar" class="text-text-primary md:w-1/2 w-full" color="secondary">{{
        travelInfoForm.departureDate ? travelInfoForm.departureDate : 'Válassza ki az indulás napját'
      }}</UButton>
      <template #content>
        <UCalendar v-model="departureDate" :year-controls="false" size="lg" :min-value="minDate" locale="hu" />
      </template>
    </UPopover>

    <UFormField class="md:w-1/2 w-full" name="departureTime">
      <UInput v-maska="'##:##'" v-model="travelInfoForm.departureTime" trailing-icon="i-lucide-timer" label="Inulás ideje" placeholder="Indulás ideje" size="xl" class="w-full" />
    </UFormField>

    <UFormField class="md:w-1/2 w-full" name="passengers">
      <UInput v-model="travelInfoForm.passengers" v-maska="'###'" trailing-icon="i-lucide-users" label="Utasok száma" placeholder="Utasok száma" size="xl" class="w-full" />
    </UFormField>

    <!-- Repteri esetén -->
    <div class="w-full flex flex-col items-center gap-2">
      <USeparator class="md:w-1/2 w-full my-8" />

      <UFormField class="md:w-1/2 w-full" name="flightNumber">
        <UInput v-model="flightInfoForm.flightNumber" trailing-icon="i-lucide-hash" label="Repülőgép járatszáma" placeholder="Repülőgép járatszáma" size="xl" class="w-full" />
      </UFormField>

      <UFormField class="md:w-1/2 w-full" name="takeoffTime">
        <UInput
          v-maska="'##:##'"
          v-model="flightInfoForm.takeoffTime"
          trailing-icon="i-lucide-plane-takeoff"
          label="Repülőgép száma"
          placeholder="Repülőgép felszállásának ideje"
          size="xl"
          class="w-full"
        />
      </UFormField>
    </div>

    <UFormField class="md:w-1/2 w-full" name="return">
      <USwitch v-model="travelInfoForm.return" label="Retúr" size="xl" @change="console.log('Retúr:', travelInfoForm.return)" />
    </UFormField>

    <!-- Retúr esetén -->
    <Transition name="fade-slide" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
      <div v-if="travelInfoForm.return" class="w-full flex flex-col items-center gap-4">
        <UPopover
          :content="{
            align: 'center',
            side: 'bottom',
            sideOffset: 2,
          }"
        >
          <UButton size="xl" icon="i-lucide-calendar" class="text-text-primary md:w-1/2 w-full" color="secondary">
            {{ travelInfoForm.returnDate ? returnDate : 'Válassza ki a visszaút dátumát' }}
          </UButton>
          <template #content>
            <UCalendar v-model="returnDate" :year-controls="false" size="lg" :min-value="minDate" locale="hu" />
          </template>
        </UPopover>

        <UInput
          v-maska="'##:##'"
          v-model="travelInfoForm.returnTime"
          trailing-icon="i-lucide-timer"
          label="Visszaút indulási ideje"
          placeholder="Visszaút indulási ideje"
          size="xl"
          class="md:w-1/2 w-full"
        />
      </div>
    </Transition>

    <div class="md:w-1/2 w-full">
      <UTextarea v-model="travelInfoForm.comment" size="xl" placeholder="Megjegyzés" class="w-full" />
    </div>
  </UForm>
</template>
