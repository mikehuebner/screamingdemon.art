import { styled, Stack } from 'tamagui'

export const MyComponent = styled(Stack, {
  name: 'MyComponent',
  bc: 'red',

  variants: {
    blue: {
      true: {
        backgroundColor: 'blue',
      },
    },
  },
})
