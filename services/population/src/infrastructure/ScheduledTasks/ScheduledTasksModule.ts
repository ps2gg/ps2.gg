import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ScheduleModule } from '@nestjs/schedule'
import { BasePopulationTask } from './BasePopulationTask'
import { ContinentPopulationTask } from './ContinentPopulationTask'
import { ESFPopulationTask } from './ESFPopulationTask'

@Module({
  imports: [CqrsModule, ScheduleModule.forRoot()],
  providers: [ESFPopulationTask],
})
export class ScheduledTasksModule {}
