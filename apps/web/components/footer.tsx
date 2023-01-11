import { Children } from 'react'

import { FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi'

import { H4, Paragraph, styled, Text, TextProps, XStack, YStack } from '@screamingdemonart/ui'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

import { WordLogo } from './logo'

export const ContainerLarge = styled(YStack, {
  mx: 'auto',
  px: '$4',
  width: '100%',

  $gtSm: {
    maxWidth: 980,
  },

  $gtMd: {
    maxWidth: 1140,
  },

  variants: {
    hide: {
      true: {
        pointerEvents: 'none',
        opacity: 0,
      },
    },
  },
})

export type LinkProps = Omit<NextLinkProps, 'passHref' | 'as'> &
  TextProps & {
    target?: any
    rel?: any
    title?: any
  }

export const ParagraphLink = ({
  href = '',
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  children,
  ...props
}: LinkProps) => {
  const allChildrenStrings = Children.toArray(children).every((x) => typeof x === 'string')

  return (
    <NextLink {...{ href, replace, scroll, shallow, prefetch, locale }}>
      <Paragraph
        className="paragraph-link"
        cursor="pointer"
        tag="span"
        color="$color"
        hoverStyle={{ color: '$color' }}
        {...props}
      >
        {allChildrenStrings ? children : children}
      </Paragraph>
    </NextLink>
  )
}

export const Footer = () => {
  return (
    <YStack tag="footer" pos="relative">
      <ContainerLarge>
        <XStack py="$7" $sm={{ flexDirection: 'column', ai: 'center' }}>
          <YStack
            ai="flex-start"
            $sm={{ ai: 'center' }}
            py="$5"
            flex={2}
            mt="$-1"
            mb="$2"
            px="$4"
            space="$4"
          >
            <Text
              className="clip-invisible"
              position="absolute"
              width={1}
              height={1}
              padding={0}
              margin={-1}
              overflow="hidden"
            >
              homepage
            </Text>
            <NextLink href="/" passHref>
              <WordLogo fill="white" width="100%" />
            </NextLink>
            <Paragraph mt="$2" size="$3">
              by Mike Huebner
            </Paragraph>
            <Paragraph size="$3">built with Tamagui</Paragraph>
          </YStack>

          <YStack ai="flex-start" $sm={{ ai: 'center' }} px="$4" py="$5" flex={1.5} space="$3">
            <H4 mb="$3" size="$6">
              Overview
            </H4>
            <ParagraphLink href="/store">Store</ParagraphLink>
            <ParagraphLink href="/events">Events</ParagraphLink>
            <ParagraphLink href="/contact">Contact</ParagraphLink>
            {/* <ParagraphLink href="/docs/api">API</ParagraphLink>
          <ParagraphLink href="/docs/frequently-asked-questions">FAQ</ParagraphLink> */}
          </YStack>

          <YStack ai="flex-start" $sm={{ ai: 'center' }} px="$4" py="$5" flex={1.5} space="$3">
            <H4 mb="$3" size="$6">
              Artists
            </H4>
            <ParagraphLink href="/artists/featured">Featured</ParagraphLink>
            <ParagraphLink href="/artists/resident">Resident</ParagraphLink>
          </YStack>

          <YStack ai="flex-start" $sm={{ ai: 'center' }} px="$4" py="$5" flex={1.5} space="$3">
            <H4 mb="$3" size="$6">
              Social
            </H4>
            <XStack space="$2" ai="center">
              <FiGithub />
              <ParagraphLink href="https://github.com/tamagui/tamagui" target="_blank">
                GitHub
              </ParagraphLink>
            </XStack>
            <XStack space="$2" ai="center">
              <FiTwitter />
              <ParagraphLink href="https://twitter.com/tamagui_js" target="_blank">
                Twitter
              </ParagraphLink>
            </XStack>
            <XStack space="$2" ai="center">
              <FiInstagram />
              <ParagraphLink href="https://discord.gg/4qh6tdcVDa" target="_blank">
                Instagram
              </ParagraphLink>
            </XStack>
          </YStack>
        </XStack>
      </ContainerLarge>
    </YStack>
  )
}
