import { emojis } from '@ps2gg/discord/constants'
import { Message } from 'discord.js'

const prod = process.env.NODE_ENV === 'production'
const general = '<#716155535594094663>'

export async function removeNoneThreadedMessage(message: Message<boolean>): Promise<void> {
  if (prod && message.channel.id !== '944930552753029220') return
  if (!prod && message.channel.id !== '893793965185306655') return

  if (!message.content.startsWith('!alt spy')) {
    const reply = await message.reply(`Please use threads or write in ${general} to keep things clean ${emojis.prayge}`)

    setTimeout(() => reply.delete(), 1000 * 10)
  }

  message.delete()
}
