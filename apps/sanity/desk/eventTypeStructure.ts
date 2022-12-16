import defineStructure from '../utils/defineStructure'

export default defineStructure((S) =>
  S.listItem().title('Event Types').schemaType('eventType').child(S.documentTypeList('eventType'))
)
