import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import routes from './routes'
import rateLimiter from './middleware/rateLimiter'

function getApp (): express.Application {
  const app = express()

  app.use(rateLimiter)
  app.get('/status', (_req: express.Request, res: express.Response) => {
    res.json({ status: 'OK' }).status(200).end()
  })

  app.use(bodyParser.json())
  app.enable('trust proxy')
  app.use(cors())
  app.use(express.json())

  app.use('/api', routes())

  return app
}

export default getApp
