import { db } from '../database/database.js'

export async function validationSignUp(req, res, next) {
  const user = req.body

  try {
    const emailExists = await db.query(
      `SELECT * FROM users WHERE email = $1;`,
      [user.email]
    )
    if (emailExists.rowCount !== 0) {
      return res.sendStatus(409)
    }
    res.locals.user = user
    next()
  } catch (err) {
    res.sendStatus(500)
  }
}
