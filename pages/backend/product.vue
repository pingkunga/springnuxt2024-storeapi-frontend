<script setup lang="ts">
    import useBackendAPI from '@/composables/useBackendAPI';
    import type { Category } from '~/types/category';
    import type { Product, ProductList } from '~/types/product';

    const config = useRuntimeConfig()
    const IMAGE_PATH = config.public.urlimage

    //==========================================================
    //Pagination
    const page = ref(1)
    const rowsPerPage = ref(2)
    const totalItems = ref(0)
    //Pagination
    //Search
    const searchQuery = ref('')
    //==========================================================

    const products: Ref<Product[]> = ref([])
    const fetchProducts = async () => {
        const { data } = await useBackendAPI().getAllProducts(page.value,rowsPerPage.value, searchQuery.value)
        //console.log(data.value.products)
        //console.log(totalItems)
        products.value = data.value?.products ?? []
        totalItems.value = data.value?.totalItems ?? 0
        //console.log(data.value?.products)
        //console.log(totalItems)
    }

    //==========================================================
    //Lookup
    //const categoryList: Ref<Category[]> = ref([])
    const fetchCategories = async () => {
        const { data } = await useBackendAPI().getAllCategories()
        categoryList.value = data?.value ?? []
        console.log(categoryList?.value)
    }

    //==========================================================
    //First time call
    onMounted(() => {
        fetchProducts()
        fetchCategories()
    })

    //==========================================================
    //BEGIN: Detail for Add / Edit / View
    // Form data ------------------------------------------
    const productName = ref('')
    const unitPrice  = ref(0)
    const unitInStock = ref(0)
    const image = ref<File | null>(null)
    const category = ref('')
    const categoryList = ref([] as Category[])

    // ----------------- Dialog ---------------------------
    const dialog = ref(false)
    const deletedialog = ref(false)
    const search = ref("");
    const editedIndex = ref(-1)
    const deleteIndex = ref(-1)

    // Close Dialog
    function close() {
        dialog.value = false
        deletedialog.value = false
        setTimeout(() => {
        }, 300)
    }

    //Computed Property
    const formTitle = computed(() => {
        return editedIndex.value === -1 ? "Add New Product" : "Edit Product"
    })

    // Reset Form
    const resetForm = () => {
        productName.value = ''
        image.value = null
        files.value = []
        unitPrice.value = 0
        unitInStock.value = 0
        category.value = ''
        imageUrl.value = null
    }

    // for image preview =================
    const files = ref([])
    const imageUrl = ref<string | null>(null)

    // handle image change
    const handleFileChange = async (e: Event) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        const reader = new FileReader()
        reader.onload = (e) => {
        imageUrl.value = e.target?.result as string
        }
        reader.readAsDataURL(file!)
        image.value = files.value[0]
    }

    // remove image
    const removeImage = () => {
        imageUrl.value = null
    }

    // ----------------- Form Validation ----------------
    const nameRules = [
        (v: string) => !!v || "Product name is required",
        (v: string) => (v && v.length >= 5) || "Product name be at least 5 characters",
    ]

    const priceRules = ref([
        (v: string) => !!v || "Price is required",
    ])

    const qtyRules = ref([
        (v: string) => !!v || "Unit in stock is required",
    ])

    const categoryRules = ref([
        (v: string) => !!v || "Category is required",
    ])

    const isFormValid = () => {
      return productName.value && unitPrice.value && unitInStock.value && category.value && image.value;
    };

    // ----------------- Form Validation ----------------
    const formAddSubmit = async () => {

        if (!isFormValid()) {
            return
        }

        const formData = new FormData()
        formData.append('productName', productName.value)
        formData.append('unitPrice', unitPrice.value.toString())
        formData.append('unitInStock', unitInStock.value.toString())
        formData.append('categoryId ', category.value)

        if (image.value){
            formData.append('image', image.value as Blob)
        }

        //debug formData
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }
        /*
        const { data } = await useBackendAPI().addProduct(formData)
        if (data.value) {
            fetchProducts()
            close()
        }
            */
    }

    const formEditSubmit = async () => {

    }
    //END: Detail for Add / Edit / View
    //==========================================================
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

    <!-- ====================================== -->
    <!-- Add / Edit Product Dialog -->
    <v-dialog v-model="dialog" width="800">
        <v-card>

            <v-card-title class="pa-4 bg-secondary">
                <span class="title text-white">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                <v-form fast-fail ref="form" @submit.prevent="editedIndex === -1 ? formAddSubmit(): formEditSubmit()">
                    <v-row>

                    <v-col cols="12" sm="6">
                        <v-col cols="12" sm="12">
                        <v-text-field
                            v-model="productName"
                            :rules="nameRules"
                            label="Product Name"
                            hide-details="auto"
                            variant="outlined"
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                        <v-text-field
                            v-model="unitPrice"
                            :rules="priceRules"
                            label="Price"
                            hide-details="auto"
                            variant="outlined"
                            type="number"
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="12">
                        <v-text-field
                            v-model="unitInStock"
                            :rules="qtyRules"
                            label="Unit in Stock"
                            hide-details="auto"
                            variant="outlined"
                            type="number"
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="12">
                        <v-select
                            v-model="category"
                            :rules="categoryRules"
                            :items="categoryList"
                            item-title="categoryName"
                            item-value="id"
                            label="Category"
                            hide-details="auto"
                            variant="outlined"
                        ></v-select>
                        </v-col>
                    </v-col>

                    <v-col cols="12" sm="6">

                        <v-col cols="12" sm="12">
                        <!-- Preview Image -->
                        <v-img v-if="imageUrl" :src="imageUrl" class="img-prview">
                            <v-btn icon @click="removeImage">
                            <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-img>

                        <!-- Image Inputs -->
                        <v-file-input
                            @change="handleFileChange"
                            v-model="files"
                            label="Image"
                            hide-details="auto"
                            outlined
                            dense
                            prepend-icon="mdi-image"
                            accept="image/*"
                        ></v-file-input>
                        </v-col>
                    </v-col>

                    </v-row>

                    <v-row justify="center">
                        <!-- Button Submit -->
                        <v-card-actions class="pl-3">
                        <v-btn
                            color="secondary"
                            size="large"
                            variant="elevated"
                            type="submit"
                            >Submit</v-btn
                        >
                        <v-btn color="error" size="large" @click="close">Cancel</v-btn>
                        </v-card-actions>
                    </v-row>

                </v-form>
                </v-container>
            </v-card-text>

        </v-card>
    </v-dialog>
    <!-- Add / Edit Product Dialog -->
    <!-- ====================================== -->


    <v-row>
        <v-col cols="12" sm="12">
            <v-card>
                <v-card-text class="pa-5">
                    <v-row>
                        <v-col cols="12" lg="3" md="3">
                            <h2>Product ({{totalItems}})</h2>
                        </v-col>
                        <v-col cols="12" lg="6" md="6">
                            <v-text-field
                                v-model="searchQuery"
                                density="compact"
                                label="Search"
                                append-icon="mdi-magnify"
                                hide-details
                                variant="outlined"
                                @keyup.enter="fetchProducts"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="3" md="3" class="text-right">
                            <v-btn color="primary"
                                class="m1-auto"
                                variant="elevated"
                                @click="dialog=true;editedIndex=-1;resetForm();"
                            >
                            Add Product</v-btn>
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