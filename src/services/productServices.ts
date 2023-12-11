import slugify from 'slugify'
import { Request } from 'express'

import { Product } from '../models/productSchema'
import { createHttpError } from '../errors/createError'
import { deleteImage } from '../helper/deleteImageHelper'
import { IProduct } from '../interface/productInterface'
import { ICategory } from '../interface/categoryInterface'


export const getAllProductService = async (
  page: number,
  limit: number,
  minPrice: number,
  maxPrice: number,
  req: Request
) => {
  const count = await Product.countDocuments()
  if (count <= 0) {
    throw createHttpError(404, 'There are no products yet to show, please add products.')
  }

  //pagination
  const totalPage = Math.ceil(count / limit)
  if (page > totalPage) {
    page = totalPage
  }
  const skip = (page - 1) * limit
  const { search } = req.query
  let filter = {}
  if (search) {
    const searchRegExp = new RegExp('.*' + search + '.*', 'i')

    //Search or filter by price
    filter = {
      $or: [{ name: { $regex: searchRegExp } }, { description: { $regex: searchRegExp } }],
    }
  } else if (minPrice || maxPrice) {
    filter = { $and: [{ price: { $gte: minPrice } }, { price: { $lte: maxPrice } }] }
  }
  const options = {
    __v: 0,
  }

  const products: IProduct[] = await Product.find(filter, options)
    .sort({ price: 1 })
    .skip(skip)
    .limit(limit)
    .populate('categoryId')
  if (products.length == 0) {
    throw createHttpError(404, 'No products with those filters were found')
  }

  return {
    products,
    totalPage,
    currentPage: page,
  }
}

export const findProductBySlug = async (slug: string): Promise<IProduct> => {
  const options = {
    __v: 0,
  }
  const product = await Product.findOne({ slug: slug }, options)
  if (!product) {
    throw createHttpError(404, 'Product not found with this slug!')
  }
  return product
}

export const removeProductBySlug = async (slug: string): Promise<IProduct> => {
  const product = await Product.findOneAndDelete({
    slug: slug,
  })
  if (product && product.image) {
    await deleteImage(product.image)
  }
  if (!product) {
    throw createHttpError(404, 'Product not found with this slug!')
  }
  return product
}

export const createNewProductService = async (
  name: string,
  price: number,
  quantity: number,
  description: string,
  sold: boolean,
  shipping: string,
  categoryId: ICategory['_id']
) => {
  const productExist = await Product.exists({ name })

  if (productExist) {
    throw createHttpError(409, 'Product already exists with this name')
  }

  const newProduct = new Product({
    name,
    slug: slugify(name),
    price,
    quantity,
    description,
    sold,
    shipping,
    categoryId,
  })

  await newProduct.save()
  return newProduct;
}

export const updateProductServices = async (req: Request, slug: string): Promise<IProduct> => {
  const isProductExist = await Product.findOne({ slug: req.params.slug })
  if (!isProductExist) {
    throw createHttpError(409, 'Product with this slug does not exists')
  }

  if (req.body.name) {
    req.body.slug = slugify(req.body.name)
  }

  const updateData = req.body

  //if update image then remove thre previous

  const product = await Product.findOneAndUpdate({ slug }, updateData, {
    new: true,
  })
  if (!product) {
    const error = createHttpError(404, `Product is not found with this slug: ${slug}`)
    throw error
  }
  return product
}
