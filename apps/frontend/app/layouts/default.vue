<template>
  <div>
    <header>
      <nav class="md:rounded-md md:h-14 h-16 md:w-160 w-full md:p-[1px] fixed left-1/2 -translate-x-1/2 md:top-8 z-100">
        <div class="md:rounded-md flex items-center justify-center gap-6 h-full w-full bg-main-700 p-1">
          <UButton variant="ghost" size="xl" class="text-text-primary text-sm cursor-pointer panchang">Rólam</UButton>
          <img src="/logo_feher_2.svg" alt="logo" class="h-full cursor-pointer" @click="$router.push('/')" />
          <UButton variant="ghost" size="xl" class="text-text-primary text-sm cursor-pointer panchang">Árak</UButton>
        </div>
      </nav>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <div class="bg-main-800 text-text-primary text-center p-12 h-70 flex flex-row justify-center items-start">
        <div class="flex flex-col w-fit">
          <a href="mailto:info@atlasride.hu">
            <UButton variant="ghost" class="text-text-primary cursor-pointer" icon="i-lucide-mail"> info@atlasride.hu </UButton>
          </a>

          <a href="tel:+36706005522">
            <UButton variant="ghost" class="text-text-primary cursor-pointer" icon="i-lucide-phone"> +36 70 600 5522 </UButton>
          </a>

          <a href="https://www.facebook.com/profile.php?id=61571633512337" target="_blank" rel="noopener noreferrer">
            <UButton variant="ghost" class="text-text-primary cursor-pointer" icon="i-lucide-facebook"> Atlas Ride Facebook </UButton>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
nav {
  box-shadow: 3px 3px 10px var(--color-main-800);

  @media (width >= 48rem) {
    background: linear-gradient(to right, transparent 35%, var(--color-main-200), transparent 65%), linear-gradient(to bottom, var(--color-main-600), var(--color-main-700));
  }
}

.panchang {
  font-family: 'Panchang', serif;
  letter-spacing: 1px;
  font-weight: 500;
}
</style>
