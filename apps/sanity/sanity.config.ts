import { colorInput } from '@sanity/color-input'
import { visionTool } from '@sanity/vision'
import { AssetSource, defineConfig, isDev } from 'sanity'
import { imageHotspotArrayPlugin } from 'sanity-plugin-hotspot-array'
import { markdownSchema } from 'sanity-plugin-markdown'
import { media, mediaAssetSource } from 'sanity-plugin-media'
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
    markdownSchema(),
    ...(isDev ? devOnlyPlugins : []),
  ],

  schema: {
    types: schemaTypes,
  },

  form: {
    file: {
      assetSources: (previousAssetSources: AssetSource[]) => {
        return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
      },
    },
    image: {
      assetSources: (previousAssetSources: AssetSource[]) => {
        return previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource)
      },
    },
  },
})
