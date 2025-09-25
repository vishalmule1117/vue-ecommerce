// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  runtimeConfig: {
    public: {
      apiBase: process.env.API_URL || "http://localhost:3002/api",
    }
  },
  nitro: {
    preset: 'node-server', // ensure Node server build
  },
  devServer: {
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 8080
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon'
  ],
  css: [
    '~/assets/css/main.css',
    "vue-slick-carousel/dist/vue-slick-carousel.css",
    "vue-slick-carousel/dist/vue-slick-carousel-theme.css",
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
