import { Schema, model, ObjectId } from 'mongoose'

interface Cart {
  userId: ObjectId
  cartProducts: [
    {
      productId: ObjectId
      qty: number
    }
  ]
}

const scheme = new Schema<Cart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'UserDetails',
    },
    cartProducts: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        qty: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
)

export const CartModel = model<Cart>('User', scheme)
