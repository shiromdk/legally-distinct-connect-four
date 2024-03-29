import { z } from 'zod'

export const engineSchema = z.object({
  body: z.object({
    position: z.string({
      required_error: 'Position String is Required'
    })
  })
})
