import { groq } from 'next-sanity'

import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

const baseArtistsQuery = groq`_type == "artists"`

export type Artist = {
  _id: string
  name: string
  bio: string
  slug: string
}

export const artistsRouter = router({
  /**
   * Get a list of all artists
   */
  list: publicProcedure.query(async ({ ctx }) =>
    ctx.sanity.fetch<Artist[]>(
      groq`
        *[${baseArtistsQuery}] {
          name,
          bio,
          _id,
          'slug': slug.current
        }
      `
    )
  ),

  /**
   * Get an artist based on their slug
   */
  getBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) =>
    ctx.sanity.fetch<Artist>(
      groq`
        *[${baseArtistsQuery} && slug.current == $slug] {
          name,
          bio,
          _id,
          'slug': slug.current
        }[0]
      `,
      {
        slug: input.slug,
      }
    )
  ),
})
