import { SanityClient } from 'next-sanity'

import * as trpc from '@trpc/server'

import { createSanity } from './sanity'

interface CreateContextOptions {
  session?: any | null
  sanity: SanityClient
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(opts: CreateContextOptions) {
  return {
    session: opts.session,
    sanity: opts.sanity,
  }
}

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext() {
  // for API-response caching see https://trpc.io/docs/caching
  const sanity = createSanity

  return await createContextInner({
    session: null,
    sanity,
  })
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
