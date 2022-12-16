import { createTamagui, createFont } from 'tamagui'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/theme-base'

import { animations } from './animations'

const headingFont = createFont({
  family: 'Nunito Sans',
  face: {
    200: { normal: 'NunitoSans-Light', italic: 'NunitoSans-LightItalic' },
    300: { normal: 'NunitoSans-Light', italic: 'NunitoSans-LightItalic' },
    400: { normal: 'NunitoSans-Regular', italic: 'NunitoSans-Italic' },
    600: { normal: 'NunitoSans-SemiBold', italic: 'NunitoSans-SemiBoldItalic' },
    700: { normal: 'NunitoSans-Bold', italic: 'NunitoSans-BoldItalic' },
    800: { normal: 'NunitoSans-ExtraBold', italic: 'NunitoSans-ExtraBoldItalic' },
    900: { normal: 'NunitoSans-Black', italic: 'NunitoSans-BlackItalic' },
  },
  size: {
    6: 15,
  },
  transform: {
    6: 'uppercase',
    7: 'none',
  },
  weight: {
    6: '400',
    7: '700',
  },
  color: {
    6: '$colorFocus',
    7: '$color',
  },
  letterSpacing: {
    5: 2,
    6: 1,
    7: 0,
    8: -1,
    9: -2,
    10: -3,
    12: -4,
    14: -5,
    15: -6,
  },
  lineHeight: {},
})

const bodyFont = createFont({
  family: 'Nunito Sans',
  face: {
    600: { normal: 'NunitoSans-SemiBold', italic: 'NunitoSans-SemiBoldItalic' },
  },
  size: {
    6: 15,
  },
  transform: {
    6: 'uppercase',
    7: 'none',
  },
  weight: {
    6: '400',
    7: '700',
  },
  color: {
    6: '$colorFocus',
    7: '$color',
  },
  letterSpacing: {
    5: 2,
    6: 1,
    7: 0,
    8: -1,
    9: -2,
    10: -3,
    12: -4,
    14: -5,
    15: -6,
  },
  lineHeight: {},
})

export const config = createTamagui({
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
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
