import { Response } from '@ps2gg/alts/types'
import { AutocompleteResponse } from '@ps2gg/discord/command'

export async function getMatchNameSuggestions(response: Response & { result: string[] }): Promise<AutocompleteResponse[]> {
  return response.result.map((name) => ({ name, value: name }))
}
