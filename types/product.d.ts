export interface Product {
    id: number
    productName: string
    unitPrice: number
    unitInStock: number
    productPicture: string
    categoryId: number
    categoryName: string
    createdDate: string // ISO date string
    modifiedDate: string | null // ISO date string or null

    productImgBlob: string //base64
}
  
export interface ProductList {
    currentPage: number
    totalPages: number
    totalItems: number
    products: Product[]
}