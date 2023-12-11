import { Router } from 'express'

import {
  createProduct,
  deleteProductBySlug,
  getAllProducts,
  getProductBySlug,
  updateProductBySlug,
} from '../controllers/productController'
import { createProductValidation, updateProductValidation } from '../validation/productVal'
import { runValidation } from '../validation/runValidation'
import { isAdmin, isLoggedIn } from '../middlewares/auth'
import { uploadProduct } from '../middlewares/uploadFile'

const router = Router()

// GET: /products -> return all the products
router.get('/', getAllProducts)
//GET: /product/:slug -> get a single product based on slug
router.get('/:slug', getProductBySlug)
//POST: /products -> create a new product
router.post(
  '/',
  createProductValidation,
  runValidation,
  uploadProduct.single('image'),
  isLoggedIn,
  isAdmin,
  createProduct
)
// Delete: /products/:slug -> delete a product
router.delete('/:slug', isLoggedIn, isAdmin, deleteProductBySlug)
// Update: /products/:slug -> Update a product by slug
router.put(
  '/:slug',
  updateProductValidation,
  runValidation,
  isLoggedIn,
  isAdmin,
  updateProductBySlug
)

export default router
