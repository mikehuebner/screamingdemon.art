/* eslint-disable import/order */

import 'raf/polyfill'
import 'setimmediate'
import '@tamagui/core/reset.css'
import '@tamagui/font-inter/css/400.css'
import '@tamagui/font-inter/css/700.css'

import { useMemo } from 'react'

import { Provider } from '@screamingdemonart/app/provider'
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import { Stack, useWindowDimensions } from '@screamingdemonart/ui'
import Head from 'next/head'

import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { trpc } from '~/utils'

import type { SolitoAppProps } from 'solito'

function App({ Component, pageProps }: SolitoAppProps) {
  const { width } = useWindowDimensions()
  const [theme, setTheme] = useRootTheme()

  const contents = useMemo(() => {
    // @ts-ignore
    return <Component {...pageProps} />
  }, [Component, pageProps])

  return (
    <>
      <Head>
        <title>Screaming Demon Art</title>
        <meta
          name="description"
          content="A Las Vegas based art gallery located in the Arts District."
        />
        <meta name="facebook-domain-verification" content="2n0sgaiqhciczrlf4ii09bqqi6787z" />
        <link href="/favicon.svg" rel="icon" />
        <link href="/favicon-light.svg" rel="icon" media="(prefers-color-scheme: light)" />
        <link href="/favicon-dark.svg" rel="icon" media="(prefers-color-scheme: dark)" />
      </Head>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NextThemeProvider onChangeTheme={setTheme}>
          <Provider disableRootThemeClass defaultTheme={theme}>
            <Stack w={width} h="100%" alignSelf="center">
              {contents}
            </Stack>
          </Provider>
        </NextThemeProvider>
      </GestureHandlerRootView>
    </>
  )
}

export default trpc.withTRPC(App)
