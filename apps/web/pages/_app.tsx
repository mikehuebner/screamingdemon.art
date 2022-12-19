/* eslint-disable import/order */

import 'raf/polyfill'
import 'setimmediate'
import '@tamagui/core/reset.css'
import '~/styles/react-masonry-styles.css'

import { useMemo } from 'react'

import { Provider } from '@screamingdemonart/app/provider'
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import Head from 'next/head'

import { Nunito_Sans } from '@next/font/google'

import { trpc } from '~/utils'

import type { SolitoAppProps } from 'solito'
import { Layout } from '~/components/layout'

const NunitoSans = Nunito_Sans({
  weight: ['200', '300', '400', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

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
      <NextThemeProvider onChangeTheme={setTheme}>
        <Provider disableRootThemeClass defaultTheme={theme}>
          <main className={NunitoSans.className}>{contents}</main>
        </Provider>
      </NextThemeProvider>
    </>
  )
}

export default trpc.withTRPC(App)
