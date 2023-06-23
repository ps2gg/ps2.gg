import { DynamicModule, Global, Module } from '@nestjs/common'
import { isProd } from '@ps2gg/common/util'
import { defaultPinoHttpOptions } from '@ps2gg/nx/nest-app'
import { DomainEventsModule } from '@ps2gg/nx/nest-domain-events'
import { LoggerModule } from 'nestjs-pino'
import { readFileSync } from 'fs'
import { ApplicationModule } from '../application/ApplicationModule'
import { environment } from '../environment'
import { HttpControllerModule } from './Controller/HttpControllerModule'
import { TypeOrmModule } from './TypeOrm/TypeOrmModule'

@Global()
@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        ...defaultPinoHttpOptions(environment.env !== 'production'),
      },
    }),
    DomainEventsModule.forRoot({
      eventStreamDsn: isProd('friends') ? `amqp://rabbitmq:${readFileSync('/run/secrets/rabbitmq-pass', 'utf-8')}@rabbitmq:5672` : environment.eventStreamDsn,
    }),
    // infra
    TypeOrmModule,
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
