import { getAltMatches, getPlayerSearchSuggestions, updateAllAlts } from '@ps2gg/alts/ws'
import { Autocomplete, AutocompleteResponse, Command, Component, ComponentResponse, SubCommand, CommandResponse } from '@ps2gg/discord/command'
import { getMatchNameSuggestions as getMatchAutocompleteResponse } from './autocomplete/matchName'
import { explain } from './components/explain'
import { reset } from './components/reset'
import { update } from './components/update'
import { alt } from './config'
import { getAltEmbed } from './embeds/match'
import { getAltTreeEmbed } from './embeds/tree'
import { MatchOptions, match } from './subcommands/match'

@Command(alt)
export class AltCommand {
  description = 'Match the alt characters of a given player'

  @SubCommand(match)
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

  @Component(update)
  async update(interactionContext: string[]): Promise<ComponentResponse> {
    const name = interactionContext[0]
    await updateAllAlts(name)
    const matches = await getAltMatches(name)
    return {
      embeds: [getAltEmbed(matches, name)],
    }
  }

  @Component(explain)
  async explain(interactionContext: string[]): Promise<ComponentResponse> {
    const name = interactionContext[0]
    const matches = await getAltMatches(name)
    return {
      embeds: [getAltTreeEmbed(matches, name)],
    }
  }

  @Component(reset)
  async reset(interactionContext: string[]): Promise<ComponentResponse> {
    const name = interactionContext[0]
    const matches = await getAltMatches(name)
    return {
      embeds: [getAltEmbed(matches, name)],
    }
  }

  @Autocomplete(match, 'name')
  async search(query: string): Promise<AutocompleteResponse[]> {
    const suggestions = await getPlayerSearchSuggestions(query || 'brgh')
    return getMatchAutocompleteResponse(suggestions)
  }
}
