import joi from 'joi'

const createUserSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().min(5).required(),
  password: joi.string().min(2).required(),
  confirmPassword: joi.any().valid(joi.ref('password')).required()
})

export default createUserSchema
