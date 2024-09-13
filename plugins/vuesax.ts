// plugins/vuesax.ts
import { defineNuxtPlugin } from '#app'
import Vuesax from 'vuesax-alpha'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vuesax)
})
