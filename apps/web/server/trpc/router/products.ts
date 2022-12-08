import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

export const ProductType = {
  Hotel: 'hotel',
  Car: 'car',
  Flight: 'flight',
} as const

export type ProductType = typeof ProductType[keyof typeof ProductType]

export interface Product {
  productId: string
  title: string
  location: string
  basePrice: number
  discountPrice: number
  description: string
  rating: number
  productType?: ProductType
  // url is /width/height?image=${refIndex}
  imageUrl: string
}

const randomInteger = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const generateMockProducts = ({
  limit,
  productType,
}: {
  limit: number
  productType?: ProductType
}) => {
  const products: Product[] = []

  for (let i = 0; i < limit; i++) {
    const basePrice = randomInteger(100, 1000)
    const discountPrice = basePrice - (basePrice * randomInteger(0, 20)) / 100

    products.push({
      productId: i.toString(),
      title: `Product ${i}`,
      location: `Location ${i}`,
      basePrice,
      discountPrice,
      description: `Product ${i} description`,
      rating: Math.random() * 5,
      productType:
        productType ??
        Object.values(ProductType)[Math.floor(Math.random() * 3)],
      // url is /width/height?image=${refIndex}
      imageUrl: `https://picsum.photos/292/240?image=${i}`,
    })
  }

  return products
}

export const productsRouter = router({
  getPopularProducts: publicProcedure
    .input(
      z
        .object({
          productType: z.nativeEnum(ProductType).optional(),
          limit: z.number().optional(),
        })
        .optional(),
    )
    .query(({ input: { limit = 10, productType } = {} }) =>
      generateMockProducts({ limit, productType }),
    ),

  getProductById: publicProcedure
    .input(
      z.object({
        productId: z.string(),
        productType: z.nativeEnum(ProductType),
      }),
    )
    .query(({ input: { productId, productType } }) =>
      generateMockProducts({ limit: 8 }).find(
        (product) =>
          product.productId === productId &&
          product.productType === productType,
      ),
    ),
})
