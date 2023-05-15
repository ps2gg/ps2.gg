import { DynamicModule, Global, Module } from '@nestjs/common'
import { defaultPinoHttpOptions } from '@ps2gg/nx/nest-app'
import { DomainEventsModule } from '@ps2gg/nx/nest-domain-events'
import { LoggerModule } from 'nestjs-pino'
import { readFileSync } from 'fs'
import { ApplicationModule } from '../application/ApplicationModule'
import { environment } from '../environment'
import { HttpControllerModule } from './Controller/HttpControllerModule'
import { ScheduledTasksModule } from './ScheduledTasks/ScheduledTasksModule'
import { TypeOrmModule } from './TypeOrm/TypeOrmModule'

const prod = (process.env['NODE_ENV'] as string) === 'production'

@Global()
@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        ...defaultPinoHttpOptions(environment.env !== 'production'),
      },
    }),
    DomainEventsModule.forRoot({
      eventStreamDsn: prod ? `amqp://rabbitmq:${readFileSync('/run/secrets/rabbitmq_pass', 'utf-8')}@rabbitmq:5672` : environment.eventStreamDsn,
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
      imports: [HttpControllerModule],
    }
  }

  static forWorker(): DynamicModule {
    return {
      module: InfrastructureModule,
      imports: [],
    }
  }
}
