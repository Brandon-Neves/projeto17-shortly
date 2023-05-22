import express from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import loginUserSchema from '../schemas/login.Schema.js'
import { signInValidation } from '../middlewares/login.middleware.js'
import { LoginUser } from '../controllers/login.controller.js'

const loginRouter = express.Router()

loginRouter.post(
  '/signin',
  validateSchema(loginUserSchema),
  signInValidation,
  LoginUser
)

export default loginRouter
