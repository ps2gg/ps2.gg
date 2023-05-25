import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '../infrastructure/TypeOrm/TypeOrmModule'
import { SetFriendsHandler } from './Command/SetFriends'
import { GetFriendsHandler } from './Query/GetFriends'

const queryHandlers = [GetFriendsHandler]
const commandHandlers = [SetFriendsHandler]

export const eventHandlers = []

@Module({
  imports: [TypeOrmModule, CqrsModule],
  providers: [...commandHandlers, ...queryHandlers, ...eventHandlers],
  exports: [CqrsModule],
})
export class ApplicationModule {}
