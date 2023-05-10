import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { createLogger } from '@ps2gg/common/logging'
import { PopulationEntity } from '../../domain/Entity/PopulationEntity'
import { PopulationRepository } from '../../infrastructure/TypeOrm/Repository/PopulationRepository'
import { SetPopulation } from './SetPopulation'

const logger = createLogger()

@CommandHandler(SetPopulation)
export class SetPopulationHandler implements ICommandHandler<SetPopulation, PopulationEntity> {
  constructor(private _repository: PopulationRepository) {}

  async execute(command: SetPopulation): Promise<PopulationEntity> {
    logger.info(command, 'Setting population')

    return this._repository.save(command)
  }
}
