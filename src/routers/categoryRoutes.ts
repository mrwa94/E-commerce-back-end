import { Router } from 'express'

import {
  createCategory,
  deleteSingleCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
} from '../controllers/categoryController'
import { validateCreateCategory, validateUpdateCategory } from '../validation/categoryVal'
import { runValidation } from '../validation/runValidation'
import { isAdmin, isLoggedIn } from '../middlewares/auth'

const router = Router()
//GET->/api/categories->for get all the category
router.get('/', getAllCategory)
//GET->/api/categories/slug->for get single category
router.get('/:slug', getSingleCategory)
//POST->/api/categorie-> for create the category
router.post('/', validateCreateCategory, runValidation, isLoggedIn, isAdmin, createCategory)
//DELETE ->/api/categories/slug->to delete category
router.delete('/:slug', isLoggedIn, isAdmin, deleteSingleCategory)
//PUT ->/api/categories/slug->to update the single category
router.put('/:slug', validateUpdateCategory, runValidation, isLoggedIn, isAdmin, updateCategory)
export default router
