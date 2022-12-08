import { ConfigContext } from 'sanity'
import { ListItemBuilder, StructureBuilder } from 'sanity/desk'

/**
 * Helper for creating and typing composable desk structure parts.
 */
export default function defineStructure<StructureType = ListItemBuilder>(
  factory: (S: StructureBuilder, context: ConfigContext) => StructureType
) {
  return factory
}
