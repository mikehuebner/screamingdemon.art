import { FaInstagram } from 'react-icons/fa'

import { defineField } from 'sanity'

export default defineField({
  name: 'social.instagram',
  title: 'Instagram',
  type: 'object',
  icon: FaInstagram,
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((url) => {
          const pattern =
            /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/g
          const isValid = url?.match(pattern)
          return isValid ? true : 'Not a valid Instagram post URL'
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
        subtitle: 'Instagram',
        title: url,
        media: FaInstagram,
      }
    },
  },
})
