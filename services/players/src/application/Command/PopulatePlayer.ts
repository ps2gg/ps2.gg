import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { getPlayer } from '@ps2gg/census/collections'
import { getLogger } from '@ps2gg/common/logging'
import { PlayerEntity } from '../../domain/Entity/PlayerEntity'
import { PlayerRepository } from '../../infrastructure/TypeOrm/Repository/PlayerRepository'

const logger = getLogger()

export class PopulatePlayer {
  constructor(readonly id: string, readonly isOnline = false, readonly lastLogout = new Date(0)) {}
}

@CommandHandler(PopulatePlayer)
export class PopulatePlayerHandler implements ICommandHandler<PopulatePlayer, PlayerEntity> {
  constructor(private _repository: PlayerRepository) {}

  async execute(command: PopulatePlayer): Promise<PlayerEntity | null> {
    const { id, isOnline, lastLogout } = command
    try {
      const { name, factionId, outfitTag } = await getPlayer(id)
      const player = { id, name, factionId, outfitTag, isOnline, lastLogout }
      logger.info(player, 'Updating player')
      return this._repository.save(player)
    } catch (err) {
      logger.error(err)
    }
  }
}
