import { APIEmbed, APIEmbedThumbnail } from 'discord.js'

export class CompanionIntroductionEmbed implements APIEmbed {
  description = `## The best place to be, at all times
    Never get down with a bad session again. Peepo will show you the best fights in real-time, everywhere.`
  thumbnail = {
    url: 'https://i.imgur.com/oyJBVsF.png',
  }
}
