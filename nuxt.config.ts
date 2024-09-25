export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxt/fonts', '@nuxt/image'],
  fonts: {
    google: {
      families: {
        'Libre Franklin': [400, 500, 600, 700],
      },
    },
  },
  runtimeConfig: {
    public: {
      contentfulSpaceId: process.env.NUXT_CONTENTFUL_SPACE_ID,
      contentfulAccessToken: process.env.NUXT_CONTENTFUL_ACCESS_TOKEN,
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },
  tailwindcss: {
    configPath: 'tailwind.config.js',
  },
  $development: {
    devtools: { enabled: true },
  },
  css: ['@/assets/css/main.css'],
});