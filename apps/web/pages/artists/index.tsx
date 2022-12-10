import { Button, Paragraph, Separator, Stack, YStack } from '@screamingdemonart/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useLink } from 'solito/link'

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

const ArtistButton = ({ name, slug }: Artist) => {
  const linkProps = useLink({
    href: '/artists/[name]',
    as: `/artists/${slug}`,
  })

  // @ts-ignore fix button props not lining up
  return <Button {...linkProps}>{name}</Button>
}

export default function ArtistsScreen() {
  const { data: artistData } = trpc.artists.list.useQuery()
  const linkProps = useLink({ href: '/' })

  return (
    <YStack f={1} jc="center" ai="center" space>
      <Paragraph ta="center" fow="800">
        This will be the artist page
      </Paragraph>

      <Stack>
        <Separator />
        {artistData?.map((artist) => (
          <ArtistButton key={artist._id} {...artist} />
        ))}
      </Stack>
      {/* @ts-ignore fix button props not lining up */}
      <Button {...linkProps} icon={ChevronLeft}>
        Go Home
      </Button>
    </YStack>
  )
}
