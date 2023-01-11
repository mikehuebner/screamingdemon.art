import Masonry from 'react-masonry-css'
import { Pressable } from 'react-native'

import { FiArrowRight } from 'react-icons/fi'

import { useNextSanityImage } from 'next-sanity-image'

import { Button, H1, Paragraph, Stack, XStack, YStack } from '@screamingdemonart/ui'
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
        bg="$gray2Dark"
        overflow="hidden"
        maxHeight="365px"
        width="100%"
        flexGrow={1}
        borderRadius="$3"
      >
        <YStack
          fullscreen
          l="45%"
          $sm={{
            l: 0,
          }}
        >
          <Masonry
            breakpointCols={3}
            className="screamingdemonart-masonry-grid"
            columnClassName="screamingdemonart-masonry-grid_column"
          >
            {gallery
              ?.sort(() => 0.5 - Math.random())
              .map((image, index) => (
                <Stack
                  bg="#5A5A5A"
                  m="$2"
                  br="$3"
                  overflow="hidden"
                  key={`${image.asset._id}-${index}`}
                >
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
            backdropFilter: 'blur(4px)',
          }}
        >
          {portrait && imageProps && (
            <Stack
              $sm={{
                display: 'none',
              }}
            >
              <Image
                {...imageProps}
                style={{ width: '100%', height: '100%' }} // layout="responsive" prior to Next 13.0.0
                sizes="(max-width: 800px) 150px, 300px"
                alt={name}
                draggable={false}
              />
            </Stack>
          )}
          <XStack
            justifyContent="space-between"
            alignItems="center"
            flexShrink={1}
            p="$8"
            space
            w="100%"
            $sm={{
              space: 0,
              // p: '$4',
              justifyContent: 'center',
            }}
          >
            <YStack
              space
              flexShrink={1}
              $sm={{
                space: 0,
              }}
            >
              <H1
                fontFamily="$butcher"
                $sm={{
                  fontSize: '$10',
                }}
              >
                {name}
              </H1>
              {bio && (
                <Paragraph
                  flexWrap="wrap"
                  numberOfLines={4}
                  $sm={{
                    display: 'none',
                  }}
                >
                  {bio}
                </Paragraph>
              )}
            </YStack>
            <Button
              size="$4"
              $sm={{
                display: 'none',
              }}
              bg="$backgroundTransparent"
            >
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

  return (
    <YStack f={1} jc="center" ai="center" space px="$4">
      {artistData?.map((artist) => (
        <ArtistCard key={artist._id} {...artist} />
      ))}
    </YStack>
  )
}
