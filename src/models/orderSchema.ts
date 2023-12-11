import { Schema, model } from 'mongoose'

import { IOrder } from '../interface/orderInterface'

const orderSchema = new Schema<IOrder>(
  {
    orderItems: [
      {
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },

        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Products',
        },
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Shipped', 'Delivered', 'Canceled'],
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export const orderModel = model<IOrder>('Order', orderSchema)
