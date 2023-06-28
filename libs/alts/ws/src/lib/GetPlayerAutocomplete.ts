import { AutocompleteResponse } from '@ps2gg/discord/command'
import { getPlayerSearchSuggestions } from './Client'

export async function getPlayerAutocomplete(query: string): Promise<AutocompleteResponse[]> {
  const suggestions = await getPlayerSearchSuggestions(query || 'brgh')
  return suggestions.result.map((name) => ({ name, value: name }))
}
