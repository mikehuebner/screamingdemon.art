import { FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi'

import { H4, Paragraph, styled, Text, XStack, YStack } from '@screamingdemonart/ui'
import Link from 'next/link'

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
            <Link href="/" passHref>
              <WordLogo fill="white" width="100%" />
            </Link>
            <Paragraph mt="$2" size="$3">
              by Mike Huebner
            </Paragraph>
            <Paragraph size="$3">built with Tamagui</Paragraph>
          </YStack>

          <YStack ai="flex-start" $sm={{ ai: 'center' }} px="$4" py="$5" flex={1.5} space="$3">
            <H4 mb="$3" size="$6">
              Overview
            </H4>
            <Paragraph href="/store">Store</Paragraph>
            <Paragraph href="/events">Events</Paragraph>
            <Paragraph href="/contact">Contact</Paragraph>
            {/* <Paragraph href="/docs/api">API</Paragraph>
          <Paragraph href="/docs/frequently-asked-questions">FAQ</Paragraph> */}
          </YStack>

          <YStack ai="flex-start" $sm={{ ai: 'center' }} px="$4" py="$5" flex={1.5} space="$3">
            <H4 mb="$3" size="$6">
              Artists
            </H4>
            <Paragraph href="/artists/featured">Featured</Paragraph>
            <Paragraph href="/artists/resident">Resident</Paragraph>
          </YStack>

          <YStack ai="flex-start" $sm={{ ai: 'center' }} px="$4" py="$5" flex={1.5} space="$3">
            <H4 mb="$3" size="$6">
              Social
            </H4>
            <XStack space="$2" ai="center">
              <FiGithub />
              <Paragraph href="https://github.com/tamagui/tamagui" target="_blank">
                GitHub
              </Paragraph>
            </XStack>
            <XStack space="$2" ai="center">
              <FiTwitter />
              <Paragraph href="https://twitter.com/tamagui_js" target="_blank">
                Twitter
              </Paragraph>
            </XStack>
            <XStack space="$2" ai="center">
              <FiInstagram />
              <Paragraph href="https://discord.gg/4qh6tdcVDa" target="_blank">
                Instagram
              </Paragraph>
            </XStack>
          </YStack>
        </XStack>
      </ContainerLarge>
    </YStack>
  )
}
