import { db } from '../database/database.js'
import bcrypt from 'bcrypt'

export async function createUser(req, res) {
  const { name, password, email } = res.locals.user
  console.log(name, password, email)

  try {
    const passwordHash = bcrypt.hashSync(password, 10)
    await db.query(
      `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)`,
      [name, email, passwordHash]
    )
    res.sendStatus(201)
  } catch (err) {
    res.sendStatus(300)
  }
}
