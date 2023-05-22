import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import createUserRouter from './routes/signUp.routes.js'
import loginRouter from './routes/signIn.routes.js'
import urlRouter from './routes/urls.routes.js'
import userRouter from './routes/user.routes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use([createUserRouter, loginRouter, urlRouter, userRouter])

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running: ${PORT}`)
})
