import { extendTheme, ThemeConfig, withDefaultColorScheme } from '@chakra-ui/react'

import components from './components'
import foundations from './foundations'
import { styles } from './styles'

const tokens = {
  // ...foundations,
  components,
  styles,
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  cssVarPrefix: 'screaming',
} satisfies ThemeConfig

export const theme = extendTheme(
  tokens,
  { config },

  withDefaultColorScheme({
    colorScheme: 'gray',
  })
)
