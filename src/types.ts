export type Product = {
  _id: string
  name: string
  price: number
  slug: string
  description: string
  sold: number
  quantity: number
  createdAt?: NativeDate
  updatedAt?: NativeDate
}
export type ProductInput = Omit<Product, ' slug'>

export interface Error {
  status?: number
  message?: string
}
export type EmailDataType = {
  email: string
  subject: string
  html: string
}

export type userType = {
  name: string
  email: string
  password: string
  phone: string
  image?: string
}
