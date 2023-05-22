import express from 'express'
import { authValidation } from '../middlewares/auth.middleware.js'
import { getUrlUser } from '../controllers/users.controller.js'

const userRouter = express.Router()

userRouter.get('/users/me', authValidation, getUrlUser)

export default userRouter
