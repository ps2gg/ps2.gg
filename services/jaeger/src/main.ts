import { setupDiscordClient } from '@ps2gg/discord/client'
import { readFileSync } from 'fs'
import { VerifyCommand } from './infrastructure/SlashCommand/Verify'

setupDiscordClient({
  id: '1118852327898624081',
  token: readFileSync('/run/secrets/jaeger-token', 'utf-8'),
  commands: [new VerifyCommand()],
})
