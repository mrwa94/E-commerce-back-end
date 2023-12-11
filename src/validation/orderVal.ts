import { check } from 'express-validator'

export const validateCreateOrder = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('order Name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('order Name should be 3-100 characters long'),
]

export const validateUpdateOrder = [
  check('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('order Name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('order Name should be 3-100 characters long'),
]
