import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { PopulationEntity } from '../../domain/Entity/PopulationEntity'
import { PopulationRepository } from '../../infrastructure/TypeOrm/Repository/PopulationRepository'

export class GetBestFights {
  constructor(readonly id: string) {}
}

@QueryHandler(GetBestFights)
export class GetBestFightsHandler implements IQueryHandler<GetBestFights, PopulationEntity[]> {
  constructor(private readonly _repository: PopulationRepository) {}

  async execute(query: GetBestFights): Promise<PopulationEntity[] | null> {
    return this._repository.findBest()
  }
}
