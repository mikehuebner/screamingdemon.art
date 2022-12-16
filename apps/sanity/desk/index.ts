import { ListItemBuilder, StructureResolver } from 'sanity/desk'

import artists from './artistsStructure'
import collections from './collectionStructure'
import eventType from './eventTypeStructure'
import events from './eventsStructure'
import featuredArtists from './featuredArtistsStructure'
import home from './homeStructure'
import products from './productStructure'
import settings from './settingStructure'

/**
 * Desk structure overrides
 *
 * Sanity Studio automatically lists document types out of the box.
 * With this custom desk structure we achieve things like showing the `home`
 * and `settings` document types as singletons, and grouping product details
 * and variants for easy editorial access.
 *
 * You can customize this even further as your schemas progress.
 * To learn more about structure builder, visit our docs:
 * https://www.sanity.io/docs/overview-structure-builder
 */

// If you add document types to desk structure manually, you can add them to this function to prevent duplicates in the root pane
const hiddenDocTypes = (listItem: ListItemBuilder) => {
  const id = listItem.getId()

  if (!id) {
    return false
  }

  return ![
    'events',
    'eventType',
    'artists',
    'featuredArtists',
    'collection',
    'colorTheme',
    'home',
    'media.tag',
    'page',
    'product',
    'productVariant',
    'settings',
  ].includes(id)
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      home(S, context),

      S.divider(),

      artists(S, context),
      featuredArtists(S, context),

      S.divider(),

      events(S, context),
      eventType(S, context),

      S.divider(),

      collections(S, context),
      products(S, context),

      S.divider(),

      settings(S, context),

      S.divider(),

      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
