const { join } = require('path')

const withImages = require('next-images')
const withTM = require('next-transpile-modules')

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

const plugins = [
  withImages,
  withTM(['solito', 'react-native-web', '@screamingdemonart/ui']),
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
    excludeReactNativeWebExports: ['Switch', 'ProgressBar', 'Picker', 'CheckBox', 'Touchable'],
  }),
]

module.exports = function () {
  /** @type {import('next').NextConfig} */
  let config = {
    typescript: {
      // Set this to false if you want production builds to abort if there's type errors
      ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
    },

    eslint: {
      /// Set this to false if you want production builds to abort if there's lint errors
      ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
    },

    images: {
      remotePatterns: [{ hostname: 'cdn.sanity.io' }, { hostname: 'source.unsplash.com' }],
      disableStaticImages: true,
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

      return config
    },
  }

  for (const plugin of plugins) {
    config = {
      ...config,
      ...plugin(config),
    }
  }

  return config
}
