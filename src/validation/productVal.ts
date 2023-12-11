import { check } from 'express-validator'

export const createProductValidation = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('name is missing')
    .isLength({ min: 3 })
    .withMessage('name must have at least 3 characters'),
  check('price')
    .trim()
    .notEmpty()
    .withMessage('Price is missing')
    .isFloat({ min: 1 })
    .withMessage('price must be a postive number'),
  check('quantity')
    .trim()
    .notEmpty()
    .withMessage('Quantity is missing')
    .isInt({ min: 1 })
    .withMessage('Qunatity must be a postive number'),
  check('description')
    .trim()
    .notEmpty()
    .withMessage('name is missing')
    .isLength({ min: 5, max: 300 })
    .withMessage('product description must be between 5-300 character long'),
  check('categoryId').trim().notEmpty().withMessage('category id is missing'),
]

export const updateProductValidation = [
  check('name')
    .trim()
    .isLength({ min: 3 })
    .optional()
    .withMessage('name must have at least 3 characters'),
  check('price')
    .trim()
    .optional()
    .isFloat({ min: 1 })
    .withMessage('price must be a postive number'),
]
