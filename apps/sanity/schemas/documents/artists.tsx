import { HeartFilledIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

const GROUPS = [
  {
    default: true,
    name: 'content',
    title: 'Content',
  },
  {
    name: 'seo',
    title: 'SEO',
  },
]

export default defineType({
  name: 'artists',
  title: 'Artists',
  type: 'document',
  icon: HeartFilledIcon,
  groups: GROUPS,
  fields: [
    // Featured Toggle
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      group: 'content',
    }),

    // Title
    defineField({
      name: 'name',
      type: 'string',
      group: 'content',
    }),

    // Bio
    defineField({
      name: 'bio',
      type: 'text',
      group: 'content',
    }),

    // Modules
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      description: 'Editorial modules to associate with this collection',
      of: [
        { type: 'module.callout' },
        { type: 'module.callToAction' },
        { type: 'module.image' },
        { type: 'module.instagram' },
      ],
      group: 'content',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo.shopify',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare(selection) {
      return {
        title: selection.name,
      }
    },
  },
})
