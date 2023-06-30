import { AutocompleteResponse } from '@ps2gg/discord/command'
import { PopulationEntity } from '../../domain/Entity/PopulationEntity'

export function getEventSuggestions(query: string): AutocompleteResponse[] {
  const events = PopulationEntity.getEvents()
  return PopulationEntity.getAutocomplete(query, events)
}
