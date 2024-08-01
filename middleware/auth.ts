export default defineNuxtRouteMiddleware((to, from) => {
    //Check token exist
    const token = useCookie('token')
    if (!token.value) {
        //Login page
        return navigateTo('/')
    }
})
