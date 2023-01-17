import { PropsWithChildren } from 'react'

import { AnimatePresence } from 'framer-motion'

import { ContainerLarge, Footer } from './footer'
import { Header } from './header'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <ContainerLarge>
        <AnimatePresence>{children}</AnimatePresence>
      </ContainerLarge>
      <Footer />
    </>
  )
}
