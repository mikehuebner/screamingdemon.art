import { Text, TextProps } from '@chakra-ui/react'

export const Butcher = (props: TextProps) => {
  return (
    <Text {...props} fontFamily="butcher" fontWeight="normal" sx={{ letterSpacing: '1.5px' }} />
  )
}
