import { type RequestHandler, Router, type Request, type Response } from 'express'

const router = Router()

export default (app: Router): void => {
  app.use('/engine', router)

  router.get('/', (async (req: Request, res: Response): Promise<void> => {
    try {
      res.json({})
    } catch (err) {
      res.json(err)
    }
  }) as RequestHandler)
}
