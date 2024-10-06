<script setup lang="ts">
    import useBackendAPI from '~/composables/useBackendAPI';
    import type { Category } from '~/types/category';

    const totalItems = ref(0)
    const categories: Ref<Category[]> = ref([])
    const fetchCategories = async () => {
        const { data } = await useBackendAPI().getAllCategories();
        categories.value = data?.value ?? []
        //order categories by id
        categories.value = categories.value.sort((a, b) => a.id - b.id)

        totalItems.value = data?.value?.length ?? 0
        console.log(categories?.value)
    }

    //==========================================================
    //First time call
    onMounted(() => {
        fetchCategories()
    })

    //==========================================================
    const dialog = ref(false)
    const deletedialog = ref(false)

    const editedIndex = ref(-1)
    const deleteIndex = ref(-1)
    const categoryName = ref('')
    const categoryStatus = ref(1)

    //Computed Property
    const formTitle = computed(() => {
        return editedIndex.value === -1 ? "Add New Category" : "Edit Category"
    })

    // Reset Form
    const resetForm = () => {
        categoryName.value = ''
        categoryStatus.value = 1
    }

    // Close Dialog
    function close() {
        dialog.value = false
        deletedialog.value = false
        setTimeout(() => {
        }, 300)
    }

    // ----------------- Form Validation ----------------
    const nameRules = [
        (v: string) => !!v || "Category name is required",
        (v: string) => (v && v.length >= 3) || "Category name be at least 3 characters",
    ]

    const isFormValid = () => {
        return categoryName.value
    }

    const formAddSubmit = async () => {
        
        if (!isFormValid()) {
            return
        }

        try {
            const category = {
                id: 0,
                categoryName: categoryName.value,
                categoryStatus: categoryStatus.value
            }
            const { data } = await useBackendAPI().addCategory(category)
            // console.log(data)
            resetForm()
            close()
            fetchCategories()
        }
        catch (error) {
            console.log(error)
        }
    }

    const formGetById = async (id: number) => {
        const { data } = await useBackendAPI().getCategoryById(id)
        console.log(data)
        categoryName.value = data?.value?.categoryName ?? ''
        categoryStatus.value = data?.value?.categoryStatus ?? 1
        editedIndex.value = data?.value?.id ?? -1
    }

    const formEditSubmit = async () => {
        if (!isFormValid()) {
            return
        }

        try
        {
            const category = {
                id: editedIndex.value,
                categoryName: categoryName.value,
                categoryStatus: categoryStatus.value
            }
            const { data } = await useBackendAPI().updateCatagory(editedIndex.value, category)
            console.log(data)
            resetForm()
            close()
            fetchCategories()
        }
        catch (error) {
            console.log(error)
        }
    }

    const formDeleteById = async (id: number) => {
        try {
            const { data } = await useBackendAPI().deleteCategory(id)
            console.log(data)
            close()
            fetchCategories()
        }
        catch (error) {
            console.log(error)
        }
    }

   
    definePageMeta({
        layout: "backend",
    })
    
    useHead({
        title: 'Category',
        meta: [
            {
                name: 'Description',
                content: 'Categry Page'
            }
        ]
    })
</script>

<template>
    <div>
        <h1>Category Page</h1>
    </div>

    <!-- ====================================== -->
    <!-- Add / Edit Category Dialog -->
    <v-dialog
        v-model="dialog"
        max-width="500"
    >
        <v-card>
            <v-card-title class="pa-4 bg-secondary">
                <span class="title text-white">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-form fast-fail ref="form" @submit.prevent="editedIndex === -1 ? formAddSubmit(): formEditSubmit()">
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-text-field
                                    v-model="categoryName"
                                    :rules="nameRules"
                                    label="Category Name"
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <!-- <v-select
                                    v-model="categoryStatus"
                                    :items="[1, 0]"
                                    label="Status"
                                    required
                                ></v-select> -->
                                <v-btn
                                :class="{'bg-primary': categoryStatus === 1, 'bg-gray': categoryStatus !== 1}"
                                @click="categoryStatus = 1"
                                >
                                    Active
                                </v-btn>
                                <v-btn
                                    :class="{'bg-primary': categoryStatus === 0, 'bg-gray': categoryStatus !== 0}"
                                    @click="categoryStatus = 0"
                                >
                                    Inactive
                                </v-btn>
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

    <!-- ====================================== -->
    <!-- Confirm Delete Dialog -->
    <v-dialog
        v-model="deletedialog"
        width="auto"
    >
        <v-card>
        <v-card-title class="text-h6 mx-3 mt-3">
            Confirm delete product Id: {{ deleteIndex }} ?
        </v-card-title>
        <v-card-actions class="pb-4">
            <v-spacer></v-spacer>
            <v-btn
            color="red-darken-1"
            class="text-button"
            variant="text"
            @click="formDeleteById(deleteIndex)"
            >
            Delete
            </v-btn>
            <v-btn
            color="grey-darken-1"
            class="text-button"
            variant="text"
            @click="deletedialog=false"
            >
            Cancel
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- Confirm Delete Dialog -->
    <!-- ====================================== -->
    <!-- List Category -->
    <v-row>
        <v-col cols="12" sm="12">
            <v-card>
                <v-card-text class="pa-5">
                    <v-row>
                        <v-col cols="12" lg="6" md="6">
                            <h2>Category({{totalItems}})</h2>
                        </v-col>
                        <v-col cols="12" lg="6" md="6" class="text-right">
                            <v-btn color="primary"
                                class="m1-auto"
                                variant="elevated"
                                @click="dialog=true;editedIndex=-1;resetForm();"
                            >
                            Add Product</v-btn>
                        </v-col>
                    </v-row>

                    <v-table class="mt-5">
                        <thead>
                            <tr>
                                <th class="text-left">Id</th>
                                <th class="text-left">Category Name</th>
                                <th class="text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="category in categories" :key="category.id">
                                <td>{{ category.id }}</td>
                                <td>{{ category.categoryName }}</td>
                                <td>
                                    <v-chip
                                        :color="category.categoryStatus === 1 ? 'primary' : 'grey'"
                                        dark
                                        >
                                        {{ category.categoryStatus === 1 ? 'Active' : 'Inactive' }}
                                    </v-chip>
                                </td>
                                <td>
                                    <v-icon 
                                        small
                                        class="mr-2 text-info cursor-pointer"
                                        title="Edit"
                                        @click="dialog=true;editedIndex=1;formGetById(category.id)"
                                        >mdi-pencil
                                    </v-icon>
                                    <v-icon 
                                        small
                                        class="mr-2 text-info cursor-pointer"
                                        title="Delete"
                                        @click="deletedialog=true;deleteIndex=category.id"
                                        >mdi-delete
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
    .bg-primary {
        background-color: #1976d2 !important; /* Vuetify primary color */
        color: white !important;
    }

    .bg-gray {
        background-color: #e0e0e0 !important; /* Gray color */
        color: black !important;
    }
</style>