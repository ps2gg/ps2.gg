import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { PopulationEntity } from '../../domain/Entity/PopulationEntity'
import { PopulationRepository } from '../../infrastructure/TypeOrm/Repository/PopulationRepository'

export class GetPopulation {
  constructor(readonly id: string) {}
}

@QueryHandler(GetPopulation)
export class GetPopulationHandler implements IQueryHandler<GetPopulation, PopulationEntity> {
  constructor(private readonly _repository: PopulationRepository) {}

  async execute(query: GetPopulation): Promise<PopulationEntity | null> {
    return this._repository.findOne(query.id)
  }
}
