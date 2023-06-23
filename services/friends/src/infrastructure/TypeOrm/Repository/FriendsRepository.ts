import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Friends } from '@ps2gg/friends/types'
import { Repository } from 'typeorm'
import { FriendsEntity } from '../../../domain/Entity/FriendsEntity'

@Injectable()
export class FriendsRepository {
  constructor(@InjectRepository(FriendsEntity) private readonly _repository: Repository<FriendsEntity>) {}

  async findOne(character_id: string): Promise<FriendsEntity | undefined> {
    return this._repository.findOne({
      where: { character_id },
    })
  }

  async save(friend: Friends): Promise<FriendsEntity> {
    return this._repository.save(friend)
  }
}
