import { FaEtsy } from 'react-icons/fa'

import { defineField } from 'sanity'

export default defineField({
  name: 'social.etsy',
  title: 'Etsy',
  type: 'object',
  icon: FaEtsy,
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
        subtitle: 'Etsy',
        title: url,
        media: FaEtsy,
      }
    },
  },
})
