import { Logger } from '@nestjs/common'
import { isProd } from '@ps2gg/common/util'
import { setupMicroserviceApp } from '@ps2gg/nx/nest-app'
import { readFileSync } from 'fs'
import { environment } from './environment'
import { InfrastructureModule } from './infrastructure/InfrastructureModule'

export async function bootstrap(): Promise<void> {
  const app = await setupMicroserviceApp(
    InfrastructureModule.forWorker(),
    isProd('test') ? `amqp://rabbitmq:${readFileSync('/run/secrets/rabbitmq-pass', 'utf-8')}@rabbitmq:5672` : environment.eventStreamDsn,
    `${environment.env}_app_peepo`,
    [], // TODO: Subscribe to any events by adding their routing keys
    environment.env
  )

  app.listen().then(() => {
    Logger.log(`Microservice layer has started`)
  })
}
