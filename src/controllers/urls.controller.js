import { db } from '../database/database.js'
import { nanoid } from 'nanoid'

export async function shortenUrl(req, res) {
  const { url } = req.body
  const userId = res.locals.user.id

  let shortUrl = url
  shortUrl = nanoid(8)
  try {
    const { rows } = await db.query(
      `INSERT INTO urls (url, "shortUrl", "userId")
    VALUES ($1, $2, $3) RETURNING id`,
      [url, shortUrl, userId]
    )
    const { id } = rows[0]
    res.status(201).send({ id: id, shortUrl: shortUrl })
  } catch (err) {
    res.sendStatus(500)
  }
}

export async function getUrls(req, res) {
  const id = req.params.id

  try {
    const { rows } = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id])
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
      `SELECT * FROM urls WHERE "shortUrl" = $1;`,
      [shortUrl]
    )
    if (rows.length === 0) {
      return res.sendStatus(404)
    }
    const result = rows[0]

    await db.query(
      `UPDATE urls SET "visitCount" = "visitCount" + 1 
    WHERE id = $1`,
      [result.id]
    )

    res.redirect(result.url)
  } catch (err) {
    res.sendStatus(500)
  }
}

export async function deleteUrl(req, res) {
  const id = req.params.id
  const user = res.locals.user

  try {
    const { rows } = await db.query(`SELECT * FROM urls WHERE id = $1`, [id])
    const resultUrl = rows[0]

    if (rows.length === 0) return res.sendStatus(404)
    if (user.id !== resultUrl.userId) return res.sendStatus(401)

    await db.query(`DELETE FROM urls WHERE id = $1`, [id])

    res.sendStatus(204)
  } catch (err) {
    res.sendStatus(500)
  }
}

export async function getUrlRanking(req, res) {
  try {
    const { rows } = await db.query(`
    SELECT u.id, u.name, 
    COUNT(s.id) as "linksCount",
    COALESCE(SUM(s."visitCount"), 0) as "visitCount"
    FROM users u
    LEFT JOIN urls s ON s."userId" = u.id
    GROUP BY u.id
    ORDER BY "visitCount" DESC
    LIMIT 10
    `)
    res.send(rows)
  } catch (err) {
    res.senStatus(500)
  }
}
