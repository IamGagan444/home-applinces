export interface User {
  _id:string
  email: string;
  password: string;
}
export interface Product {
  _id: string;
  title: string;
  image: string;
  price: string;

  sellerId?: string;
}


export interface ProductResponse {
  statusCode: number
  message: string
  data: Product[]
  success: boolean
}

export interface AddToCartResponse {
  statusCode: number
  message: string
  success: boolean
}

export interface LoginResponse {
  statusCode: number
  message: string
  data: User
  success: boolean
}