export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-04-03',

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/test-utils/module',
  ],

  // Google Fonts configuration
  fonts: {
    google: {
      families: {
        'Space+Mono': [400, 700],
      },
    },
  },

  // Runtime configuration for Contentful
  runtimeConfig: {
    public: {
      contentfulSpaceId: process.env.NUXT_CONTENTFUL_SPACE_ID,
      contentfulAccessToken: process.env.NUXT_CONTENTFUL_ACCESS_TOKEN,
    },
  },

  // Color mode preference
  colorMode: {
    preference: 'system',
    fallback: 'dark', // Fallback to dark mode if system preference is not available
    classSuffix: '',
  },

  // Tailwind CSS integration
  tailwindcss: {
    configPath: 'tailwind.config.js',
    viewer: false, // Disable Tailwind's viewer in production
  },

  // Global CSS
  css: ['@/assets/css/main.css', '@/public/fonts/index.css'],

  // PostCSS for CSS minification
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
      cssnano: { preset: 'default' }, // Minifies CSS in production
    },
  },

  // Vite configuration to drop console logs and optimize JS
  vite: {
    esbuild: {
      drop: ['console', 'debugger'], // Remove console logs and debuggers in production
    },
    build: {
      minify: 'esbuild', // Use Esbuild for faster minification
    },
  },

  // Enable compression (Gzip/Brotli) for better network performance
  nitro: {
    compressPublicAssets: true, // Enables Gzip and Brotli compression for static assets
  },

  // Enable devtools only in development mode
  devtools: { enabled: process.env.NODE_ENV === 'development' },
});
