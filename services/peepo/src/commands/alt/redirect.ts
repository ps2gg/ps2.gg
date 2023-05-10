import { Message } from 'discord.js'

export async function redirectLegacyAltSpy(message: Message<boolean>): Promise<void> {
  if (!(message.content.startsWith('!alt spy') && message.channel.id === '944930552753029220')) return

  const reply = await message.reply(
    '**Alt matching has been upgraded!** Use `/alt match` to find more alts than before and enjoy new quality of life features.'
  )

  setTimeout(() => reply.delete(), 1000 * 10)
}
