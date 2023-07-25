import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { PopulationEntity } from '../../domain/Entity/PopulationEntity'
import { getValidBases } from '../../domain/Fights/Bases'
import { PopulationRepository } from '../../infrastructure/TypeOrm/Repository/PopulationRepository'

export class GetBestFights {
  constructor() {}
}

@QueryHandler(GetBestFights)
export class GetBestFightsHandler implements IQueryHandler<GetBestFights, PopulationEntity[]> {
  constructor(private readonly _repository: PopulationRepository) {}

  async execute(): Promise<PopulationEntity[] | null> {
    const fights = await this._repository.findBest()
    return getValidBases(fights)
  }
}
