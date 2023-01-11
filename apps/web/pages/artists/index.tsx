import Masonry from 'react-masonry-css'
import { Pressable } from 'react-native'

import { FiArrowRight } from 'react-icons/fi'

import { useNextSanityImage } from 'next-sanity-image'

import { Button, H1, Paragraph, Stack, XStack, YStack } from '@screamingdemonart/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import Image from 'next/image'
import { useLink } from 'solito/link'

import { DisplayImage } from '~/components/display-image'
import { createSanity, createSSG, type Artist } from '~/server'
import { trpc } from '~/utils'

export async function getStaticProps() {
  const ssg = await createSSG()

  await ssg.artists.list.prefetch()

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  }
}

const ArtistCard = ({ name, slug, bio, portrait, gallery }: Artist) => {
  const imageProps = useNextSanityImage(createSanity, portrait ?? null)
  const linkProps = useLink({
    href: '/artists/[name]',
    as: `/artists/${slug}`,
  })

  return (
    <Pressable {...linkProps} style={{ width: '100%' }}>
      <XStack
        bg="$gray3Dark"
        overflow="hidden"
        maxHeight="365px"
        width="100%"
        flexGrow={1}
        borderRadius="$3"
      >
        <YStack fullscreen l="45%">
          <Masonry
            breakpointCols={3}
            className="screamingdemonart-masonry-grid"
            columnClassName="screamingdemonart-masonry-grid_column"
          >
            {gallery?.map((image) => (
              <Stack bg="#5A5A5A" m="$2" br="$3" overflow="hidden" key={image.asset._id}>
                <DisplayImage image={image} />
              </Stack>
            ))}
          </Masonry>
        </YStack>

        <XStack
          flexShrink={1}
          bg="rgba(43, 43, 43, 0.4)"
          w="100%"
          style={{
            // @ts-ignore
            backdropFilter: 'blur(5px)',
          }}
        >
          {portrait && imageProps && (
            <Image
              {...imageProps}
              style={{ width: '100%', height: '100%', maxWidth: '25%' }} // layout="responsive" prior to Next 13.0.0
              sizes="(max-width: 800px) 150px, 300px"
              alt={name}
              draggable={false}
            />
          )}
          <XStack
            justifyContent="space-between"
            alignItems="center"
            flexShrink={1}
            p="$8"
            space
            w="100%"
          >
            <YStack space flexShrink={1}>
              <H1 fontFamily="$butcher">{name}</H1>
              {bio && (
                <Paragraph flexWrap="wrap" numberOfLines={4}>
                  {bio}
                </Paragraph>
              )}
            </YStack>
            <Button>
              <FiArrowRight />
            </Button>
          </XStack>
        </XStack>
      </XStack>
    </Pressable>
  )
}

export default function ArtistsScreen() {
  const { data: artistData } = trpc.artists.list.useQuery()
  const linkProps = useLink({ href: '/' })

  return (
    <YStack f={1} jc="center" ai="center" space px="$4">
      {artistData?.map((artist) => (
        <ArtistCard key={artist._id} {...artist} />
      ))}
      {/* @ts-ignore fix button props not lining up */}
      <Button {...linkProps} icon={ChevronLeft}>
        Go Home
      </Button>
    </YStack>
  )
}
