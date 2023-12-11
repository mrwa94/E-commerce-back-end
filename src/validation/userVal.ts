import { check } from 'express-validator'

export const validateCreateUser = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('User name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('User name should be 3-100 characters long'),
  check('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Passowrd must be above 8 characters long.'),
  check('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Enter a valid email address')
    .toLowerCase(),
  check('phone').trim().isLength({ min: 10 }).withMessage('Please enter a valid phone number'),
  check('image').optional(),
]

export const validateUpdateUser = [
  check('name')
    .trim()
    .optional()
    .notEmpty()
    .withMessage('User name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('User name should be 3-100 characters long'),
  check('password')
    .trim()
    .optional()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Passowrd must be above 8 characters long.'),
  check('email')
    .trim()
    .optional()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Enter a valid email address')
    .toLowerCase(),
  check('phone')
    .trim()
    .optional()
    .isLength({ min: 10 })
    .withMessage('Please enter a valid phone number'),
  check('image').optional(),
]
