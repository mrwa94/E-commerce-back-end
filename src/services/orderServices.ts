import { Request } from 'express'

import { orderModel } from '../models/orderSchema'
import { createHttpError } from '../errors/createError'
import { Product } from '../models/productSchema'
import User from '../models/userSchema'
import { IItemes } from '../interface/orderInterface'

export const getOrder = async () => {
  const order = await orderModel.find().populate(['userId', 'orderItems'])
  return order
}

export const getSingleOrder = async (id: string) => {
  const order = await orderModel.findOne({ _id: id }).populate(['userId', 'orderItems'])
  if (!order) {
    const error = createHttpError(404, `order is not found with this id: ${id}`)
    throw error
  }
  return order
}
export const createSingleOrder = async (req: Request) => {
  const {
    userId,
    orderItems,
    shippingAddress,
  }: { userId: string; orderItems: IItemes[]; shippingAddress: string } = req.body

  if (!userId || !orderItems || !shippingAddress) {
    throw createHttpError(
      404,
      `Order must contain products items and user data and shipping address`
    )
  }

  const user = await User.findOne({ _id: userId })
  if (!user) {
    throw createHttpError(404, `User is not found with this id: ${userId}`)
  }

  //Get the total amount of money
  const productsID = orderItems.map((item) => item.product)
  const products = await Product.find({ _id: { $in: productsID } })
  const productQuantity = orderItems.map((itemQty) => itemQty.quantity)
  const numOfProducts = productsID.length;
  //check if all product exists
  if (numOfProducts!== products.length) {
    const availbeProducts = products.filter((product)=>!productsID.includes(product._id))
    const availbeProductsNames = availbeProducts.map((product) => product.name)
    throw createHttpError(404,`products with names: ${availbeProductsNames} are the one availble, please update your order by removing other unavailble products.`)
  }

  let totalAmount = 0
  for (let i = 0; i < productQuantity.length; i++) {
    totalAmount += products[i].price * productQuantity[i]
  }

  const order = new orderModel({
    userId,
    orderItems,
    shippingAddress,
    totalAmount,
  })

  addOrderToUser(userId, order._id)

  await order.save()
  return order
}

export const addOrderToUser = async (userId: string, orderId: string) => {
  const user = await User.findOne({ _id: userId })
  if (!user) {
    throw createHttpError(
      404,
      `Order cannot be added to this user since the user is not found with this id: ${userId}`
    )
  }
  user.orders.push(orderId)
  await user.save()
}

export const updateOrder = async (id: string, req: Request) => {
  const updateData = req.body
  const order = await orderModel.findOneAndUpdate({ _id: id }, updateData, { new: true })
  if (!order) {
    const error = createHttpError(404, `order is not found with this id: ${id}`)
    throw error
  }
  return order
}

export const deleteOrder = async (id: string) => {
  const order = await orderModel.findOneAndDelete({ _id: id })
  if (!order) {
    const error = createHttpError(404, `order is not found with this id: ${id}`)
    throw error
  }
  return order
}
