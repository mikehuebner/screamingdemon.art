import { GetServerSidePropsContext } from 'next'

import { Button, H3, Paragraph, YStack } from '@screamingdemonart/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useLink } from 'solito/link'

import { createSSG } from '~/server'
import { trpc } from '~/utils'

type ArtistParams = {
  name: string
}

export async function getServerSideProps(context: GetServerSidePropsContext<ArtistParams>) {
  const ssg = await createSSG()

  const name = context.params?.name as string

  await ssg.artists.getBySlug.prefetch({
    slug: name,
  })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      name,
    },
  }
}

export default function ArtistDetailsScreen({ name }: ArtistParams) {
  // const [name] = useParam('name')
  const linkProps = useLink({ href: '/' })
  const { data: artistData } = trpc.artists.getBySlug.useQuery({
    slug: name,
  })

  console.log({ artistData })

  if (!artistData) {
    return null
  }

  return (
    <YStack f={1} jc="center" ai="center" space>
      <H3 ta="center" fow="800">{`Name: ${artistData.name}`}</H3>
      <Paragraph ta="center" fow="800">
        {artistData.bio}
      </Paragraph>
      {/* @ts-ignore fix button props not lining up */}
      <Button {...linkProps} icon={ChevronLeft}>
        Go Home
      </Button>
    </YStack>
  )
}
