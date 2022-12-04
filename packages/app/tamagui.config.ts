import { config } from '@screamingdemonart/ui'

export type Conf = typeof config

declare module '@screamingdemonart/ui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default config
