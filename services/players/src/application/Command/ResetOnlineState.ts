import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { PlayerRepository } from '../../infrastructure/TypeOrm/Repository/PlayerRepository'

export class ResetOnlineState {
  constructor() {}
}

@CommandHandler(ResetOnlineState)
export class ResetOnlineStateHandler implements ICommandHandler<ResetOnlineState, void> {
  constructor(private _repository: PlayerRepository) {}

  async execute(): Promise<void> {
    await this._repository.resetOnlineState()
  }
}
