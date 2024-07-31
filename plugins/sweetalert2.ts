import Swal from 'sweetalert2'
export default defineNuxtPlugin((nuxtApp) => {
    //call swal ตัวเล็ก
    nuxtApp.provide('swal', Swal)
})