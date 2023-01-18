import { Button, VStack, Container } from '@screamingdemon/ui'
import Link from 'next/link'

import { HeadLogo, WordLogo } from '~/components/logo'

export default function HomeScreen() {
  return (
    <Container maxW="7xl">
      <VStack align="center" justify="center" p={4}>
        <VStack gap={4} w="full">
          <HeadLogo fill="lightgrey" />
          <WordLogo fill="lightgrey" />
        </VStack>

        <Link href="/artists" passHref>
          <Button>All Artists</Button>
        </Link>
      </VStack>
    </Container>
  )
}
