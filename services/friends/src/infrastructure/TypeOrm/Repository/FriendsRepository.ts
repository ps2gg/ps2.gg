import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { logTransaction } from '@ps2gg/common/logging'
import { Friends } from '@ps2gg/friends/types'
import { Repository } from 'typeorm'
import { In } from 'typeorm'
import { FriendsEntity } from '../../../domain/Entity/FriendsEntity'

@Injectable()
export class FriendsRepository {
  constructor(@InjectRepository(FriendsEntity) private readonly _repository: Repository<FriendsEntity>) {}

  async findOne(character_id: string): Promise<FriendsEntity | undefined> {
    const friends = await this._repository.findOne({
      where: { id: character_id },
    })
    logTransaction('findOne', { character_id }, { friends })
    return friends
  }

  async findMany(ids: string[]): Promise<FriendsEntity[]> {
    const friends = await this._repository.find({
      where: { id: In(ids) },
    })
    logTransaction('findMany', { ids }, { friends })
    return friends
  }

  async save(friend: Friends): Promise<FriendsEntity> {
    const friends = await this._repository.save(friend)
    logTransaction('save', { friend }, { friends })
    return friends
  }
}
