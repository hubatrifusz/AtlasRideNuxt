<script setup lang="ts">
const props = defineProps<{ form: any }>();
</script>

<template>
  <div class="flex flex-col gap-4 w-full justify-center items-center">
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

      <div>
        Megjegyzés: <span>{{ props.form.comment }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
span {
  color: var(--color-text-primary);
  font-weight: bold;
}
</style>
