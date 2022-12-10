import { FaSpotify } from 'react-icons/fa'

import { defineField } from 'sanity'

export default defineField({
  name: 'social.spotify',
  title: 'Spotify',
  type: 'object',
  icon: FaSpotify,
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
        subtitle: 'Spotify',
        title: url,
        media: FaSpotify,
      }
    },
  },
})
