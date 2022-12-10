import { FaTwitter } from 'react-icons/fa'

import { defineField } from 'sanity'

export default defineField({
  name: 'social.twitter',
  title: 'Twitter',
  type: 'object',
  icon: FaTwitter,
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((url) => {
          const pattern = /(https:\/\/twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/g
          const isValid = url?.match(pattern)
          return isValid ? true : 'Not a valid Twitter profile URL'
        }),
    }),
  ],
  preview: {
    select: {
      url: 'url',
    },
    prepare(selection) {
      const { url } = selection

      return {
        subtitle: 'Twitter',
        title: url,
        media: FaTwitter,
      }
    },
  },
})
