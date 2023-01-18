# 👹 [Screaming Demon Art](https://screamingdemon.art)

## 🔦 About

This is the source for Las Vegas' [Screaming Demon Art](https://screamingdemon.art) website.

## 📦 Included packages

- [Chakra UI](https://chakra-ui.com/) 🧘
- [Next.js](https://nextjs.org/)
- [Sanity CMS](https://www.sanity.io/)
- [pnpm](https://pnpm.io/)

## 🗂 Folder layout

- `apps` deployable apps

  - `sanity`: Sanity CMS
  - `web`: NextJS app

- `packages` shared packages across apps
  - `ui`: shared UI components and a re-export of `@chakra-ui/react`

You can add other folders inside of `packages/` if you know what you're doing and have a good reason to.

## 🚀 Getting started

Install dependendencies using `pnpm` and run a development server using `pnpm dev`. The Sanity CMS is available at `localhost:3333` and the NextJS app is available at `localhost:3000`.
