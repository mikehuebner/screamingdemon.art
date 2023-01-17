import { forwardRef, useEffect, useRef, useState } from 'react'

import { CgMenuMotion } from 'react-icons/cg'

import {
  Box,
  HStack,
  HTMLChakraProps,
  IconButton,
  Text,
  TextProps,
  VStack,
} from '@screamingdemon/ui'
import { useScroll } from 'framer-motion'
import NextLink from 'next/link'

import { HeadLogo, WordLogo } from './logo'

const HeadAnchor = forwardRef<typeof Text, TextProps>((props, ref) => (
  <Text
    ref={ref as any}
    justifyContent="flex-end"
    w="100%"
    m="$2"
    px={5}
    py="$2"
    fontWeight="bold"
    letterSpacing={1.2}
    opacity={0.65}
    animation="fast"
    cursor="pointer"
    hoverStyle={{ opacity: 1 }}
    pressStyle={{ opacity: 0.25 }}
    tabIndex={-1}
    // @ts-ignore
    tag="a"
    textDecorationLine="none"
    {...props}
  />
))

HeadAnchor.displayName = 'HeadAnchor'

export const HeaderLinks = () => (
  <>
    <NextLink legacyBehavior prefetch={false} href="/artists" passHref>
      <HeadAnchor>Artists</HeadAnchor>
    </NextLink>

    <NextLink legacyBehavior prefetch={false} href="/events" passHref>
      <HeadAnchor>Events</HeadAnchor>
    </NextLink>

    <NextLink legacyBehavior prefetch={false} href="/store" passHref>
      <HeadAnchor>Store</HeadAnchor>
    </NextLink>

    <NextLink legacyBehavior prefetch={false} href="/about" passHref>
      <HeadAnchor>About</HeadAnchor>
    </NextLink>

    <NextLink legacyBehavior prefetch={false} href="/contact" passHref>
      <HeadAnchor>Contact</HeadAnchor>
    </NextLink>
  </>
)

const Menu = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton
        display={[null, 'none']}
        px={2}
        bg="transparent"
        aria-label="Menu"
        icon={<CgMenuMotion />}
        onClick={() => setOpen(true)}
      />
      {/* <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[85, 50, 25]}
        dismissOnSnapToBottom
        zIndex={100_000}
      >
        <Sheet.Overlay />
        <Sheet.Frame>
          <Sheet.Handle />
          <Stack alignItems="center" justifyContent="center" h="100%" w="100%" bg="$background">
            <HeaderLinks />
          </Stack>
        </Sheet.Frame>
      </Sheet> */}
    </>
  )
}

export const Header = ({ maxW = '7xl', ...props }: HTMLChakraProps<'header'>) => {
  const [y, setY] = useState(0)
  const ref = useRef<HTMLHeadingElement>(null)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  const { scrollY } = useScroll()

  useEffect(() => scrollY.onChange(() => setY(scrollY.get())), [scrollY])

  return (
    <HStack
      ref={ref}
      as="header"
      pos="fixed"
      zIndex="3"
      top="0"
      right="0"
      left="0"
      w="full"
      bg={y <= height ? 'transparent' : 'white'}
      shadow={y > height ? 'xs' : undefined}
      _dark={{ bg: 'gray.800' }}
      transition="box-shadow 0.2s, background-color 0.2s"
      style={{
        // @ts-ignore
        backdropFilter: 'blur(10px)',
      }}
    >
      <Box maxW={maxW} h="4.5rem" mx="auto">
        <HStack alignItems="center" flex={1} gap={4}>
          <Menu />
          <NextLink href="/" passHref>
            <VStack justifyContent="center" w="$6" h="$6">
              <HeadLogo fill="lightgrey" />
            </VStack>
          </NextLink>
          <VStack justifyContent="center" h={3} opacity={[0, 1]} pointerEvents={['none', 'auto']}>
            <WordLogo fill="lightgrey" width="100%" />
          </VStack>
        </HStack>

        <HStack as="nav" justifyContent="flex-end" pointerEvents="auto">
          <HStack alignItems="center" gap={3} display={['none', 'flex']}>
            <HeaderLinks {...props} />
          </HStack>
        </HStack>
      </Box>
    </HStack>
  )
}
