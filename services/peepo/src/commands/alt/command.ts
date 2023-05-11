import { getAltMatches, getPlayerSearchSuggestions, updateAllAlts } from '@ps2gg/alts/ws'
import { Autocomplete, AutocompleteResponse, Command, Component, ComponentResponse, SubCommand, CommandResponse } from '@ps2gg/discord/command'
import { getMatchNameSuggestions as getMatchAutocompleteResponse } from './autocomplete/matchName'
import { Explain } from './components/explain'
import { Reset } from './components/reset'
import { Update } from './components/update'
import { Alt } from './config'
import { getAltEmbed } from './embeds/match'
import { getAltTreeEmbed } from './embeds/tree'
import { MatchOptions, Match } from './subcommands/match'

@Command(Alt)
export class AltCommand {
  @SubCommand(Match)
  async match(options: MatchOptions): Promise<CommandResponse> {
    const { name } = options
    const matches = await getAltMatches(name)
    const embed = getAltEmbed(matches, name)
    return {
      interactionContext: [name],
      thread: { name: embed.title },
      embeds: [embed],
    }
  }

  @Component(Update)
  async update(interactionContext: string[]): Promise<ComponentResponse> {
    const name = interactionContext[0]
    await updateAllAlts(name)
    const matches = await getAltMatches(name)
    return {
      embeds: [getAltEmbed(matches, name)],
    }
  }

  @Component(Explain)
  async explain(interactionContext: string[]): Promise<ComponentResponse> {
    const name = interactionContext[0]
    const matches = await getAltMatches(name)
    return {
      embeds: [getAltTreeEmbed(matches, name)],
    }
  }

  @Component(Reset)
  async reset(interactionContext: string[]): Promise<ComponentResponse> {
    const name = interactionContext[0]
    const matches = await getAltMatches(name)
    return {
      embeds: [getAltEmbed(matches, name)],
    }
  }

  @Autocomplete(Match, 'name')
  async search(query: string): Promise<AutocompleteResponse[]> {
    const suggestions = await getPlayerSearchSuggestions(query || 'brgh')
    return getMatchAutocompleteResponse(suggestions)
  }
}
