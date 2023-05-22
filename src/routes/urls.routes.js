import express from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import urlSchema from '../schemas/url.Schema.js'
import { authValidation } from '../middlewares/auth.middleware.js'
import { shortenUrl } from '../controllers/urls.controller.js'

const urlRouter = express.Router()

urlRouter.post(
  '/urls/shorten',
  validateSchema(urlSchema),
  authValidation,
  shortenUrl
)

export default urlRouter
