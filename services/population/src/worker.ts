import { Logger } from '@nestjs/common'
import { setupMicroserviceApp } from '@ps2gg/nx/nest-app'
import { environment } from './environment'
import { InfrastructureModule } from './infrastructure/InfrastructureModule'

async function bootstrap() {
  const app = await setupMicroserviceApp(InfrastructureModule.forWorker(), environment.eventStreamDsn, `${environment.env}_app_population`, [], environment.env)

  app.listen().then(() => {
    Logger.log(`Microservice layer has started`)
  })
}

bootstrap()
