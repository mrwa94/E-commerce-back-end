import { Error } from '../types'
import ApiError from './ApiError'

export const createHttpError = (status: number, message: string) => {
  const error: Error = new ApiError(status, message)

  return error
}
