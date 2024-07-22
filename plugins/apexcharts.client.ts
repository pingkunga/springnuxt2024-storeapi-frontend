//file name: plugins/apexcharts.client.ts 
//tell nuxt to use client side only

import VueApexCharts from "vue3-apexcharts"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueApexCharts);
})