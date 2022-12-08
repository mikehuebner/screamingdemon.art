import { useState } from 'react'

import { Stack, Button, MyComponent, Paragraph, Sheet, XStack, YStack } from '@screamingdemonart/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
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

        <MyComponent w={50} h={50} blue />

        <SheetDemo />
      </YStack>
    </Stack>
  )
}

function SheetDemo() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)
  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
