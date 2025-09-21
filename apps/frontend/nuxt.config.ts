import tailwindcss from '@tailwindcss/vite';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    [
      '@zadigetvoltaire/nuxt-gtm',
      {
        id: 'GTM-WCLGKQ3P',
        pageTracking: true,
        pageViewEventName: 'nuxtRoute',
      },
    ],
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      script: [
        {
          innerHTML: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WCLGKQ3P');
          `,
          type: 'text/javascript',
        },
      ],
      noscript: [
        {
          innerHTML: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WCLGKQ3P"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
          `,
        },
      ],
    },
  },
});
