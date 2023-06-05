import { AutocompleteResponse } from '@ps2gg/discord/command'
import { ScopeEntity } from '../../domain/Entity/ScopeEntity'

export class GetEventSuggestions {
  constructor(readonly query: string) {}

  execute(): AutocompleteResponse[] {
    const events = ScopeEntity.getEvents()
    return ScopeEntity.getAutocomplete(this.query, events)
  }
}
