import express from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import createUserSchema from '../schemas/user.Schema.js'
import { signUpValidation } from '../middlewares/signup.middleware.js'
import { createUser } from '../controllers/users.controller.js'

const createUserRouter = express.Router()

createUserRouter.post(
  '/signup',
  validateSchema(createUserSchema),
  signUpValidation,
  createUser
)

export default createUserRouter
