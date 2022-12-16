import { StarIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { defineField, SanityDocument } from 'sanity'

const months = Array.from({ length: 14 }).map((_, i) => {
  const date = new Date()
  date.setMonth(date.getMonth() + i)
  return {
    title: format(date, 'MMMM yyyy'),
    value: format(date, 'yyyy-MM-01'),
  }
})

interface FeaturedArtistDocument extends SanityDocument {
  month: string
}

const TITLE = 'Featured Artist'

export default defineField({
  name: 'featuredArtists',
  title: TITLE,
  type: 'document',
  icon: StarIcon,
  groups: [
    {
      default: true,
      name: 'details',
      title: 'Details',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      group: 'editorial',
      name: 'artist',
      title: 'Artist',
      description: 'The featured artist for the month',
      type: 'reference',
      to: [{ type: 'artists' }],
      weak: false,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'month',
      title: 'Month for Artist',
      type: 'string',
      options: {
        list: months,
      },
      group: 'editorial',
      validation: (Rule) =>
        Rule.custom(async (currentMonth, context) => {
          const { parent } = context
          const field = parent as FeaturedArtistDocument

          // Get the other dates for the document type
          const otherDates = await context
            .getClient({ apiVersion: '2022-11-16' })
            .fetch<FeaturedArtistDocument[]>(`*[_type == "featuredArtists"]`)

          const takenMonths = otherDates
            .filter((doc) => doc._id !== field?._id)
            .map((doc) => doc.month)

          if (currentMonth && takenMonths.includes(currentMonth)) {
            const formattedDate = format(parseISO(currentMonth), 'MMMM yyyy')

            return `You already have an artist slated for ${formattedDate}, please choose another month.`
          }

          return true
        }),
    }),

    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'editorial',
    }),

    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      group: 'editorial',
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo.home',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      artist: 'artist.name',
      date: 'month',
    },
    prepare(selection) {
      const { artist, date } = selection

      return {
        title: format(parseISO(date), 'MMMM yyyy') || 'No Featured Artist Date',
        subtitle: artist,
      }
    },
  },
})
