import { FaPinterest } from 'react-icons/fa'

import { defineField } from 'sanity'

export default defineField({
  name: 'social.pinterest',
  title: 'Pinterest',
  type: 'object',
  icon: FaPinterest,
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
        subtitle: 'Pinterest',
        title: url,
        media: FaPinterest,
      }
    },
  },
})
