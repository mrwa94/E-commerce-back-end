import mongoose from 'mongoose'

import { dev } from './server'

//to connect express app to mongodb server
export const connectDB = async () => {
  try {
    await mongoose.connect(dev.db.url)
    console.log('db is connected')
  } catch (error) {
    console.error(error)
  }
}
