import { GiPartyPopper } from 'react-icons/gi'

import { format, formatISO, parse, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'

import ShopifyDocumentStatus from '../../components/media/ShopifyDocumentStatus'

import { validateSlug } from '../../utils/validateSlug'
import { EventTypeDocument } from './eventType'

export default defineType({
  name: 'events',
  title: 'Events',
  type: 'document',
  icon: GiPartyPopper,
  groups: [
    {
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
  ],
  fields: [
    defineField({
      group: 'details',
      name: 'event',
      title: 'Event',
      type: 'reference',
      to: [{ type: 'eventType' }],
      weak: true,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'date',
      type: 'datetime',
      group: 'details',
      options: {
        dateFormat: 'dddd, MMMM Do, yyyy',
        timeFormat: 'h:mm a',
      },
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'markdown',
      group: 'details',
    }),

    defineField({
      group: 'details',
      name: 'featuredArtist',
      title: 'Featured Artist',
      description: 'The featured artist for the event',
      type: 'reference',
      to: [{ type: 'artists' }],
      weak: false,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'poster',
      title: 'Poster',
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
      description: 'Place images here after the event.',
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
      options: {
        source: async (document, context) => {
          // @ts-ignore - TODO - fix this TS error
          const params = { ref: document.event._ref }
          const eventType = await context
            .getClient({ apiVersion: '2022-11-16' })
            .fetch<EventTypeDocument[]>(`*[_type == "eventType"]`, params)

          return `${eventType[0].title} ${format(parseISO(document.date as string), 'MM-dd-yyyy')}`
        },
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, ''),
      },
      // @ts-ignore - TODO - fix this TS error
      validation: validateSlug,
      group: 'details',
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
      eventTitle: 'event.title',
      name: 'name',
      date: 'date',
      poster: 'poster.asset.url',
    },
    prepare(selection) {
      return {
        media: selection.poster && (
          <ShopifyDocumentStatus
            isDeleted={false}
            type="collection"
            url={selection.poster}
            title={selection.name}
          />
        ),
        title: selection.eventTitle || 'Untitled Event',
        subtitle: format(parseISO(selection.date), 'MMMM dd, yyyy h:mm a'),
      }
    },
  },
})
