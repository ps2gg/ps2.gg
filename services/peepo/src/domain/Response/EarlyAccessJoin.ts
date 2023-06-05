import { RESTPatchAPIChannelMessageJSONBody } from 'discord.js'

export class EarlyAccessJoinEmbed implements RESTPatchAPIChannelMessageJSONBody {
  content = '**Welcome to Early Access!**\nNext up: Check out <#1111587144302080033>'
  ephemeral = true
}
