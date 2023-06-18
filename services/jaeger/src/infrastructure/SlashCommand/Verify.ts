import { GetPlayerAutocomplete } from '@ps2gg/alts/ws'
import { Command, Main, Autocomplete, AutocompleteResponse, CommandResponse, linkedUser, Component, ComponentResponse } from '@ps2gg/discord/command'
import { User } from '@ps2gg/users/types'
import { VerifyCharacter } from '../../application/Command/VerifyCharacter'
import { GetPlayer } from '../../application/Query/GetPlayer'
import { VerifyReady } from '../../domain/Components/VerifyReady'
import { Verify, VerifyOptions } from '../../domain/Meta/Verify'

@Command(Verify)
export class VerifyCommand {
  @Main(Verify)
  async verify(options: VerifyOptions): Promise<CommandResponse> {
    const { name } = options
    const { embed, id } = await new GetPlayer(name).execute()
    return {
      interactionContext: [id, name],
      embeds: [embed],
      ephemeral: true,
    }
  }

  @Autocomplete(Verify, 'name')
  async playerName(query: string): Promise<AutocompleteResponse[]> {
    return new GetPlayerAutocomplete(query).execute()
  }

  @Component(VerifyReady)
  async verifyReady(interactionContext: string[], @linkedUser user: User): Promise<ComponentResponse> {
    const id = interactionContext[0]
    const name = interactionContext[1]

    try {
      const verified = await new VerifyCharacter(id, name, user.discordId).execute()
      return { embeds: [verified] }
    } catch (error) {
      if (error.response.status === 408) throw new Error('Verification timed out. Please try again.')
      throw error
    }
  }
}
