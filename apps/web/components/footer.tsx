import { FaTiktok } from 'react-icons/fa'
import { FiGithub, FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi'

import { Box, HStack, Text, Tooltip, VStack, Wrap, WrapItem } from '@screamingdemon/ui'
import NextLink from 'next/link'

import { WordLogo } from './logo'

const socialLinks = [
  {
    label: 'Instagram',
    icon: FiInstagram,
    href: 'https://www.instagram.com/screaming.demon.art',
  },
  {
    label: 'TikTok',
    icon: FaTiktok,
    href: 'https://www.tiktok.com/@screamingdemonart',
  },
  {
    label: 'Facebook',
    icon: FiFacebook,
    href: 'https://www.facebook.com/screaming.demon.art',
  },
  {
    label: 'Twitter',
    icon: FiTwitter,
    href: 'https://twitter.com/screamingdemonart',
  },
  {
    label: 'Github',
    icon: FiGithub,
    href: 'https://github.com/mikehuebner/screamingdemon.art',
  },
]

export const Footer = () => (
  <Box as="footer" w="full">
    <VStack gap={3} maxW="7xl" mx="auto" px={4} py={5}>
      <HStack align="start" justify="space-between" gap={4}>
        <Wrap justify="center" spacing={8}>
          {socialLinks.map(({ label, icon: Icon, href }) => (
            <WrapItem key={href}>
              <Tooltip label={label}>
                <NextLink href={href} target="_blank">
                  <Icon size={20} />
                </NextLink>
              </Tooltip>
            </WrapItem>
          ))}
        </Wrap>
      </HStack>
      <VStack gap={3}>
        <Text className="clip-invisible" pos="absolute" overflow="hidden" w={1} h={1} m={-1} p={0}>
          homepage
        </Text>
        <NextLink href="/" passHref>
          <WordLogo fill="white" width="100%" />
        </NextLink>
      </VStack>
    </VStack>
  </Box>
)
