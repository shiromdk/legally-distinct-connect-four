import { type NextFunction, type Request, type Response } from 'express'
import { type AnyZodObject } from 'zod'

export const validateScheme = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params
    })
    next()
  } catch (err) {
    return res.status(400).json(err)
  }
}
