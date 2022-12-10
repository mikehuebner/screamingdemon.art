import { FaShopify } from 'react-icons/fa'

import { defineField } from 'sanity'

export default defineField({
  name: 'social.shopify',
  title: 'Shopify',
  type: 'object',
  icon: FaShopify,
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      url: 'url',
    },
    prepare(selection) {
      const { url } = selection

      return {
        subtitle: 'Shopify',
        title: url,
        media: FaShopify,
      }
    },
  },
})
