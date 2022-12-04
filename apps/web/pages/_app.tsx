import React, { useMemo } from 'react'

import { Provider } from '@screamingdemonart/app/provider'
import '@tamagui/core/reset.css'
import '@tamagui/font-inter/css/400.css'
import '@tamagui/font-inter/css/700.css'
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import Head from 'next/head'
import 'raf/polyfill'

import type { SolitoAppProps } from 'solito'

function MyApp({ Component, pageProps }: SolitoAppProps) {
  const [theme, setTheme] = useRootTheme()

  const contents = useMemo(() => {
    // @ts-ignore
    return <Component {...pageProps} />
  }, [Component, pageProps])

  return (
    <>
      <Head>
        <title>Tamagui Example App</title>
        <meta name="description" content="Tamagui, Solito, Expo & Next.js" />
        <meta name="facebook-domain-verification" content="2n0sgaiqhciczrlf4ii09bqqi6787z" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextThemeProvider onChangeTheme={setTheme}>
        <Provider disableRootThemeClass defaultTheme={theme}>
          {contents}
        </Provider>
      </NextThemeProvider>
    </>
  )
}

export default MyApp
