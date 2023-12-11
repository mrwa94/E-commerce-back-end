import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'

const productStorage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, 'puplic/images/products')
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/users')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg']

  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('File is not an image'))
  }
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error('File type is not allowed!'))
  }
  cb(null, true)
}

export const uploadProduct = multer({ storage: productStorage })

export const uploadUser = multer({
  storage: userStorage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
})
