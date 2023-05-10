import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ServerId } from '@ps2gg/census/types'
import { Population } from '@ps2gg/population/types'
import { Repository } from 'typeorm'
import { PopulationEntity } from '../../../domain/Entity/PopulationEntity'

@Injectable()
export class PopulationRepository {
  constructor(@InjectRepository(PopulationEntity) private readonly _repository: Repository<PopulationEntity>) {}

  async findOne(serverId: ServerId, scope: string): Promise<PopulationEntity | undefined> {
    return this._repository.findOne({
      where: { serverId, scope },
    })
  }

  save(population: Population): Promise<PopulationEntity> {
    return this._repository.save(population)
  }
}
