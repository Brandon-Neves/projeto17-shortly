import { db } from '../database/database.js'
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'

export async function LoginUser(req, res) {
  const body = req.body
  const { id, password } = res.locals.login
  console.log(body.password)

  try {
  } catch (err) {
    res.sendStatus(500)
  }
}
