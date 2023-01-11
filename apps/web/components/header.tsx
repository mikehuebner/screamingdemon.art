import { forwardRef, useCallback, useState } from 'react'
import { LayoutChangeEvent } from 'react-native'

import { CgMenuMotion } from 'react-icons/cg'

import {
  Button,
  Paragraph,
  ParagraphProps,
  Sheet,
  Stack,
  XStack,
  YStack,
} from '@screamingdemonart/ui'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { HeadLogo, WordLogo } from './logo'

const HeadAnchor = forwardRef<typeof Paragraph, ParagraphProps>((props, ref) => (
  <Paragraph
    ref={ref as any}
    m="$2"
    px="$5"
    py="$2"
    cursor="pointer"
    opacity={0.65}
    animation="fast"
    hoverStyle={{ opacity: 1 }}
    pressStyle={{ opacity: 0.25 }}
    textDecorationLine="none"
    tag="a"
    w="100%"
    fontWeight="bold"
    letterSpacing={1.2}
    // @ts-ignore
    tabIndex={-1}
    jc="flex-end"
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
      <Button
        onPress={() => setOpen(true)}
        bg="$backgroundTransparent"
        px="$2"
        scaleIcon={2}
        icon={<CgMenuMotion />}
        $gtMd={{
          display: 'none',
        }}
      />
      <Sheet
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
          <Stack ai="center" jc="center" h="100%" w="100%" bg="$background">
            <HeaderLinks />
          </Stack>
        </Sheet.Frame>
      </Sheet>
    </>
  )
}

export const Header = (props: any) => {
  const [headerHeight, setHeaderHeight] = useState(54)
  const router = useRouter()

  const handleOnLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    setHeaderHeight(height)
  }, [])

  return (
    <>
      <XStack
        onLayout={handleOnLayout}
        y={0}
        bbc="$borderColor"
        zi={50000}
        // @ts-ignore
        pos="fixed"
        top={0}
        left={0}
        right={0}
        // elevation="$3"
        style={{
          // @ts-ignore
          backdropFilter: 'blur(10px)',
        }}
      >
        <XStack
          ai="center"
          position="relative"
          tag="header"
          jc="space-between"
          pos="relative"
          py="$4"
          px="$4"
          w="100%"
          // okay...
          zi={50000}
        >
          <XStack flex={1} ai="center" space="$4">
            <Menu />
            <NextLink href="/" passHref>
              <YStack h="$6" w="$6" jc="center">
                <HeadLogo fill="lightgrey" />
              </YStack>
            </NextLink>
            <YStack
              $sm={{
                opacity: 0,
                pointerEvents: 'none',
              }}
              h="$3"
              jc="center"
            >
              <WordLogo fill="lightgrey" width="100%" />
            </YStack>
          </XStack>

          {/*  prevent layout shift */}
          <XStack jc="flex-end" pointerEvents="auto" tag="nav">
            <XStack
              ai="center"
              space="$3"
              display="none"
              $gtMd={{
                display: 'flex',
              }}
            >
              <HeaderLinks {...props} />
            </XStack>
          </XStack>
        </XStack>
      </XStack>
      <YStack h={headerHeight} w="100%" />
    </>
  )
}
