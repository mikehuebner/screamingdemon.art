/**
 * This file contains the root router of your tRPC-backend
 */
import { protectedProcedure, publicProcedure, router } from '../trpc'
import { artistsRouter } from './artists'
import { homeRouter } from './home'
import { postsRouter } from './posts'
import { productsRouter } from './products'

export const appRouter = router({
  artists: artistsRouter,
  products: productsRouter,
  posts: postsRouter,
  home: homeRouter,
  whoami: publicProcedure.query(({ ctx }) => ctx.session),
  secret: protectedProcedure.query(() => 'cow level'),
})

export type AppRouter = typeof appRouter

export * from './products'
