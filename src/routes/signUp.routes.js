import express from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import createUserSchema from '../schemas/user.Schema.js'
import { validationSignUp } from '../middlewares/validateSignup.middleware.js'
import { createUser } from '../controllers/users.controller.js'

const userRouter = express.Router()

userRouter.post(
  '/signup',
  validateSchema(createUserSchema),
  validationSignUp,
  createUser
)

export default userRouter
