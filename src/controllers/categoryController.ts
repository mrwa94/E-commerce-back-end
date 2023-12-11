import { NextFunction, Request, Response } from 'express'

import {
  createSingleCategory,
  deleteCategory,
  getCategory,
  getCategoryBySlug,
  updateSingleCategory,
} from '../services/categoryServices'
import { createHttpError } from '../errors/createError'

export const getAllCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await getCategory(req)
    if (category.length === 0) {
      const error = createHttpError(404, 'There are no category yet to show.')
      throw error
    }

    res.status(200).json({
      message: 'all category are returned',
      payload: category,
    })
  } catch (error) {
    next(error)
  }
}

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body
    const category = await createSingleCategory(name)

    res.status(201).json({
      message: 'single category created.',
      payload: category,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteSingleCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    await deleteCategory(slug)

    res.status(200).json({
      message: `Category with value ${slug} is deleted`,
    })
  } catch (error) {
    next(error)
  }
}
export const getSingleCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    const category = await getCategoryBySlug(slug)

    res.status(200).json({
      message: 'Single category returned',
      payload: category,
    })
  } catch (error) {
    next(error)
  }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    const category = await updateSingleCategory(slug, req)

    res.status(200).json({
      message: 'Single category updated',
      payload: category,
    })
  } catch (error) {
    next(error)
  }
}
