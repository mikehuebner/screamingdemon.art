import Masonry from 'react-masonry-css'
import Carousel from 'react-native-reanimated-carousel'

import { GetServerSidePropsContext } from 'next'
import { groq } from 'next-sanity'
import { useNextSanityImage } from 'next-sanity-image'

import { Button, H1, Paragraph, Stack, useWindowDimensions, YStack } from '@screamingdemonart/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import Image from 'next/image'
import { useLink } from 'solito/link'

import { createSanity, createSSG, type ImageSource } from '~/server'
import '~/styles/react-masonry-styles.css'
import { trpc } from '~/utils'

interface ImageGalleryProps {
  image: ImageSource
}

const DisplayImage = ({ image }: ImageGalleryProps) => {
  const imageProps = useNextSanityImage(createSanity, image ?? null)

  return (
    <Image
      {...imageProps}
      style={{ width: '100%', height: 'auto' }} // layout="responsive" prior to Next 13.0.0
      sizes="(max-width: 800px) 100vw, 800px"
      placeholder="blur"
      blurDataURL={image.asset.metadata.lqip}
      alt="Testing will do"
      draggable={false}
    />
  )
}

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
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ index }) => (
          <Stack flex={1} userSelect="none">
            <DisplayImage image={images[index]} />
          </Stack>
        )}
      />
    </Stack>
  )
}

type ArtistPageProps = {
  name: string
}

export async function getServerSideProps(context: GetServerSidePropsContext<ArtistPageProps>) {
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
  }
}

export default function ArtistDetailsScreen({ name }: ArtistPageProps) {
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
      <Gallery images={artistData.gallery} />
      <Masonry
        breakpointCols={3}
        className="screamingdemonart-masonry-grid"
        columnClassName="screamingdemonart-masonry-grid_column"
      >
        {artistData.gallery.map((image) => (
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
