import { useMemo } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { Box, Butcher, Button, Container, Heading, HStack, Text, VStack } from '@screamingdemon/ui'
import Link from 'next/link'

import { DisplayImage } from '~/components/display-image'
import { createSSG, type Artist } from '~/server'
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

const ArtistCard = ({ name, slug, gallery }: Artist) => {
  const randomImage = useMemo(() => gallery?.sort(() => 0.5 - Math.random())[0], [])

  return (
    <Link href={`/artists/${slug}`} passHref>
      <VStack align="start" flexGrow={1} p={2}>
        {randomImage && (
          <Box overflow="hidden" borderRadius="md">
            <DisplayImage image={randomImage} />
          </Box>
        )}

        <Butcher fontSize="4xl">{name}</Butcher>
      </VStack>
    </Link>
  )
}

export default function ArtistsScreen() {
  const { data: artistData } = trpc.artists.list.useQuery()

  return (
    <Container maxW="7xl">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {artistData?.map((artist) => (
            <ArtistCard key={artist._id} {...artist} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </Container>
  )
}
