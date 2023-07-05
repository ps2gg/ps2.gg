import { Command, Main, CommandResponse, linkedUser } from '@ps2gg/discord/command'
import { DiscordCommand } from '@ps2gg/discord/types'
import { PlayerClient } from '@ps2gg/players/client'
import { User } from '@ps2gg/users/types'
import { FriendsEmbed } from '../../domain/Embed/FriendsEmbed'
import { VerifiedCharactersEmbed } from '../../domain/Embed/VerifiedCharactersEmbed'
import { WhoAmI } from '../../domain/Meta/WhoAmI'

@Command(WhoAmI)
export class WhoAmICommand extends DiscordCommand {
  @Main(WhoAmI)
  async whoAmI(options: null, @linkedUser user: User): Promise<CommandResponse> {
    const players = new PlayerClient()

    const friends = user.characterIds.length ? await players.findMany(user.characterIds) : []
    const embed = new VerifiedCharactersEmbed(friends)
    return {
      interactionContext: [],
      embeds: [embed],
      ephemeral: true,
    }
  }
}
