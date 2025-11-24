<script setup lang="ts">
import * as v from 'valibot';

const IndividualBookingSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty('Név kötelező')),
  email: v.pipe(v.string(), v.nonEmpty('Email kötelező'), v.email('Érvénytelen email')),
  phone: v.pipe(v.string(), v.nonEmpty('Telefonszám kötelező')),
});

type IndividualBookingData = v.InferOutput<typeof IndividualBookingSchema>;

const individualBookingForm = ref<IndividualBookingData>({
  name: '',
  email: '',
  phone: '',
});
</script>

<template>
  <UForm :schema="IndividualBookingSchema" :state="individualBookingForm" class="flex flex-col gap-4 w-full justify-center items-center px-4">
    <UFormField name="name" class="md:w-1/2 w-full">
      <UInput :model-value="individualBookingForm.name" trailing-icon="i-lucide-user" label="Teljes név" placeholder="Teljes név" size="xl" class="w-full" />
    </UFormField>
    <UFormField name="email" class="md:w-1/2 w-full">
      <UInput :model-value="individualBookingForm.email" trailing-icon="i-lucide-at-sign" label="Email" placeholder="Email" size="xl" class="w-full" />
    </UFormField>
    <UFormField name="phone" class="md:w-1/2 w-full">
      <UInput :model-value="individualBookingForm.phone" trailing-icon="i-lucide-phone" label="Telefonszám" placeholder="Telefonszám" size="xl" class="w-full" />
    </UFormField>
  </UForm>
</template>

<style></style>
