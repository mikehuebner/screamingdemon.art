import { createTamagui, createFont, CreateTamaguiProps } from 'tamagui'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/theme-base'

import { animations } from './animations'

const size = {
  1: 10,
  2: 11,
  3: 12,
  4: 14,
  5: 15,
  6: 16,
  7: 20,
  8: 22,
  9: 30,
  10: 42,
  11: 52,
  12: 62,
  13: 72,
  14: 92,
  15: 114,
  16: 124,
} as const

const defaultFontConfig = {
  family: 'var(--nunito-sans)',
  weight: {
    2: '200',
    3: '300',
    4: '400',
    6: '600',
    7: '700',
    8: '800',
    9: '900',
  },
  size,
  letterSpacing: {},
  lineHeight: Object.fromEntries(Object.entries(size).map(([k, v]) => [k, v * 1.3])) as typeof size,
} as const

export const config = createTamagui({
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    heading: createFont(defaultFontConfig),
    body: createFont(defaultFontConfig),
    butcher: createFont({
      ...defaultFontConfig,
      family: 'var(--butcher-the-baker)',
      weight: {
        4: '400',
      },
      letterSpacing: {
        4: 2,
      },
    }),
  },
  themes,
  tokens,
  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  },
})
