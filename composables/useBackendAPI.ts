import type { ProductList, Product} from '~/types/product'

export default() => {

    const router = useRouter()

    const config = useRuntimeConfig()
    const api = config.public.url

    const token = useCookie('token')

    const headers = {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token.value}`
    }
 
    const fetchWithTokenCheck = async<T>(url: string, options: object) => {
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

    const getAllProducts = async(page: number, limit: number, searchQuery: string) => {
        return fetchWithTokenCheck<ProductList>(
            `${api}/products?page=${page}&limit=${limit}&searchQuery=${searchQuery}`,
            {
                method: 'GET',
                headers: headers,
                cache: 'no-cache'
            }
        )
    }
    
    return {
        getAllProducts
    }
}