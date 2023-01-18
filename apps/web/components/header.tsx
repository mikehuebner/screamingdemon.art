import { forwardRef, useEffect, useRef, useState } from 'react'

import { CgMenuMotion } from 'react-icons/cg'

import { Box, HStack, HTMLChakraProps, IconButton, Link, LinkProps } from '@screamingdemon/ui'
import { useScroll } from 'framer-motion'
import NextLink from 'next/link'

import { HeadLogo, WordLogo } from './logo'

// any, cause I don't wanna figure this one out right now
const HeadAnchor = forwardRef<any, LinkProps>((props, ref) => (
  <Link
    ref={ref}
    px={5}
    fontWeight="800"
    letterSpacing={1.2}
    opacity={0.5}
    _hover={{ opacity: 1 }}
    _pressed={{ opacity: 0.25 }}
    animation="fast"
    cursor="pointer"
    tabIndex={-1}
    textDecorationLine="none"
    {...props}
  />
))

HeadAnchor.displayName = 'HeadAnchor'

export const HeaderLinks = () => (
  <>
    <NextLink href="/artists" passHref>
      <HeadAnchor>Artists</HeadAnchor>
    </NextLink>

    <NextLink href="/events" passHref>
      <HeadAnchor>Events</HeadAnchor>
    </NextLink>

    <NextLink href="/store" passHref>
      <HeadAnchor>Store</HeadAnchor>
    </NextLink>

    <NextLink href="/about" passHref>
      <HeadAnchor>About</HeadAnchor>
    </NextLink>

    <NextLink href="/contact" passHref>
      <HeadAnchor>Contact</HeadAnchor>
    </NextLink>
  </>
)

const Menu = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton
        display={['flex', null, 'none']}
        fontSize="20px"
        aria-label="Open menu"
        icon={<CgMenuMotion />}
        variant="ghost"
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
    <Box
      ref={ref}
      as="header"
      pos="fixed"
      zIndex="3"
      top="0"
      right="0"
      left="0"
      w="full"
      shadow={y > height ? 'xs' : undefined}
      transition="box-shadow 0.2s, background-color 0.2s"
      backdropBlur="md"
      style={{
        // @ts-ignore
        backdropFilter: 'blur(10px)',
      }}
    >
      <HStack alignItems="center" justify="space-between" maxW={maxW} mx="auto" px="6">
        <HStack alignItems="center" justify="space-between" w="full">
          <Box py={1}>
            <NextLink href="/" passHref>
              <HStack as="span" alignItems="center" gap={1}>
                <Box w="80px" h="full">
                  <HeadLogo fill="lightgrey" />
                </Box>
                <Box display={['none', 'none', 'none', 'block']}>
                  <WordLogo fill="lightgrey" width="100%" />
                </Box>
              </HStack>
            </NextLink>
          </Box>
          <Menu />
        </HStack>

        <HStack as="nav" justifyContent="flex-end" pointerEvents="auto">
          <HStack alignItems="center" gap={3} display={['none', null, 'flex']}>
            <HeaderLinks {...props} />
          </HStack>
        </HStack>
      </HStack>
    </Box>
  )
}
