import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    // ✅ nuxt-gtag module
    [
      'nuxt-gtag',
      {
        id: 'G-JCVH01ZQ5W',
        enabled: true,
        config: {
          anonymize_ip: true,
        },
      },
    ],
  ],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      title: 'Atlas Ride - Prémium Reptértranszfer Szolgáltatás',
      htmlAttrs: { lang: 'hu' },
    },
  },
});
