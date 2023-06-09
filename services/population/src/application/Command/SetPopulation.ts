import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { getLogger } from '@ps2gg/common/logging'
import { Population } from '@ps2gg/population/types'
import { PopulationEntity } from '../../domain/Entity/PopulationEntity'
import { PopulationRepository } from '../../infrastructure/TypeOrm/Repository/PopulationRepository'

const logger = getLogger()

export class SetPopulation {
  constructor(readonly population: Population) {}
}

@CommandHandler(SetPopulation)
export class SetPopulationHandler implements ICommandHandler<SetPopulation, PopulationEntity> {
  constructor(private _repository: PopulationRepository) {}

  async execute(command: SetPopulation): Promise<PopulationEntity> {
    logger.info(command, 'Setting population')

    return this._repository.save(command.population)
  }
}
