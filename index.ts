import express from 'express'
import { dbconnect } from './config/Dbconfig'
import CartRouter from './controllers/cart'
import {
  currentUser,
  requireAuth,
  errorHandler,
  ExpectedError,
} from '@partheev8/commonlib'

const app = express()
dbconnect()
app.use(currentUser)
app.use('/api/cart', requireAuth, CartRouter)

app.all('*', () => {
  throw new ExpectedError(500, 'Route not found')
})
app.use(errorHandler)

app.listen(3001, () => {
  console.log('ecombackend listening on 3001...........')
})
