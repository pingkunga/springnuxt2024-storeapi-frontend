<script setup lang="ts">
    import { useFormRules } from '~/composables/useFormRules';

    const { ruleRequired, rulePassLen , ruleEmail} = useFormRules()

    const username = ref('')
    const email = ref('')
    const password = ref('')
    const confirmpassword = ref('')

    const submitForm = () => {
    if (ruleRequired(username.value) == true 
     && ruleEmail(email.value) == true
     && ruleRequired(email.value) == true
     && ruleRequired(username.value) == true 
     && rulePassLen(password.value) == true) 
     {
        if(password.value != confirmpassword.value){
            console.log('Password does not match')
            return
        }
        console.log(username.value)
        console.log(email.value)
        console.log(password.value)
    }
}

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
                        <h1>Register</h1>
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
                                    type="username"
                                />
                            </div>
                            <div class="mt-1">
                                <VTextField 
                                    v-model="email"
                                    :rules="[ruleRequired, ruleEmail]"
                                    label="Email" 
                                    variant="outlined"
                                    prepend-inner-icon="mdi-email"
                                    id="email"
                                    name="email"
                                    type="email"
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
                            <div class="mt-1">
                                <VTextField 
                                    v-model="confirmpassword"
                                    :rules="[ruleRequired, rulePassLen]"
                                    label="Confirm Password" 
                                    variant="outlined"
                                    prepend-inner-icon="mdi-lock"
                                    id="confirmpassword"
                                    name="confirmpassword"
                                    type="password"
                                />
                            </div>
                            <div class="mt-5 text-center">
                                <VBtn type="submit" 
                                    block
                                    min-height="44" 
                                    class="gradient primary"
                                    >
                                    Register
                                </VBtn>
                            </div>
                        </VForm>
                        <p class="text-center mt-10">
                            <span>Have an account? Login</span>&nbsp;
                            <NuxtLink to="/" class="text-primary">Login</NuxtLink>
                        </p>
                    </VCol>
                </VRow>
            </VCol>
        </VRow>
    </VContainer>
</template>

<style scoped>

</style>