import { Document } from 'mongoose'

export interface ICategory extends Document {
  _id: string
  name: string
  slug: string
  createdAt?: string
  updatedAt?: string
  __v: number
}
