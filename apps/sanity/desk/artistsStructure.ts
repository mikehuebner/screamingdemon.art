import defineStructure from '../utils/defineStructure'

export default defineStructure((S) =>
  S.listItem().title('Artists').schemaType('artists').child(S.documentTypeList('artists'))
)
