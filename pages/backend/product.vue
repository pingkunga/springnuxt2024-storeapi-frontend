<script setup lang="ts">
    import useBackendAPI from '@/composables/useBackendAPI';

    const config = useRuntimeConfig()
    const IMAGE_PATH = config.public.urlimage

    //==========================================================
    //Pagination
    const page = ref(1) 
    const rowsPerPage = ref(2) 
    const totalItems = ref(0) 
    //Pagination
    //==========================================================

    const products: any = ref([])
    const fetchProducts = async () => {
        const { data } = await useBackendAPI().getAllProducts(page.value,rowsPerPage.value)
        //console.log(data.value.products)
        //console.log(totalItems)
        products.value = data.value.products
        totalItems.value = data.value.totalItems
        console.log(data.value.products)
        //console.log(totalItems)
    }

    //First time call
    onMounted(() => {
        fetchProducts()
    })

    //console.log(products)

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
                            <h2>Product ({{totalItems}})</h2>
                        </v-col>
                    </v-row>
                    <v-pagination
                        v-model="page"
                        :length="Math.ceil(totalItems / rowsPerPage)"
                        next-icon="mdi-chevron-right"
                        prev-icon="mdi-chevron-left"
                        @next="fetchProducts"
                        @prev="fetchProducts"
                        @update:model-value="fetchProducts" 
                    ></v-pagination>
                    <!-- @update:model-value กรณีที่กดเลขหน้าตรงๆ -->

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
                            <tr v-for="product in products" :key="product.id">
                                <td>{{ product.id }}</td>
                                <td>
                                    <div class="d-flex align-center py-4">
                                        <div v-if="product.productPicture">
                                            <v-img
                                                :src="`${IMAGE_PATH}/${product.productPicture}`"
                                                width="80px"
                                                class="img-fluid"
                                            ></v-img>
                                        </div>
                                        <div v-else>
                                            <v-icon size="60">mdi-image</v-icon>
                                        </div>
                                        <div class="ml-5">
                                            <h4 class="my-2">{{ product.productName }}</h4>
                                        </div>
                                    </div>
                                </td>
                                <td>{{ product.unitPrice }}</td>
                                <td>{{ product.unitInStock }}</td>
                                <td>{{ product.categoryName }}</td>
                                <td>{{ product.createdDate }}</td>
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