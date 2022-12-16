import { Children } from 'react'
import { AppRegistry } from 'react-native'

import { Nunito_Sans } from '@next/font/google'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

import Tamagui from '../tamagui.config'

const NunitoSans = Nunito_Sans({
  weight: ['200', '300', '400', '600', '700', '800', '900'],
})

export default class Document extends NextDocument {
  static async getInitialProps({ renderPage }: any) {
    AppRegistry.registerComponent('Main', () => Main)
    const page = await renderPage()

    // @ts-ignore
    const { getStyleElement } = AppRegistry.getApplication('Main')

    /**
     * Note: be sure to keep tamagui styles after react-native-web styles like it is here!
     * So Tamagui styles can override the react-native-web styles.
     */
    const styles = [
      getStyleElement(),
      <style key="tamagui-css" dangerouslySetInnerHTML={{ __html: Tamagui.getCSS() }} />,
    ]

    return { ...page, styles: Children.toArray(styles) }
  }

  render() {
    return (
      <Html className={NunitoSans.className}>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
