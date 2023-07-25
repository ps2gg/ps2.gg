import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Population } from '@ps2gg/population/types'
import { PopulationEntity } from '../../domain/Entity/PopulationEntity'
import { PopulationPercentages } from '../../domain/Types/PopulationPercentages'
import { PopulationRepository } from '../../infrastructure/TypeOrm/Repository/PopulationRepository'

export class SetPopulation {
  constructor(readonly population: Population, readonly percentages?: PopulationPercentages) {}
}

@CommandHandler(SetPopulation)
export class SetPopulationHandler implements ICommandHandler<SetPopulation, PopulationEntity> {
  constructor(private _repository: PopulationRepository) {}

  async execute(command: SetPopulation): Promise<PopulationEntity> {
    const population = new PopulationEntity(command.population, command.percentages)
    return this._repository.save(population)
  }
}
