import { Autocomplete, AutocompleteResponse, Command, Component, ComponentResponse, SubCommand, CommandResponse } from '@ps2gg/discord/command'
import { CommandInteraction, MessageComponentInteraction } from 'discord.js'
import { UpdateAllAlts } from '../../application/Command/UpdateAllAlts'
import { GetAlts } from '../../application/Query/GetAlts'
import { GetAltsTree } from '../../application/Query/GetAltsTree'
import { GetPlayerNameSuggestions } from '../../application/Query/GetPlayerNameSuggestions'
import { AltExplain } from '../../domain/Component/AltExplain'
import { AltReset } from '../../domain/Component/AltReset'
import { AltUpdate } from '../../domain/Component/AltUpdate'
import { Alt } from '../../domain/Meta/Alt'
import { AltMatch, MatchOptions } from '../../domain/Meta/AltMatch'

@Command(Alt)
export class AltCommand {
  @SubCommand(AltMatch)
  async match(options: MatchOptions, interaction: CommandInteraction): Promise<CommandResponse | undefined> {
    const { name } = options
    const embed = await new GetAlts(name).execute()
    return { interactionContext: [name], embeds: [embed] }
  }

  @Autocomplete(AltMatch, 'name')
  async search(query: string): Promise<AutocompleteResponse[]> {
    return new GetPlayerNameSuggestions(query).execute()
  }

  @Component(AltUpdate)
  async update(interactionContext: string[]): Promise<ComponentResponse> {
    const name = interactionContext[0]
    const embed = await new UpdateAllAlts(name).execute()
    return { embeds: [embed] }
  }

  @Component(AltExplain)
  async explain(interactionContext: string[]): Promise<ComponentResponse> {
    const name = interactionContext[0]
    const embed = await new GetAltsTree(name).execute()
    return { embeds: [embed] }
  }

  @Component(AltReset)
  async reset(interactionContext: string[], interaction: MessageComponentInteraction): Promise<ComponentResponse> {
    const name = interactionContext[0]
    const embed = await new GetAlts(name).execute()
    return { embeds: [embed] }
  }
}
