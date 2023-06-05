import { EmbedColors } from '@ps2gg/discord/constants'
import { APIEmbed } from 'discord.js'

export class EarlyAccessGatewayEmbed implements APIEmbed {
  color = EmbedColors.System
  thumbnail = {
    url: 'https://i.imgur.com/kq2w63i.png',
  }
  title = 'Early Access'
  description =
    '## Get a glimpse of new features!\n\nThis is where we release development builds of work-in-progress features. Initial releases will be as minimal as possible - and we gradually improve them based on your feedback.\n\n**Currently testing: Good Fight Notifications**'
}
