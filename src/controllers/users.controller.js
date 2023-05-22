import { db } from '../database/database.js'
import bcrypt from 'bcrypt'

export async function createUser(req, res) {
  const { name, password, email } = res.locals.user

  try {
    const passwordHash = bcrypt.hashSync(password, 10)
    await db.query(
      `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)`,
      [name, email, passwordHash]
    )
    res.sendStatus(201)
  } catch (err) {
    res.sendStatus(500)
  }
}

export async function getUrlUser(req, res) {
  const user = res.locals.user

  try {
    const { rows } = await db.query(
      `
      SELECT SUM(urls."visitCount")
      FROM urls
      WHERE "userId" = $1
    `,
      [user.id]
    )

    const [visitCount] = rows

    const urlResults = await db.query(
      `
      SELECT *
      FROM urls
      WHERE "userId" = $1
    `,
      [user.id]
    )

    const shortenedUrls = urlResults.rows.map(r => {
      return {
        id: r.id,
        shortUrl: r.shortUrl,
        url: r.url,
        visitCount: r.visitCount
      }
    })

    res.send({
      id: user.id,
      name: user.name,
      visitCount: visitCount.sum || 0,
      shortenedUrls
    })
  } catch (err) {
    res.sendStatus(500)
  }
}
