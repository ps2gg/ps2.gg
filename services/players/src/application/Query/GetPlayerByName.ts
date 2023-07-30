import { CommandBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Player } from '@ps2gg/players/types'
import { PlayerEntity } from '../../domain/Entity/PlayerEntity'
import { PlayerRepository } from '../../infrastructure/TypeOrm/Repository/PlayerRepository'
import { PopulatePlayerByName } from '../Command/PopulatePlayerByName'

export class GetPlayerByName {
  constructor(readonly name: string, readonly refresh?: boolean) {}
}

@QueryHandler(GetPlayerByName)
export class GetPlayerByNameHandler implements IQueryHandler<GetPlayerByName, PlayerEntity> {
  constructor(private readonly _repository: PlayerRepository, private readonly _commandBus: CommandBus) {}

  async execute(query: GetPlayerByName): Promise<PlayerEntity> {
    const { name, refresh } = query
    const existing = await this._repository.findOneByName(name)

    if (refresh) return this.getRefreshedPlayer(name, existing)
    return existing || (await this._commandBus.execute(new PopulatePlayerByName(name)))
  }

  async getRefreshedPlayer(name: string, existing: Player): Promise<PlayerEntity> {
    const player: PlayerEntity = await this._commandBus.execute(new PopulatePlayerByName(name))
    await this.deleteOutdatedPlayer(existing, player)
    return player
  }

  async deleteOutdatedPlayer(existing: Player, player: Player): Promise<void> {
    if (existing && existing.id !== player.id) {
      await this._repository.delete(existing.id)
    }
  }
}
