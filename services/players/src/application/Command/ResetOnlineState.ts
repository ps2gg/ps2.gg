import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { PlayerRepository } from '../../infrastructure/TypeOrm/Repository/PlayerRepository'

export class ResetOnlineState {
  constructor(readonly serverId?: string) {}
}

@CommandHandler(ResetOnlineState)
export class ResetOnlineStateHandler implements ICommandHandler<ResetOnlineState, void> {
  constructor(private _repository: PlayerRepository) {}

  async execute(command: ResetOnlineState): Promise<void> {
    const { serverId } = command
    await this._repository.resetOnlineState(serverId)
  }
}
