export interface Category { 
    id: string, 
    name: string, 
    slug: string 
}

export interface Brand {
    id: string, 
    name: string
}

export interface Product {
    id: string, 
    name: string,
    price: number,
    in_stock: boolean,
    category: Category,
    brand: Brand
}

export interface ProductsPage {
    current_page: number,
    per_page: number,
    total: number,
    data: Product[]
}

export interface LoginResponse {
    access_token: string,
    token_type: string,
    expires_in: number
}

export interface User {
    id: string,
    first_name: string,
    last_name: string,
    email: string
}