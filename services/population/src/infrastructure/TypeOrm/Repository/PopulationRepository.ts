import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { logTransaction } from '@ps2gg/common/logging'
import { Population } from '@ps2gg/population/types'
import { Repository } from 'typeorm'
import { PopulationEntity } from '../../../domain/Entity/PopulationEntity'

@Injectable()
export class PopulationRepository {
  constructor(@InjectRepository(PopulationEntity) private readonly _repository: Repository<PopulationEntity>) {}

  async findOne(id: string): Promise<PopulationEntity | null> {
    const population = await this._repository.findOne({
      where: { id },
    })
    logTransaction('findOne', { id }, { population })
    return population
  }

  async save(population: Population): Promise<PopulationEntity> {
    const result = await this._repository.save(population)
    logTransaction('save', { population }, { population: result })
    return result
  }

  /**
   * Best fights have no more than a 60/40 pop ratio and no less than 24 players
   */
  async findEven(): Promise<PopulationEntity | null> {
    const population = await this._repository.findOne({
      where: {},
    })
    logTransaction('findBest', {}, { population })
    return population
  }
}
