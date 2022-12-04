import { config } from '@screamingdemonart/config'

export type Conf = typeof config

declare module '@screamingdemonart/ui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default config
