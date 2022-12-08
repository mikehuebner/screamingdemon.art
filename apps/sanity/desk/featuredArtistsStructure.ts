import defineStructure from '../utils/defineStructure'

export default defineStructure((S) =>
  S.listItem()
    .title('Featured Artists')
    .schemaType('featuredArtists')
    .child(S.documentTypeList('featuredArtists'))
)
