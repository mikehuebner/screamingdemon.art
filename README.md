# 👹 [screamingdemon.art](https://screamingdemon.art)

## 🔦 About

This is the source for Las Vegas' [Screaming Demon Art](https://screamingdemon.art) website. It's built with [Next.js](https://nextjs.org/), [Tamagui](https://tamagui.dev/), and [Sanity](https://www.sanity.io/).

## 📦 Included packages

- [Tamagui](https://tamagui.dev) 🪄
- [solito](https://solito.dev) for cross-platform navigation
- [Next.js](https://nextjs.org/)
- [Sanity](https://www.sanity.io/) for CMS

## 🗂 Folder layout

The main apps are:

- `sanity` - Sanity CMS
- `next` - NextJS app

- `packages` shared packages across apps
  - `ui` includes your custom UI kit that will be optimized by Tamagui
  - `tsconfig` includes your shared tsconfig
  - `app` you'll be importing most files from `app/`
    - `features` (don't use a `screens` folder. organize by feature.)
    - `provider` (all the providers that wrap the app, and some no-ops for Web.)
    - `navigation` Next.js has a `pages/` folder. React Native doesn't. This folder contains navigation-related code for RN. You may use it for any navigation code, such as custom links.

You can add other folders inside of `packages/` if you know what you're doing and have a good reason to.

## 🏁 Start the app

```sh
yarn
yarn dev
```

## 🎨 UI Kit

Note we're following the [design systems guide](https://tamagui.dev/docs/guides/design-systems) and creating our own package for components.

## 🆕 Add new dependencies

You can also install the native library inside of `packages/app` if you want to get autoimport for that package inside of the `app` folder. However, you need to be careful and install the _exact_ same version in both packages. If the versions mismatch at all, you'll potentially get terrible bugs. This is a classic monorepo issue. I use `lerna-update-wizard` to help with this (you don't need to use Lerna to use that lib).

You may potentially want to have the native module transpiled for the next app. Add the module name to the list for `withTM` in the [`apps/next/next.config.js`](apps/next/next.config.js#L47) file.

```ts
withTM([
  'solito',
  'react-native-web',
  'expo-linking',
  'expo-constants',
  'expo-modules-core',
  'expo-crypto', // <-- add this or any other native module
  '@my/config',
])
```
