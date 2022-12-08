import React, { useState } from 'react'

import {
  Stack,
  Button,
  H1,
  MyComponent,
  Paragraph,
  Separator,
  Sheet,
  XStack,
  YStack,
  H3,
} from '@screamingdemonart/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'

import { HeadLogo } from '~/components/logo'
import { createSSG } from '~/server'
import { trpc } from '~/utils'

export async function getServerSideProps() {
  const ssg = await createSSG()

  await ssg.artists.list.prefetch()

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  }
}

export default function HomeScreen() {
  const { data: artistData } = trpc.artists.list.useQuery()

  return (
    <Stack>
      <YStack f={1} jc="center" ai="center" p="$4" space>
        <YStack space="$4" maw={600}>
          <HeadLogo fill="grey" />
          <H1 ta="center">Screaming Demon Art</H1>
          <Paragraph ta="center">
            {`This is coming dynamically from the server. It's a list of artists:`}
          </Paragraph>

          <Stack>
            <Separator />
            {artistData?.map((artist) => (
              <>
                <H3 ta="center" key={artist._id}>
                  {artist.name}
                </H3>
                <Paragraph>{artist.bio}</Paragraph>
              </>
            ))}
          </Stack>
        </YStack>

        <XStack>
          <Button>Link to user</Button>
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
