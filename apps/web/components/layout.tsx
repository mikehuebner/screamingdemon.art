import { PropsWithChildren } from 'react'

import { AnimatePresence } from '@screamingdemonart/ui'

import { Footer } from './footer'
import { Header } from './header'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <AnimatePresence enterVariant="fromLeft" exitVariant="fromRight" exitBeforeEnter>
        {children}
      </AnimatePresence>
      <Footer />
    </>
  )
}
