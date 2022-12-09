import { groq } from 'next-sanity'

import { type SanityImageSource } from '@sanity/image-url/lib/types/types'
import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

const baseArtistsQuery = groq`_type == "artists"`

export interface ImageSource extends Omit<SanityImageSource, string> {
  asset: {
    _id: string
    metadata: {
      lqip: string
    }
  }
}

export type Artist = {
  _id: string
  name: string
  bio?: string
  slug: string
  gallery: ImageSource[] | null
}

export const artistsRouter = router({
  /**
   * Get a list of all artists
   */
  list: publicProcedure
    .input(
      z
        .string()
        .optional()
        .default(groq``)
    )
    .query(async ({ ctx, input }) =>
      ctx.sanity.fetch<Artist[]>(
        groq`
        *[${baseArtistsQuery}] {
          name,
          _id,
          'slug': slug.current
          ${input}
        }
      `
      )
    ),

  /**
   * Get an artist based on their slug
   */
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
        query: z
          .string()
          .optional()
          .default(groq``),
      })
    )
    .query(async ({ ctx, input }) =>
      ctx.sanity.fetch<Artist>(
        groq`
        *[${baseArtistsQuery} && slug.current == $slug] {
          name,
          _id,
          'slug': slug.current,
          ${input.query}
        }[0]
      `,
        {
          slug: input.id,
        }
      )
    ),
})
