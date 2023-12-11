import { Schema, model } from 'mongoose'

import { IProduct } from '../interface/productInterface'

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'product name must be at least 3 character long'],
      maxlength: [300, 'product name must be at most 300 character long'],
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    price: {
      type: Number,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      trim: true,
    },

    sold: {
      type: Number,
      trim: true,
      default: 0,
    },

    image: {
      type: String,
      default: 'public/products/products.jpeg',
    },

    shipping: {
      type: Number,
      default: 0, // 0 -> free
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [5, 'product description must be at least 5 character long'],
      maxlength: [300, 'product description must be at most 300 character long'],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },

  { timestamps: true }
)

export const Product = model<IProduct>('Products', productSchema)
