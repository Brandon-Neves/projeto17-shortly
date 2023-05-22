import { db } from '../database/database.js'
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'

export async function LoginUser(req, res) {
  const { email, password } = req.body

  try {
    const { rows } = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email
    ])
    const user = rows[0]

    if (bcrypt.compareSync(password, user.password)) {
      const token = uuid()
      await db.query(
        `INSERT INTO sessions (token, "userId") 
    VALUES ($1, $2)`,
        [token, user.id]
      )
      return res.status(200).send({ token: token })
    }
    res.sendStatus(401)
  } catch (err) {
    res.sendStatus(500)
  }
}
