<script setup lang="ts">
    import useBackendAPI from '@/composables/useBackendAPI';

    
    const products: any = ref([])
    const fetchProducts = async () => {
        const { data } = await useBackendAPI().getAllProducts(1,100)

        products.value = data.value?.products

        console.log(data)
    }

    //First time call
    onMounted(() => {
        fetchProducts()
    })

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

    <v-row>
        <v-col cols="12" sm="12">
            <v-card>
                <v-card-text class="pa-5">
                    <v-row>
                        <v-col cols="12" lg="3" md="3">
                            <h2>Product (10)</h2>
                        </v-col>
                    </v-row>
                    
                    <v-table class="mt-5">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Product Info</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Category</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Product 1</td>
                                <td>100</td>
                                <td>10</td>
                                <td>Category 1</td>
                                <td>2021-09-01</td>
                                <td>
                                    <v-icon
                                        small
                                        class="mr-2 text-info cursor-pointer"
                                        title="Edit">mdi-pencil
                                    </v-icon>
                                    <v-icon
                                        small
                                        class="text-error cursor-pointer"
                                        title="Delete">mdi-delete
                                    </v-icon>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<style scoped>

</style>