import { DynamicModule, Global, Module } from '@nestjs/common'
import { EventModule } from '@ps2gg/events/subscriptions'
import { defaultPinoHttpOptions } from '@ps2gg/nx/nest-app'
import { LoggerModule } from 'nestjs-pino'
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
