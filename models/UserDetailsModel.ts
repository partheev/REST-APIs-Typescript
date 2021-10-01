import { Schema, model, ObjectId } from 'mongoose'

interface UserDetails {
  userId: string
  name: string
  email?: string
  phoneNumber?: number
}

const schema = new Schema<UserDetails>({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
})

export const UserModel = model<UserDetails>('UserDetails', schema)
