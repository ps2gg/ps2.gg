import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { logTransaction } from '@ps2gg/common/logging'
import { Player } from '@ps2gg/players/types'
import { ILike, In, LessThan, Repository } from 'typeorm'
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

  async findOneByName(name: string): Promise<PlayerEntity | null> {
    const player = await this._repository.findOne({
      where: { name: ILike(name) },
    })
    logTransaction('findOneByName', { name }, { player })
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

  async updateLastActivity(id: string, lastActivity: Date): Promise<any> {
    const result = await this._repository.update(id, { id, lastActivity, isOnline: true })
    logTransaction('updateLastActivity', { id, lastActivity }, { result })
    return result
  }

  async resetInactive(): Promise<any> {
    const inactive = new Date(Date.now() - 3 * 60 * 1000)
    const result = await this._repository.update({ lastActivity: LessThan(inactive), isOnline: true }, { isOnline: false })
    logTransaction('resetInactive', { inactive }, { result })
  }

  async resetOnlineState(serverId?: string): Promise<any> {
    const query = serverId ? { isOnline: true, serverId } : { isOnline: true }
    const result = await this._repository.update(query, { isOnline: false })
    logTransaction('resetOnlineStatus', query, { result })
    return result
  }

  async delete(id: string): Promise<any> {
    const result = await this._repository.delete(id)
    logTransaction('delete', { id }, { result })
    return result
  }
}
