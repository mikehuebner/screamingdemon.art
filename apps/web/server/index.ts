import { createProxySSGHelpers } from '@trpc/react-query/ssg'

import SuperJSON from 'superjson'

import { createContext } from './trpc/context'
import { appRouter } from './trpc/router/_app'

export * from './trpc/trpc'
export * from './trpc/context'
export * from './trpc/router/_app'
export * from './trpc/sanity'

/**
 * Create the default Sever Side Generated helpers
 */
export const createSSG = async () =>
  createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: SuperJSON,
  })
