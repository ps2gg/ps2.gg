import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Player } from '@ps2gg/players/types'
import { In, Repository } from 'typeorm'
import { PlayerEntity } from '../../../domain/Entity/PlayerEntity'

@Injectable()
export class ExampleRepository {
  constructor(@InjectRepository(PlayerEntity) private readonly _repository: Repository<PlayerEntity>) {}

  async findOne(id: string): Promise<PlayerEntity | undefined> {
    return this._repository.findOne({
      where: { id },
    })
  }

  async findOneByName(name: string): Promise<PlayerEntity | undefined> {
    return this._repository.findOne({
      where: { name },
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
}
