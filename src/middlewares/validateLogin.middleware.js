import { db } from '../database/database.js'

export async function signInValidation(req, res, next) {
  const login = req.body

  try {
    const { rows } = await db.query(`SELECT * FROM users WHERE email = $1;`, [
      login.email
    ])
    if (rows.length === 0) {
      return res.sendStatus(401)
    }
    res.locals.login = rows[0]
    next()
  } catch (err) {
    res.sendStatus(500)
  }
}
