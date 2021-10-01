import mongoose from 'mongoose'

export const dbconnect = async () => {
  await mongoose.connect('mongodb://localhost:27017/test')
}
