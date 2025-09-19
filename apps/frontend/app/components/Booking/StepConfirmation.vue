<script setup lang="ts">
const props = defineProps<{ form: any }>();

const emit = defineEmits<{
  (e: 'confirm', value: any): void;
}>();

function confirmBooking() {
  emit('confirm', props.form);
}
</script>

<template>
  <div class="flex flex-col gap-2 w-full justify-center items-center">
    <div class="text-text-secondary text-lg">
      <div v-if="props.form.rideType != 'céges'">
        Teljes név: <span>{{ props.form.name }}</span>
      </div>

      <div v-else>
        <div>
          Cégnév: <span>{{ props.form.companyName }}</span>
        </div>

        <div>
          Kapcsolattartó neve: <span>{{ props.form.name }}</span>
        </div>

        <div>
          Telephely: <span>{{ props.form.homeAddress }}</span>
        </div>
      </div>

      <div>
        E-mail cím: <span>{{ props.form.email }}</span>
      </div>

      <div>
        Telefonszám: <span>{{ props.form.phone }}</span>
      </div>

      <USeparator class="w-full my-4" />

      <div>
        Úti cél: <span>{{ props.form.destinationLocation }}</span>
      </div>

      <div>
        Indulási hely: <span>{{ props.form.departureLocation }}</span>
      </div>

      <div>
        Indulás: <span>{{ props.form.departureDate }}, {{ props.form.departureTime }}</span>
      </div>

      <div>
        Utasok száma: <span>{{ props.form.passengers }}</span>
      </div>

      <div v-if="props.form.return">
        Visszaút: <span>{{ props.form.returnDate }}, {{ props.form.returnTime }}</span>
      </div>

      <div v-if="props.form.rideType == 'reptéri'">
        <USeparator class="w-full my-4" />

        <div>
          Repülőjárat száma: <span>{{ props.form.flightNumber }}</span>
        </div>

        <div>
          Tervezett felszállási idő: <span>{{ props.form.takeoffTime }}</span>
        </div>
      </div>
    </div>

    <UButton
      color="primary"
      size="xl"
      trailing-icon="i-lucide-calendar-check"
      class="px-12 py-4 text-xl text-text-inverse z-100 shadow-xl shadow-black/30 mt-12"
      @click="confirmBooking"
    >
      Megerősítés
    </UButton>
  </div>
</template>

<style scoped>
span {
  color: var(--color-text-primary);
  font-weight: bold;
}
</style>
