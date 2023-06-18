import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ServerId } from '@ps2gg/census/types'
import { getLogger } from '@ps2gg/common/logging'
import { PopulationEntity } from '../../domain/Entity/PopulationEntity'
import { PopulationRepository } from '../../infrastructure/TypeOrm/Repository/PopulationRepository'

const logger = getLogger()

export class GetPopulation {
  constructor(readonly id: string) {}
}

@QueryHandler(GetPopulation)
export class GetPopulationHandler implements IQueryHandler<GetPopulation, PopulationEntity> {
  constructor(private readonly _repository: PopulationRepository) {}

  async execute(query: GetPopulation): Promise<PopulationEntity | null> {
    logger.info(query, `Retrieving population data`)

    return this._repository.findOne(query.id)
  }
}
