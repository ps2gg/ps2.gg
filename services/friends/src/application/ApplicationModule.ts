import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '../infrastructure/TypeOrm/TypeOrmModule'
import { PopulateFriendsHandler } from './Command/PopulateFriends'
import { SetFriendsHandler } from './Command/SetFriends'
import { GetFriendsHandler } from './Query/GetFriends'
import { GetMultipleHandler } from './Query/GetMultiple'

const queryHandlers = [GetFriendsHandler, GetMultipleHandler]
const commandHandlers = [SetFriendsHandler, PopulateFriendsHandler]

export const eventHandlers = []

@Module({
  imports: [TypeOrmModule, CqrsModule],
  providers: [...commandHandlers, ...queryHandlers, ...eventHandlers],
  exports: [CqrsModule],
})
export class ApplicationModule {}
