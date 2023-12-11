import { Request, Response, NextFunction } from 'express'

import { handleLoginService } from '../services/authServices'

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await handleLoginService(req, res)

    res.status(200).send({
      message: 'login success',
      payload: user,
    })
  } catch (error) {
    next(error)
  }
}

export const handleLogout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('access_token')
    res.status(200).send({
      message: 'logout success',
    })
  } catch (error) {
    next(error)
  }
}
