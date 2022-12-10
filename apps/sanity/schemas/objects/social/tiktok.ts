import { FaTiktok } from 'react-icons/fa'

import { defineField } from 'sanity'

export default defineField({
  name: 'social.tiktok',
  title: 'TikTok',
  type: 'object',
  icon: FaTiktok,
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
        subtitle: 'TikTok',
        title: url,
        media: FaTiktok,
      }
    },
  },
})
