import express from 'express'

import {
  getAllOrder,
  createOrder,
  updateSingleOrder,
  deleteSingleOrder,
  getOrderById,
} from '../controllers/orderController'
import { isAdmin, isLoggedIn } from '../middlewares/auth'

const router = express.Router()

//GET->/api/orders-> get all orders
router.get('/', isLoggedIn, isAdmin, getAllOrder)
//GET->/api/orders/id-> get a single orders
router.get('/:_id', isLoggedIn, getOrderById)
//POST->/api/orders-> create an order
router.post('/', isLoggedIn, createOrder)
//PUT ->/api/orders/id->to update the single order
router.put('/:_id', isLoggedIn, isAdmin, updateSingleOrder)
//DELETE ->/api/orders/id->to delete an order
router.delete('/:_id', isLoggedIn, isAdmin, deleteSingleOrder)

export default router
