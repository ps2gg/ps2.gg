import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { getLogger, logTransaction } from '@ps2gg/common/logging'
import { Friends } from '@ps2gg/friends/types'
import { Repository } from 'typeorm'
import { FriendsEntity } from '../../../domain/Entity/FriendsEntity'

const logger = getLogger()

@Injectable()
export class FriendsRepository {
  constructor(@InjectRepository(FriendsEntity) private readonly _repository: Repository<FriendsEntity>) {}

  async findOne(character_id: string): Promise<FriendsEntity | undefined> {
    const friends = await this._repository.findOne({
      where: { character_id },
    })
    logTransaction('findOne', { character_id }, { friends })
    return friends
  }

  async save(friend: Friends): Promise<FriendsEntity> {
    const friends = await this._repository.save(friend)
    logTransaction('save', { friend }, { friends })
    return friends
  }
}
