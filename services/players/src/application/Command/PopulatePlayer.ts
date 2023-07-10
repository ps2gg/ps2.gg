import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { getPlayer } from '@ps2gg/census/collections'
import { PlayerEntity } from '../../domain/Entity/PlayerEntity'
import { PlayerRepository } from '../../infrastructure/TypeOrm/Repository/PlayerRepository'

export class PopulatePlayer {
  constructor(readonly id: string, readonly isOnline?: boolean, readonly lastLogout?: Date) {}
}

@CommandHandler(PopulatePlayer)
export class PopulatePlayerHandler implements ICommandHandler<PopulatePlayer, PlayerEntity> {
  constructor(private _repository: PlayerRepository) {}

  async execute(command: PopulatePlayer): Promise<PlayerEntity | null> {
    const { id, isOnline, lastLogout } = command

    if (isOnline !== undefined) this._repository.updateOnlineStatus(id, isOnline, lastLogout)

    const { name, factionId, outfitTag, serverId } = await getPlayer(id)
    const player = new PlayerEntity({ id, name, factionId, serverId, outfitTag, isOnline, lastLogout })
    return this._repository.save(player)
  }
}
