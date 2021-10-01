import { Schema, model } from 'mongoose'

interface Product {
  name: string
  price: number
  discountPrice?: number
}

const schema = new Schema<Product>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: {
      type: Number,
    },
  },
  { timestamps: true }
)

// 3. Create a Model.
export const ProductModel = model<Product>('Product', schema)
