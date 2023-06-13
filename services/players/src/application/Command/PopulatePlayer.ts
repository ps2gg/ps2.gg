import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { getPlayer } from '@ps2gg/census/collections'
import { getLogger } from '@ps2gg/common/logging'
import { PlayerEntity } from '../../domain/Entity/PlayerEntity'
import { ExampleRepository } from '../../infrastructure/TypeOrm/Repository/ExampleRepository'

const logger = getLogger()

export class PopulatePlayer {
  constructor(readonly id: string, readonly isOnline: boolean, readonly lastLogout?: Date) {}
}

@CommandHandler(PopulatePlayer)
export class PopulatePlayerHandler implements ICommandHandler<PopulatePlayer, PlayerEntity> {
  constructor(private _repository: ExampleRepository) {}

  async execute(command: PopulatePlayer): Promise<PlayerEntity | undefined> {
    const { id, isOnline, lastLogout } = command
    try {
      const { name } = await getPlayer(id)
      const player = { id, name, isOnline, lastLogout }
      logger.info(player, 'Updating player')
      return this._repository.save(player)
    } catch (err) {
      logger.error(err)
      return undefined
    }
  }
}
