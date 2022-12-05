import { colorInput } from '@sanity/color-input'
import { visionTool } from '@sanity/vision'
import { defineConfig, isDev } from 'sanity'
import { imageHotspotArrayPlugin } from 'sanity-plugin-hotspot-array'
import { media } from 'sanity-plugin-media'
import { deskTool } from 'sanity/desk'

import { structure } from './desk'
import { customDocumentActions } from './plugins/customDocumentActions'
import { schemaTypes } from './schemas'

const devOnlyPlugins = [visionTool()]

export default defineConfig({
  name: 'default',
  title: 'Screaming Demon Art',

  projectId: 'bldpsrfv',
  dataset: 'production',

  plugins: [
    deskTool({ structure }),
    colorInput(),
    imageHotspotArrayPlugin(),
    customDocumentActions(),
    media(),
    ...(isDev ? devOnlyPlugins : []),
  ],

  schema: {
    types: schemaTypes,
  },
})
