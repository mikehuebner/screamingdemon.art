// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
// !process.env.SKIP_ENV_VALIDATION && (await import('./env/server.mjs'))

// process.env.IGNORE_TS_CONFIG_PATHS = 'true'

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,

  images: {
    domains: ['cdn.sanity.io'],
    disableStaticImages: true,
  },

  compiler: {
    emotion: true,
  },

  experimental: {
    scrollRestoration: true,
  },

  transpilePackages: ['@screamingdemon/ui'],
  optimizeFonts: true,

  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

export default config
