<script setup lang="ts">
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
import { vMaska } from 'maska/vue';

const props = defineProps<{ form: any }>();

const df = new DateFormatter('hu-HU', {
  dateStyle: 'medium',
});

const minDate = today(getLocalTimeZone());

const emit = defineEmits<{
  (e: 'update:form', value: any): void;
}>();

function updateField<K extends keyof typeof props.form>(key: K, value: any) {
  emit('update:form', { ...props.form, [key]: value });
}
</script>

<template>
  <div class="flex flex-col gap-2 w-full justify-center items-center px-4">
    <UInput
      :model-value="props.form.departureLocation"
      trailing-icon="i-lucide-map-pin-house"
      label="Indulási hely"
      placeholder="Indulás hely"
      size="xl"
      class="md:w-1/2 w-full"
      @update:model-value="updateField('departureLocation', $event)"
    />
    <UInput
      :model-value="props.form.destinationLocation"
      trailing-icon="i-lucide-map-pinned"
      label="Úti cél"
      placeholder="Úti cél"
      size="xl"
      class="md:w-1/2 w-full"
      @update:model-value="updateField('destinationLocation', $event)"
    />
    <UPopover
      :content="{
        align: 'center',
        side: 'bottom',
        sideOffset: 2,
      }"
    >
      <UButton size="xl" icon="i-lucide-calendar" class="text-text-primary md:w-1/2 w-full" color="secondary">{{
        props.form.departureDate ? df.format(props.form.departureDate.toDate(getLocalTimeZone())) : 'Válassza ki az indulás napját'
      }}</UButton>
      <template #content>
        <UCalendar :model-value="props.form.departureDate" :year-controls="false" size="lg" :min-value="minDate" @update:model-value="updateField('departureDate', $event)" />
      </template>
    </UPopover>
    <UInput
      v-maska="'##:##'"
      :model-value="props.form.departureTime"
      trailing-icon="i-lucide-timer"
      label="Inulás ideje"
      placeholder="Indulás ideje"
      size="xl"
      class="md:w-1/2 w-full"
      @update:model-value="updateField('departureTime', $event)"
    />
    <UInput
      :model-value="props.form.passengers"
      v-maska="'###'"
      trailing-icon="i-lucide-users"
      label="Utasok száma"
      placeholder="Utasok száma"
      size="xl"
      class="md:w-1/2 w-full"
      @update:model-value="updateField('passengers', $event)"
    />

    <div class="md:w-1/2">
      <USwitch :model-value="props.form.return" label="Retúr" size="xl" @update:model-value="updateField('return', $event)" />
    </div>

    <!-- Retúr esetén -->
    <div v-if="props.form.return" class="w-full flex flex-col items-center gap-2">
      <UPopover
        :content="{
          align: 'center',
          side: 'bottom',
          sideOffset: 2,
        }"
      >
        <UButton size="xl" icon="i-lucide-calendar" class="text-text-primary md:w-1/2 w-full" color="secondary">
          {{ props.form.returnDate ? df.format(props.form.returnDate.toDate(getLocalTimeZone())) : 'Válassza ki a visszaút dátumát' }}
        </UButton>
        <template #content>
          <UCalendar :model-value="props.form.returnDate" :year-controls="false" size="lg" :min-value="minDate" @update:model-value="updateField('returnDate', $event)" />
        </template>
      </UPopover>

      <UInput
        v-maska="'##:##'"
        :model-value="props.form.returnTime"
        trailing-icon="i-lucide-timer"
        label="Visszaút indulási ideje"
        placeholder="Visszaút indulási ideje"
        size="xl"
        class="md:w-1/2 w-full"
        @update:model-value="updateField('returnTime', $event)"
      />
    </div>

    <!-- Repteri esetén -->
    <div v-if="props.form.rideType == 'reptéri'" class="w-full flex flex-col items-center gap-2">
      <USeparator class="md:w-1/2 w-full my-8" />
      <UInput
        :model-value="props.form.flightNumber"
        trailing-icon="i-lucide-hash"
        label="Repülőgép járatszáma"
        placeholder="Repülőgép járatszáma"
        size="xl"
        class="md:w-1/2 w-full"
        @update:model-value="updateField('flightNumber', $event)"
      />
      <UInput
        v-maska="'##:##'"
        :model-value="props.form.takeoffTime"
        trailing-icon="i-lucide-plane-takeoff"
        label="Repülőgép száma"
        placeholder="Repülőgép felszállásának ideje"
        size="xl"
        class="md:w-1/2 w-full"
        @update:model-value="updateField('takeoffTime', $event)"
      />
    </div>
  </div>
</template>
