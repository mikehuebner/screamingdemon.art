import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

export const postsRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return 'test'
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return 'test'
  }),
  create: publicProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      return 'test'
    }),
})
