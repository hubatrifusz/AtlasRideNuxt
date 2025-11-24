<template>
  <UApp :locale="hu">
    <NuxtLayout>
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>


<script>
import { hu } from '@nuxt/ui/locale'
</script>