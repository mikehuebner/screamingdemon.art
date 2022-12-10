import { HeartFilledIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import { validateSlug } from '../../utils/validateSlug'

const GROUPS = [
  {
    default: true,
    name: 'details',
    title: 'Details',
  },
  {
    name: 'social',
    title: 'Social',
  },
  {
    name: 'gallery',
    title: 'Gallery',
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
    defineField({
      name: 'name',
      type: 'string',
      group: 'details',
    }),

    defineField({
      name: 'bio',
      title: 'Biography',
      description:
        'A short biography of the artist, this can be written in markdown which will be rendered as HTML.',
      type: 'markdown',
      group: 'details',
    }),

    defineField({
      name: 'website',
      type: 'url',
      group: 'social',
    }),

    defineField({
      name: 'socials',
      title: 'Social Profiles',
      type: 'array',
      description: 'Any social media profiles you want to link to.',
      of: [
        { type: 'social.instagram' },
        { type: 'social.tiktok' },
        { type: 'social.twitter' },
        { type: 'social.facebook' },
        { type: 'social.youtube' },
        { type: 'social.pinterest' },
        { type: 'social.etsy' },
        { type: 'social.spotify' },
        { type: 'social.soundcloud' },
      ],
      group: 'social',
    }),

    defineField({
      name: 'portrait',
      title: 'Portiat',
      description:
        'A portrait of the artist. This is optional and will display as a parallax or with the biography. Preferably a square image with a transparent background.',
      type: 'image',
      options: {
        hotspot: true, // <-- Defaults to false
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          options: {
            isHighlighted: true, // <-- make this field easily accessible
          },
        },
      ],
      group: 'gallery',
    }),

    defineField({
      name: 'gallery',
      title: 'Gallery',
      description:
        'Add multiple images under the Media tab, then select them here. You can organize them by dragging and dropping.',
      type: 'array',
      initialValue: [],
      of: [
        {
          type: 'image',
          options: {
            hotspot: true, // <-- Defaults to false
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              options: {
                isHighlighted: true, // <-- make this field easily accessible
              },
            },
          ],
        },
      ],
      group: 'gallery',
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      // @ts-ignore - TODO - fix this TS error
      validation: validateSlug,
      group: 'seo',
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo.page',
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
