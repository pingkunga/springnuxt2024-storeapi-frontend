<script setup lang="ts">
    import useBackendAPI from '@/composables/useBackendAPI';


    //test api
    const { data: products } = await useBackendAPI().getAllProducts(1,100)
    
    console.log(products)

    definePageMeta({
        layout: "backend",
    })
    
    useHead({
        title: 'Product',
        meta: [
            {
                name: 'Description',
                content: 'Product Page'
            }
        ]
    })
</script>

<template>
    <div>
        <h1>Product Page</h1>
    </div>
</template>

<style scoped>

</style>