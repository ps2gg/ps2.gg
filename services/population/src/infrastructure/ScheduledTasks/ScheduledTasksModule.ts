import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ScheduleModule } from '@nestjs/schedule'
import { BasePopulationTask } from './BasePopulationTask'
import { ContinentPopulationTask } from './ContinentPopulationTask'

@Module({
  imports: [CqrsModule, ScheduleModule.forRoot()],
  providers: [BasePopulationTask, ContinentPopulationTask],
})
export class ScheduledTasksModule {}
