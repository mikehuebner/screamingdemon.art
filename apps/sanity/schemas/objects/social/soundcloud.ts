import { FaSoundcloud } from 'react-icons/fa'

import { defineField } from 'sanity'

export default defineField({
  name: 'social.soundcloud',
  title: 'Soundcloud',
  type: 'object',
  icon: FaSoundcloud,
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
        subtitle: 'Soundcloud',
        title: url,
        media: FaSoundcloud,
      }
    },
  },
})
