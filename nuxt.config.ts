// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@pinia/nuxt'],
  css: [
    'vuesax-alpha/theme-chalk/index.css'
  ],
  pinia: {
    autoImports: ['defineStore'],
    imports: {
      dir: ['./stores']
    }
  },
})
