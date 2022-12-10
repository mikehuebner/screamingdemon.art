import { Stack, Button, XStack, YStack } from '@screamingdemonart/ui'
import { useLink } from 'solito/link'

import { HeadLogo, WordLogo } from '~/components/logo'

export default function HomeScreen() {
  const linkProps = useLink({
    href: '/artists',
  })

  return (
    <Stack h="100%" fg={1}>
      <YStack f={1} jc="center" ai="center" p="$4" space>
        <YStack space="$4" maw={600} w="100%">
          <HeadLogo fill="lightgrey" />
          <WordLogo fill="lightgrey" />
        </YStack>

        <XStack>
          {/* @ts-ignore onclick method not working with solito */}
          <Button {...linkProps}>All Artists</Button>
        </XStack>
      </YStack>
    </Stack>
  )
}
