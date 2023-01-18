import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { GetServerSidePropsContext, InferGetStaticPropsType } from 'next'
import { groq } from 'next-sanity'

import { Box, Container, Heading, Stack, Text } from '@screamingdemon/ui'
import { Virtual } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { DisplayImage } from '~/components/display-image'
import { createSSG, type ImageSource } from '~/server'
import { trpc } from '~/utils'

const Gallery = ({ images }: { images: ImageSource[] }) => (
  <Swiper
    spaceBetween={50}
    slidesPerView={3}
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper) => console.log(swiper)}
    modules={[Virtual]}
    virtual
  >
    {images.map((image, index) => (
      <SwiperSlide key={index}>
        <Stack flex={1} userSelect="none">
          <DisplayImage image={image} />
        </Stack>
      </SwiperSlide>
    ))}
  </Swiper>
)

export async function getStaticPaths() {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  const ssg = await createSSG()

  const artists = await ssg.artists.list.fetch()

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = artists.map(({ slug }) => ({
    params: { name: slug },
  }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps(
  context: GetServerSidePropsContext<{
    name: string
  }>
) {
  const ssg = await createSSG()

  const name = context.params?.name as string

  await ssg.artists.get.prefetch({
    id: name,
  })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      name,
    },
    revalidate: 1,
  }
}

export default function ArtistDetailsScreen({
  name,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: artistData } = trpc.artists.get.useQuery({
    id: name,
    query: groq`
      bio,
      gallery {
        asset->{
          ...,
          metadata
        }
      }[]
    `,
  })

  if (!artistData) {
    return null
  }

  return (
    <Container maxW="7xl">
      <Heading fontWeight="800">{`${artistData.name}`}</Heading>
      <Text fontWeight="800">{artistData.bio}</Text>
      {artistData.gallery && <Gallery images={artistData.gallery} />}
      <Box flex={1}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry>
            {artistData.gallery?.map((image) => (
              <Box key={image.asset._id} overflow="hidden" m={2} bg="#5A5A5A" borderRadius="md">
                <DisplayImage image={image} />
              </Box>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </Box>
    </Container>
  )
}
