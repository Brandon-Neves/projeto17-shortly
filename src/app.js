import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routes/signUp.routes.js'
import loginRouter from './routes/signIn.routes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use([userRouter, loginRouter])

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running: ${PORT}`)
})
