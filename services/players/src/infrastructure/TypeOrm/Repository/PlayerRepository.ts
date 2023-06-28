import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { getLogger } from '@ps2gg/common/logging'
import { Player } from '@ps2gg/players/types'
import { ILike, In, Repository } from 'typeorm'
import { PlayerEntity } from '../../../domain/Entity/PlayerEntity'

const logger = getLogger()

@Injectable()
export class PlayerRepository {
  constructor(@InjectRepository(PlayerEntity) private readonly _repository: Repository<PlayerEntity>) {}

  async findOne(id: string): Promise<PlayerEntity | null> {
    const player = await this._repository.findOne({
      where: { id },
    })
    logger.info({ method: 'findOne', query: { id }, result: { player } }, 'transaction completed')
    return player
  }

  async findMany(ids: string[]): Promise<PlayerEntity[]> {
    const players = await this._repository.find({
      where: { id: In(ids) },
    })
    logger.info({ method: 'findMany', query: { ids }, result: { players } }, 'transaction completed')
    return players
  }

  async findManyByOnlineStatus(ids: string[], isOnline: boolean): Promise<PlayerEntity[]> {
    const players = await this._repository.find({
      where: { id: In(ids), isOnline },
    })
    logger.info({ method: 'findManyByOnlineStatus', query: { ids, isOnline }, result: { players } }, 'transaction completed')
    return players
  }

  async save(query: Player): Promise<PlayerEntity> {
    const player = await this._repository.save(query)
    logger.info({ method: 'save', query, result: { player } }, 'transaction completed')
    return player
  }

  async updateOnlineStatus(id: string, isOnline: boolean, lastLogout?: Date): Promise<any> {
    const result = await this._repository.update(id, { id, isOnline, lastLogout })
    logger.info({ method: 'updateOnlineStatus', query: { id, isOnline, lastLogout }, result }, 'transaction completed')
    return result
  }

  async findOneByName(name: string): Promise<PlayerEntity | null> {
    const player = await this._repository.findOne({
      where: { name: ILike(name) },
    })
    logger.info({ method: 'findOneByName', query: { name }, result: { player } }, 'transaction completed')
    return player
  }
}
