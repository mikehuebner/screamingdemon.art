// eslint-disable-next-line import/order
import 'swiper/css'
// eslint-disable-next-line import/order
import 'swiper/css/effect-fade'

import { IntlProvider } from 'react-intl'

import { Nunito_Sans } from '@next/font/google'
import localFont from '@next/font/local'
import { ChakraProvider, SimpleGrid, Box, extendTheme, theme } from '@screamingdemon/ui'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { Footer } from '~/components/footer'
import { Header } from '~/components/header'
import { trpc } from '~/utils'

const NunitoSans = Nunito_Sans({
  variable: '--nunito-sans',
  weight: ['200', '300', '400', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

const ButcherTheBaker = localFont({ src: '../assets/butcher-the-baker.otf' })

const addedFontTheme = extendTheme(
  {
    fonts: {
      heading: NunitoSans.style.fontFamily,
      body: NunitoSans.style.fontFamily,
      butcher: ButcherTheBaker.style.fontFamily,
    },
  },
  theme
)

const App = ({ Component, pageProps: { ...pageProps } }: AppProps) => (
  <ChakraProvider theme={addedFontTheme}>
    <IntlProvider locale="en">
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
      <SimpleGrid columnGap={1} templateRows="auto 1fr auto" minH="100vh">
        <Header />
        <Box as="main" w="full" mt="20" mx="auto">
          <Component {...pageProps} />
        </Box>
        <Footer />
      </SimpleGrid>
    </IntlProvider>
  </ChakraProvider>
)

export default trpc.withTRPC(App)
