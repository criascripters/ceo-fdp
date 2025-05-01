import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { rateLimit } from 'express-rate-limit'
import serverless from 'serverless-http'
import swaggerUi from 'swagger-ui-express'
import '../database'
import router from '../routes'
import swaggerSpec from '../swagger'

const app = express()
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
})

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: ['https://po.criascript.dev', 'http://localhost:5173', 'https://po-criascript.netlify.app'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['X-PINGOTHER', 'Content-Type'],
    exposedHeaders: ['Set-Cookie'],
    credentials: true,
  }),
)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/', router)
app.set('trust proxy', true)
app.use(limiter)

export default app
export const handler = serverless(app)
