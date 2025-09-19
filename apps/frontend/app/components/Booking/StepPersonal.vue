<script setup lang="ts">
const props = defineProps<{ form: any }>();

const emit = defineEmits<{
  (e: 'update:form', value: any): void;
}>();

function updateField<K extends keyof typeof props.form>(key: K, value: any) {
  emit('update:form', { ...props.form, [key]: value });
}
</script>

<template>
  <!-- For "reptéri" or "egyéb" -->
  <div v-if="form.rideType == 'reptéri' || form.rideType == 'egyéb'" class="flex flex-col gap-2 w-full justify-center items-center px-4">
    <UInput
      :model-value="form.name"
      trailing-icon="i-lucide-user"
      label="Teljes név"
      placeholder="Teljes név"
      size="xl"
      class="md:w-1/2 w-full"
      @update:model-value="updateField('name', $event)"
    />
    <UInput
      :model-value="form.email"
      trailing-icon="i-lucide-at-sign"
      label="Email"
      placeholder="Email"
      size="xl"
      class="md:w-1/2 w-full"
      @update:model-value="updateField('email', $event)"
    />
    <UInput
      :model-value="form.phone"
      trailing-icon="i-lucide-phone"
      label="Telefonszám"
      placeholder="Telefonszám"
      size="xl"
      class="md:w-1/2 w-full"
      @update:model-value="updateField('phone', $event)"
    />
  </div>

  <!-- For "céges" -->
  <div v-if="form.rideType == 'céges'" class="flex flex-col gap-2 w-full justify-center items-center px-4">
    <UInput
      :model-value="form.companyName"
      trailing-icon="i-lucide-building-2"
      label="Cégnév"
      placeholder="Cégnév"
      size="xl"
      class="md:w-1/2 w-full"
      @update:model-value="updateField('companyName', $event)"
    />
    <UInput
      :model-value="form.name"
      trailing-icon="i-lucide-user"
      label="Kapcsolattartó neve"
      placeholder="Kapcsolattartó neve"
      size="xl"
      class="md:w-1/2 w-full"
      @update:model-value="updateField('name', $event)"
    />
    <UInput
      :model-value="form.email"
      trailing-icon="i-lucide-at-sign"
      label="Email"
      placeholder="Email"
      size="xl"
      class="md:w-1/2 w-full"
      @update:model-value="updateField('email', $event)"
    />
    <UInput
      :model-value="form.phone"
      trailing-icon="i-lucide-phone"
      label="Telefonszám"
      placeholder="Telefonszám"
      size="xl"
      class="md:w-1/2 w-full"
      @update:model-value="updateField('phone', $event)"
    />
    <UInput
      :model-value="form.homeAddress"
      trailing-icon="i-lucide-map-pin-house"
      label="Telephely"
      placeholder="Telephely"
      size="xl"
      class="md:w-1/2 w-full"
      @update:model-value="updateField('homeAddress', $event)"
    />
  </div>
</template>

<style></style>
