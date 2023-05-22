import { db } from '../database/database.js'
import { nanoid } from 'nanoid'

export async function shortenUrl(req, res) {
  let { url } = req.body
  const { id } = res.locals.user

  url = nanoid(8)

  try {
    await db.query(
      `INSERT INTO url (url, "shortUrl", "userId")
    VALUES ($1, $2, $3)`,
      [req.body.url, url, id]
    )

    res.status(201).send({ id: id, shortUrl: url })
  } catch (err) {
    res.sendStatus(500)
  }
}
