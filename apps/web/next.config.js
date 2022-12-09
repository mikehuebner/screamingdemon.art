const { join } = require('path')

const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const withTM = require('next-transpile-modules')

const { withExpo } = require('@expo/next-adapter')
const { withTamagui } = require('@tamagui/next-plugin')

process.env.IGNORE_TS_CONFIG_PATHS = 'true'
process.env.TAMAGUI_TARGET = 'web'
process.env.TAMAGUI_DISABLE_WARN_DYNAMIC_LOAD = '1'

const boolVals = {
  true: true,
  false: false,
}

const disableExtraction =
  boolVals[process.env.DISABLE_EXTRACTION] ?? process.env.NODE_ENV === 'development'

/** @type {import('next').NextConfig} */
module.exports = withPlugins(
  [
    withImages,
    withTM([
      'solito',
      'react-native-web',
      'expo-linking',
      'expo-constants',
      'expo-modules-core',
      'react-native-reanimated',
      'react-native-gesture-handler',
      'react-native-reanimated-carousel',
      '@screamingdemonart/ui',
    ]),
    withTamagui({
      config: './tamagui.config.ts',
      components: ['tamagui', '@screamingdemonart/ui'],
      importsWhitelist: ['constants.js', 'colors.js'],
      logTimings: true,
      disableExtraction,
      // experiment - reduced bundle size react-native-web
      useReactNativeWebLite: false,
      shouldExtract: (path) => {
        if (path.includes(join('packages', 'app'))) {
          return true
        }
      },
      excludeReactNativeWebExports: [
        'Switch',
        'ProgressBar',
        'Picker',
        'CheckBox',
        'Touchable',
        'Animated',
        'AnimatedFlatList',
      ],
    }),
    [withExpo, { projectRoot: __dirname }],
  ],
  {
    typescript: {
      // Set this to false if you want production builds to abort if there's type errors
      ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
    },

    eslint: {
      /// Set this to false if you want production builds to abort if there's lint errors
      ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
    },

    images: {
      domains: ['cdn.sanity.io'],
      loader: 'custom',
    },

    experimental: {
      appDir: true,
      scrollRestoration: true,
      legacyBrowsers: false,
    },

    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      })

      config.resolve.alias = {
        ...config.resolve.alias,
        'react-native$': 'react-native-web',
        'react-native-reanimated': require.resolve('react-native-reanimated'),
        'react-native-reanimated$': require.resolve('react-native-reanimated'),
      }

      return config
    },
  }
)
