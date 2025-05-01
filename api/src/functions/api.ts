import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { rateLimit } from 'express-rate-limit'
import serverless from 'serverless-http'
import swaggerUi from 'swagger-ui-express'
import '../database'
import adminRouter from '../routes/admin'
import apiRouter from '../routes/api'
import authRouter from '../routes/auth'
import swaggerSpec from '../swagger'

const app = express()

app.set('trust proxy', true)

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  keyGenerator: (req) => req.ip || req.headers['x-forwarded-for']?.[0] || 'unknown',
})

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: ['https://po.criascript.dev', 'http://localhost:5173', 'https://po-criascript.netlify.app'],
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['X-PINGOTHER', 'Content-Type'],
    exposedHeaders: ['Set-Cookie'],
    credentials: true,
  }),
)

app.use(limiter)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/auth', authRouter)
app.use('/api', apiRouter)
app.use('/admin', adminRouter)

export default app
export const handler = serverless(app)
