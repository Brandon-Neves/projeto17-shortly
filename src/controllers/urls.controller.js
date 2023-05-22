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

export async function getUrls(req, res) {
  const id = req.params.id

  try {
    const { rows } = await db.query(`SELECT * FROM url WHERE id = $1;`, [id])
    if (rows.length === 0) {
      return res.sendStatus(404)
    }
    const result = rows[0]
    res
      .status(201)
      .send({ id: result.id, shortUrl: result.shortUrl, url: result.url })
  } catch (err) {
    res.sendStatus(500)
  }
}

export async function redirectUrl(req, res) {
  const shortUrl = req.params.shortUrl

  try {
    const { rows } = await db.query(
      `SELECT * FROM url WHERE "shortUrl" = $1;`,
      [shortUrl]
    )
    if (rows.length === 0) {
      return res.sendStatus(404)
    }
    const result = rows[0]

    await db.query(
      `UPDATE url SET count = count + 1 
    WHERE id = $1`,
      [result.id]
    )

    res.redirect(result.url)
  } catch (err) {
    res.sendStatus(500)
  }
}
