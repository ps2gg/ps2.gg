import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { PlayerRepository } from '../../infrastructure/TypeOrm/Repository/PlayerRepository'

export class SetLastActivity {
  constructor(readonly id: string, readonly lastActivity: Date) {}
}

@CommandHandler(SetLastActivity)
export class SetLastActivityHandler implements ICommandHandler<SetLastActivity> {
  constructor(private readonly _repository: PlayerRepository) {}

  async execute(command: SetLastActivity): Promise<void> {
    const { id, lastActivity } = command
    return this._repository.updateLastActivity(id, lastActivity)
  }
}
