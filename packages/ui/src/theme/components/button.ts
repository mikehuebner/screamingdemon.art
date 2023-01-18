import { mode, SystemStyleFunction } from '@chakra-ui/theme-tools'

const variantGhost: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props

  return {
    color: mode(`${c}.500`, `${c}.200`)(props),
  }
}

export const Button = {
  variants: {
    ghost: variantGhost,
    // link: {
    //   color: 'brand.blue.700',
    //   textDecoration: 'none',
    //   _hover: {
    //     color: 'brand.blue.500',
    //     textDecoration: 'none',
    //   },
    // },
  },
}
