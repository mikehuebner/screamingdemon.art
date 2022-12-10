import { FaFacebookF } from 'react-icons/fa'

import { defineField } from 'sanity'

export default defineField({
  name: 'social.facebook',
  title: 'Facebook',
  type: 'object',
  icon: FaFacebookF,
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((url) => {
          const pattern =
            /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/g
          const isValid = url?.match(pattern)
          return isValid ? true : 'Not a valid Facebook profile URL'
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
        subtitle: 'Facebook',
        title: url,
        media: FaFacebookF,
      }
    },
  },
})
