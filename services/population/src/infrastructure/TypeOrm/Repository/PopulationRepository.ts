import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Population } from '@ps2gg/population/types'
import { Repository } from 'typeorm'
import { PopulationEntity } from '../../../domain/Entity/PopulationEntity'

@Injectable()
export class PopulationRepository {
  constructor(@InjectRepository(PopulationEntity) private readonly _repository: Repository<PopulationEntity>) {}

  async findOne(id: string): Promise<PopulationEntity | null> {
    return this._repository.findOne({
      where: { id },
    })
  }

  save(population: Population): Promise<PopulationEntity> {
    return this._repository.save(population)
  }
}
