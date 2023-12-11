import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const runValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let errorList = errors.array().map((error) => error.msg)
    return res.status(422).send({
      message: errorList[0],
    })
  }
  next()
}
