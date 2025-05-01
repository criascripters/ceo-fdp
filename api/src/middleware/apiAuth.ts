import { NextFunction, Request, Response } from 'express'
import IsAdminService from '../services/users/is-admin'
import { getDiscordUserInfo } from '../utils/getDiscordUserInfo'
import { settings } from '../utils/settings'

/**
 * Middleware para autenticar administradores.
 */
export function isAdmin(req: Request, res: Response, next: NextFunction) {
  // Try cookie
  const cookieToken = req.cookies?.token

  if (!cookieToken || typeof cookieToken !== 'string') {
    // Try Bearer token
    const auth = req.headers.authorization

    if (!auth || auth !== `Bearer ${settings.apiSecret}`) {
      res.sendStatus(401)
      return
    }
  }

  const isAdminService = new IsAdminService()
  isAdminService.execute(cookieToken).then((isAdmin) => {
    if (!isAdmin) {
      res.sendStatus(401)
      return
    }

    next()
  })
}

/**
 * Middleware para autenticar usuários comuns.
 */
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const cookieToken = req.cookies?.token

  if (!cookieToken || typeof cookieToken !== 'string') {
    res.sendStatus(401)
    return
  }

  getDiscordUserInfo(cookieToken)
    .then((discordUser) => {
      if (!discordUser) {
        res.sendStatus(401)
        return
      }

      next()
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(401)
    })
}
