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
  async findBest(): Promise<PopulationEntity[] | null> {
    const allFactionFights = this._repository
      .createQueryBuilder()
      .select()
      .where('vs >= 12')
      .andWhere('nc >= 12')
      .andWhere('tr >= 12')
      .andWhere('ABS(1 - (vs / nc)) < 0.6')
      .andWhere('ABS(1 - (vs / tr)) < 0.6')
      .andWhere('ABS(1 - (nc / tr)) < 0.6')
      .getMany()
    const vsNcFights = this._findTwoFactionFight('vs', 'nc')
    const vsTrFights = this._findTwoFactionFight('vs', 'tr')
    const ncTrFights = this._findTwoFactionFight('nc', 'tr')
    const fights = (await Promise.all([allFactionFights, vsNcFights, vsTrFights, ncTrFights])).flat()

    logTransaction('findBest', { fights }, {})
    return allFactionFights
  }

  _findTwoFactionFight(faction1: string, faction2: string): Promise<PopulationEntity[] | null> {
    return this._repository.createQueryBuilder().select().where(`${faction1} >= 12`).andWhere(`${faction2} >= 12`).andWhere(`ABS(1 - (${faction1} / ${faction2})) < 0.6`).getMany()
  }
}
