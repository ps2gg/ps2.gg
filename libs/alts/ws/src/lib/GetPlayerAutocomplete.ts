import { AutocompleteResponse } from '@ps2gg/discord/command'
import { getPlayerSearchSuggestions } from './Client'

export class GetPlayerAutocomplete {
  constructor(readonly query: string) {}

  async execute(): Promise<AutocompleteResponse[]> {
    const suggestions = await getPlayerSearchSuggestions(this.query || 'brgh')
    return suggestions.result.map((name) => ({ name, value: name }))
  }
}
