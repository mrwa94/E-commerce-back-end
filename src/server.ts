import express, { Application } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import usersRouter from './routers/userRouter'
import authRouter from './routers/authRouters'
import productsRouter from './routers/productsRoutes'
import ordersRouter from './routers/ordersRouters'
import categoriesRouter from './routers/categoryRoutes'
import apiErrorHandler from './middlewares/errorHandler'
import myLogger from './middlewares/logger'
import { dev } from './config/server'
import { connectDB } from './config/db'

const app: Application = express()
const PORT: number = dev.app.port
app.use(myLogger)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/products', productsRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/auth', authRouter)

app.use(apiErrorHandler)

app.listen(PORT, () => {
  console.log('Server running http://localhost:' + PORT)
 
})
connectDB()