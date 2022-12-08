import { groq } from 'next-sanity'

import { router, publicProcedure } from '../trpc'

export const homeRouter = router({
  content: publicProcedure.query(async ({ ctx }) => {
    const text = await ctx.sanity.fetch(groq`*[]`)
    return text
  }),
})
