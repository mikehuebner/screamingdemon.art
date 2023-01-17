import { Button, Box, HStack } from '@screamingdemon/ui'
import Link from 'next/link'

import { HeadLogo, WordLogo } from '~/components/logo'

export default function HomeScreen() {
  return (
    <Box flexGrow={1} h="full">
      <HStack alignItems="center" justifyContent="center" flex={1} p={4}>
        <HStack gap={4} w="full" maxW={600}>
          <HeadLogo fill="lightgrey" />
          <WordLogo fill="lightgrey" />
        </HStack>

        <Link href="/artists" passHref>
          <Button>All Artists</Button>
        </Link>
      </HStack>
    </Box>
  )
}
