import { Stack, Button, Paragraph, XStack, YStack } from '@screamingdemonart/ui'
import { useLink } from 'solito/link'

import { HeadLogo, WordLogo } from '~/components/logo'

export default function HomeScreen() {
  const linkProps = useLink({
    href: '/artists',
  })

  return (
    <Stack>
      <YStack f={1} jc="center" ai="center" p="$4" space>
        <YStack space="$4" maw={600}>
          <HeadLogo fill="lightgrey" />
          <WordLogo fill="lightgrey" />
          <Paragraph ta="center">
            {`This is coming dynamically from the server. It's a list of artists:`}
          </Paragraph>
        </YStack>

        <XStack>
          {/* @ts-ignore onclick method not working with solito */}
          <Button {...linkProps}>Check out a list of artists</Button>
        </XStack>
      </YStack>
    </Stack>
  )
}
