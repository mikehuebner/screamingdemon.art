import { Children } from 'react'

import { FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi'

import { Container, Heading, HStack, Text, TextProps, VStack } from '@screamingdemon/ui'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

import { WordLogo } from './logo'

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
      <Text className="paragraph-link" cursor="pointer" tag="span" {...props}>
        {allChildrenStrings ? children : children}
      </Text>
    </NextLink>
  )
}

export const Footer = () => {
  return (
    <VStack as="footer" pos="relative">
      <Container maxW="7xl">
        <HStack py={7}>
          <VStack alignItems="flex-start" flex={2} mt={-1} mb={2} px={4} py={5} space={4}>
            <Text
              className="clip-invisible"
              pos="absolute"
              overflow="hidden"
              w={1}
              h={1}
              m={-1}
              p={0}
            >
              homepage
            </Text>
            <NextLink href="/" passHref>
              <WordLogo fill="white" width="100%" />
            </NextLink>
            <Text mt="$2" size="sm">
              by Mike Huebner
            </Text>
          </VStack>

          <VStack alignItems="flex-start" flex={1.5} gap={3} px={4} py={5}>
            <Heading as="h4" mb={3} size="md">
              Overview
            </Heading>
            <ParagraphLink href="/store">Store</ParagraphLink>
            <ParagraphLink href="/events">Events</ParagraphLink>
            <ParagraphLink href="/contact">Contact</ParagraphLink>
            {/* <ParagraphLink href="/docs/api">API</ParagraphLink>
          <ParagraphLink href="/docs/frequently-asked-questions">FAQ</ParagraphLink> */}
          </VStack>

          <HStack alignItems="flex-start" flex={1.5} gap={3} px={4} py={5}>
            <Heading as="h4" mb={3} size="md">
              Artists
            </Heading>
            <ParagraphLink href="/artists/featured">Featured</ParagraphLink>
            <ParagraphLink href="/artists/resident">Resident</ParagraphLink>
          </HStack>

          <VStack alignItems="flex-start" flex={1.5} gap={3} px={4} py={5}>
            <Heading as="h4" mb={3} size="md">
              Social
            </Heading>
            <HStack alignItems="center" gap={2}>
              <FiGithub />
              <ParagraphLink href="https://github.com/tamagui/tamagui" target="_blank">
                GitHub
              </ParagraphLink>
            </HStack>
            <HStack alignItems="center" gap={2}>
              <FiTwitter />
              <ParagraphLink href="https://twitter.com/tamagui_js" target="_blank">
                Twitter
              </ParagraphLink>
            </HStack>
            <HStack alignItems="center" gap={2}>
              <FiInstagram />
              <ParagraphLink href="https://discord.gg/4qh6tdcVDa" target="_blank">
                Instagram
              </ParagraphLink>
            </HStack>
          </VStack>
        </HStack>
      </Container>
    </VStack>
  )
}
