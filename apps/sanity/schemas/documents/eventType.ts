import { defineField, SanityDocument } from 'sanity'

export interface EventTypeDocument extends SanityDocument {
  title: string
  description: string
  slug: string
}

export default defineField({
  name: 'eventType',
  title: 'Event Type',
  type: 'document',
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) =>
        Rule.max(50).warning('Longer titles may be truncated by search engines'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
  ],
  validation: (Rule) => Rule.required(),
})
