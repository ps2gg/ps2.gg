import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Player } from '@ps2gg/players/types'
import { ILike, In, Repository } from 'typeorm'
import { PlayerEntity } from '../../../domain/Entity/PlayerEntity'

@Injectable()
export class PlayerRepository {
  constructor(@InjectRepository(PlayerEntity) private readonly _repository: Repository<PlayerEntity>) {}

  async findOne(id: string): Promise<PlayerEntity | null> {
    return this._repository.findOne({
      where: { id },
    })
  }

  async findOneByName(name: string): Promise<PlayerEntity | null> {
    return this._repository.findOne({
      where: { name: ILike(name) },
    })
  }

  async findMany(ids: string[]): Promise<PlayerEntity[]> {
    return this._repository.find({
      where: { id: In(ids) },
    })
  }

  async findManyByOnlineStatus(ids: string[], isOnline: boolean): Promise<PlayerEntity[]> {
    return this._repository.find({
      where: { id: In(ids), isOnline },
    })
  }

  async save(example: Player): Promise<PlayerEntity> {
    return this._repository.save(example)
  }

  async updateOnlineStatus(id: string, isOnline: boolean, lastLogout?: Date): Promise<any> {
    return this._repository.update(id, { id, isOnline, lastLogout })
  }
}
