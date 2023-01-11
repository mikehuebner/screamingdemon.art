import { useNextSanityImage } from 'next-sanity-image'

import Image from 'next/image'

import { createSanity, type ImageSource } from '~/server'

interface DisplayImageProps {
  image: ImageSource
}

export const DisplayImage = ({ image }: DisplayImageProps) => {
  const imageProps = useNextSanityImage(createSanity, image ?? null)

  return (
    <Image
      {...imageProps}
      style={{ width: '100%', height: 'auto' }} // layout="responsive" prior to Next 13.0.0
      sizes="(max-width: 800px) 100vw, 800px"
      placeholder="blur"
      blurDataURL={image.asset.metadata.lqip}
      alt="Testing will do"
      draggable={false}
    />
  )
}
