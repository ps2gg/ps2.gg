import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ScheduleModule } from '@nestjs/schedule'
import { ResetInactivePlayersTask } from './ResetInactivePlayers'

@Module({
  imports: [CqrsModule, ScheduleModule.forRoot()],
  providers: [ResetInactivePlayersTask],
})
export class ScheduledTasksModule {}
