import { Logger } from '@nestjs/common'
import { WsAdapter } from '@nestjs/platform-ws'
import { setupWebApp } from '@ps2gg/nx/nest-app'
import { environment } from './environment'
import { InfrastructureModule } from './infrastructure/InfrastructureModule'

async function bootstrap() {
  const app = await setupWebApp(InfrastructureModule.forApi(), environment.env)
  const port = process.env['PORT'] || 3000

  app.useWebSocketAdapter(new WsAdapter(app))
  await app.listen(port, '0.0.0.0', () => {
    Logger.log(`Listening at http://localhost:${port}/`, 'players')
  })
}

bootstrap()
