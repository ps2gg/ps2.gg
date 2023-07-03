import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { logTransaction } from '@ps2gg/common/logging'
import { Player } from '@ps2gg/players/types'
import { ILike, In, Repository } from 'typeorm'
import { PlayerEntity } from '../../../domain/Entity/PlayerEntity'

@Injectable()
export class PlayerRepository {
  constructor(@InjectRepository(PlayerEntity) private readonly _repository: Repository<PlayerEntity>) {}

  async findOne(id: string): Promise<PlayerEntity | null> {
    const player = await this._repository.findOne({
      where: { id },
    })
    logTransaction('findOne', { id }, { player })
    return player
  }

  async findMany(ids: string[]): Promise<PlayerEntity[]> {
    const players = await this._repository.find({
      where: { id: In(ids) },
    })
    logTransaction('findMany', { ids }, { players })
    return players
  }

  async findManyByOnlineStatus(ids: string[], isOnline: boolean): Promise<PlayerEntity[]> {
    const players = await this._repository.find({
      where: { id: In(ids), isOnline },
    })
    logTransaction('findManyByOnlineStatus', { ids, isOnline }, { players })
    return players
  }

  async save(query: Player): Promise<PlayerEntity> {
    const player = await this._repository.save(query)
    logTransaction('save', { query }, { player })
    return player
  }

  async updateOnlineStatus(id: string, isOnline: boolean, lastLogout?: Date): Promise<any> {
    const result = await this._repository.update(id, { id, isOnline, lastLogout })
    logTransaction('updateOnlineStatus', { id, isOnline, lastLogout }, { result })
    return result
  }

  async findOneByName(name: string): Promise<PlayerEntity | null> {
    const player = await this._repository.findOne({
      where: { name: ILike(name) },
    })
    logTransaction('findOneByName', { name }, { player })
    return player
  }

  async resetOnlineState(): Promise<any> {
    const result = await this._repository.update({ isOnline: true }, { isOnline: false })
    logTransaction('resetOnlineStatus', { isOnline: true }, { result })
    return result
  }
}
