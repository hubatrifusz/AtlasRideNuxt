<template>
  <section class="bg-main-200">
    <div class="md:mx-8 mx-2 md:py-48 px-4 py-12 rounded-t-2xl bg-gradient-to-tr from-main-700 via-main-800 to-main-900 flex flex-col justify-center items-center gap-6">
      <h2 class="text-4xl title_font mb-12">Árak</h2>
      <div class="grid md:grid-cols-2 grid-cols-1 gap-10">
        <div class="bg-main-500 rounded-xl shadow-md p-6 text-center">
          <h3 class="font-semibold text-lg">Komárom - Budapest Nemzetközi repülőtér</h3>
          <p class="text-2xl font-bold mt-2">25 000 Ft-tól</p>
        </div>
        <div class="bg-main-500 rounded-xl shadow-md p-6 text-center">
          <h3 class="font-semibold text-lg">Komárom - Schwechat Nemzetközi repülőtér</h3>
          <p class="text-2xl font-bold mt-2">30 000 Ft-tól</p>
        </div>
        <div class="bg-main-500 rounded-xl shadow-md p-6 text-center">
          <h3 class="font-semibold text-lg">Komárom - Pozsonyi Nemzetközi repülőtér</h3>
          <p class="text-2xl font-bold mt-2">21 000 Ft-tól</p>
        </div>
        <div class="bg-main-600 rounded-xl shadow-md p-6 text-center">
          <h3 class="font-semibold text-lg">Egyéb fuvar</h3>
          <p class="text-lg mt-2">Kérjen személyre szabott árajánlatot</p>
        </div>
        <UTooltip text="*Ha a sofőrnek a helyszínen várakoznia kell Önre" arrow :delay-duration="0" class="md:col-span-2">
          <div class="p-[1px] rounded-md bg-gradient-to-tl from-text-primary to-text-accent w-full">
            <div class="bg-main-700 text-text-primary rounded-md p-2 flex flex-row items-center gap-2">
              <UIcon size="20" name="i-lucide-percent" />
              <div class="flex md:flex-row flex-col text-center m-auto">
                <span>Oda-vissza foglalás esetén</span><strong class="mx-3"> 50% kedvezmény </strong> <span> a visszaútra!*</span>
              </div>
            </div>
          </div>
        </UTooltip>
      </div>
    </div>
  </section>
</template>

<style scoped>
.title_font {
  font-family: 'Panchang', serif;
  letter-spacing: 3px;
}
</style>
