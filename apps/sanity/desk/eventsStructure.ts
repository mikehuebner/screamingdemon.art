import defineStructure from '../utils/defineStructure'

export default defineStructure((S) =>
  S.listItem().title('Events').schemaType('events').child(S.documentTypeList('events'))
)
