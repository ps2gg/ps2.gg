import { EmbedColors } from '@ps2gg/discord/constants'
import { APIEmbed } from 'discord.js'

export class VerifySuccessEmbed implements APIEmbed {
  description: string
  color = EmbedColors.Success
  thumbnail = {
    url: 'https://em-content.zobj.net/source/microsoft-teams/363/unlocked_1f513.png',
  }
  footer = { text: 'Verification process powered by ps2.gg' }

  constructor(name: string) {
    this.description = `## You are now verified as ${name}!\nCommands with verification requirements will now include this character. To see everyone you're verified as, use \`/whoami\`.`
  }
}
