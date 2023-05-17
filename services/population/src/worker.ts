import { Logger } from '@nestjs/common'
import { setupMicroserviceApp } from '@ps2gg/nx/nest-app'
import { existsSync, readFileSync } from 'fs'
import { environment } from './environment'
import { InfrastructureModule } from './infrastructure/InfrastructureModule'

/**
 * process.env.NODE_ENV is forcibly replaced with development in the build process due to
 * the optimization flag being turned off in project.json. It should also stay off to avoid
 * misnaming of entities through minimization.
 * So instead, we check for the production state by the presence of the database secrets.
 */
const prod = existsSync('/run/secrets/population_db_pass')

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
