import { Stack, Text } from '@screamingdemonart/ui'

import { trpc } from '~/utils'

export default function HomeScreen() {
  const { data: productData } = trpc.home.content.useQuery()
  console.log({ productData })

  return (
    <Stack>
      <Text>Hello, world!</Text>
    </Stack>
  )
}
