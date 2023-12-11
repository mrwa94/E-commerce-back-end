import { Document } from 'mongoose'

import { IProduct } from './productInterface'
import { IUser } from './userInterface'

export interface IItemes extends Document {
  _id: string
  product: IProduct['_id']
  quantity: number
}

export interface IOrder extends Document {
  _id: string
  userId: IUser['_id']
  orderItems: IItemes[]
  totalAmount: Number
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Canceled'
  shippingAddress: String
}
