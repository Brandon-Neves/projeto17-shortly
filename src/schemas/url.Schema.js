import joi from 'joi'

const urlSchema = joi.object({
  url: joi.string().url().required()
})

export default urlSchema
