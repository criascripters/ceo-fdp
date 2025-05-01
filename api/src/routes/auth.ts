import express, { Request, Response } from 'express'
import IsAdminService from '../services/users/is-admin'
import { defaultCookieOptions } from '../utils/defaultCookieOptions'
import { getDiscordToken } from '../utils/getDiscordToken'

const authRouter = express.Router()

authRouter.post('/discord', async (req: Request, res: Response) => {
  const isAdminService = new IsAdminService()

  try {
    // Validate through access token (from cookies)
    const cookieToken = req.cookies?.token
    if (typeof cookieToken === 'string' && cookieToken !== '') {
      const isAdmin = await isAdminService.execute(cookieToken)
      if (isAdmin !== null) {
        res.cookie('is_admin', isAdmin, defaultCookieOptions).status(200).send({ isAdmin })
        return
      }
    }

    // Validate through oauth code (from body)
    const { code } = req.body
    console.log('### code: ', code)
    if (!code) {
      res.status(400).send('Missing code.')
      return
    }

    try {
      const token = await getDiscordToken(code)
      const isAdmin = await isAdminService.execute(token.access_token)
      res
        .cookie('token', token.access_token, defaultCookieOptions)
        .cookie('is_admin', isAdmin, defaultCookieOptions)
        .status(200)
        .send({ isAdmin })
    } catch (err: unknown) {
      res.status(401).send(err instanceof Error ? err.message : 'Código inválido.')

      return
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Error')
  }
})

export default authRouter
