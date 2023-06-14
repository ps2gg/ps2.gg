import { DynamicModule, Global, Module } from '@nestjs/common'
import { EventModule } from '@ps2gg/events/subscriptions'
import { defaultPinoHttpOptions } from '@ps2gg/nx/nest-app'
import { DomainEventsModule } from '@ps2gg/nx/nest-domain-events'
import { LoggerModule } from 'nestjs-pino'
import { existsSync, readFileSync } from 'fs'
import { ApplicationModule } from '../application/ApplicationModule'
import { environment } from '../environment'
import { HttpControllerModule } from './Controller/HttpControllerModule'
import { ScheduledTasksModule } from './ScheduledTasks/ScheduledTasksModule'
import { TypeOrmModule } from './TypeOrm/TypeOrmModule'

/**
 * process.env.NODE_ENV is forcibly replaced with development in the build process due to
 * the optimization flag being turned off in project.json. It should also stay off to avoid
 * misnaming of entities through minimization.
 * So instead, we check for the production state by the presence of the database secrets.
 */
const prod = existsSync('/run/secrets/population-db-pass')

@Global()
@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        ...defaultPinoHttpOptions(environment.env !== 'production'),
      },
    }),
    DomainEventsModule.forRoot({
      eventStreamDsn: prod ? `amqp://rabbitmq:${readFileSync('/run/secrets/rabbitmq-pass', 'utf-8')}@rabbitmq:5672` : environment.eventStreamDsn,
    }),

    // infra
    TypeOrmModule,
    ScheduledTasksModule,

    // application
    ApplicationModule,
  ],
})
export class InfrastructureModule {
  static forApi(): DynamicModule {
    return {
      module: InfrastructureModule,
      imports: [HttpControllerModule, EventModule.forApi()],
    }
  }

  static forWorker(): DynamicModule {
    return {
      module: InfrastructureModule,
      imports: [],
    }
  }
}
