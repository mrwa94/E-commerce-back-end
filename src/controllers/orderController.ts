import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'

import {
  createSingleOrder,
  deleteOrder,
  getOrder,
  getSingleOrder,
  updateOrder,
} from '../services/orderServices'
import { createHttpError } from '../errors/createError'

export const getAllOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await getOrder()

    if (order.length === 0) {
      const error = createHttpError(404, 'There are no orders yet to show.')
      throw error
    }

    res.status(200).send({
      message: 'all order are returned',
      payload: order,
    })
  } catch (error) {
    next(error)
  }
}
export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.params
    const user = await getSingleOrder(_id)
    
    res.status(200).json({
      message: 'order is returned successfully!',
      payload: user,
    })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, `Id format is not valid `)
      next(error)
    } else {
      next(error)
    }
  }
}
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await createSingleOrder(req)

    res.status(201).json({
      message: 'single order created.',
      payload: order,
    })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, `Id format is not valid `)
      next(error)
    } else {
      console.error(error)
      next(error)
    }
  }
}

export const updateSingleOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.params
    const order = await updateOrder(_id, req)

    res.status(200).send({
      message: 'update single order ',
      payload: order,
    })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, `Id format is not valid `)
      next(error)
    } else {
      next(error)
    }
  }
}

export const deleteSingleOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.params
    await deleteOrder(_id)
    
    res.status(200).json({
      message: 'Delete order',
    })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, `Id format is not valid `)
      next(error)
    } else {
      next(error)
    }
  }
}
