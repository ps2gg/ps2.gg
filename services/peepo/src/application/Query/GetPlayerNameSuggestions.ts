import { getPlayerSearchSuggestions } from '@ps2gg/alts/ws'
import { AutocompleteResponse } from '@ps2gg/discord/command'

export class GetPlayerNameSuggestions {
  constructor(readonly query: string) {}

  async execute(): Promise<AutocompleteResponse[]> {
    const suggestions = await getPlayerSearchSuggestions(this.query || 'brgh')
    return suggestions.result.map((name) => ({ name, value: name }))
  }
}
