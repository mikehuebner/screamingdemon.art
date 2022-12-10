import { FaYoutube } from 'react-icons/fa'

import { defineField } from 'sanity'

export default defineField({
  name: 'social.youtube',
  title: 'Youtube',
  type: 'object',
  icon: FaYoutube,
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
        subtitle: 'Youtube',
        title: url,
        media: FaYoutube,
      }
    },
  },
})
