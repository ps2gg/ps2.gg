import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { createLogger } from '@ps2gg/common/logging'
import { PopulationEntity } from '../../domain/Entity/PopulationEntity'
import { PopulationRepository } from '../../infrastructure/TypeOrm/Repository/PopulationRepository'
import { GetPopulation } from './GetPopulation'

const logger = createLogger()

@QueryHandler(GetPopulation)
export class GetPopulationHandler implements IQueryHandler<GetPopulation, PopulationEntity> {
  constructor(private readonly _repository: PopulationRepository) {}

  async execute(query: GetPopulation): Promise<PopulationEntity | undefined> {
    logger.info(query, `Retrieving population data`)

    return this._repository.findOne(query.serverId, query.scope)
  }
}
