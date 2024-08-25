import type { Category, CategoryList } from '~/types/category'
import type { ProductList, Product} from '~/types/product'

export default() => {

    const router = useRouter()

    const config = useRuntimeConfig()
    const api = config.public.apiBase
    const imagePath = config.public.apiImage

    const token = useCookie('token')

    const headers = {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token.value}`
    }

    const headerFormData = {
        'Authorization': `Bearer ${token.value}`
    }
 
    const callWithTokenCheck = async<T>(url: string, options: object) => {
        //https://stackoverflow.com/questions/76839341/which-to-use-fetch-useasyncdata-or-usefetch-for-get-and-post-requests-in-nuxt
        const response = await useFetch<T>(url, options)
        //console.log(response)
        //console.log(response.error.value)
        if(response?.error.value){
            if(response?.error.value.statusCode === 403 || response?.error.value.statusCode === 401) {
                //Token expired redirect to login
                router.push('/')
            }
            else {
                console.log(response?.error.value)
            }
        }

        return response
    }

    const getAllProducts = async(page: number, limit: number, searchQuery: string = '', selectedCategory: number | null = null) => {
        // return fetchWithTokenCheck<ProductList>(
        //     `${api}/products?page=${page}&limit=${limit}&searchQuery=${searchQuery}`,
        //     {
        //         method: 'GET',
        //         headers: headers,
        //         cache: 'no-cache'
        //     }
        // )

        let url = `${api}/products?page=${page}&limit=${limit}`
        if (searchQuery) {
            url += `&searchQuery=${encodeURIComponent(searchQuery)}`
        }

        if (selectedCategory !== null) {
            url += `&selectedCategory=${selectedCategory}`
        }

        const res = await callWithTokenCheck<ProductList>(
            url,
            {
                method: 'GET',
                headers: headers,
                cache: 'no-cache'
            }
        )
        
        console.log(res)
        
        if (res.data.value?.products) {
            for (let i = 0; i < res.data.value.products.length; i++) {
                await getProductImage(res.data.value.products[i])
            }
        }
        return res
    }

    const getProductById = async(id: number): Promise<Product> => {
        const res = await callWithTokenCheck<Product>(
            `${api}/products/${id}`,
            {
                method: 'GET',
                headers: headers,
                cache: 'no-cache'
            }
        )

        if (res.data.value) {
            await getProductImage(res.data.value)
            return res.data.value
        }

        throw new Error('Product not found')
    }

    //:src="`${imagePath}/${product.productPicture}`"
    const getProductImage = async(product: Product) => {
        const response = await fetch(`${imagePath}/${product.productPicture}`, {
            headers: {
               'Authorization': `Bearer ${token.value}`
            },
        });
        const blob = await response.blob();
        product.productImgBlob = URL.createObjectURL(blob);
    }

    const addProduct = async(product: FormData) => {
        return callWithTokenCheck<FormData>(
            `${api}/products`,
            {
                method: 'POST',
                headers: headerFormData,
                body: product
            }
        )
    }

    const updateProduct = async(id: number, product: FormData) => {
        return callWithTokenCheck<FormData>(
            `${api}/products/${id}`,
            {
                method: 'PUT',
                headers: headerFormData,
                body: product
            }
        )
    }

    const deleteProduct = async(id: number) => {
        return callWithTokenCheck<FormData>(
            `${api}/products/${id}`,
            {
                method: 'DELETE',
                headers: headerFormData,
                cache: 'no-cache'
            }
        )
    }
    //===========================================================================================
    const getAllCategories = async() => {
        return callWithTokenCheck<CategoryList>(
            `${api}/categories`,
            {
                method: 'GET',
                headers: headers,
                cache: 'no-cache'
            }
        )
    }

    const getCategoryById = async(id: number) => {
        return callWithTokenCheck<Category>(
            `${api}/categories/${id}`,
            {
                method: 'GET',
                headers: headers,
                cache: 'no-cache'
            }
        )
    }

    const addCategory = async(category: Category) => {
        return callWithTokenCheck<Category>(
            `${api}/categories`,
            {
                method: 'POST',
                headers: headers,
                body: category
            }
        )
    }

    const updateCatagory = async(id: number, category: Category) => {
        return callWithTokenCheck<Category>(
            `${api}/categories/${id}`,
            {
                method: 'PUT',
                headers: headers,
                body: category
            }
        )
    }

    const deleteCategory = async(id: number) => {
        return callWithTokenCheck<Category>(
            `${api}/categories/${id}`,
            {
                method: 'DELETE',
                headers: headers,
                cache: 'no-cache'
            }
        )
    }
    
    return {
        getAllProducts,
        addProduct, 
        getProductById,
        updateProduct,
        deleteProduct,

        getAllCategories,
        getCategoryById,
        addCategory,
        updateCatagory,
        deleteCategory
    }
}