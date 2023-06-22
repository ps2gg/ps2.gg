import { AutocompleteResponse } from '@ps2gg/discord/command'
import { PopulationEntity } from '../../domain/Entity/PopulationEntity'

export class GetEventSuggestions {
  constructor(readonly query: string) {}

  execute(): AutocompleteResponse[] {
    const events = PopulationEntity.getEvents()
    return PopulationEntity.getAutocomplete(this.query, events)
  }
}
