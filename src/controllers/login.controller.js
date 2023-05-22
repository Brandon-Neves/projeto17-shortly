import { db } from '../database/database.js'
import { v4 as uuid } from 'uuid'

export async function LoginUser(req, res) {
  const body = req.body
  const { id, password } = res.locals.login

  try {
    if (body.password !== password) {
      return res.sendStatus(401)
    }
    const token = uuid()
    await db.query(
      `INSERT INTO sessions (token, "userId") 
    VALUES ($1, $2)`,
      [token, id]
    )
    res.status(200).send({ token: token })
  } catch (err) {
    res.sendStatus(500)
  }
}
