import { forwardRef, useCallback, useState } from 'react'

import {
  Button,
  Paragraph,
  ParagraphProps,
  Popover,
  Separator,
  Text,
  VisuallyHidden,
  XStack,
  YStack,
  useMedia,
  AnimatePresence,
} from '@screamingdemonart/ui'
import { Menu } from '@tamagui/lucide-icons'
import { LayoutChangeEvent } from '@tamagui/types-react-native'
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
    size="$3"
    opacity={0.65}
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

export const HeaderLinks = ({ forceShowAllLinks }: any) => (
  <>
    <NextLink legacyBehavior prefetch={false} href="/artists" passHref>
      <HeadAnchor
        $sm={{
          display: forceShowAllLinks ? 'flex' : 'none',
        }}
      >
        Artists
      </HeadAnchor>
    </NextLink>

    <NextLink legacyBehavior prefetch={false} href="/events" passHref>
      <HeadAnchor
        $md={{
          display: forceShowAllLinks ? 'flex' : 'none',
        }}
      >
        Events
      </HeadAnchor>
    </NextLink>

    <NextLink legacyBehavior prefetch={false} href="/store" passHref>
      <HeadAnchor
        $md={{
          display: forceShowAllLinks ? 'flex' : 'none',
        }}
      >
        Store
      </HeadAnchor>
    </NextLink>

    <NextLink legacyBehavior prefetch={false} href="/about" passHref>
      <HeadAnchor
        $md={{
          display: forceShowAllLinks ? 'flex' : 'none',
        }}
      >
        About
      </HeadAnchor>
    </NextLink>

    <NextLink legacyBehavior prefetch={false} href="/contact" passHref>
      <HeadAnchor
        $md={{
          display: forceShowAllLinks ? 'flex' : 'none',
        }}
      >
        Contact
      </HeadAnchor>
    </NextLink>
  </>
)

export const Header = (props: any) => {
  const [headerHeight, setHeaderHeight] = useState(54)
  const router = useRouter()
  const isHome = router.pathname === '/'

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
            <YStack h="$6" w="$6" jc="center">
              <HeadLogo fill="lightgrey" />
            </YStack>
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
            <XStack ai="center" space="$3">
              <HeaderLinks {...props} />

              {/* <SearchButton size="$2" br="$10" elevation="$4" /> */}

              {/* <SmallMenu /> */}
            </XStack>
            {/* {isInSubApp ? (
          <XStack ai="center" space="$2">
            <NextLink legacyBehavior href="/signin" passHref>
              <Paragraph
                fontFamily="$silkscreen"
                px="$3"
                py="$2"
                cursor="pointer"
                size="$3"
                o={0.7}
                hoverStyle={{ opacity: 1 }}
                tag="a"
                $xxs={{
                  display: 'none',
                }}
              >
                Login
              </Paragraph>
            </NextLink>

            <NextLink legacyBehavior href="/takeout/purchase" passHref>
              <Button fontFamily="$silkscreen" size="$3" tag="a">
                Purchase
              </Button>
            </NextLink>
          </XStack>
        ) : (
          
        )} */}
          </XStack>
        </XStack>
      </XStack>
      <YStack h={headerHeight} w="100%" />
    </>
  )
}
