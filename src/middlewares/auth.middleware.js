import { db } from '../database/database.js'

export async function authValidation(req, res, next) {
  const authorization = req.headers.authorization
  const token = authorization?.replace('Bearer ', '')

  if (!token) return res.sendStatus(401)

  try {
    const { rows } = await db.query(`SELECT * FROM sessions WHERE token = $1`, [
      token
    ])

    if (rows.length === 0) return res.sendStatus(401)

    const users = await db.query(`SELECT * FROM users WHERE id = $1`, [
      rows[0].userId
    ])

    const user = users.rows[0]
    if (!user) return res.sendStatus(401)

    res.locals.user = user
    next()
  } catch (err) {
    res.sendStatus(500)
  }
}
