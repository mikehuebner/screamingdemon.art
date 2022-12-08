import { groq } from 'next-sanity'

import { router, publicProcedure } from '../trpc'

const baseArtistsQuery = groq`
*[_type == "artists"]
`

type Artist = {
  _id: string
  name: string
  bio: string
  slug: string
}

export const artistsRouter = router({
  list: publicProcedure.query(async ({ ctx }) =>
    ctx.sanity.fetch<Artist[]>(
      groq`
        ${baseArtistsQuery}
      `
    )
  ),
})
