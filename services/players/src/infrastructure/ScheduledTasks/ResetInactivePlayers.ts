import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Cron } from '@nestjs/schedule'
import { ResetInactivePlayers } from '../../application/Command/ResetInactivePlayers'

@Injectable()
export class ResetInactivePlayersTask {
  constructor(private readonly _commandBus: CommandBus) {}

  @Cron('*/60 * * * * *')
  async handleCron(): Promise<void> {
    await this._commandBus.execute(new ResetInactivePlayers())
  }
}
