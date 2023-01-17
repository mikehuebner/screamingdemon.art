import Masonry from 'react-masonry-css'

import { FiArrowRight } from 'react-icons/fi'

import { useNextSanityImage } from 'next-sanity-image'

import { Box, Button, Heading, HStack, Text, VStack } from '@screamingdemon/ui'
import Image from 'next/image'
import Link from 'next/link'

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

  return (
    <Link href={`/artists/${slug}`} passHref>
      <Box as="a" style={{ width: '100%' }}>
        <VStack
          flexGrow={1}
          overflow="hidden"
          w="100%"
          maxH="365px"
          bg="$gray2Dark"
          borderRadius="$3"
        >
          <VStack left={[0, '45%']}>
            <Masonry
              breakpointCols={3}
              className="screamingdemon-masonry-grid"
              columnClassName="screamingdemon-masonry-grid_column"
            >
              {gallery
                ?.sort(() => 0.5 - Math.random())
                .map((image, index) => (
                  <Box
                    key={`${image.asset._id}-${index}`}
                    overflow="hidden"
                    m={2}
                    bg="#5A5A5A"
                    borderRadius="md"
                  >
                    <DisplayImage image={image} />
                  </Box>
                ))}
            </Masonry>
          </VStack>

          <HStack
            flexShrink={1}
            w="100%"
            bg="rgba(43, 43, 43, 0.4)"
            style={{
              // @ts-ignore
              backdropFilter: 'blur(4px)',
            }}
          >
            {portrait && imageProps && (
              <Box display={['none', null]}>
                <Image
                  {...imageProps}
                  style={{ width: '100%', height: '100%' }} // layout="responsive" prior to Next 13.0.0
                  sizes="(max-width: 800px) 150px, 300px"
                  alt={name}
                  draggable={false}
                />
              </Box>
            )}
            <HStack
              alignItems="center"
              justifyContent="space-between"
              flexShrink={1}
              w="full"
              p={8}
            >
              <HStack flexShrink={1}>
                <Heading fontFamily="$butcher">{name}</Heading>
                {bio && <Text flexWrap="wrap">{bio}</Text>}
              </HStack>
              <Button bg="transparent">
                <FiArrowRight />
              </Button>
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </Link>
  )
}

export default function ArtistsScreen() {
  const { data: artistData } = trpc.artists.list.useQuery()

  return (
    <VStack alignItems="center" justifyContent="center" flex={1} px={4}>
      {artistData?.map((artist) => (
        <ArtistCard key={artist._id} {...artist} />
      ))}
    </VStack>
  )
}
