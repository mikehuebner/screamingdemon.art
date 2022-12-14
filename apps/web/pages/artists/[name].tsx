import Masonry from 'react-masonry-css'
import Carousel from 'react-native-reanimated-carousel'

import { GetServerSidePropsContext, InferGetStaticPropsType } from 'next'
import { groq } from 'next-sanity'

import { Button, H1, Paragraph, Stack, useWindowDimensions, YStack } from '@screamingdemonart/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useLink } from 'solito/link'

import { DisplayImage } from '~/components/display-image'
import { createSSG, type ImageSource } from '~/server'
import { trpc } from '~/utils'

const Gallery = ({ images }: { images: ImageSource[] }) => {
  const { width } = useWindowDimensions()
  return (
    <Stack flex={1}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay
        autoPlayInterval={5000}
        data={images}
        scrollAnimationDuration={1000}
        renderItem={({ index }) => (
          <Stack flex={1} userSelect="none">
            <DisplayImage image={images[index]} />
          </Stack>
        )}
      />
    </Stack>
  )
}

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
  const linkProps = useLink({ href: '/' })
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
    <YStack f={1} jc="center" space>
      <H1 fow="800">{`${artistData.name}`}</H1>
      <Paragraph fow="800">{artistData.bio}</Paragraph>
      {artistData.gallery && <Gallery images={artistData.gallery} />}
      <Masonry
        breakpointCols={3}
        className="screamingdemonart-masonry-grid"
        columnClassName="screamingdemonart-masonry-grid_column"
      >
        {artistData.gallery?.map((image) => (
          <Stack bg="#5A5A5A" m="$2" br="$3" overflow="hidden" key={image.asset._id}>
            <DisplayImage image={image} />
          </Stack>
        ))}
      </Masonry>

      {/* @ts-ignore fix button props not lining up */}
      <Button {...linkProps} icon={ChevronLeft}>
        Go Home
      </Button>
    </YStack>
  )
}
