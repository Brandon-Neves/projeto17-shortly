import joi from 'joi'

const loginUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
})

export default loginUserSchema
