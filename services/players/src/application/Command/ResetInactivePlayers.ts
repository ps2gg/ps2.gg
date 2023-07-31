import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { PlayerRepository } from '../../infrastructure/TypeOrm/Repository/PlayerRepository'

export class ResetInactivePlayers {
  constructor() {}
}

@CommandHandler(ResetInactivePlayers)
export class ResetInactivePlayersHandler implements ICommandHandler<ResetInactivePlayers> {
  constructor(private readonly _repository: PlayerRepository) {}

  async execute(command: ResetInactivePlayers): Promise<void> {
    return this._repository.resetInactive()
  }
}
