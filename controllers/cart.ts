import { Request, Response } from 'express'
import { CartModel } from '../models/CartModel'
import express from 'express'
import { BadRequestError } from '@partheev8/commonlib'

const router = express.Router()

router.get('/getCartProducts', async (req: Request, res: Response) => {
  const userId = req.currentUser.userId
  const cart = await CartModel.findOne({ userId: userId })

  res.send({ cartProducts: cart.cartProducts })
})

router.post('/addToCart', async (req: Request, res: Response) => {
  const productId = req.body.productId
  const userId = req.currentUser.userId
  const cart = await CartModel.findOne({ userId: userId })

  const foundItem = cart.cartProducts.find(
    (item) => item.productId === productId
  )
  if (!foundItem) {
    cart.cartProducts.push({
      productId: productId,
      qty: 1,
    })
    await cart.save()
    return res.send({})
  }

  const index = cart.cartProducts.indexOf(foundItem)
  cart.cartProducts[index] = {
    productId: productId,
    qty: 1,
  }

  await cart.save()
  res.send({})
})

router.post('/deleteItem', async (req: Request, res: Response) => {
  const productId = req.body.productId
  const userId = req.currentUser.userId
  const cart = await CartModel.findOne({ userId: userId })
  const index = cart.cartProducts.findIndex(
    (item) => item.productId === productId
  )
  if (index > -1) {
    cart.cartProducts.splice(index, 1)
    await cart.save()
    return res.send({})
  }

  throw new BadRequestError()
})

router.post('/incrementItem', async (req: Request, res: Response) => {
  const productId = req.body.productId
  const userId = req.currentUser.userId
  const cart = await CartModel.findOne({ userId: userId })
  const index = cart.cartProducts.findIndex(
    (item) => item.productId === productId
  )

  if (index > -1) {
    cart.cartProducts[index].qty++
    await cart.save()
    return res.send({})
  }
  throw new BadRequestError()
})

router.post('/decrementItem', async (req: Request, res: Response) => {
  const productId = req.body.productId
  const userId = req.currentUser.userId
  const cart = await CartModel.findOne({ userId: userId })
  const index = cart.cartProducts.findIndex(
    (item) => item.productId === productId
  )
  if (index > 1) {
    cart.cartProducts[index].qty--
    await cart.save()
    return res.send({})
  } else if (index === 1) {
    cart.cartProducts.splice(index, 1)
    await cart.save()
    return res.send({})
  }

  throw new BadRequestError()
})
export default router
