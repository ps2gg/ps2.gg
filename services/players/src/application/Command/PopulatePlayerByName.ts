import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { getPlayerByName } from '@ps2gg/census/collections'
import { getLogger } from '@ps2gg/common/logging'
import { PlayerEntity } from '../../domain/Entity/PlayerEntity'
import { PlayerRepository } from '../../infrastructure/TypeOrm/Repository/PlayerRepository'

const logger = getLogger()

export class PopulatePlayerByName {
  constructor(readonly name: string) {}
}

@CommandHandler(PopulatePlayerByName)
export class PopulatePlayerByNameHandler implements ICommandHandler<PopulatePlayerByName, PlayerEntity> {
  constructor(private _repository: PlayerRepository) {}

  async execute(command: PopulatePlayerByName): Promise<PlayerEntity | null> {
    const { name } = command
    try {
      const { id, name: nameActual, factionId, outfitTag } = await getPlayerByName(name)
      const player = { id, name: nameActual, factionId, outfitTag, isOnline: false, lastLogout: new Date(0) }
      logger.info(player, 'Updating player')
      return this._repository.save(player)
    } catch (err) {
      logger.error(err)
    }
  }
}
