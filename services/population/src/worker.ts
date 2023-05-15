import { Logger } from '@nestjs/common'
import { setupMicroserviceApp } from '@ps2gg/nx/nest-app'
import { readFileSync } from 'fs'
import { environment } from './environment'
import { InfrastructureModule } from './infrastructure/InfrastructureModule'

const prod = (process.env['NODE_ENV'] as string) === 'production'

async function bootstrap() {
  const app = await setupMicroserviceApp(
    InfrastructureModule.forWorker(),
    prod ? `amqp://rabbitmq:${readFileSync('/run/secrets/rabbitmq_pass', 'utf-8')}@rabbitmq:5672` : environment.eventStreamDsn,
    `${environment.env}_app_population`,
    [],
    environment.env
  )

  app.listen().then(() => {
    Logger.log(`Microservice layer has started`)
  })
}

bootstrap()
