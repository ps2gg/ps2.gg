import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '../infrastructure/TypeOrm/TypeOrmModule'
import { PopulatePlayerHandler } from './Command/PopulatePlayer'
import { PrimePlayersHandler } from './Command/PrimePlayers'
import { GetOnlinePlayersHandler } from './Query/GetOnlinePlayers'
import { GetPlayerHandler } from './Query/GetPlayer'
import { GetPlayerByNameHandler } from './Query/GetPlayerByName'
import { GetPlayersHandler } from './Query/GetPlayers'

const queryHandlers = [GetPlayerHandler, GetPlayerByNameHandler, GetPlayersHandler, GetOnlinePlayersHandler]
const commandHandlers = [PopulatePlayerHandler, PrimePlayersHandler]

export const eventHandlers = []

@Module({
  imports: [TypeOrmModule, CqrsModule],
  providers: [...commandHandlers, ...queryHandlers, ...eventHandlers],
  exports: [CqrsModule],
})
export class ApplicationModule {}
