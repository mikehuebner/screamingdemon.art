/* eslint-disable import/order */

import 'raf/polyfill'
import 'setimmediate'
import '@tamagui/core/reset.css'
import '~/styles/react-masonry-styles.css'

import { useMemo } from 'react'

import { Provider as TamaguiProvider } from '@screamingdemonart/app/provider'
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import Head from 'next/head'

import { Nunito_Sans } from '@next/font/google'
import localFont from '@next/font/local'

import { trpc } from '~/utils'

import type { SolitoAppProps } from 'solito'
import { Layout } from '~/components/layout'

const NunitoSans = Nunito_Sans({
  variable: '--nunito-sans',
  weight: ['200', '300', '400', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

const ButcherTheBaker = localFont({ src: '../assets/butcher-the-baker.otf' })

function App({ Component, pageProps }: SolitoAppProps) {
  const [theme, setTheme] = useRootTheme()
  const contents = useMemo(() => {
    // @ts-ignore
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }, [Component, pageProps])

  return (
    <>
      <Head>
        <title>Screaming Demon Art</title>
        <meta
          name="description"
          content="A Las Vegas based art gallery located in the Arts District."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="facebook-domain-verification" content="2n0sgaiqhciczrlf4ii09bqqi6787z" />
        <link href="/favicon.svg" rel="icon" />
        <link href="/favicon-light.svg" rel="icon" media="(prefers-color-scheme: light)" />
        <link href="/favicon-dark.svg" rel="icon" media="(prefers-color-scheme: dark)" />
      </Head>
      <style jsx global>{`
        :root {
          --nunito-sans: ${NunitoSans.style.fontFamily};
          --butcher-the-baker: ${ButcherTheBaker.style.fontFamily};
        }
      `}</style>
      <NextThemeProvider onChangeTheme={setTheme}>
        <TamaguiProvider disableRootThemeClass defaultTheme={theme}>
          <main>{contents}</main>
        </TamaguiProvider>
      </NextThemeProvider>
    </>
  )
}

export default trpc.withTRPC(App)
