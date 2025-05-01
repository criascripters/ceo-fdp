import express, { Request, Response } from 'express'
import { isAdmin } from '../middleware/apiAuth'
import Message from '../models/Message'

const adminRouter = express.Router()

adminRouter.use(isAdmin)

adminRouter.delete('/messages/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await Message.deleteOne({ _id: id })
    res.status(200).send('Mensagem deletada com sucesso')
  } catch (error) {
    console.log(error)
    res.status(500).send('Erro ao deletar mensagem')
  }
})

export default adminRouter
