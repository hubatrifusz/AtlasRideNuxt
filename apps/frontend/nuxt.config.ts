import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/ui', '@nuxt/fonts', '@nuxt/test-utils/module', 'nuxt-gtag'],
  css: ['~/assets/css/main.css'],

  gtag: {
    id: 'G-JCVH01ZQ5W'
  },

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      title: 'Atlas Ride - Prémium Reptértranszfer Szolgáltatás',
      htmlAttrs: {
        lang: 'hu',
      },
    },
  },
});