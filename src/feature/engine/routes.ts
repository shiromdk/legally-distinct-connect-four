import { Router, Request, Response } from 'express'

const router = Router()

export default (app: Router): void => {
  app.use('/engine', router)

  router.post('/')
}
