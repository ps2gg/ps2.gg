import { Command, Main, CommandResponse, linkedUser } from '@ps2gg/discord/command'
import { DiscordCommand } from '@ps2gg/discord/types'
import { User } from '@ps2gg/users/types'
import { getPlayers } from '../../application/Query/Players/GetPlayers'
import { VerifiedCharactersEmbed } from '../../domain/Embed/Verification/VerifiedCharactersEmbed'
import { WhoAmI } from '../../domain/Meta/WhoAmI'

@Command(WhoAmI)
export class WhoAmICommand extends DiscordCommand {
  @Main(WhoAmI)
  async whoAmI(options: null, @linkedUser user: User): Promise<CommandResponse> {
    const characters = user.characterIds.length ? await getPlayers(user.characterIds) : []
    const embed = new VerifiedCharactersEmbed(characters)
    return {
      interactionContext: [],
      embeds: [embed],
      ephemeral: true,
    }
  }
}
