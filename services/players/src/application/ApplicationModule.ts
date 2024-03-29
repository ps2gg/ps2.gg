import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '../infrastructure/TypeOrm/TypeOrmModule'
import { PopulatePlayerHandler } from './Command/PopulatePlayer'
import { PopulatePlayerByNameHandler } from './Command/PopulatePlayerByName'
import { PopulatePlayersHandler } from './Command/PopulatePlayers'
import { ResetInactivePlayersHandler } from './Command/ResetInactivePlayers'
import { ResetOnlineStateHandler } from './Command/ResetOnlineState'
import { SetLastActivityHandler } from './Command/SetLastActivity'
import { GetOnlinePlayersHandler } from './Query/GetOnlinePlayers'
import { GetPlayerHandler } from './Query/GetPlayer'
import { GetPlayerByNameHandler } from './Query/GetPlayerByName'
import { GetPlayersHandler } from './Query/GetPlayers'

const queryHandlers = [GetPlayerHandler, GetPlayerByNameHandler, GetPlayersHandler, GetOnlinePlayersHandler]
const commandHandlers = [PopulatePlayerHandler, PopulatePlayersHandler, PopulatePlayerByNameHandler, ResetOnlineStateHandler, SetLastActivityHandler, ResetInactivePlayersHandler]

export const eventHandlers = []

@Module({
  imports: [TypeOrmModule, CqrsModule],
  providers: [...commandHandlers, ...queryHandlers, ...eventHandlers],
  exports: [CqrsModule],
})
export class ApplicationModule {}
