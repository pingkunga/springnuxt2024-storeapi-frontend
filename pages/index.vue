<script setup lang="ts">
    import { useFormRules } from '~/composables/useFormRules';

    const { ruleRequired, rulePassLen } = useFormRules()

    const { $swal } : any = useNuxtApp()

    const token = useCookie(
        'token',
        {
            maxAge: 60 * 60,    //1 hour
        }
    )

    const userData = useCookie(
        'userData',
        {
            maxAge: 60 * 60,    //1 hour
        }
    )

    const router = useRouter()

    const username = ref('')
    const password = ref('')

    const submitForm = () => {
        if (ruleRequired(username.value) == true && ruleRequired(username.value) == true && rulePassLen(password.value) == true) {
            //console.log(username.value)
            //console.log(password.value)

            // Call the login API
            const config =  useRuntimeConfig()
            const api = config.public.url
            const image = config.public.urlimage
            
            console.log(api)
            console.log(image)

            $fetch(`${api}/authenticate/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username.value,
                    password: password.value
                }),

                onResponse({ request, response, options }) {
                    console.log(response)
                    //console.log("-")
                    //console.log(request)

                    if(response.status == 401){
                        $swal.fire({
                            title: 'Error',
                            text: 'Username or Password is incorrect',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        })
                        console.log('Username or Password is incorrect')
                    } else{
                        token.value = response._data.data.token
                        userData.value = response._data.data
                        $swal.fire({
                            title: 'Success',
                            text: 'Login Success',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })
                        console.log('Login Success')

                        //Deplay 1 Second
                        setTimeout(() => {
                            $swal.close()
                            router.push('/backend/dashboard')
                        }, 2000)
                    }
                }
            })
        }
    }


    useHead({
        title: 'Login',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: 'Login Page'
            }
        ]
    })
</script>

<template>
    <VContainer fluid class="fill-height pa-0">
        <VRow no-gutters align="center" justify="center" class="fill-height">
            <VCol class="hidden-sm-and-down fill-height" md="6" lg="6">
                <VImg
                    src="https://wallpaper.dog/large/10812311.jpg"
                    cover
                    class="h-100 rounded-xl rounded-ts-0 rounded-bs-0 d-flex align-center justify-center"
                >
                    <div class="text-center w-50 text-black mx-auto">
                        <h1 class="mb-4">Welcome back.</h1>
                        <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                    </div>
                </VImg>
            </VCol>
            <VCol cols="12" md="6" lg="6" sm="6">
                
                <VRow no-gutters align="center" justify="center">
                    <VCol cols="12" md="6" class="pa-3">
                        <h1>Login</h1>
                        <p class="text-medium-emphasis">Input your email and password</p>
                        <VForm class="mt-7" @submit.prevent="submitForm" >
                            <div class="mt-1">
                                <VTextField 
                                    v-model="username"
                                    :rules="[ruleRequired]"
                                    label="Username" 
                                    variant="outlined"
                                    prepend-inner-icon="mdi-account"
                                    id="username"
                                    name="username"
                                    type="text"
                                />
                            </div>
                            <div class="mt-1">
                                <VTextField 
                                    v-model="password"
                                    :rules="[ruleRequired, rulePassLen]"
                                    label="Password" 
                                    variant="outlined"
                                    prepend-inner-icon="mdi-lock"
                                    id="password"
                                    name="password"
                                    type="password"
                                />
                            </div>
                            <div class="mt-5 text-center">
                                <VBtn type="submit" 
                                    block
                                    min-height="44" 
                                    class="gradient primary"
                                    >
                                    Login
                                </VBtn>
                            </div>
                        </VForm>
                        <p class="text-center mt-10">
                            <span>Don't have an account? Registe</span>&nbsp;
                            <NuxtLink to="/register" class="text-primary">Register</NuxtLink>
                        </p>
                    </VCol>
                </VRow>
            </VCol>
        </VRow>
    </VContainer>
</template>

<style scoped>

</style>