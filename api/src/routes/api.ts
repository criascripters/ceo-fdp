import express, { Request, Response } from 'express'
import { isAuthenticated } from '../middleware/apiAuth'
import Message from '../models/Message'
import PastMessages from '../models/PastMessages'
import { getDiscordUserInfo } from '../utils/getDiscordUserInfo'
import { getGeo } from '../utils/getGeo'

const apiRouter = express.Router()

apiRouter.use(isAuthenticated)

apiRouter.get('/messages', async (req: Request, res: Response) => {
  try {
    const message = await Message.find().select('name message createdAt')
    res.json(message)
  } catch (error) {
    console.log(error)
  }
})

apiRouter.get('/getLastMessage', async (req: Request, res: Response) => {
  try {
    const message = await Message.findOne().sort({ _id: 1 })
    if (message) {
      console.log(message)
      message.sentAt = new Date()
      const pastMessages = await PastMessages.create(message.toJSON())
      await Message.deleteOne({ _id: message._id })
    }
    res.json(message)
  } catch (error) {
    console.log(error)
  }
})

apiRouter.get('/getPastMessages', async (req: Request, res: Response) => {
  try {
    const message = await PastMessages.find()
    res.json(message)
  } catch (error) {
    console.log(error)
  }
})

apiRouter.post('/addMessage', async (req: Request, res: Response) => {
  try {
    const cookieToken = req.cookies?.token as string

    const discordUser = await getDiscordUserInfo(cookieToken)
    console.log('discordUser: ', discordUser)

    const { id, username, email, verified } = discordUser

    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const ip = typeof rawIp === 'string' ? rawIp.split(',')[0].trim() : rawIp
    console.log('IP do usuário:', ip)

    const geo = await getGeo(ip as string)

    console.log('geo: ', geo)

    const message = await Message.create({
      message: req.body.message,
      name: req.body.name,
      targets: req.body.targets,
      ip: ip,
      userCountry: geo.country,
      userRegionName: geo.regionName,
      userCity: geo.city,
      userISP: geo.isp,
      userOrg: geo.org,
      discordUser: { id, username, email, verified },
    })
    console.log('message: ', message)
    res.json(message)
  } catch (error) {
    console.log(error)
  }
})

apiRouter.get('/test', async (req: Request, res: Response) => {
  const token = req.cookies.token

  res.send('Autenticado com token: ' + token)
})

export default apiRouter
