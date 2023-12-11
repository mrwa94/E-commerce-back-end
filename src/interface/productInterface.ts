import { Document } from 'mongoose'
import { ICategory } from './categoryInterface'

export interface IProduct extends Document {
  name: string
  slug: string
  price: number
  image: string
  quantity: number
  sold: number
  shipping: number
  description: string
  createdAt?: string
  updatedAt?: string
  categoryId: ICategory['_id']
}
