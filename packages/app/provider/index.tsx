import {
  TamaguiProvider,
  type TamaguiConfig,
  type TamaguiProviderProps,
} from '@screamingdemonart/ui'
import { useMemo } from 'react'
import config from '../tamagui.config'
import { NavigationProvider } from './navigation'

interface ProviderProps extends Omit<TamaguiProviderProps, 'config'> {
  extendConfig?: Partial<TamaguiConfig>
}

export function Provider({ children, ...rest }: ProviderProps) {
  return (
    <TamaguiProvider config={config} disableInjectCSS defaultTheme="light" {...rest}>
      <NavigationProvider>{children}</NavigationProvider>
    </TamaguiProvider>
  )
}
