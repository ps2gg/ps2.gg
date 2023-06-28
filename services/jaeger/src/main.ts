import { setupDiscordClient } from '@ps2gg/discord/client'
import { readFileSync } from 'fs'
import { VerifyCommand } from './infrastructure/SlashCommand/Verify'

setupDiscordClient({
  id: '1118852327898624081',
  token: readFileSync('/run/secrets/jaeger-token', 'utf-8'),
  commands: [new VerifyCommand()],
  restrictions: {
    development: {
      channels: ['1107543568807116920'],
    },
    staging: {
      guilds: ['207168033918025729'],
    },
    production: {
      guilds: ['207168033918025729'],
    },
  },
})
