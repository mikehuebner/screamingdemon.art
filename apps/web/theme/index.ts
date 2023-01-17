import { extendTheme, withDefaultColorScheme } from '@screamingdemon/ui'

import components from './components'
import foundations from './foundations'
import { styles } from './styles'

const themeExtension = {
  ...foundations,
  components,
  styles,
}

export default extendTheme(
  themeExtension,

  withDefaultColorScheme({
    colorScheme: 'gray',
  })
)
